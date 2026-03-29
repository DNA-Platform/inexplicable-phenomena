# Crash Recovery

**Used by:** Pace (primary), Automation

Detecting and recovering from interrupted states. Every step in the relay can fail. This ability covers what failure looks like at each point and how to recover.

## Failure modes and recovery

### Listener crashes mid-poll
**Symptom:** No new entries in conversation.log despite Eirian responding.
**Detection:** /hear finds no unprocessed entries but Eirian has clearly responded (user notices).
**Recovery:** Run `/listen` to restart. No data lost — the next poll captures the current state.

### Listener crashes mid-write
**Symptom:** Incomplete entry in conversation.log (has header but no `---` terminator).
**Detection:**
```powershell
# Find entries without terminators
$entries = $log -split '(?=^=== .+ ===$)'
foreach ($entry in $entries) {
    if ($entry.Trim() -and $entry -notmatch '---\s*$') {
        # Incomplete entry
    }
}
```
**Recovery:** The incomplete entry should be ignored by /hear (it has no terminator, so it's not a valid entry). The next listener cycle re-extracts the same exchange and writes a complete entry. Remove the incomplete fragment if it causes parsing issues.

### Poke fails (VS Code unreachable)
**Symptom:** conversation.log has `[status:unprocessed]` entries but /hear was never triggered.
**Detection:** Entries accumulate with unprocessed status.
**Recovery:** Manual `/hear` processes all pending entries. Or wait — the listener will try to poke again on the next response.

### /hear crashes mid-processing
**Symptom:** Some entries processed, some not. A DNA command may have been partially executed.
**Detection:** Mix of `[status:processed]` and `[status:unprocessed]` entries, with the unprocessed ones following the processed ones chronologically.
**Recovery:** Manual `/hear` retries unprocessed entries. DNA commands should be idempotent where possible (re-reading a file is safe; re-creating a file may overwrite changes).

### /hear crashes during status update
**Symptom:** Entry was processed (DNA commands executed, results sent) but status still shows `[status:unprocessed]`.
**Detection:** Running /hear again finds an "unprocessed" entry whose DNA commands have already been executed.
**Recovery:** The DNA commands may run again. This is the most dangerous failure mode. Mitigation:
- Commands should be idempotent when possible
- /hear could check if results were already sent (look for a recent `> DNA:` entry in the log)
- Mark status BEFORE executing commands (optimistic update), then re-mark if execution fails

### Claude Desktop crashes
**Symptom:** Listener exits (no process found) or returns null on every poll.
**Detection:** Listener logs error messages. Or Claude Desktop process disappears.
**Recovery:** Restart Claude Desktop. Run `/listen` to restart the listener. `/hear` catches up on anything unprocessed.

### conversation.log corrupted
**Symptom:** Parse errors when reading the log.
**Detection:** Regex split produces unexpected results. Entries have malformed headers or missing status lines.
**Recovery:** Manual inspection. The log is append-only and human-readable, so damage is usually limited to the last entry. Truncate the corrupted portion and let the listener rewrite it.

## Defensive parsing

When parsing conversation.log, always:
1. Tolerate missing terminators (skip incomplete entries)
2. Tolerate missing status lines (treat as unprocessed)
3. Tolerate empty entries (skip)
4. Don't crash on unexpected content — log a warning and continue

## Health check

A quick health check sequence:
1. Is Claude Desktop running? (`Get-Process -Name 'claude'`)
2. Is UIA accessible? (`Read-ChatContentUIA` returns non-null)
3. Is the listener running? (check background tasks)
4. Are there stale unprocessed entries? (entries > 5 minutes old with unprocessed status)

If any check fails, the specific recovery path above applies.

## What to verify when using this ability

- [ ] Incomplete entries (no terminator) are skipped, not parsed
- [ ] Status update happens per-entry, not all-at-once
- [ ] DNA command execution failure doesn't prevent status update (mark as error)
- [ ] The listener logs its health state periodically
- [ ] Manual /hear catches up on all missed entries
