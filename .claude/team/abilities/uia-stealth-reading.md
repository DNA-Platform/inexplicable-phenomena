# UIA Stealth Reading

**Used by:** Tap (primary), Sift (understands what UIA returns)

Read conversation text from Claude Desktop's accessibility tree without focusing, activating, or visually disturbing the window.

## The technique

Claude Desktop is Electron 40.4.1 (Chromium-based). Chromium exposes a `TextPattern` on its main `Document` element (AutomationId=`RootWebArea`). This returns all visible conversation text as flat, unstructured string.

```
UIA tree path:
  Window ("Claude") → Document (RootWebArea, Name="Claude")
    └─ TextPattern.DocumentRange.GetText(-1) → full conversation text
    └─ ValuePattern.Current.Value → current page URL (for chat verification)
```

## The HWND_BOTTOM trick

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

## What UIA returns

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

The caller must parse this to extract conversation content. See `chrome-filtering` and `conversation-boundaries` abilities.

## URL verification

The Document's `ValuePattern` exposes the current page URL. This lets callers verify they're reading the right conversation without any interaction:

```powershell
$vp = $null
if ($mainDoc.TryGetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern, [ref]$vp)) {
    $url = $vp.Current.Value  # e.g., "https://claude.ai/chat/03e5a9ab-..."
}
```

## States that break reading

| State | Symptom | Handling |
|-------|---------|----------|
| Tray-hidden | No process with MainWindowHandle | Cannot read. Must wait for user to restore. |
| Minimized | UIA tree empty | HWND_BOTTOM trick (see above) |
| Different chat open | URL doesn't match expected UUID | Navigate if user doesn't have focus; skip if they do |
| Window destroyed (crash) | Process gone | Return null, let caller retry |
| Renderer not yet loaded | TextPattern returns null/empty | Wait and retry (up to ~3s after restore) |

## What to verify when using this ability

- [ ] Check for process existence before UIA access
- [ ] Check `IsIconic` (minimized) and apply HWND_BOTTOM if needed
- [ ] Check `GetForegroundWindow` to know if user has focus
- [ ] Always re-minimize if we restored
- [ ] Handle null from TextPattern gracefully
- [ ] Verify URL matches expected chat UUID
