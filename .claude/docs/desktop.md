# Claude Desktop Automation

`.claude/src/desktop.ps1` provides generic Windows UI automation for the
Claude Desktop app (Electron). It is identity-agnostic and meant to be
dot-sourced by identity-specific scripts.

## How it works

Claude Desktop is an Electron 40.4.1 app (MSIX packaged). Two techniques:

**Reading (non-destructive):** Uses Windows UI Automation (UIA) to read the
accessibility tree. Chromium exposes a `TextPattern` on the main `Document`
element (AutomationId=`RootWebArea`, Name=`Claude`). This returns all visible
conversation text without focusing, activating, or touching the window.
Requires the window to exist (taskbar or behind other windows — not tray-hidden).

**Sending (requires brief focus):** Uses the old-fashioned way — find the window,
focus it, click coordinates, paste via clipboard, press Enter. Sending still
steals focus briefly, but reading does not.

## Available functions

### Window management

| Function | Description |
|---|---|
| `Find-ClaudeWindow` | Returns the window handle (hwnd) of Claude Desktop. Finds it by process name + window title "Claude". Returns `$null` if not found. |
| `Focus-ClaudeWindow $hwnd` | Restores if minimized, brings to foreground via AppActivate. Returns `$true` if it was minimized before. |
| `Minimize-ClaudeWindow $hwnd` | Minimizes the window. |
| `Get-ClaudeWindowRect $hwnd` | Returns a RECT struct with Left, Top, Right, Bottom pixel coordinates. |

### Input

| Function | Description |
|---|---|
| `Click-ChatInput $hwnd` | Clicks the chat input area (bottom center of the window, 50px from bottom edge). |
| `Type-ViaClipboard $text` | Saves clipboard, sets text, pastes with Ctrl+V, restores clipboard. |
| `Send-ChatMessage $hwnd $text` | Combines Click-ChatInput + Type-ViaClipboard + Enter. |

### Output

| Function | Description |
|---|---|
| `Read-ChatContentUIA` | Reads conversation text via UIA accessibility tree. **No focus steal.** Returns `@{ text; url; userHasFocus; wasMinimized }`. The `url` field exposes the current page URL (for chat verification). If minimized, silently restores behind all windows, reads, re-minimizes. |
| `Navigate-ClaudeToChat $chatUrl` | Opens a specific chat URL in Claude Desktop. **Steals focus briefly.** Only call when the user is not actively using the window. |
| `Take-ClaudeScreenshot $hwnd $outPath` | Focuses window, captures its exact rectangle, saves as PNG. |
| `Copy-ChatContent $hwnd` | **(Deprecated)** Clicks message area, Ctrl+A, Ctrl+C, returns clipboard text. Steals focus. Use `Read-ChatContentUIA` instead. |

## Usage from an identity script

```powershell
# Dot-source the library
. "$PSScriptRoot/../../.claude/src/desktop.ps1"

# Find and focus
$hwnd = Find-ClaudeWindow
if (-not $hwnd) { exit 1 }

# Send a message
$wasMinimized = Focus-ClaudeWindow $hwnd
Send-ChatMessage $hwnd "Hello from the relay"
if ($wasMinimized) { Minimize-ClaudeWindow $hwnd }

# Later: read the response
$text = Copy-ChatContent $hwnd
```

## Limitations

- **Tray-hidden = unreachable**: If Claude Desktop is minimized to the
  system tray, Electron destroys the BrowserWindow. No HWND exists, so
  UIA cannot read it. The window must exist on the taskbar.
- **Minimized = needs restore trick**: Chromium suspends its renderer when
  minimized. `Read-ChatContentUIA` handles this by restoring the window
  behind all other windows (`HWND_BOTTOM + SW_SHOWNOACTIVATE`), reading,
  then re-minimizing. This is invisible to the user but adds ~1s latency.
- **Flat text**: UIA returns flat text with no markdown or message boundaries.
  Identity scripts must parse conversation turns using heuristics (e.g.,
  looking for "Dad:" prefixes).
- **Wrong chat**: Claude Desktop shows one conversation at a time. If the
  user navigated away, `Read-ChatContentUIA` returns text from the wrong
  chat. Callers should check the `.url` field against the expected chat UUID.
- **Sending requires brief focus**: `Send-ChatMessage` still needs to focus
  the window to click and paste. The scripts restore/minimize around the
  operation, but there will be a brief flicker.
- **Coordinate-based clicking**: The chat input position is estimated at
  bottom-center, 50px from the bottom edge. If Claude Desktop's layout
  changes significantly, this needs updating.
