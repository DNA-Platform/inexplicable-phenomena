#Requires -Version 5.1
<#
.SYNOPSIS
    S3 Spike: Concurrent File Access / Log Integrity Test

.DESCRIPTION
    Simulates the real scenario where a background listener appends log
    entries while a foreground process (e.g. /hear status updates) does
    read-modify-write cycles on the same file.

    Creates a temp log file, spawns a background job that appends entries
    every 2s, and runs 50 foreground read-modify-write cycles every 3s.
    After completion, validates the log for correct entry count, intact
    terminators, and no data loss.

    This tests whether naive file I/O is safe or whether we need file
    locking / mutex / separate files.

.PARAMETER Cycles
    Number of foreground read-modify-write cycles (default 50)

.PARAMETER BgIntervalMs
    Background writer interval in milliseconds (default 2000)

.PARAMETER FgIntervalMs
    Foreground read-modify-write interval in milliseconds (default 3000)

.NOTES
    Run with: powershell -ExecutionPolicy Bypass -File s3-log-concurrency.ps1
    Quick test: powershell -ExecutionPolicy Bypass -File s3-log-concurrency.ps1 -Cycles 10

    What to look for:
    - Are any entries lost?
    - Are any --- terminators missing or corrupted?
    - Do interleaved writes cause garbled lines?
#>

