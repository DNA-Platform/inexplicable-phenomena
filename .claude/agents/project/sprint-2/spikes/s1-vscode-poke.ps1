#Requires -Version 5.1
<#
.SYNOPSIS
    S1 Spike: VS Code Poke Reliability Test

.DESCRIPTION
    Tests how reliably Send-ClaudeCodeCommand can deliver a command to the
    VS Code integrated terminal. Sends a harmless "echo poke-test-{n}" command
    10 times with 3s delays. Reports success/failure count and timing.

    Also checks whether VS Code is minimized at the start and notes it.

    Does NOT invoke /hear or any real command — purely observational.

.NOTES
    Run with: powershell -ExecutionPolicy Bypass -File s1-vscode-poke.ps1

    What to look for:
    - Are any attempts failing? Which ones?
    - Does timing vary? Are there slow outliers?
    - Does minimized state affect reliability?
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Resolve and dot-source dependencies ─────────────────────────────────────
$claudeSrc = Join-Path $PSScriptRoot "..\..\..\..\..\.claude\src"
# Normalize — we may be nested differently, so resolve from script root
$claudeSrc = Join-Path (Split-Path (Split-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) -Parent) -Parent) ".claude\src"

. (Join-Path $claudeSrc "desktop.ps1")
. (Join-Path $claudeSrc "vscode.ps1")

# ─── Config ───────────────────────────────────────────────────────────────────
$iterations = 10
$delaySeconds = 3
$findingsFile = Join-Path $PSScriptRoot "s1-vscode-poke-findings.txt"

# ─── Banner ───────────────────────────────────────────────────────────────────
$banner = @"

=== S1 Spike: VS Code Poke Reliability ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Iterations: $iterations
Delay between attempts: ${delaySeconds}s
"@

Write-Host $banner -ForegroundColor Cyan
$results = @()

# ─── Check initial VS Code state ─────────────────────────────────────────────
$vsHwnd = Find-VSCodeWindow
if (-not $vsHwnd) {
    $msg = "[FAIL] VS Code not found. Is it running with this project open?"
    Write-Host $msg -ForegroundColor Red
    $banner + "`n$msg" | Set-Content -Path $findingsFile -Encoding UTF8
    exit 1
}

$isMinimized = [WinNative]::IsIconic($vsHwnd)
$stateMsg = if ($isMinimized) { "MINIMIZED" } else { "VISIBLE" }
Write-Host "VS Code state: $stateMsg (hwnd=$vsHwnd)" -ForegroundColor Yellow

# ─── Run test iterations ─────────────────────────────────────────────────────
Write-Host "`n--- Running $iterations poke attempts ---" -ForegroundColor Yellow

for ($i = 1; $i -le $iterations; $i++) {
    $command = "echo poke-test-$i"
    $sw = [System.Diagnostics.Stopwatch]::StartNew()

    $success = $false
    $errDetail = $null
    try {
        $success = Send-ClaudeCodeCommand -Command $command -MaxRetries 2
    } catch {
        $errDetail = $_.Exception.Message
    }

    $sw.Stop()
    $elapsed = $sw.ElapsedMilliseconds

    $entry = [PSCustomObject]@{
        Attempt   = $i
        Command   = $command
        Success   = $success
        ElapsedMs = $elapsed
        Error     = $errDetail
    }
    $results += $entry

    $color = if ($success) { "Green" } else { "Red" }
    $status = if ($success) { "OK" } else { "FAIL" }
    $errMsg = if ($errDetail) { " ($errDetail)" } else { "" }
    Write-Host "  [$status] Attempt ${i}: ${elapsed}ms$errMsg" -ForegroundColor $color

    if ($i -lt $iterations) {
        Start-Sleep -Seconds $delaySeconds
    }
}

# ─── Compute stats ────────────────────────────────────────────────────────────
$successes = @($results | Where-Object { $_.Success }).Count
$failures = @($results | Where-Object { -not $_.Success }).Count
$timings = $results | ForEach-Object { $_.ElapsedMs }
$avgMs = [math]::Round(($timings | Measure-Object -Average).Average, 1)
$minMs = ($timings | Measure-Object -Minimum).Minimum
$maxMs = ($timings | Measure-Object -Maximum).Maximum

$failedAttempts = @($results | Where-Object { -not $_.Success } | ForEach-Object { $_.Attempt }) -join ', '
if (-not $failedAttempts) { $failedAttempts = "(none)" }

# ─── Report ───────────────────────────────────────────────────────────────────
$report = @"

=== S1 Spike: VS Code Poke Reliability ===
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
VS Code initial state: $stateMsg

--- Results ---
Iterations:      $iterations
Successes:       $successes
Failures:        $failures
Success rate:    $([math]::Round($successes / $iterations * 100, 1))%
Failed attempts: $failedAttempts

--- Timing ---
Average: ${avgMs}ms
Min:     ${minMs}ms
Max:     ${maxMs}ms

--- Per-Attempt Detail ---
$($results | ForEach-Object { "  Attempt $($_.Attempt): $( if ($_.Success) { 'OK' } else { 'FAIL' } ) $($_.ElapsedMs)ms $( if ($_.Error) { "Error: $($_.Error)" } )" } | Out-String)
--- Raw Data ---
$(($results | Format-Table -AutoSize | Out-String).Trim())

--- Assessment ---
$(if ($failures -eq 0) {
    "All $iterations pokes succeeded. Send-ClaudeCodeCommand is reliable in this session."
} elseif ($failures -le 2) {
    "Minor failures ($failures/$iterations). Check if another window stole focus during those attempts."
} else {
    "Significant failures ($failures/$iterations). VS Code poke mechanism needs investigation."
})
"@

Write-Host $report -ForegroundColor Cyan
$report | Set-Content -Path $findingsFile -Encoding UTF8
Write-Host "`nFindings written to: $findingsFile" -ForegroundColor Green
Write-Host "=== Spike Complete ===" -ForegroundColor Cyan
