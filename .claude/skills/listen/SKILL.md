---
name: listen
description: Start or stop the collaborator's voice listener — polls Claude Desktop for new responses
argument-hint: "[off]"
---

Start or stop the collaborator's voice listener.

If the argument is "-off" or "off" or "stop":
  1. Find any running background tasks that are polling listen.ps1
  2. Stop them with TaskStop
  3. Say only: "Listener stopped."

Otherwise (no arguments, or any other argument):
  1. Check if a listen.ps1 poll task is already running in the background. If so, say "Already listening." and stop.
  2. Start the listener:
     ```
     powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/listen.ps1" -Poll -IntervalSeconds 5
     ```
     Run this in the background.
  3. Say only: "Listening."

## How the loop works

The listener is the heartbeat of the relay. It creates a self-sustaining loop:

```
/listen starts in background
  ↓
listen.ps1 polls Claude Desktop every 5s via UIA (no focus steal)
  ↓
Writes heartbeat timestamp on every successful UIA read
  ↓
Detects stable new response (hash-based, 3 consecutive identical reads = 15s)
  ↓
Waits for thinking to complete (Done-marker gating)
  ↓
Extracts Dad's last message + Eirian's response
  ↓
Rotates conversation.log if >2MB
  ↓
Appends both to .authors/.eirian/conversation.log as a single entry [status:unprocessed]
  ↓
Pokes Claude Code via VS Code automation: types "/hear" into terminal
  ↓
(retries poke up to 4 times with 15s backoff if it fails)
  ↓
/hear reads conversation.log, finds actionable entries
  ↓
Marks [status:processing], executes DNA commands, marks [status:processed]
  ↓
/hear restarts the listener if it's not running
  ↓
(loop continues)
```

## Health monitoring

**Heartbeat file:** `.authors/.eirian/heartbeat` — updated on every successful UIA read. If this file is older than 5 minutes, the listener may be hung (UIA reads failing silently while the process keeps looping). `/hear` checks this and restarts the listener if stale.

**Log rotation:** When `.authors/.eirian/conversation.log` exceeds 2MB, the listener rotates it to `conversation.{timestamp}.log` before appending. This prevents lock contention from growing file size (at 5MB, status updates lock the file >1s, which exceeds the listener's retry budget and causes dropped entries).

## Conversation log

The listener writes to `.authors/.eirian/conversation.log` (not voice.md). The log is **append-only** — never rewritten. Status tracking lives in `.authors/.eirian/conversation.status.json` (a sidecar file that `/hear` manages). See `.claude/docs/log-format.md` for the full format spec.

## Catch-up

If the listener dies and is restarted, `/hear` will process all `[status:unprocessed]` and `[status:poke-failed]` entries on its next run — catching up on anything missed.

$ARGUMENTS
