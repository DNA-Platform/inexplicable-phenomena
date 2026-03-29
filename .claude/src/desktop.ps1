# desktop.ps1
# Generic Claude Desktop automation via Windows UI.
# Provides functions for finding, focusing, clicking, typing, and screenshotting
# the Claude Desktop app. Identity-agnostic — meant to be dot-sourced by
# identity-specific relay scripts.
#
# Usage (from an identity relay):
#   . "$PSScriptRoot/../../.claude/src/desktop.ps1"
#   $hwnd = Find-ClaudeWindow
#   Focus-ClaudeWindow $hwnd
#   Send-ChatMessage $hwnd "your message"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName Microsoft.VisualBasic
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes

# Only define WinNative once per session
if (-not ([System.Management.Automation.PSTypeName]'WinNative').Type) {
    Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinNative {
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
    [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, int dwExtraInfo);
    [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
    public const uint MOUSEEVENTF_LEFTDOWN = 0x02;
    public const uint MOUSEEVENTF_LEFTUP = 0x04;
    public const int SW_RESTORE = 9;
    public const int SW_MINIMIZE = 6;
    [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@
}

# HWND_BOTTOM — place window behind all others
$script:HWND_BOTTOM = [IntPtr]::new(1)

# ─── Find Claude Desktop window ─────────────────────────────────────────────

function Find-ClaudeWindow {
    $procs = Get-Process -Name "claude" -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowTitle -eq "Claude" -and $_.MainWindowHandle -ne 0 }

    if (-not $procs) {
        Write-Error "Claude Desktop not found. Is it running?"
        return $null
    }

    return $procs[0].MainWindowHandle
}

# ─── Focus / restore / minimize ─────────────────────────────────────────────

function Focus-ClaudeWindow($hwnd) {
    $wasMinimized = [WinNative]::IsIconic($hwnd)

    if ($wasMinimized) {
        [WinNative]::ShowWindow($hwnd, [WinNative]::SW_RESTORE) | Out-Null
        Start-Sleep -Milliseconds 500
    }

    # Try up to 3 times to gain foreground
    for ($attempt = 0; $attempt -lt 3; $attempt++) {
        [Microsoft.VisualBasic.Interaction]::AppActivate("Claude")
        Start-Sleep -Milliseconds 500

        # Verify we actually got foreground
        if ([WinNative]::GetForegroundWindow() -eq $hwnd) {
            return $wasMinimized
        }
        Start-Sleep -Milliseconds 300
    }

    # Failed to gain focus — return but warn
    Write-Warning "Focus-ClaudeWindow: failed to gain foreground after 3 attempts"
    return $wasMinimized
}

function Minimize-ClaudeWindow($hwnd) {
    [WinNative]::ShowWindow($hwnd, [WinNative]::SW_MINIMIZE) | Out-Null
}

# ─── Get window rectangle ───────────────────────────────────────────────────

function Get-ClaudeWindowRect($hwnd) {
    $rect = New-Object WinNative+RECT
    [WinNative]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
    return $rect
}

# ─── Screenshot (of Claude window only) ─────────────────────────────────────

function Take-ClaudeScreenshot($hwnd, $outPath) {
    Focus-ClaudeWindow $hwnd | Out-Null
    Start-Sleep -Milliseconds 500

    $rect = Get-ClaudeWindowRect $hwnd
    $w = $rect.Right - $rect.Left
    $h = $rect.Bottom - $rect.Top

    $dir = Split-Path $outPath -Parent
    if ($dir) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($rect.Left, $rect.Top, 0, 0, (New-Object System.Drawing.Size($w, $h)))
    $bmp.Save($outPath)
    $g.Dispose()
    $bmp.Dispose()

    return $outPath
}

# ─── Click on chat input ────────────────────────────────────────────────────

function Click-ChatInput($hwnd) {
    $rect = Get-ClaudeWindowRect $hwnd
    $w = $rect.Right - $rect.Left

    # Chat input is near bottom center of the window
    $clickX = $rect.Left + [int]($w * 0.5)
    $clickY = $rect.Bottom - 50

    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($clickX, $clickY)
    Start-Sleep -Milliseconds 200
    [WinNative]::mouse_event([WinNative]::MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
    [WinNative]::mouse_event([WinNative]::MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)
    Start-Sleep -Milliseconds 300
}

# ─── Type text via clipboard (handles special chars safely) ─────────────────

function Type-ViaClipboard($text) {
    $oldClip = $null
    try { $oldClip = [System.Windows.Forms.Clipboard]::GetText() } catch {}

    [System.Windows.Forms.Clipboard]::SetText($text)
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("^v")   # Ctrl+V
    Start-Sleep -Milliseconds 300

    # Restore clipboard
    if ($oldClip) {
        try { [System.Windows.Forms.Clipboard]::SetText($oldClip) } catch {}
    }
}

# ─── Message size limits ─────────────────────────────────────────────────────
# Claude Desktop's chat input accepts clipboard paste up to ~100KB reliably.
# Beyond that, Electron/Chromium may truncate or hang. We use a conservative
# limit and warn callers.

$script:MaxMessageBytes = 80000   # ~80KB safe limit

function Test-MessageSize($text) {
    $bytes = [System.Text.Encoding]::UTF8.GetByteCount($text)
    if ($bytes -gt $script:MaxMessageBytes) {
        return @{
            ok       = $false
            bytes    = $bytes
            limit    = $script:MaxMessageBytes
            message  = "Message too large: $bytes bytes (limit: $($script:MaxMessageBytes)). Truncation likely."
        }
    }
    return @{ ok = $true; bytes = $bytes; limit = $script:MaxMessageBytes }
}

# ─── Send a message (click input, paste, Enter) ─────────────────────────────

function Send-ChatMessage($hwnd, $text) {
    # Validate message size
    $sizeCheck = Test-MessageSize $text
    if (-not $sizeCheck.ok) {
        Write-Warning $sizeCheck.message
    }

    Click-ChatInput $hwnd
    Type-ViaClipboard $text
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 200
}

# ─── Read chat content via UIA (no focus steal) ─────────────────────────────
# Reads conversation text from Claude Desktop's accessibility tree.
# Does NOT focus, activate, or interact with the window in any way.
# The window must exist (taskbar or behind other windows — not tray-hidden).
#
# Returns a hashtable: @{ text; url; userHasFocus; wasMinimized }
# Or $null on failure. Caller can check .url to verify the right chat is open.

function Read-ChatContentUIA {
    param(
        # If true, skip reading when the window is minimized instead of doing
        # the restore-behind-all-windows trick. Returns a "minimized" signal
        # so the caller can decide what to do (e.g., idle and wait).
        [switch]$SkipIfMinimized
    )

    $uia = [System.Windows.Automation.AutomationElement]

    # Find Claude window by process
    $proc = Get-Process -Name 'claude' -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

    if (-not $proc) {
        Write-Error "Claude Desktop not found or minimized to tray."
        return $null
    }

    $hwnd = $proc.MainWindowHandle
    $wasMinimized = [WinNative]::IsIconic($hwnd)
    $userHasFocus = ([WinNative]::GetForegroundWindow() -eq $hwnd)

    # If caller wants non-intrusive behavior, don't touch minimized windows.
    # Chromium suspends its renderer when minimized so UIA would be empty anyway.
    # Return a signal so the caller can idle instead of burning cycles.
    if ($wasMinimized -and $SkipIfMinimized) {
        return @{
            text         = $null
            url          = $null
            userHasFocus = $false
            wasMinimized = $true
            skippedMinimized = $true
        }
    }

    # Chromium suspends its renderer when minimized, so the UIA tree is empty.
    # If minimized (and caller didn't pass -SkipIfMinimized), restore behind
    # all other windows (HWND_BOTTOM) so the renderer activates but the user
    # never sees it. Then re-minimize after reading.
    if ($wasMinimized) {
        # SW_SHOWNOACTIVATE (4) restores without activating
        [WinNative]::ShowWindow($hwnd, 4) | Out-Null
        Start-Sleep -Milliseconds 100
        # Place behind all windows: SWP_NOMOVE=2 | SWP_NOSIZE=1 | SWP_NOACTIVATE=0x10
        [WinNative]::SetWindowPos($hwnd, $script:HWND_BOTTOM, 0, 0, 0, 0, 0x0013) | Out-Null
        Start-Sleep -Seconds 1
    }

    $window = $null
    try {
        $window = $uia::FromHandle($hwnd)
    } catch {
        if ($wasMinimized) { [WinNative]::ShowWindow($hwnd, [WinNative]::SW_MINIMIZE) | Out-Null }
        Write-Error "Could not get UIA element for Claude window: $_"
        return $null
    }

    # Find the main Document element (RootWebArea named "Claude")
    $docCondition = New-Object System.Windows.Automation.AndCondition(
        (New-Object System.Windows.Automation.PropertyCondition(
            $uia::ControlTypeProperty,
            [System.Windows.Automation.ControlType]::Document
        )),
        (New-Object System.Windows.Automation.PropertyCondition(
            $uia::AutomationIdProperty,
            'RootWebArea'
        ))
    )

    $documents = $window.FindAll(
        [System.Windows.Automation.TreeScope]::Descendants,
        $docCondition
    )

    # Pick the conversation document (contains "Claude" in name, or the last one)
    $mainDoc = $null
    foreach ($doc in $documents) {
        if ($doc.Current.Name -match 'Claude') {
            $mainDoc = $doc
            break
        }
    }
    if (-not $mainDoc -and $documents.Count -gt 0) {
        $mainDoc = $documents[$documents.Count - 1]
    }

    if (-not $mainDoc) {
        if ($wasMinimized) { [WinNative]::ShowWindow($hwnd, [WinNative]::SW_MINIMIZE) | Out-Null }
        Write-Error "Could not find conversation document in UIA tree."
        return $null
    }

    # Read current URL via ValuePattern (Document exposes page URL)
    $url = $null
    $vp = $null
    if ($mainDoc.TryGetCurrentPattern(
        [System.Windows.Automation.ValuePattern]::Pattern, [ref]$vp)) {
        $url = $vp.Current.Value
    }

    # Read text via TextPattern
    $text = $null
    $tp = $null
    if ($mainDoc.TryGetCurrentPattern(
        [System.Windows.Automation.TextPattern]::Pattern, [ref]$tp)) {
        $text = $tp.DocumentRange.GetText(-1)
    }

    # Re-minimize if it was minimized before
    if ($wasMinimized) {
        [WinNative]::ShowWindow($hwnd, [WinNative]::SW_MINIMIZE) | Out-Null
    }

    if ($text) {
        return @{
            text         = $text
            url          = $url
            userHasFocus = $userHasFocus
            wasMinimized = $wasMinimized
        }
    }

    Write-Error "TextPattern not available on conversation document."
    return $null
}

# ─── Navigate Claude Desktop to a specific chat URL ─────────────────────────
# DEPRECATED: Start-Process opens the URL in the default browser, not Claude
# Desktop. Claude Desktop does not register as a URL handler for claude.ai.
# This function never worked as intended. Do not use.
#
# The correct approach: the listener idles when the wrong chat is open and
# resumes when the user navigates to the correct chat themselves.

function Navigate-ClaudeToChat($chatUrl) {
    Write-Warning "Navigate-ClaudeToChat is deprecated — it opens the browser, not Claude Desktop."
    return $false
}

# ─── Legacy: Copy visible response text via Ctrl+A / Ctrl+C ─────────────────
# DEPRECATED: Steals focus. Use Read-ChatContentUIA instead.
# Kept for fallback if UIA is unavailable.

function Copy-ChatContent($hwnd) {
    Focus-ClaudeWindow $hwnd | Out-Null
    Start-Sleep -Milliseconds 300

    $rect = Get-ClaudeWindowRect $hwnd
    $w = $rect.Right - $rect.Left
    $h = $rect.Bottom - $rect.Top
    $clickX = $rect.Left + [int]($w * 0.5)
    $clickY = $rect.Top + [int]($h * 0.5)

    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($clickX, $clickY)
    Start-Sleep -Milliseconds 200
    [WinNative]::mouse_event([WinNative]::MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
    [WinNative]::mouse_event([WinNative]::MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)
    Start-Sleep -Milliseconds 200

    [System.Windows.Forms.SendKeys]::SendWait("^a")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("^c")
    Start-Sleep -Milliseconds 300

    [System.Windows.Forms.SendKeys]::SendWait("{ESCAPE}")
    Start-Sleep -Milliseconds 200

    $text = [System.Windows.Forms.Clipboard]::GetText()
    return $text
}