param(
    [int]$Cycles = 50,
    [int]$BgIntervalMs = 2000,
    [int]$FgIntervalMs = 3000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Config ───────────────────────────────────────────────────────────────────
$tempDir = Join-Path $env:TEMP "s3-log-spike-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
$logFile = Join-Path $tempDir "test-log.md"
$findingsFile = Join-Path $PSScriptRoot "s3-log-concurrency-findings.txt"

# ─── Banner ───────────────────────────────────────────────────────────────────
$banner = @"

=== S3 Spike: Log Concurrency Test ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Log file: $logFile
Foreground cycles: $Cycles @ ${FgIntervalMs}ms
Background interval: ${BgIntervalMs}ms
Expected duration: ~$([math]::Round($Cycles * $FgIntervalMs / 1000))s
"@

Write-Host $banner -ForegroundColor Cyan

# Initialize log file
"# Concurrency Test Log`n" | Set-Content -Path $logFile -Encoding UTF8

# ─── Background writer job ────────────────────────────────────────────────────
# Appends entries every $BgIntervalMs, simulating the listener writing new
# response content.

$bgScript = {
    param($logFile, $intervalMs, $maxEntries)

    for ($i = 1; $i -le $maxEntries; $i++) {
        $timestamp = Get-Date -Format 'HH:mm:ss.fff'
        $entry = @"
[BG-$i] $timestamp
Background entry number $i. This simulates a listener appending new content.
Data: $(([guid]::NewGuid().ToString()))
---
"@
        # Append with retry on lock contention
        $retries = 3
        for ($r = 0; $r -lt $retries; $r++) {
            try {
                Add-Content -Path $logFile -Value $entry -Encoding UTF8
                break
            } catch {
                Start-Sleep -Milliseconds 100
            }
        }
        Start-Sleep -Milliseconds $intervalMs
    }
}

# Calculate how many BG entries we expect given the total run time
$expectedRunMs = $Cycles * $FgIntervalMs
$bgEntries = [math]::Ceiling($expectedRunMs / $BgIntervalMs) + 5  # +5 buffer

Write-Host "Starting background writer ($bgEntries max entries)..." -ForegroundColor Yellow
$bgJob = Start-Job -ScriptBlock $bgScript -ArgumentList $logFile, $BgIntervalMs, $bgEntries

# ─── Foreground read-modify-write cycles ──────────────────────────────────────
# Reads the log, appends a status entry, writes it back. This simulates
# /hear updating a status field in a shared file.

Write-Host "Running $Cycles foreground cycles..." -ForegroundColor Yellow

$fgWritten = 0
$contentionCount = 0

for ($c = 1; $c -le $Cycles; $c++) {
    $timestamp = Get-Date -Format 'HH:mm:ss.fff'

    # Read-modify-write: read current content, append, write back
    $retries = 3
    $succeeded = $false
    for ($r = 0; $r -lt $retries; $r++) {
        try {
            $content = Get-Content -Path $logFile -Raw -Encoding UTF8
            $newEntry = @"
[FG-$c] $timestamp
Foreground cycle $c. Simulates /hear status update. Read $($content.Length) chars.
Data: $(([guid]::NewGuid().ToString()))
---
"@
            $content += "`n$newEntry"
            [System.IO.File]::WriteAllText($logFile, $content, [System.Text.Encoding]::UTF8)
            $fgWritten++
            $succeeded = $true
            break
        } catch {
            $contentionCount++
            if ($r -eq 0) {
                Write-Host "  [CONTENTION] Cycle $c, retry $($r+1): $($_.Exception.Message)" -ForegroundColor Yellow
            }
            Start-Sleep -Milliseconds (50 + (Get-Random -Maximum 100))
        }
    }

    if (-not $succeeded) {
        Write-Host "  [FAIL] Cycle ${c}: could not write after $retries retries" -ForegroundColor Red
    }

    # Progress indicator every 10 cycles
    if ($c % 10 -eq 0) {
        Write-Host "  Completed $c/$Cycles cycles (contention: $contentionCount)" -ForegroundColor Gray
    }

    Start-Sleep -Milliseconds $FgIntervalMs
}

# ─── Stop background job ─────────────────────────────────────────────────────
Write-Host "Stopping background writer..." -ForegroundColor Yellow
Stop-Job $bgJob -ErrorAction SilentlyContinue
$bgJobResult = Receive-Job $bgJob -ErrorAction SilentlyContinue
Remove-Job $bgJob -Force -ErrorAction SilentlyContinue

# Let any final writes flush
Start-Sleep -Seconds 1

# ─── Validate the log ─────────────────────────────────────────────────────────
Write-Host "`n--- Validating log file ---" -ForegroundColor Yellow

$finalContent = Get-Content -Path $logFile -Raw -Encoding UTF8
$finalBytes = [System.Text.Encoding]::UTF8.GetByteCount($finalContent)

# Count BG entries
$bgPattern = [regex]::Matches($finalContent, '\[BG-(\d+)\]')
$bgFound = $bgPattern.Count
$bgNumbers = $bgPattern | ForEach-Object { [int]$_.Groups[1].Value } | Sort-Object

# Count FG entries
$fgPattern = [regex]::Matches($finalContent, '\[FG-(\d+)\]')
$fgFound = $fgPattern.Count
$fgNumbers = $fgPattern | ForEach-Object { [int]$_.Groups[1].Value } | Sort-Object

# Count terminators
$terminators = [regex]::Matches($finalContent, '^---$', [System.Text.RegularExpressions.RegexOptions]::Multiline)
$terminatorCount = $terminators.Count
$expectedTerminators = $bgFound + $fgFound

# Check for corruption: lines that contain partial entries or garbled data
$lines = $finalContent -split "`n"
$corruptionCount = 0
foreach ($line in $lines) {
    # A corrupted line would have two entry headers on the same line
    if ($line -match '\[BG-\d+\].*\[FG-\d+\]' -or $line -match '\[FG-\d+\].*\[BG-\d+\]') {
        $corruptionCount++
    }
    # Or a GUID that's truncated (should be 36 chars: 8-4-4-4-12)
    if ($line -match 'Data: [0-9a-f-]+' -and $line -notmatch 'Data: [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}') {
        $corruptionCount++
    }
}

# Check for missing sequence numbers
$missingBg = @()
if ($bgFound -gt 0) {
    $maxBg = ($bgNumbers | Measure-Object -Maximum).Maximum
    for ($i = 1; $i -le $maxBg; $i++) {
        if ($i -notin $bgNumbers) { $missingBg += $i }
    }
}

$missingFg = @()
if ($fgFound -gt 0) {
    for ($i = 1; $i -le $Cycles; $i++) {
        if ($i -notin $fgNumbers) { $missingFg += $i }
    }
}

# ─── Report ───────────────────────────────────────────────────────────────────
$report = @"

=== S3 Spike: Log Concurrency Test Results ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Log file: $logFile ($finalBytes bytes)

--- Entry Counts ---
Background entries written (max): $bgEntries
Background entries found:         $bgFound
Foreground cycles:                $Cycles
Foreground entries written:       $fgWritten
Foreground entries found:         $fgFound
Total entries found:              $($bgFound + $fgFound)

--- Integrity ---
Terminator (---) count:     $terminatorCount (expected: $expectedTerminators)
Terminator match:           $(if ($terminatorCount -eq $expectedTerminators) { 'YES' } else { "NO (diff: $($terminatorCount - $expectedTerminators))" })
Corruption (garbled lines): $corruptionCount
Contention events:          $contentionCount

--- Missing Entries ---
Missing BG entries: $(if ($missingBg.Count -eq 0) { '(none)' } else { $missingBg -join ', ' })
Missing FG entries: $(if ($missingFg.Count -eq 0) { '(none)' } else { $missingFg -join ', ' })

--- Assessment ---
$(if ($corruptionCount -eq 0 -and $missingFg.Count -eq 0 -and $terminatorCount -eq $expectedTerminators) {
    "PASS: No corruption detected. File I/O appears safe with retry logic."
} elseif ($corruptionCount -eq 0) {
    "PARTIAL: No corruption but some entries missing. Contention caused data loss."
} else {
    "FAIL: Corruption detected ($corruptionCount garbled lines). Need file locking or separate files."
})

$(if ($contentionCount -gt 0) {
    "NOTE: $contentionCount contention events occurred. This means the foreground and background"
    "writers collided. With retries, data may survive, but in production we should consider:"
    "  1. Using separate files (listener writes response.md, /hear writes status.md)"
    "  2. Using a mutex for shared files"
    "  3. Using Add-Content (append) instead of read-modify-write where possible"
})

$(if ($missingBg.Count -gt 0) {
    "NOTE: Background entries were LOST because the foreground read-modify-write"
    "overwrites the entire file. Entries appended between the read and write are"
    "silently dropped. This is the classic lost-update problem."
})
"@

Write-Host $report -ForegroundColor Cyan
$report | Set-Content -Path $findingsFile -Encoding UTF8
Write-Host "`nFindings written to: $findingsFile" -ForegroundColor Green
Write-Host "Log preserved at: $logFile" -ForegroundColor Green
Write-Host "=== Spike Complete ===" -ForegroundColor Cyan
