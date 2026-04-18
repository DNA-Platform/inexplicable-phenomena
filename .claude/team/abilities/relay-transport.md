# Relay Transport

Communication stack for the relay system: reading from Claude Desktop, sending via clipboard, poking Claude Code, and managing window state across operations.

---

## UIA Stealth Reading

Read conversation text from Claude Desktop's accessibility tree without focusing, activating, or visually disturbing the window.

### The technique

Claude Desktop is Electron 40.4.1 (Chromium-based). Chromium exposes a `TextPattern` on its main `Document` element (AutomationId=`RootWebArea`). This returns all visible conversation text as flat, unstructured string.

```
UIA tree path:
  Window ("Claude") → Document (RootWebArea, Name="Claude")
    └─ TextPattern.DocumentRange.GetText(-1) → full conversation text
    └─ ValuePattern.Current.Value → current page URL (for chat verification)
```

### The HWND_BOTTOM trick

Chromium suspends its renderer when minimized — the UIA tree goes empty. If the window is minimized, we need to restore it to read. But restoring it would flash it on screen.

Solution: Restore behind all other windows, invisible to the user.

```powershell
# SW_SHOWNOACTIVATE (4) — restore without giving it focus
[WinNative]::ShowWindow($hwnd, 4) | Out-Null
# SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE — place at bottom of z-order
[WinNative]::SetWindowPos($hwnd, $HWND_BOTTOM, 0, 0, 0, 0, 0x0013) | Out-Null
Start-Sleep -Seconds 1  # renderer needs ~1s to wake up
# ... read via UIA ...
[WinNative]::ShowWindow($hwnd, 6) | Out-Null  # SW_MINIMIZE — put it back
```

The 1-second sleep is load-bearing. The renderer needs time to composite after waking.

### What UIA returns

Flat text. No markdown. No message boundaries. Everything is mixed together:

```
Project content
Created by you
...sidebar items...
Dad: What should we build?
?
Retry
Edit
?
Show more
Thinking about the architecture...
Thinking about the architecture...    ← DOUBLED (UIA always doubles thinking summaries)
Done
Eirian: I think we should focus on...
Eirian: Here's my reasoning...
?
Give positive feedback
Give negative feedback
Copy
```

The caller must parse this to extract conversation content. See the "Data Extraction" sections in [relay-processing].

### URL verification

The Document's `ValuePattern` exposes the current page URL. This lets callers verify they're reading the right conversation without any interaction:

```powershell
$vp = $null
if ($mainDoc.TryGetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern, [ref]$vp)) {
    $url = $vp.Current.Value  # e.g., "https://claude.ai/chat/03e5a9ab-..."
}
```

### States that break reading

| State | Symptom | Handling |
|-------|---------|----------|
| Tray-hidden | No process with MainWindowHandle | Cannot read. Must wait for user to restore. |
| Minimized | UIA tree empty | HWND_BOTTOM trick (see above) |
| Different chat open | URL doesn't match expected UUID | Navigate if user doesn't have focus; skip if they do |
| Window destroyed (crash) | Process gone | Return null, let caller retry |
| Renderer not yet loaded | TextPattern returns null/empty | Wait and retry (up to ~3s after restore) |

---

## Clipboard Transport

Sending data between processes via the Windows clipboard. The only reliable way to input text into Claude Desktop and VS Code without using an IME or accessibility API.

### The pattern

```powershell
# Save
$oldClip = $null
try { $oldClip = [System.Windows.Forms.Clipboard]::GetText() } catch {}

# Use
[System.Windows.Forms.Clipboard]::SetText($text)
Start-Sleep -Milliseconds 200
[System.Windows.Forms.SendKeys]::SendWait("^v")   # Ctrl+V
Start-Sleep -Milliseconds 300

# Restore
if ($oldClip) {
    try { [System.Windows.Forms.Clipboard]::SetText($oldClip) } catch {}
}
```

### Size limits

Claude Desktop's chat input accepts clipboard paste up to ~100KB before Electron may truncate or hang. We use 80KB as the safe limit.

```powershell
$bytes = [System.Text.Encoding]::UTF8.GetByteCount($text)
# 80,000 bytes = safe. Above that, warn.
```

