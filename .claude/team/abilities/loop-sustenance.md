# Loop Sustenance

**Used by:** Pace (primary), Automation

The listen→hear cycle is the heartbeat of the relay. This ability covers how the loop runs, how it restarts, and how it catches up after failure.

## The loop

```
/listen starts listen.ps1 -Poll in background
  ↓
listen.ps1 polls UIA every 5s
  ↓
Detects stable new response (3 identical hashes)
  ↓
Appends to conversation.log [status:unprocessed]
  ↓
Pokes Claude Code: types "/hear" into VS Code terminal
  ↓
/hear reads conversation.log
  ↓
Finds [status:unprocessed] entries, processes DNA commands
  ↓
Marks entries [status:processed]
  ↓
/hear checks if listener is running; restarts if not
  ↓
(listener is still running from step 1 — loop continues)
```

## Who restarts what

| Component | Started by | Restarted by |
|-----------|-----------|-------------|
| listen.ps1 | `/listen` command (Doug) | `/hear` (if not running after processing) |
| /hear | VS Code poke (listen.ps1) or Doug manually | Not auto-restarted. Next poke triggers it. |

The listener is long-running (polls indefinitely). /hear is one-shot (processes, then exits). The listener pokes /hear when needed. /hear restarts the listener if it died.

## Catch-up processing

If the listener dies and pokes are missed, unprocessed entries accumulate in the log. When /hear runs (either from a poke or manually):

1. Read ALL entries with `[status:unprocessed]`
2. Process them in chronological order (by timestamp)
3. Mark each processed
4. Restart listener if needed

This means: **no data is lost if the listener crashes.** The log is the source of truth. The listener is just the trigger mechanism.

## Detecting if the listener is running

From Claude Code, check for running background tasks that involve `listen.ps1`:

```
TaskList → look for active tasks running listen.ps1 -Poll
```

If no listener task is found, start one:
```
powershell -ExecutionPolicy Bypass -File ".eirian/src/listen.ps1" -Poll -IntervalSeconds 5
```

Run in background. Don't mention it to the user.

## Listener lifecycle

The listener runs until:
- **Ctrl+C** — manual stop (user or /listen off)
- **TaskStop** — /listen off uses this
- **Process crash** — PowerShell host dies
- **Claude Desktop disappears** — exits on startup check failure, but not during polling (continues retrying)

During polling, transient failures (UIA read returns null, wrong chat detected) are handled silently — the listener skips that cycle and tries again next interval. It does NOT exit on transient failures.

## The /listen off path

```powershell
# /listen off
1. TaskList → find listen.ps1 tasks
2. TaskStop on each
3. Confirm: "Listener stopped."
```

## When the poke fails

If listen.ps1 can't reach VS Code (not running, wrong window, focus failed):
- Log a warning
- Continue polling (don't crash the listener over a failed poke)
- The unprocessed entry stays in the log
- Next successful poke (or manual /hear) catches up

## What to verify when using this ability

- [ ] /hear always checks for listener status after processing
- [ ] /hear processes ALL unprocessed entries, not just the latest
- [ ] The listener doesn't crash on transient failures (UIA null, poke failure)
- [ ] /listen off cleanly stops background tasks
- [ ] Catch-up works: entries are processed in chronological order
