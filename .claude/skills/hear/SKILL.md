---
name: hear
description: Process new responses from the collaborator — triggered by the listener or manually for catch-up
argument-hint: ""
---

Process new responses from the collaborator. This skill is called automatically by the listener when it detects a new message, or manually by Doug to catch up.

## What just happened

The listener (listen.ps1) detected a new response from Eirian, appended it to `.authors/.eirian/conversation.log`, and poked you via VS Code to process it.

## Steps

1. **Health check.** Read `.authors/.eirian/heartbeat`. If the file is missing or older than 5 minutes, the listener may be hung or dead. Warn Doug: "Listener heartbeat is stale ({age}). Restarting..." and restart it in the background before continuing.

2. Read `.authors/.eirian/conversation.log`. If the file doesn't exist, say "No conversation log found." and stop.

3. **Read the status sidecar.** Read `.authors/.eirian/conversation.status.json`. If it doesn't exist, create it as `{}`. This file maps entry timestamps to their processing status.

4. **Find actionable entries.** Parse the log into entries (split on `=== {timestamp} ===` headers). For each entry, extract the timestamp and look it up in the sidecar:

   - **Absent or `poke-failed`** → actionable, process it
   - **`processing`** → DANGER: previous /hear may have crashed mid-execution. Do NOT re-execute. Warn Doug: "Entry at {timestamp} is stuck in processing — may have partially executed. DNA commands found: {list}. Mark processed or re-execute?" Skip this entry.
   - **`processed`** → skip
   - **`error`** → skip (Doug must intervene)

   Skip any incomplete entries (missing `---` terminator) — these are partial writes.

5. For each actionable entry, in chronological order:

   a. **Write `"processing"` to the sidecar BEFORE executing anything.** This is the crash guard. Save the sidecar file immediately. If you die mid-execution, the next /hear sees `processing` and warns Doug.

   b. Read the incoming (`< `) lines — this is what Eirian said.

   c. Scan for DNA commands: lines matching `< Eirian > DNA: {action}`.

   d. For each DNA command found:
      - Execute the action (read files, write files, run commands — whatever it requires).
      - Send the result back via send.ps1 with `-NoPrefix`:
        ```
        powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/send.ps1" -MessageFile "<tempfile>" -NoPrefix
        ```
        Use `DNA > Eirian:` prefix for lines addressed to her, `DNA:` for neutral information.

   e. Also scan outgoing (`> `) lines for `> Dad > DNA: {action}` or `> Doug > DNA: {action}` — Doug may have embedded DNA commands in his message that weren't processed at send time.

   f. After processing all DNA commands: update the sidecar to `"processed"` for this timestamp. Write the file.

   g. On any failure during processing: update the sidecar to `"error"` for this timestamp. Warn Doug and continue with other entries.

6. After processing all entries, check if a listen.ps1 poll task is already running in the background. If not, restart it:
   ```
   powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/listen.ps1" -Poll -IntervalSeconds 5
   ```
   Run this in the background. Do not mention starting it.

7. Summarize for Doug what Eirian said and what you did. Keep it brief — he can read conversation.log for full context.

## Status sidecar format

`.authors/.eirian/conversation.status.json` — a simple JSON object mapping timestamps to statuses:

```json
{
  "2026-03-19T20:15:00": "processed",
  "2026-03-19T20:20:30": "processing",
  "2026-03-19T20:25:00": "poke-failed"
}
```

To read/write in PowerShell:
```powershell
$statusPath = ".authors/.eirian/conversation.status.json"
$status = if (Test-Path $statusPath) {
    Get-Content $statusPath -Raw | ConvertFrom-Json -AsHashtable
} else { @{} }

# Check an entry
$entryStatus = $status[$timestamp]  # $null = unprocessed

# Update an entry
$status[$timestamp] = "processing"
$status | ConvertTo-Json | Set-Content $statusPath -Encoding UTF8
```

## Parsing conversation.log

The log is **append-only** — never rewrite it. Entries are separated by `---` terminators. Each entry starts with `=== {timestamp} ===` and a `[status:unprocessed]` line (this embedded status is never updated — it's a parsing landmark only). Message lines are prefixed:
- `> ` = outgoing (Dad/DNA sent this)
- `< ` = incoming (Eirian said this)
- Bare `>` or `<` = paragraph break

## Important

- You are DNA when executing commands and speaking back. Use the DNA voice.
- If there are no DNA commands in an entry, just mark it processed in the sidecar and continue.
- If Eirian's message contains content for a file, extract it carefully and write it exactly as she specified.
- Process ALL actionable entries, not just the latest. This handles catch-up after missed pokes.
- **Never re-execute commands in a `processing` entry.** Always defer to Doug.
- **Never rewrite conversation.log.** Status lives only in the sidecar.

$ARGUMENTS