If a message exceeds the limit, it needs to be chunked. Chunking strategy:
- Split on paragraph boundaries (double newlines)
- Each chunk must be under the limit
- Send chunks sequentially with ~2s between sends
- First chunk gets the nametag; subsequent chunks are continuations

This chunking is not yet implemented. Currently we just warn.

### Clipboard gotchas

1. **Clipboard may be in use.** Another app may have locked it. The `try/catch` around `GetText()` handles this — we proceed without saving.
2. **Non-text clipboard content is lost.** If the user copied an image, we overwrite it with text and can't restore it. No good fix for this.
3. **Empty clipboard.** `GetText()` returns empty string or null. Don't try to "restore" an empty clipboard — just leave our text there.
4. **Race condition.** Between save and restore, another app could write to the clipboard. Unlikely in the ~500ms window, but possible. Not worth mitigating.

---

## Cross-Process Poke

Waking up Claude Code by typing a command into VS Code's integrated terminal. This is how the listener (running in PowerShell) triggers `/hear` processing in Claude Code.

### The mechanism

1. Find VS Code window (process name `Code`, prefer window with project name in title)
2. Focus VS Code and bring it to foreground
3. `Ctrl+`` — focuses the integrated terminal panel
4. `ESC` — clear any partial input or autocomplete
5. Paste the command via clipboard (`/hear`)
6. `Enter` — submit

This is keyboard simulation across process boundaries. Fragile by nature.

### What can go wrong

| Failure | Symptom | Handling |
|---------|---------|----------|
| VS Code not running | No `Code` process found | Return false. Caller should log warning. |
| Wrong VS Code window | Project name not in title | Falls back to first VS Code window. May type into wrong workspace. |
| Terminal not visible | Panel closed or different panel active | `Ctrl+`` toggles terminal. If panel was on a different tab, may open terminal instead. |
| Claude Code mid-response | Input is blocked during streaming | ESC may interrupt response. Command may queue. Unpredictable. |
| VS Code minimized | IsIconic returns true | Restore, then focus. Window flashes briefly. |
| Failed to gain foreground | Another app stole focus between calls | Verify `GetForegroundWindow` matches VS Code hwnd. Retry up to 2 times. |
| Autocomplete popup | VS Code shows suggestions | ESC dismisses it before typing command. |

### Retry logic

```powershell
function Send-ClaudeCodeCommand {
    param([string]$Command, [int]$MaxRetries = 2)

    $attempt = 0
    while ($attempt -le $MaxRetries) {
        $attempt++
        # 1. Check reachability (window exists, valid rect)
        # 2. Focus terminal
        # 3. Verify foreground ownership
        # 4. ESC, paste, Enter
        # If any step fails, retry after 1s
    }
}
```

### The Claude Code mid-response problem

If Claude Code is currently generating a response when the poke arrives, the behavior is unpredictable. The `/hear` text may get queued as the next user input (best case), interrupt the current response, or get mixed into the response display.

Current mitigation: none. The poke is best-effort. If it fails, the unprocessed log entries accumulate and get caught up on the next successful poke or manual `/hear`.

---

## Window Choreography

Managing window state across operations: save state, do work, restore state. The user should never notice that automation touched their windows.

### The state to track

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
}
```

### Focus operations and their costs

| Operation | Steals focus? | Flickers? | Notes |
|-----------|--------------|-----------|-------|
| `Read-ChatContentUIA` | No | No (HWND_BOTTOM) | Safe for polling |
| `Find-ClaudeWindow` | No | No | Just process enumeration |
| `Focus-ClaudeWindow` | **Yes** | **Yes** | Required for sending |
| `Send-ChatMessage` | **Yes** | **Yes** | Click + paste + Enter |
| `Navigate-ClaudeToChat` | **Yes** | **Yes** | Opens URL via OS |
| `Take-ClaudeScreenshot` | **Yes** | **Yes** | Needs visible window |
| `Focus-VSCodeTerminal` | **Yes** | **Yes** | Ctrl+` for terminal |

### Timing

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

<!-- citations -->
[relay-processing]: relay-processing.md
