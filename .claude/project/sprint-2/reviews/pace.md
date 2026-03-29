# Pace's Review

Reviewed: 2026-03-19

## Assessment: Reliability and Loop Sustenance

### Log Concurrency (Spike 3 territory)

**Status: Correct primitives, one race window, scaling concern**

Good: FileMode::Append with FileShare::Read for listener writes. Retry logic (200ms × 3). Streams properly closed.

Race window: /hear reads the file (no lock), computes replacement, then acquires exclusive lock to rewrite. If the listener appends between the read and the lock acquisition, /hear's in-memory copy is stale — missing the new entry. The listener's new entry survives (it was appended after /hear's read), but /hear writes back its stale copy with FileShare::None, overwriting the append.

Mitigating factor: The listener's Write() call is effectively atomic (one StreamWriter.Write for the full entry). And /hear's read happens via Get-Content (which should see a consistent snapshot). The race window is the ~50-100ms between /hear's read and its lock acquisition.

Actual risk: LOW but not zero. Spike 3 should validate under load.

Scaling: Status updates read/rewrite the entire file. At 5MB, lock duration is >1s. At that point, the listener's 3 retries × 200ms = 600ms budget is exceeded. **Entries will be silently dropped.**

### Hung Listener Detection

**Status: CRITICAL gap**

Current detection: /hear checks if a background task running listen.ps1 exists. But a hung listener (UIA reads fail permanently, but the process keeps looping and sleeping) appears as "Running."

No heartbeat. No timeout. No health check. If Claude Desktop crashes and the listener can't read UIA, the loop is dead but appears alive.

Recommendation: Listener writes timestamp to `.eirian/heartbeat` on every successful UIA read. /hear checks age. If >5 minutes, restart.

### DNA Command Idempotency

**Status: CRITICAL design gap**

Flow: /hear executes DNA command → sends result via /speak → updates status.

If /hear crashes AFTER executing but BEFORE updating status, next run finds `[status:unprocessed]` and re-executes. File creation runs twice. Git commits duplicate. Config changes may be applied twice.

Recommendation: Three-phase status. Mark `[status:processing]` BEFORE executing. If next /hear sees `processing`, it knows the command may have already run. Warn Doug instead of blindly re-executing.

### Catch-up Path

**Status: Correct but blocking**

/hear processes ALL unprocessed entries sequentially. If entry 3 of 5 has a DNA command that takes 60 seconds, entries 4-5 wait. During that time:
- The listener may try to append (will block on status update retry if /hear has the file locked)
- Doug sees no activity for 60s

Not a data-loss risk, but a latency hazard. Acceptable for now.

### Poke Failure

**Status: Fire-and-forget is dangerous**

listen.ps1 attempts one poke. If it fails, logs a warning and continues polling. The entry sits `[status:unprocessed]` until Doug manually runs /hear or the next response triggers another poke.

Recommendation: Retry the poke every 15s for 60s. If still failing, mark entry `[status:poke-failed]`. /hear treats poke-failed like unprocessed on next run.

### Log Rotation

**Status: MISSING, will fail at scale**

No rotation, no archival, no size limit. Conversation.log grows forever.

Recommendation: Rotate at 2MB. Rotate to `conversation.{timestamp}.log`. New entries go to fresh file. /hear reads only current file. Old files are archived (kept for history but not actively parsed).

### Partial Failure Recovery

Review of specific crash scenarios:

| Crash point | Data loss? | Re-execution risk? | Detection? |
|-------------|-----------|-------------------|-----------|
| Listener mid-append | No (incomplete entry skipped, re-extracted next cycle) | No | Yes (missing terminator) |
| Poke fails | No (entry stays unprocessed) | No | Partial (only if someone checks log) |
| /hear mid-DNA-command | No | **Yes** (command re-executes) | No (status still unprocessed) |
| /hear mid-status-update | No | **Yes** (same as above) | No |
| Claude Desktop crash | No (listener keeps polling) | No | **No** (hung listener, see above) |

### Recommended Fixes (priority order)

1. **Heartbeat file** (critical) — makes hung listener detectable
2. **Log rotation** (critical) — prevents scaling failure
3. **Three-phase status** (critical) — prevents duplicate DNA execution
4. **Poke retry** (medium) — reduces manual intervention
5. **Incomplete entry detection in /hear** (medium) — parser should explicitly skip entries without `---`
