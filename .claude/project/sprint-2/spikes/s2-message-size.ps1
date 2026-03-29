#Requires -Version 5.1
<#
.SYNOPSIS
    S2 Spike: Clipboard Paste Size Limits

.DESCRIPTION
    Tests how large a message can be set on the Windows clipboard without
    truncation. Generates test messages at 50KB, 80KB, 100KB, and 150KB
    using a repeating pattern string with embedded markers so truncation
    is detectable.

    By default, this is clipboard-only (no interaction with Claude Desktop).
    Pass -Send to also send the smallest test message (50KB) via
    Send-VerifiedMessage and check delivery via UIA re-read.

.PARAMETER Send
    If specified, sends the 50KB test message to Claude Desktop and verifies
    delivery. WARNING: this will focus Claude Desktop and send a real message.

.NOTES
    Run with: powershell -ExecutionPolicy Bypass -File s2-message-size.ps1
    Run with send: powershell -ExecutionPolicy Bypass -File s2-message-size.ps1 -Send

    What to look for:
    - At what size does clipboard round-trip lose data?
    - Does SetText/GetText preserve exact byte counts?
    - Is the 80KB limit in desktop.ps1 conservative or tight?
#>

param(
    [switch]$Send
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Windows.Forms

# ─── Dot-source dependencies ─────────────────────────────────────────────────
$claudeSrc = Join-Path (Split-Path (Split-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) -Parent) -Parent) ".claude\src"

. (Join-Path $claudeSrc "desktop.ps1")
. (Join-Path $claudeSrc "config.ps1")

# For -Send mode
if ($Send) {
    . (Join-Path $claudeSrc "chat.ps1")
}

# ─── Config ───────────────────────────────────────────────────────────────────
$testSizes = @(50000, 80000, 100000, 150000)  # bytes
$findingsFile = Join-Path $PSScriptRoot "s2-message-size-findings.txt"

# ─── Banner ───────────────────────────────────────────────────────────────────
$banner = @"

=== S2 Spike: Clipboard Paste Size Limits ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Test sizes: $($testSizes -join ', ') bytes
Send mode: $Send
"@

Write-Host $banner -ForegroundColor Cyan
$results = @()

# ─── Generate test message ────────────────────────────────────────────────────
# Uses a repeating pattern with line-number markers every 1KB so truncation
# point is identifiable.

function New-TestMessage([int]$targetBytes) {
    $sb = [System.Text.StringBuilder]::new($targetBytes + 1024)
    $linePattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789-abcdefghijklmnopqrstuvwxyz"
    $lineNum = 0
    while ($sb.Length -lt $targetBytes) {
        $lineNum++
        # Every ~1KB, insert a marker
        if ($lineNum % 16 -eq 0) {
            $marker = "[MARKER-$lineNum-AT-$($sb.Length)B]"
            $sb.AppendLine($marker) | Out-Null
        } else {
            $sb.AppendLine("L${lineNum}: $linePattern") | Out-Null
        }
    }
    # Trim to exact target
    $text = $sb.ToString()
    if ([System.Text.Encoding]::UTF8.GetByteCount($text) -gt $targetBytes) {
        while ([System.Text.Encoding]::UTF8.GetByteCount($text) -gt $targetBytes) {
            $text = $text.Substring(0, $text.Length - 1)
        }
    }
    # Add end marker
    $text = $text.TrimEnd() + "`n[END-MARKER]"
    return $text
}

# ─── Save and restore clipboard ──────────────────────────────────────────────
$originalClip = $null
try { $originalClip = [System.Windows.Forms.Clipboard]::GetText() } catch {}

# ─── Test each size ───────────────────────────────────────────────────────────
Write-Host "`n--- Testing clipboard round-trip at each size ---" -ForegroundColor Yellow

foreach ($size in $testSizes) {
    $sizeKB = [math]::Round($size / 1024, 1)
    Write-Host "`n  Testing ${sizeKB}KB ($size bytes)..." -ForegroundColor White

    $msg = New-TestMessage $size
    $originalBytes = [System.Text.Encoding]::UTF8.GetByteCount($msg)
    $hasEndMarker = $msg.Contains("[END-MARKER]")

    # Set clipboard
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        [System.Windows.Forms.Clipboard]::SetText($msg)
    } catch {
        Write-Host "    [FAIL] SetText threw: $_" -ForegroundColor Red
        $results += [PSCustomObject]@{
            TargetBytes    = $size
            OriginalBytes  = $originalBytes
            ClipboardBytes = 0
            Match          = $false
            EndMarker      = $false
            SetTimeMs      = 0
            GetTimeMs      = 0
            Error          = $_.Exception.Message
        }
        continue
    }
    $setMs = $sw.ElapsedMilliseconds

    Start-Sleep -Milliseconds 100

    # Read back
    $sw.Restart()
    $readBack = [System.Windows.Forms.Clipboard]::GetText()
    $getMs = $sw.ElapsedMilliseconds

    $readBytes = [System.Text.Encoding]::UTF8.GetByteCount($readBack)
    $exactMatch = ($readBack -eq $msg)
    $endMarkerPresent = $readBack.Contains("[END-MARKER]")

    $entry = [PSCustomObject]@{
        TargetBytes    = $size
        OriginalBytes  = $originalBytes
        ClipboardBytes = $readBytes
        Match          = $exactMatch
        EndMarker      = $endMarkerPresent
        SetTimeMs      = $setMs
        GetTimeMs      = $getMs
        Error          = $null
    }
    $results += $entry

    $color = if ($exactMatch) { "Green" } else { "Red" }
    $status = if ($exactMatch) { "OK" } else { "TRUNCATED" }
    Write-Host "    [$status] Set: ${originalBytes}B -> Get: ${readBytes}B (diff: $($readBytes - $originalBytes)B)" -ForegroundColor $color
    Write-Host "    End marker present: $endMarkerPresent | Set: ${setMs}ms | Get: ${getMs}ms"

    if (-not $exactMatch -and $readBytes -gt 0) {
        # Find last marker to identify truncation point
        $lastMarker = [regex]::Matches($readBack, '\[MARKER-(\d+)-AT-(\d+)B\]') |
            Select-Object -Last 1
        if ($lastMarker) {
            Write-Host "    Last marker: $($lastMarker.Value)" -ForegroundColor Yellow
        }
    }
}

