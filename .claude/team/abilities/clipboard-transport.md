# Clipboard Transport

**Used by:** Tap (primary), Automation

Sending data between processes via the Windows clipboard. The only reliable way to input text into Claude Desktop and VS Code without using an IME or accessibility API.

## The pattern

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

## Size limits

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

## Clipboard gotchas

1. **Clipboard may be in use.** Another app may have locked it. The `try/catch` around `GetText()` handles this — we proceed without saving.

2. **Non-text clipboard content is lost.** If the user copied an image, we overwrite it with text and can't restore it. No good fix for this.

3. **Empty clipboard.** `GetText()` returns empty string or null. Don't try to "restore" an empty clipboard — just leave our text there.

4. **Race condition.** Between save and restore, another app could write to the clipboard. Unlikely in the ~500ms window, but possible. Not worth mitigating.

## What to verify when using this ability

- [ ] Always save clipboard before overwriting
- [ ] Always restore clipboard after (if we had something to restore)
- [ ] Check message size before pasting
- [ ] Include timing sleeps between SetText, paste, and restore
- [ ] Wrap clipboard operations in try/catch (clipboard can be locked by other apps)
