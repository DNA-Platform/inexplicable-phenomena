# vscode.ps1
# VS Code automation for poking Claude Code's terminal.
# Finds VS Code, focuses the integrated terminal, and types a command.
# Used by the listener to wake up Claude Code when Eirian responds.
#
# Requires desktop.ps1 to be dot-sourced first (for WinNative, assemblies).
#
# Usage:
#   . "$PSScriptRoot/desktop.ps1"
#   . "$PSScriptRoot/vscode.ps1"
#   Send-ClaudeCodeCommand "/hear"

# ─── Find VS Code window ────────────────────────────────────────────────────

function Find-VSCodeWindow {
    $procs = Get-Process -Name "Code" -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle } |
        Sort-Object -Property MainWindowHandle -Descending

    if (-not $procs) {
        return $null
    }

    # Prefer the window whose title contains our project name
    foreach ($p in $procs) {
        if ($p.MainWindowTitle -match 'inexplicable-phenomena') {
            return $p.MainWindowHandle
        }
    }

    # Fallback: first VS Code window
    return $procs[0].MainWindowHandle
}

# ─── Test if VS Code is reachable ───────────────────────────────────────────

function Test-VSCodeReachable {
    $hwnd = Find-VSCodeWindow
    if (-not $hwnd) { return $false }

    # Check the window still exists and is not destroyed
    $rect = New-Object WinNative+RECT
    $valid = [WinNative]::GetWindowRect($hwnd, [ref]$rect)
    return $valid
}

# ─── Focus VS Code and its integrated terminal ──────────────────────────────

function Focus-VSCodeTerminal {
    $hwnd = Find-VSCodeWindow
    if (-not $hwnd) { return $null }

    $wasMinimized = [WinNative]::IsIconic($hwnd)
    if ($wasMinimized) {
        [WinNative]::ShowWindow($hwnd, [WinNative]::SW_RESTORE) | Out-Null
        Start-Sleep -Milliseconds 500
    }

    [WinNative]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 500

    # Ctrl+` focuses the integrated terminal panel in VS Code
    [System.Windows.Forms.SendKeys]::SendWait("^``")
    Start-Sleep -Milliseconds 300

    return @{ hwnd = $hwnd; wasMinimized = $wasMinimized }
}

# ─── Send a command to the Claude Code terminal ─────────────────────────────
# Focuses VS Code terminal, presses ESC to clear partial input, types command.
# Retries up to $MaxRetries times if focus fails.

function Send-ClaudeCodeCommand {
    param(
        [Parameter(Mandatory)][string]$Command,
        [int]$MaxRetries = 2
    )

    $attempt = 0
    while ($attempt -le $MaxRetries) {
        $attempt++

        # Check reachability first
        if (-not (Test-VSCodeReachable)) {
            if ($attempt -le $MaxRetries) {
                Write-Host "[vscode] VS Code not reachable, retry $attempt/$MaxRetries..."
                Start-Sleep -Seconds 1
                continue
            }
            Write-Error "VS Code not reachable after $MaxRetries retries"
            return $false
        }

        $state = Focus-VSCodeTerminal
        if (-not $state) {
            if ($attempt -le $MaxRetries) {
                Write-Host "[vscode] Could not focus terminal, retry $attempt/$MaxRetries..."
                Start-Sleep -Seconds 1
                continue
            }
            Write-Error "Could not focus VS Code terminal after $MaxRetries retries"
            return $false
        }

        # Verify we actually got foreground
        Start-Sleep -Milliseconds 200
        $fg = [WinNative]::GetForegroundWindow()
        if ($fg -ne $state.hwnd) {
            if ($attempt -le $MaxRetries) {
                Write-Host "[vscode] Failed to gain foreground, retry $attempt/$MaxRetries..."
                Start-Sleep -Seconds 1
                continue
            }
            Write-Error "Could not gain VS Code foreground after $MaxRetries retries"
            return $false
        }

        # ESC to clear any partial input or dismiss autocomplete
        [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
        Start-Sleep -Milliseconds 200

        # Type the command via clipboard to handle special characters
        $oldClip = $null
        try { $oldClip = [System.Windows.Forms.Clipboard]::GetText() } catch {}

        [System.Windows.Forms.Clipboard]::SetText($Command)
        Start-Sleep -Milliseconds 200
        [System.Windows.Forms.SendKeys]::SendWait("^v")   # Ctrl+V
        Start-Sleep -Milliseconds 200
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
        Start-Sleep -Milliseconds 200

        # Restore clipboard
        if ($oldClip) {
            try { [System.Windows.Forms.Clipboard]::SetText($oldClip) } catch {}
        }

        return $true
    }

    return $false
}