# ─── Send test (optional) ────────────────────────────────────────────────────
$sendResult = $null
if ($Send) {
    Write-Host "`n--- Send Test: 50KB message via Claude Desktop ---" -ForegroundColor Yellow
    Write-Host "  WARNING: This will focus Claude Desktop and send a real message." -ForegroundColor Red

    $smallMsg = New-TestMessage 50000
    $smallMsg = "SIZE-TEST: " + $smallMsg.Substring(0, [math]::Min(49980, $smallMsg.Length))

    Write-Host "  Sending $([System.Text.Encoding]::UTF8.GetByteCount($smallMsg))B message..."

    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $result = Send-VerifiedMessage -Text $smallMsg -VerifyTimeoutMs 5000
    $sw.Stop()

    $sendResult = [PSCustomObject]@{
        Sent       = $result.sent
        Verified   = $result.verified
        Error      = $result.error
        ElapsedMs  = $sw.ElapsedMilliseconds
    }

    $color = if ($result.verified) { "Green" } elseif ($result.sent) { "Yellow" } else { "Red" }
    Write-Host "  Sent: $($result.sent) | Verified: $($result.verified) | ${sw.ElapsedMilliseconds}ms" -ForegroundColor $color
}

# ─── Restore clipboard ───────────────────────────────────────────────────────
if ($originalClip) {
    try { [System.Windows.Forms.Clipboard]::SetText($originalClip) } catch {}
}

# ─── Report ───────────────────────────────────────────────────────────────────
$report = @"

=== S2 Spike: Clipboard Paste Size Limits ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

--- Clipboard Round-Trip Results ---
$(($results | Format-Table TargetBytes, OriginalBytes, ClipboardBytes, Match, EndMarker, SetTimeMs, GetTimeMs, Error -AutoSize | Out-String).Trim())

--- Analysis ---
$(foreach ($r in $results) {
    $sizeKB = [math]::Round($r.TargetBytes / 1024, 1)
    if ($r.Error) {
        "  ${sizeKB}KB: FAILED ($($r.Error))"
    } elseif ($r.Match) {
        "  ${sizeKB}KB: PASS (exact round-trip, set=${r.SetTimeMs}ms get=${r.GetTimeMs}ms)"
    } else {
        "  ${sizeKB}KB: TRUNCATED (lost $($r.OriginalBytes - $r.ClipboardBytes) bytes)"
    }
})

$(if ($sendResult) {
@"
--- Send Verification ---
Sent: $($sendResult.Sent) | Verified: $($sendResult.Verified) | Elapsed: $($sendResult.ElapsedMs)ms
Error: $(if ($sendResult.Error) { $sendResult.Error } else { '(none)' })
"@
})

--- Desktop.ps1 MaxMessageBytes ---
Current limit: $($script:MaxMessageBytes) bytes ($([math]::Round($script:MaxMessageBytes / 1024, 1))KB)
$(
    $allPassed = ($results | Where-Object { $_.Match }).Count -eq $results.Count
    $maxPassedSize = ($results | Where-Object { $_.Match } | Measure-Object -Property TargetBytes -Maximum).Maximum
    if ($allPassed) {
        "All sizes passed clipboard round-trip. Limit may be overly conservative."
    } elseif ($maxPassedSize -ge $script:MaxMessageBytes) {
        "Current limit ($($script:MaxMessageBytes)B) is within the safe zone (max passed: ${maxPassedSize}B)."
    } else {
        "WARNING: Current limit ($($script:MaxMessageBytes)B) exceeds max reliable size (${maxPassedSize}B)!"
    }
)
"@

Write-Host $report -ForegroundColor Cyan
$report | Set-Content -Path $findingsFile -Encoding UTF8
Write-Host "`nFindings written to: $findingsFile" -ForegroundColor Green
Write-Host "=== Spike Complete ===" -ForegroundColor Cyan
