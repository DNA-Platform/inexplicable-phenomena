#Requires -Version 5.1
<#
.SYNOPSIS
    S4 Spike: Done Marker Detection in UIA Text

.DESCRIPTION
    Observational spike that reads Claude Desktop's conversation text via
    UIA 20 times (2s between reads) and checks for "Done" markers.

    This is meant to be run while the collaborator is actively responding
    in Claude Desktop. It captures what the UIA text looks like at each
    read and whether the response completion marker is detectable.

    Checks for:
    - "Done" appearing after the last "Show more" in the raw text
    - Any collaborator response lines after "Done" (indicates response is complete)
    - Text length changes between reads (streaming indicator)

.PARAMETER Reads
    Number of UIA reads to perform (default 20)

.PARAMETER IntervalSeconds
    Seconds between reads (default 2)

.PARAMETER Collaborator
    Name to look for in response lines (default: auto-detect from .env)

.NOTES
    Run with: powershell -ExecutionPolicy Bypass -File s4-done-marker.ps1

    IMPORTANT: Run this while the collaborator is actively responding.
    The value is in seeing the transition from streaming to done.

    What to look for:
    - Does "Done" appear reliably when response completes?
    - Is there a consistent pattern we can use for response detection?
    - How much does text length change between reads during streaming?
#>

param(
    [int]$Reads = 20,
    [int]$IntervalSeconds = 2,
    [string]$Collaborator = $null
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Dot-source dependencies ─────────────────────────────────────────────────
$claudeSrc = Join-Path (Split-Path (Split-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) -Parent) -Parent) ".claude\src"

. (Join-Path $claudeSrc "desktop.ps1")
. (Join-Path $claudeSrc "config.ps1")

# ─── Resolve collaborator name ────────────────────────────────────────────────
if (-not $Collaborator -and $Script:Collaborator) {
    $Collaborator = $Script:Collaborator
}
if (-not $Collaborator) {
    $Collaborator = "Eirian"  # fallback
    Write-Host "[WARN] Could not resolve collaborator from .env, using '$Collaborator'" -ForegroundColor Yellow
}

$findingsFile = Join-Path $PSScriptRoot "s4-done-marker-findings.txt"

# ─── Banner ───────────────────────────────────────────────────────────────────
$banner = @"

=== S4 Spike: Done Marker Detection ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Collaborator: $Collaborator
Reads: $Reads @ ${IntervalSeconds}s intervals
Expected duration: ~$($Reads * $IntervalSeconds)s
"@

Write-Host $banner -ForegroundColor Cyan
Write-Host "TIP: Run this while $Collaborator is actively responding in Claude Desktop." -ForegroundColor Yellow

# ─── Perform reads ────────────────────────────────────────────────────────────
$results = @()
$prevHash = $null
$prevLen = 0

Write-Host "`n--- Starting $Reads UIA reads ---" -ForegroundColor Yellow

for ($i = 1; $i -le $Reads; $i++) {
    $timestamp = Get-Date -Format 'HH:mm:ss.fff'
    $sw = [System.Diagnostics.Stopwatch]::StartNew()

    $uiaResult = Read-ChatContentUIA
    $sw.Stop()
    $readMs = $sw.ElapsedMilliseconds

    if (-not $uiaResult -or -not $uiaResult.text) {
        Write-Host "  Read $i [$timestamp]: [FAIL] UIA read returned null (${readMs}ms)" -ForegroundColor Red
        $results += [PSCustomObject]@{
            Read            = $i
            Timestamp       = $timestamp
            ReadMs          = $readMs
            TextLength      = 0
            LengthDelta     = 0
            Hash            = "(null)"
            Changed         = $false
            DonePresent     = $false
            DoneAfterShow   = $false
            ResponseAfterDone = $false
            LastShowMore    = "(n/a)"
            Error           = "UIA read failed"
        }
        if ($i -lt $Reads) { Start-Sleep -Seconds $IntervalSeconds }
        continue
    }

    $text = $uiaResult.text
    $textLen = $text.Length
    $lenDelta = $textLen - $prevLen

    # Compute hash for change detection
    $hasher = [System.Security.Cryptography.SHA256]::Create()
    $hashBytes = $hasher.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($text))
    $hash = [BitConverter]::ToString($hashBytes[0..7]).Replace("-", "").ToLower()
    $changed = ($hash -ne $prevHash)

    # ─── Done marker analysis ─────────────────────────────────────────────
    # Look for "Done" after the last "Show more"
    $lastShowMoreIdx = $text.LastIndexOf("Show more")
    $lastShowMoreInfo = if ($lastShowMoreIdx -ge 0) { "at char $lastShowMoreIdx" } else { "(not found)" }

    # Check if "Done" appears in the text
    $donePresent = $text.Contains("Done")

    # Check if "Done" appears AFTER the last "Show more"
    $doneAfterShow = $false
    if ($lastShowMoreIdx -ge 0) {
        $afterShow = $text.Substring($lastShowMoreIdx)
        $doneAfterShow = $afterShow.Contains("Done")
    } elseif ($donePresent) {
        # No "Show more" but Done exists — still counts
        $doneAfterShow = $donePresent
    }

    # Check for collaborator response lines after "Done"
    $responseAfterDone = $false
    if ($donePresent) {
        $lastDoneIdx = $text.LastIndexOf("Done")
        $afterDone = $text.Substring($lastDoneIdx)
        # Look for "Collaborator:" pattern or just the name followed by content
        $responseAfterDone = $afterDone -match "${Collaborator}\s*:" -or
                             $afterDone -match "${Collaborator}`n"
    }

    $entry = [PSCustomObject]@{
        Read              = $i
        Timestamp         = $timestamp
        ReadMs            = $readMs
        TextLength        = $textLen
        LengthDelta       = $lenDelta
        Hash              = $hash
        Changed           = $changed
        DonePresent       = $donePresent
        DoneAfterShow     = $doneAfterShow
        ResponseAfterDone = $responseAfterDone
        LastShowMore      = $lastShowMoreInfo
        Error             = $null
    }
    $results += $entry

    # Console output
    $changeIndicator = if ($changed -and $i -gt 1) { "CHANGED" } elseif ($i -eq 1) { "FIRST" } else { "same" }
    $doneIndicator = if ($doneAfterShow) { "DONE" } elseif ($donePresent) { "done(early)" } else { "streaming" }
    $respIndicator = if ($responseAfterDone) { "+resp" } else { "" }

    $color = if ($doneAfterShow -and $responseAfterDone) { "Green" }
             elseif ($doneAfterShow) { "Yellow" }
             elseif ($changed) { "White" }
             else { "Gray" }

    Write-Host "  Read $i [$timestamp]: ${textLen}ch (${lenDelta:+#;-#;0}) ${readMs}ms [$changeIndicator] [$doneIndicator] $respIndicator hash=$hash" -ForegroundColor $color

    $prevHash = $hash
    $prevLen = $textLen

    if ($i -lt $Reads) { Start-Sleep -Seconds $IntervalSeconds }
}

