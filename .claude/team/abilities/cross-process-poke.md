# Cross-Process Poke

**Used by:** Tap (primary), Pace (ensures the poke is part of a reliable loop), Automation

Waking up Claude Code by typing a command into VS Code's integrated terminal. This is how the listener (running in PowerShell) triggers `/hear` processing in Claude Code.

## The mechanism

1. Find VS Code window (process name `Code`, prefer window with project name in title)
2. Focus VS Code and bring it to foreground
3. `Ctrl+`` — focuses the integrated terminal panel
4. `ESC` — clear any partial input or autocomplete
5. Paste the command via clipboard (`/hear`)
6. `Enter` — submit

This is keyboard simulation across process boundaries. Fragile by nature.

## What can go wrong

| Failure | Symptom | Handling |
|---------|---------|----------|
| VS Code not running | No `Code` process found | Return false. Caller should log warning. |
| Wrong VS Code window | Project name not in title | Falls back to first VS Code window. May type into wrong workspace. |
| Terminal not visible | Panel closed or different panel active | `Ctrl+`` toggles terminal. If panel was on a different tab, may open terminal instead. |
| Claude Code mid-response | Input is blocked during streaming | ESC may interrupt response. Command may queue. Unpredictable. |
| VS Code minimized | IsIconic returns true | Restore, then focus. Window flashes briefly. |
| Failed to gain foreground | Another app stole focus between calls | Verify `GetForegroundWindow` matches VS Code hwnd. Retry up to 2 times. |
| Autocomplete popup | VS Code shows suggestions | ESC dismisses it before typing command. |

## Retry logic

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

The retry addresses transient focus issues (another app grabbed foreground between our calls). It does NOT help with fundamental issues (VS Code not running, Claude Code not in terminal).

## The Claude Code mid-response problem

If Claude Code is currently generating a response when the poke arrives, the behavior is unpredictable. The `/hear` text may:
- Get queued as the next user input (best case)
- Interrupt the current response (if ESC is processed)
- Get mixed into the response display (if terminal echo is active)

Current mitigation: none. The poke is best-effort. If it fails, the unprocessed log entries accumulate and get caught up on the next successful poke or manual `/hear`.

## What to verify when using this ability

- [ ] Check `Test-VSCodeReachable` before attempting
- [ ] Verify foreground window matches after focus attempt
- [ ] ESC before typing to clear state
- [ ] Use clipboard paste, not SendKeys for the command text (special chars)
- [ ] Retry on transient failures (focus loss)
- [ ] Don't retry on fundamental failures (no VS Code)
