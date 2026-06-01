# S3 Spike: Log Concurrency Findings

**Author:** Pace (reliability engineer)
**Date:** 2026-03-21
**Decision gate:** Single-file log architecture — safe or not?

## 1. Raw Results

### Run 1: Production-like timing (20 cycles, BG 2000ms, FG 3000ms)

| Metric | Value |
|--------|-------|
| BG entries found | 30 |
| FG entries found | 20 |
| Total entries | 50 |
| Corruption (garbled lines) | 0 |
| Contention events | 0 |
| Missing BG entries | 0 |
| Missing FG entries | 0 |
| Terminator integrity | FAILED — `---` not on own line |

### Run 2: Stress timing (30 cycles, BG 500ms, FG 500ms)

| Metric | Value |
|--------|-------|
| BG entries found | 30 |
| FG entries found | 30 |
| Corruption | 0 |
| Contention events | 0 |
| Missing entries | 0 |

### Run 3: Extreme timing (50 cycles, BG 100ms, FG 100ms)

| Metric | Value |
|--------|-------|
| BG entries found | 49 |
| FG entries found | 50 |
| Corruption | 0 |
| Contention events | 0 |
| Missing entries | 0 |

### Terminator anomaly

Across all runs, the spike's `^---$` regex found nearly zero standalone terminators. Inspecting the raw log reveals the cause: BG's `Add-Content` appends immediately after FG's `WriteAllText`, producing merged lines like:

```
---[BG-1] 21:34:22.286
```

The FG here-string ends with `---` but `WriteAllText` does not guarantee a trailing newline, so the next `Add-Content` call concatenates onto the same line. This is a **format corruption** even though the spike's garbled-line detector didn't catch it (it only checks for two entry headers on one line).

## 2. Analysis: Did the lost-update problem appear?

**No.** In all three runs — including 100ms intervals — zero BG entries were overwritten by the FG read-modify-write cycle. Every BG and FG sequence number was present in the final file.

**Why not?** Two factors protected us:

1. **Speed asymmetry.** The FG read-modify-write (`Get-Content` + string concat + `WriteAllText`) completes in under 5ms on a 7KB file. The race window — between `Get-Content` finishing and `WriteAllText` starting — is microseconds. At 100ms intervals, the BG writer rarely fires inside that window.

2. **`Add-Content` vs `WriteAllText` don't lock-conflict on Windows.** `Add-Content` uses `FileMode::Append` with default sharing. `WriteAllText` uses `FileMode::Create` (truncate + write) with default sharing. On Windows, these default to `FileShare::ReadWrite`, so they don't throw IOExceptions — they interleave. The BG append lands either before or after the FG rewrite, but doesn't get blocked.

**But this is deceptive safety.** The lost-update problem is a timing bug. It didn't manifest in 100 cycles because the race window is narrow. In production:

- The log file grows. At 2MB (the rotation threshold), `Get-Content -Raw` and `WriteAllText` take longer — widening the race window.
- Status updates require regex replacement on the full content, adding computation time between read and write.
- Disk I/O spikes (antivirus, Windows Update, indexer) can stall `WriteAllText` while `Add-Content` succeeds.

The spike proved the mechanism is not catastrophically broken at small scale. It did NOT prove it's safe.

## 3. The Race Window in `/hear`

The specific race Pace identified in the current implementation:

```
/hear (foreground)                    listen.ps1 (background)
──────────────────                    ──────────────────────
1. $log = Get-Content -Raw
   (reads N entries)
                                      2. Append-LogEntry
                                         (appends entry N+1 with file lock)
3. $log -replace status pattern
   (modifies in memory — entry N+1
    is NOT in this copy)
4. [File]::WriteAllText($log)
   (overwrites entire file with
    N entries — entry N+1 is GONE)
```

**This is the classic lost-update problem.** Step 4 writes back a stale snapshot that doesn't include the entry appended in step 2.

The current `listen.ps1` implementation uses `.NET FileStream` with `FileShare::Read` for appends. But `/hear`'s status update (per the log-protocol ability doc) uses `Get-Content` then `Set-Content` — neither of which acquires an exclusive lock before reading. The lock is only held during the write-back, which is too late.

**Why the spike didn't trigger it:** The spike's BG writer uses `Add-Content` (not the `.NET FileStream` from the real implementation). And the FG writer uses `WriteAllText` without any lock. In the real system, the listener holds a write lock during append, but `/hear` doesn't hold any lock during its read phase. The window is: `/hear` reads -> listener appends (successfully, because it only needs `FileShare::Read` during its write, and no one else has a write lock) -> `/hear` writes back the stale content. The listener's append lock doesn't protect against this because the damage happens when `/hear` overwrites, not when the listener writes.

