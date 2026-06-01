# S1 Spike: VS Code Poke Reliability Findings

**Date:** 2026-03-21
**Tested by:** Tap (interface engineer)
**Script:** `s1-vscode-poke.ps1`
**Target:** `Send-ClaudeCodeCommand` delivering `echo poke-test-{n}` to VS Code integrated terminal

---

## 1. Raw Results

Two consecutive runs were performed. VS Code was visible (not minimized) at the start of both runs.

### Run 1 (21:34:30)

| Metric | Value |
|--------|-------|
| Iterations | 10 |
| Successes | 10 |
| Failures | 0 |
| Success rate | **100%** |
| Foreground retries | 3 (attempts 1, 5, 6) |

Timing (ms): 4226, 2084, 2061, 2067, 5335, 4738, 2072, 2018, 2072, 2072

- Attempts 1, 5, 6 required one foreground retry each, inflating their times to ~4200-5300ms
- All other attempts completed in ~2050-2090ms

### Run 2 (21:35:40)

| Metric | Value |
|--------|-------|
| Iterations | 10 |
| Successes | 10 |
| Failures | 0 |
| Success rate | **100%** |
| Foreground retries | 0 |

Timing (ms): 2130, 2088, 2105, 2053, 2052, 2004, 2038, 2021, 2068, 2068

- Average: 2062.7ms
- Min: 2004ms, Max: 2130ms
- Extremely consistent. No retries needed.

### Combined: 20/20 successful deliveries (100%)

---

## 2. Tap's Analysis

### What worked

The `Send-ClaudeCodeCommand` function is solid. The retry logic in `vscode.ps1` handled all transient foreground failures gracefully. Even when another process (this Claude Code session, running the spike) held foreground, the retry loop recovered within one attempt.

### The foreground contention pattern

Run 1 had 3 foreground retries. This makes sense: the spike script runs inside the same VS Code terminal it's trying to poke. The sequence is:

1. Script calls `SetForegroundWindow` for VS Code
2. VS Code already *is* the foreground window, but `GetForegroundWindow` returns a different hwnd than `Find-VSCodeWindow` returned

This happens because VS Code has multiple processes. The hwnd returned by `Find-VSCodeWindow` (sorted by `MainWindowHandle -Descending`) may not match the hwnd the OS considers "foreground" even when VS Code is visually in front. The retry works because `SetForegroundWindow` is called again and the OS settles.

Run 2 had zero retries, suggesting the foreground contention is timing-dependent, not systematic. When the system is warmed up and no other process is competing, the first attempt succeeds.

### Timing breakdown

The ~2000ms per successful attempt breaks down as:
- 500ms: `ShowWindow` restore (skipped when visible, but `SetForegroundWindow` still sleeps 500ms)
- 300ms: `Ctrl+backtick` to focus terminal
- 200ms: foreground verification sleep
- 200ms: ESC key
- 200ms: clipboard set
- 200ms: Ctrl+V paste
- 200ms: Enter key
- ~200ms: clipboard restore + overhead

This is inherent to the keyboard simulation approach. Every step needs its sleep or inputs get dropped.

### What did NOT fail

- Window finding: `Find-VSCodeWindow` found the correct window every time (matched `inexplicable-phenomena` in title)
- Terminal focus: `Ctrl+backtick` reliably opened/focused the integrated terminal
- Clipboard transport: No clipboard corruption observed. Save/restore worked.
- ESC clearing: No autocomplete interference
- Enter submission: Every command was submitted successfully

### What was NOT tested

- VS Code minimized state (both runs started with VS Code visible)
- VS Code on a different virtual desktop
- User actively typing during poke
- Claude Code mid-response during poke
- Multiple VS Code windows open simultaneously
- System under heavy CPU/memory load

---

## 3. Recommendation

**Poke works well enough. No sentinel file fallback needed for the happy path.**

20/20 successful deliveries far exceeds the 8/10 threshold. The retry logic handles transient foreground failures. The mechanism is reliable when:
- VS Code is running and visible (or at least not tray-hidden)
- The project window is identifiable by title
- No other process is aggressively stealing focus

However, Tap recommends keeping the sentinel file fallback **as a design option** (not an immediate build) for these edge cases:
- VS Code minimized or on another virtual desktop (untested, likely works with the restore logic but adds visible flicker)
- Claude Code mid-response (the `/hear` command may interrupt or get swallowed)
- User actively working in the terminal (poke would inject text into their typing)

The sentinel file approach would be zero-visibility and zero-interference, but it requires a polling loop in Claude Code. For now, the poke mechanism is the right primary path.

---

## 4. Window-State Observations

### Focus theft
Every poke steals focus. There is no way around this with the keyboard simulation approach. The `SetForegroundWindow` + `Ctrl+backtick` + paste sequence requires VS Code to be the active window. During the spike, focus was stolen 10 times per run. Each theft lasted approximately 2 seconds.

If the user is actively working in another application, they will see VS Code flash to the front briefly. This is the fundamental cost of the poke mechanism.

### Z-order
After each poke, VS Code remains in the foreground. The script does not restore the previous foreground window. This means after a poke, whatever the user was working on is now behind VS Code. `Focus-VSCodeTerminal` saves `wasMinimized` but the caller (`Send-ClaudeCodeCommand`) does not use it to restore state afterward.

**This is a gap.** The function should save the previous foreground window before focusing VS Code, and restore it after the command is sent. Without this, every poke leaves a trace -- the opposite of Tap's mantra.

### Clipboard
Clipboard save/restore works but has a race condition: if the user copies something between the save and restore, their clipboard content is overwritten with the old value. In practice, with ~200ms between save and restore, this is unlikely but not impossible.

### Restoration
`Send-ClaudeCodeCommand` returns `$true` but does not re-minimize VS Code if it was minimized before the poke. The `Focus-VSCodeTerminal` function returns the `wasMinimized` state, but the caller ignores it. This should be fixed before production use.

---

## 5. Script Fixes Applied

The spike script had three bugs that were fixed before it could run:

1. **`$i:` parsed as drive reference** (line 95): `$i:` in string interpolation. Fixed by wrapping in `${i}`.
2. **`$error` is a read-only automatic variable** (line 73): Renamed to `$errDetail`.
3. **`.Count` on `$null`** (line 104): When `Where-Object` returns nothing, `.Count` fails under `StrictMode`. Fixed by wrapping in `@(...)` to force array.

---

## Summary

| Question | Answer |
|----------|--------|
| Does poke meet 8/10 threshold? | **Yes -- 20/20 (100%)** |
| Is sentinel fallback needed now? | **No** |
| Biggest concern? | Focus theft + no foreground restoration after poke |
| Recommended next step? | Add foreground save/restore to `Send-ClaudeCodeCommand`, then test with VS Code minimized |
