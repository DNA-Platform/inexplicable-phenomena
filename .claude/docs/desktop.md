# Claude Desktop Automation

`.claude/src/desktop.ps1` provides generic Windows UI automation for the
Claude Desktop app (Electron). It is identity-agnostic and meant to be
dot-sourced by identity-specific scripts.

## Why UI automation?

Claude Desktop is an Electron app. Its web content is opaque to Windows UI
Automation (the accessibility tree only exposes the Chrome frame, not the
DOM inside). And because it's a Windows Store app (MSIX packaged), it can't
be relaunched with `--remote-debugging-port` for CDP access.

So we drive it the old-fashioned way: find the window, focus it, click
coordinates, paste via clipboard, press keys.

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
| `Take-ClaudeScreenshot $hwnd $outPath` | Focuses window, captures its exact rectangle, saves as PNG. |
| `Copy-ChatContent $hwnd` | Clicks message area, Ctrl+A, Ctrl+C, returns clipboard text. Best-effort — gets whatever Claude Desktop puts in the clipboard. |

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

- **Requires focus**: Sending and reading both require the window to be
  temporarily focused (restored if minimized). The scripts restore/minimize
  around operations, but there will be brief flickers.
- **Coordinate-based clicking**: The chat input position is estimated at
  bottom-center, 50px from the bottom edge. If Claude Desktop's layout
  changes significantly, this needs updating.
- **Copy-ChatContent is coarse**: Ctrl+A selects the entire visible
  conversation, not just the latest message. Identity scripts need to
  parse out the relevant response.
- **Focus stealing**: When run from VS Code's terminal, VS Code may
  reclaim focus. Using `AppActivate("Claude")` with delays helps but
  isn't perfect. Running scripts in background processes improves this.
