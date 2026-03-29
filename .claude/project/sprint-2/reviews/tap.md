# Tap's Review

Reviewed: 2026-03-19

## Assessment: Interface Reliability

### VS Code Poke (cross-process-poke / vscode.ps1)

**Status: FRAGILE, needs spike validation**

Good:
- Retry logic (2 retries, 1s backoff) handles transient focus loss
- Foreground verification after focus attempt
- Clipboard paste avoids IME/special char issues
- Reachability check before retries

Risky:
1. **ESC during mid-response** — if Claude Code is streaming when the poke arrives, ESC may interrupt the response. No detection, no mitigation. The cross-process-poke ability acknowledges this.
2. **Terminal panel assumption** — `Ctrl+`` assumes terminal panel. Different panel active = unpredictable.
3. **No validation of command acceptance** — after pasting `/hear`, we don't verify it landed in the terminal input. If focus was lost between paste and Enter, `/hear` goes somewhere else.

Timing concerns:
- 200ms after focus check may be too short on slow machines. 500ms safer.
- No sleep between ESC and clipboard paste. Add 300ms.

### Message Size (clipboard-transport / desktop.ps1)

**Status: 80KB limit is a guess, not validated**

- `$script:MaxMessageBytes = 80000` is conservative but untested against Claude Desktop 40.4.1
- Chunking is documented in the ability file but NOT implemented. Messages >80KB warn but send anyway.
- Unknown: does Electron truncate silently, show an error, or hang?

### Send Verification (chat.ps1 / Send-VerifiedMessage)

**Status: Sound strategy, tight timing**

- 30-char marker approach works but risks collision on similar messages
- 3s timeout = ~6 UIA reads if minimized (each triggers HWND_BOTTOM cycle, ~1s each). May timeout.
- False positives from earlier messages with same prefix (low probability at 30 chars).

### desktop.ps1 Hardening Gaps

1. **Focus-ClaudeWindow doesn't verify it got focus.** vscode.ps1 does this. desktop.ps1 should too. Click-ChatInput may click wrong app.
2. **Click-ChatInput is coordinate-based** (50px from bottom). DPI changes, layout changes, or font scaling break it. Should fall back to UIA element finding.
3. **Take-ClaudeScreenshot doesn't handle DPI scaling.** GetWindowRect returns logical pixels, CopyFromScreen expects physical. Screenshots at 150% DPI are half-resolution.

### chat.ps1 Edge Cases

- Navigate-ClaudeToChat has 2s hardcoded sleep after URL open. Cold Electron may need more. Should verify URL via UIA.
- Assert-CorrectChat skips navigation when user has focus. But "user has focus" doesn't mean "user is present" — could be AFK with wrong chat open.
