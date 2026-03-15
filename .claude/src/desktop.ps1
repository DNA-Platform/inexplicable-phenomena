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
    public const uint MOUSEEVENTF_LEFTDOWN = 0x02;
    public const uint MOUSEEVENTF_LEFTUP = 0x04;
    public const int SW_RESTORE = 9;
    public const int SW_MINIMIZE = 6;
    [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@
}

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

    [Microsoft.VisualBasic.Interaction]::AppActivate("Claude")
    Start-Sleep -Milliseconds 500

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

# ─── Send a message (click input, paste, Enter) ─────────────────────────────

function Send-ChatMessage($hwnd, $text) {
    Click-ChatInput $hwnd
    Type-ViaClipboard $text
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 200
}

# ─── Copy visible response text via Ctrl+A / Ctrl+C ─────────────────────────
# This is a best-effort approach — grabs whatever is on screen.

function Copy-ChatContent($hwnd) {
    Focus-ClaudeWindow $hwnd | Out-Null
    Start-Sleep -Milliseconds 300

    # Click in the message area (above the input, middle of window)
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

    # Select all and copy
    [System.Windows.Forms.SendKeys]::SendWait("^a")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("^c")
    Start-Sleep -Milliseconds 300

    # Click away to deselect
    [System.Windows.Forms.SendKeys]::SendWait("{ESCAPE}")
    Start-Sleep -Milliseconds 200

    $text = [System.Windows.Forms.Clipboard]::GetText()
    return $text
}