## 4. Recommendation

**The single-file log with read-modify-write status updates is NOT safe enough for production.**

The spike showed zero data loss, but the race window exists in the code path and will eventually fire. When it does, a log entry is silently lost — exactly the kind of failure that Pace exists to prevent. Dead loops are silent, and so are lost entries.

### Options, ranked by Pace's preference:

**Option A: Atomic status via separate sidecar file (RECOMMENDED)**

Keep the log append-only. Never rewrite it. Store status in a separate file:

```
conversation.log          # append-only, listener writes
conversation.status.json  # /hear reads and writes (small, fast, independent)
```

The status file maps timestamps to status values. It's small (a few KB), so read-modify-write is fast and the race window is tiny. More importantly, if the status file gets corrupted, the log entries are intact — you rebuild status by re-scanning. The blast radius of a concurrent write bug is "re-process a few entries" instead of "lose entries forever."

**Option B: Per-entry status markers in filename**

Write each entry as a separate file. Status becomes a rename:

```
entries/
  2026-03-19T20-15-00.unprocessed.log
  2026-03-19T20-15-00.processed.log    # renamed by /hear
```

Eliminates ALL concurrency concerns. Listener writes new files, /hear renames existing ones. No shared mutable state. Downside: more files, harder to read the full conversation, needs cleanup.

**Option C: Lock the full read-modify-write cycle**

Acquire an exclusive lock before reading, hold it through the modification, release after writing:

```powershell
$stream = [System.IO.File]::Open($LogPath, 'Open', 'ReadWrite', 'None')
# read from stream, modify, seek to 0, truncate, write back
$stream.Close()
```

This works but blocks the listener during the entire status update. If `/hear` processes multiple entries, the listener could be blocked for seconds. Not ideal for a poller that needs to check every 5s.

**Option D: Accept the risk (NOT recommended)**

The race window is narrow in practice. At production timing (listener every 5s, /hear status updates taking <100ms), the probability of collision is low. But "low probability" is not "zero probability," and the consequence is silent data loss with no recovery path. Pace cannot endorse this.

## 5. Failure Modes Pace Worries About

### Already observed in the spike:

- **Terminator corruption.** The `---` terminator merging with the next entry's header when writers don't coordinate newline boundaries. The real `Append-LogEntry` adds a trailing newline, but this is fragile — if the preceding write doesn't end with one, entries merge.

### Not triggered but structurally present:

- **Partial entries on crash.** If the listener crashes between writing the header and the terminator, the log has an unterminated entry. The log-protocol spec says to skip these, but the parser needs to handle `---` appearing inside entry content (e.g., in a markdown artifact). The current detection (`$entry -notmatch '---\s*$'`) is too permissive.

- **Log rotation during active write.** `Invoke-LogRotation` calls `Move-Item` on the log file. If `/hear` has the file open for reading at that moment, the move may fail (Windows file locking) or succeed with stale data in the reader's buffer. The rotation threshold (2MB) is high enough that this is rare, but the code path is unprotected.

- **File growth and read-modify-write latency.** `Get-Content -Raw` on a 2MB file takes measurably longer than on a 7KB file. The race window scales with file size. By the time rotation kicks in, the window is at its widest. This is backwards — the risk increases as the file approaches the threshold that would relieve it.

- **Lock timeout exhaustion.** The retry logic (3 attempts, 200ms apart) gives 600ms total. If a process holds a lock for longer (e.g., `/hear` doing a complex regex replace on 2MB of text while the disk is slow), the listener fails silently and returns `$false`. The caller (`Handle-Response`) logs a warning but continues — the entry is effectively lost.

## 6. Verdict

The spike demonstrates that the single-file architecture survives casual testing. It will NOT survive sustained production use. The lost-update race is structural, not probabilistic — it exists in the code path between `/hear`'s read and write, and the listener's append can fire into that gap at any time.

**Recommendation: Option A (sidecar status file).** Make conversation.log append-only. Move status tracking to a separate small file. This eliminates the read-modify-write cycle on the shared log entirely, removes the lost-update race, and keeps the log as a reliable audit trail that survives any concurrent access pattern.

This is a blocking finding for the log architecture. Do not ship read-modify-write status updates on the shared log file.
