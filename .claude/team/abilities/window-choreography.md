# Window Choreography

**Used by:** Tap (primary), Pace (understands window state for restart decisions)

Managing window state across operations: save state, do work, restore state. The user should never notice that automation touched their windows.

## The state to track

Before any operation that touches a window:

```powershell
$wasMinimized  = [WinNative]::IsIconic($hwnd)
$wasForeground = ([WinNative]::GetForegroundWindow() -eq $hwnd)
```

After the operation, restore:

```powershell
if ($wasMinimized) {
    [WinNative]::ShowWindow($hwnd, 6)  # SW_MINIMIZE
} elseif (-not $wasForeground) {
    # Was behind other windows — push it back
    [WinNative]::SetWindowPos($hwnd, [IntPtr]::new(1), 0, 0, 0, 0, 0x0013)
    # Try to re-activate whatever was foreground before
}
```

## Focus operations and their costs

| Operation | Steals focus? | Flickers? | Notes |
|-----------|--------------|-----------|-------|
| `Read-ChatContentUIA` | No | No (HWND_BOTTOM) | Safe for polling |
| `Find-ClaudeWindow` | No | No | Just process enumeration |
| `Focus-ClaudeWindow` | **Yes** | **Yes** | Required for sending |
| `Send-ChatMessage` | **Yes** | **Yes** | Click + paste + Enter |
| `Navigate-ClaudeToChat` | **Yes** | **Yes** | Opens URL via OS |
| `Take-ClaudeScreenshot` | **Yes** | **Yes** | Needs visible window |
| `Focus-VSCodeTerminal` | **Yes** | **Yes** | Ctrl+` for terminal |

## Window not found

Claude Desktop runs as ~11 processes. Only the main browser process has a `MainWindowHandle`. Filter by:
- Process name: `claude`
- Has `MainWindowHandle != 0`
- `MainWindowTitle` equals `"Claude"`

If no match: window is either tray-hidden (Electron destroyed BrowserWindow) or Claude isn't running. No automation is possible in either case.

VS Code runs as `Code`. Filter by `MainWindowHandle != 0` and non-empty `MainWindowTitle`. Prefer the window whose title contains the project name.

## Timing

Every window state transition needs a sleep. The OS and the application need time to process:

| Transition | Minimum sleep |
|-----------|--------------|
| Restore from minimized | 500ms |
| AppActivate (focus) | 500ms |
| HWND_BOTTOM restore (renderer wake) | 1000ms |
| After click | 200-300ms |
| After paste (Ctrl+V) | 200-300ms |
| After SendKeys | 200ms |

These are empirical. Shorter times cause dropped inputs on slower machines.

## What to verify when using this ability

- [ ] Always save window state before touching it
- [ ] Always restore window state after (especially minimize)
- [ ] Never focus a window the user is actively using (check `userHasFocus`)
- [ ] Include timing sleeps after every state transition
- [ ] Handle the case where the window disappears mid-operation