# ─── Analysis ─────────────────────────────────────────────────────────────────
$validResults = $results | Where-Object { -not $_.Error }
$changedCount = ($validResults | Where-Object { $_.Changed }).Count
$doneCount = ($validResults | Where-Object { $_.DoneAfterShow }).Count
$responseCount = ($validResults | Where-Object { $_.ResponseAfterDone }).Count
$failCount = ($results | Where-Object { $_.Error }).Count

$avgReadMs = if ($validResults.Count -gt 0) {
    [math]::Round(($validResults | ForEach-Object { $_.ReadMs } | Measure-Object -Average).Average, 1)
} else { 0 }

# Detect streaming: consecutive reads where text grew
$streamingRuns = 0
$currentRun = 0
foreach ($r in $validResults) {
    if ($r.LengthDelta -gt 0 -and $r.Read -gt 1) {
        $currentRun++
    } else {
        if ($currentRun -gt 1) { $streamingRuns++ }
        $currentRun = 0
    }
}
if ($currentRun -gt 1) { $streamingRuns++ }

# ─── Report ───────────────────────────────────────────────────────────────────
$report = @"

=== S4 Spike: Done Marker Detection Results ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Collaborator: $Collaborator

--- Summary ---
Total reads:      $Reads
Successful reads: $($validResults.Count)
Failed reads:     $failCount
Changed between reads: $changedCount
Done detected:    $doneCount (of $($validResults.Count) reads)
Response after Done: $responseCount
Streaming runs:   $streamingRuns (consecutive growing reads)
Avg read time:    ${avgReadMs}ms

--- Per-Read Detail ---
$(($results | Format-Table Read, Timestamp, TextLength, LengthDelta, ReadMs, Changed, DonePresent, DoneAfterShow, ResponseAfterDone, Hash -AutoSize | Out-String).Trim())

--- Observations ---
$(if ($doneCount -eq 0) {
    "No 'Done' marker detected in any read. Either:"
    "  1. The collaborator was not responding during the test"
    "  2. 'Done' is not visible in UIA text (check raw content)"
    "  3. The response completed before the test started"
} elseif ($responseCount -gt 0) {
    "Done marker detected with response content after it."
    "This confirms the pattern: 'Done' appears, then the collaborator's"
    "response text follows. This is usable for response detection."
} else {
    "Done marker detected but no response content after it."
    "The marker may appear before the response text is committed to the DOM."
})

$(if ($changedCount -gt 0 -and $streamingRuns -gt 0) {
    "Streaming detected: text grew across consecutive reads."
    "This means polling can detect active streaming vs idle."
})

$(if ($avgReadMs -gt 500) {
    "WARNING: UIA reads averaging ${avgReadMs}ms. This is slower than expected."
    "May impact polling frequency choices."
} else {
    "UIA read performance is good (${avgReadMs}ms avg). 1-2s polling is feasible."
})
"@

Write-Host $report -ForegroundColor Cyan
$report | Set-Content -Path $findingsFile -Encoding UTF8
Write-Host "`nFindings written to: $findingsFile" -ForegroundColor Green
Write-Host "=== Spike Complete ===" -ForegroundColor Cyan
