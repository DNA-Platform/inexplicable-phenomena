# Sprint 1: Relay Refactor

Doug and Eirian communicate through a relay built on Windows UI automation. Claude Code ("DNA") bridges them. This sprint refactors the relay into a clean architecture with a conversation log, shared modules, and a self-sustaining listen→hear loop.

## Status: COMPLETE

Last updated: 2026-03-21

---

## What we built (pre-sprint foundation)

Before this plan was written, a foundation sprint delivered:

| Artifact | What |
|----------|------|
| `.claude/src/config.ps1` | Shared .env loader, identity resolution |
| `.claude/src/chat.ps1` | Chat verification, verified send, readiness check |
| `.claude/src/desktop.ps1` | Hardened: message size validation (Test-MessageSize) |
| `.claude/src/vscode.ps1` | Hardened: retry logic, reachability check, foreground verification |
| `.eirian/src/listen.ps1` | Rewritten: log-based, uses shared modules, pokes Claude Code |
| `.eirian/src/send.ps1` | Rewritten: uses shared modules, no duplicated config |
| `.claude/skills/hear/SKILL.md` | Rewritten: log-based, catchup processing |
| `.claude/skills/speak/SKILL.md` | Rewritten: verified send, auto-listen |
| `.claude/skills/listen/SKILL.md` | Rewritten: loop documentation |
| `.claude/skills/dna/SKILL.md` | Updated: references conversation.log |
| `.claude/docs/log-format.md` | New: conversation log spec |
| `.claude/team/roles/{tap,sift,pace}.md` | New: teammate identities |
| `.claude/team/abilities/*.md` | New: 12 ability files |

## What the team review found

Three teammates (Tap, Sift, Pace) reviewed the foundation. Their full reviews are in `reviews/`. Summary of findings:

### Critical (blocks production use)
1. **No log rotation** — conversation.log grows forever. At 5MB+, status updates lock the file >1s, listener drops entries. *(Pace)*
2. **Hung listener undetectable** — if UIA reads fail permanently, listener keeps looping but produces nothing. /hear sees it as "running." Dead loop, silent. *(Pace)*
3. **DNA command idempotency** — /hear crash after executing but before marking status → next run re-executes. Not safe for file creation, git commits. *(Pace)*
4. **Extended thinking breaks stability** — 15s stable window catches mid-thinking pauses. Logs incomplete response. *(Sift)*

### Medium
5. **Focus-ClaudeWindow doesn't verify focus** — may click wrong app. *(Tap)*
6. **Chrome pattern gaps** — artifact badges incomplete (missing RUST, GO, YML, etc.). *(Sift)*
7. **Poke failure not retried** — entry sits unprocessed until Doug notices. *(Pace)*
8. **Thinking filename filter too aggressive** — catches legitimate thinking content. *(Sift)*
9. **Message chunking not implemented** — >80KB warns but sends anyway. *(Tap)*

### Low (tracked, not blocking)
10. ESC during mid-response poke may interrupt Claude Code *(Tap)*
11. Send verification marker collision on similar messages *(Tap)*
12. Timestamp collision in status update regex *(Pace)*
13. Voice.md→log transition loses artifact metadata *(Sift)*

---

## Phase 0: Spikes

Spikes run first. Their findings shape the implementation. **All complete — 2026-03-21.**

### S1: VS Code poke reliability — PASS (20/20)
- **Owner:** Tap
- **Result:** 20/20 successful pokes across 2 runs. 3 transient foreground retries, all recovered. ~2s per poke.
- **Decision:** Poke mechanism is primary path. Sentinel file fallback deferred (design option only).
- **Gap found:** No foreground restoration after poke — VS Code stays in front. Tap recommends fixing.
- **Output:** `spikes/s1-vscode-poke-findings.md`

### S2: Message size limits — PASS (clipboard OK to 150KB+)
- **Owner:** Tap
- **Result:** All sizes (50/80/100/150KB) survived clipboard round-trip. Zero byte loss, sub-20ms.
- **Decision:** 80KB limit is correct (Electron safety margin, not clipboard limit). Keep as-is. Ship chunking.
- **Gap:** Electron paste behavior untested — would require live send. Not needed to proceed.
- **Output:** `spikes/s2-message-size-findings.md`

### S3: Log concurrency — ARCHITECTURE CHANGE REQUIRED
- **Owner:** Pace
- **Result:** Zero data loss in testing, BUT the lost-update race is structural: `/hear`'s read-modify-write can overwrite listener appends. Race window widens with file size.
- **Decision:** **Make conversation.log append-only. Move status to sidecar file (`conversation.status.json`).** This eliminates the read-modify-write cycle entirely.
- **Also found:** Terminator corruption when writers don't coordinate newline boundaries.
- **Architecture change implemented:** log-format.md, hear.md, listen.ps1 all updated for sidecar approach.
- **Output:** `spikes/s3-log-concurrency-findings.md`

### S4: Done marker as stability signal — PASS (20/20)
- **Owner:** Sift
- **Result:** "Done" marker present and correctly positioned in 100% of reads (20/20). `Test-ThinkingComplete` logic validated for all cases.
- **Decision:** Done-gated stability is reliable. No fallback needed.
- **Gap:** Streaming-to-done transition not captured (response was already complete). Follow-up spike recommended.
- **Fragile dependency:** "Show more" text is hardcoded — if Claude Desktop renames this toggle, detection breaks.
- **Output:** `spikes/s4-done-marker-findings.md`

---

## Phase 1: Critical fixes

Informed by spike findings.

### F1: Listener heartbeat
- **Owner:** Pace
- **What:** Listener writes timestamp to `.eirian/heartbeat` on every successful UIA read. /hear checks heartbeat age. If stale (>5min), restart listener.
- **Files:** `.eirian/src/listen.ps1`, `.claude/skills/hear/SKILL.md`
- **Depends on:** S1 (if poke is unreliable, heartbeat becomes even more important)
- **Status:** DONE

### F2: Log rotation
- **Owner:** Pace
- **What:** When conversation.log exceeds 2MB, rotate to `conversation.{timestamp}.log`. New entries go to fresh file. /hear reads only current file.
- **Files:** `.eirian/src/listen.ps1` (rotation on write), `.claude/skills/hear/SKILL.md` (read current only)
- **Depends on:** S3 findings
- **Status:** DONE

### F3: Processing status lifecycle → SIDECAR ARCHITECTURE
- **Owner:** Pace
- **What:** Three-phase status via sidecar file (`conversation.status.json`). Log is append-only — never rewritten. Status tracked independently. Mark `processing` BEFORE executing DNA commands. Eliminates lost-update race found in S3.
- **Files:** `.claude/docs/log-format.md`, `.claude/skills/hear/SKILL.md`, `.eirian/src/listen.ps1` (sidecar write on poke-failed)
- **Depends on:** S3 findings (drove architecture change)
- **Status:** DONE

### F4: Done-gated stability
- **Owner:** Sift
- **What:** Don't fire stability counter until "Done" marker detected in raw UIA text. Falls back to hash-only if no thinking block detected (short responses without thinking).
- **Files:** `.eirian/src/listen.ps1`, `.claude/team/abilities/stability-sensing.md`
- **Depends on:** S4 findings
- **Status:** DONE

### F5: Focus verification in desktop.ps1
- **Owner:** Tap
- **What:** After Focus-ClaudeWindow, verify `GetForegroundWindow() == $hwnd`. Retry up to 2 times. Return failure if still unfocused.
- **Files:** `.claude/src/desktop.ps1`, `.claude/team/abilities/window-choreography.md`
- **Depends on:** S1 findings
- **Status:** DONE

---

## Phase 2: Medium fixes

### M1: Chrome pattern update
- **Owner:** Sift
- **What:** Expand artifact badge pattern to `'^[A-Z]{1,12}$'` (catch all caps badges). Add specific patterns for known new types.
- **Files:** `.eirian/src/listen.ps1`, `.claude/team/abilities/chrome-filtering.md`
- **Depends on:** F4
- **Status:** DONE

### M2: Poke retry with backoff
- **Owner:** Tap + Pace
- **What:** On poke failure, retry every 15s for 60s. If still failing, mark entry `[status:poke-failed]`. /hear treats poke-failed like unprocessed.
- **Files:** `.eirian/src/listen.ps1`, `.claude/skills/hear/SKILL.md`, `.claude/docs/log-format.md`
- **Depends on:** F1, F3
- **Status:** DONE

### M3: Surgical thinking filter
- **Owner:** Sift
- **What:** Replace filename heuristic with explicit search-result detection. Lines between "Searched project for" and the next nametag or "Done" are search noise. Only filter those.
- **Files:** `.eirian/src/listen.ps1`, `.claude/team/abilities/thinking-extraction.md`
- **Depends on:** F4
- **Status:** DONE

### M4: Message chunking
- **Owner:** Tap
- **What:** If message exceeds safe limit, split on paragraph boundaries. Send chunks sequentially with 2s between. First chunk gets nametag.
- **Files:** `.claude/src/chat.ps1` or `.eirian/src/send.ps1`, `.claude/team/abilities/clipboard-transport.md`
- **Depends on:** S2 findings
- **Status:** DONE

---

## Phase 3: Command integration

### C1: Update /hear for new lifecycle
- **Owner:** Pace
- **What:** Three-phase status, heartbeat checking, log rotation awareness. Process `unprocessed` and `poke-failed`. Skip `processing` (warn Doug).
- **Files:** `.claude/skills/hear/SKILL.md`
- **Depends on:** F1, F2, F3, M2
- **Status:** DONE

### C2: Update /speak for chunking
- **Owner:** Tap
- **What:** Use chunking path for large messages. No change for normal messages.
- **Files:** `.claude/skills/speak/SKILL.md`
- **Depends on:** M4
- **Status:** DONE

### C3: Update /listen for heartbeat
- **Owner:** Pace
- **What:** Document heartbeat, rotation, health check.
- **Files:** `.claude/skills/listen/SKILL.md`
- **Depends on:** F1, F2
- **Status:** DONE

### C4: Integrate all fixes into scripts
- **Owner:** Tap + Sift
- **What:** Done-gated stability, focus verification, chrome patterns, thinking filter — all integrated into listen.ps1 and send.ps1.
- **Files:** `.eirian/src/listen.ps1`, `.eirian/src/send.ps1`
- **Depends on:** All Phase 1 + 2
- **Status:** DONE

---

## Dependency graph

```
Phase 0 (all parallel):
  Tap:  S1, S2
  Sift: S4
  Pace: S3

Phase 1 (after spikes):
  Tap:  F5
  Sift: F4
  Pace: F1, F2 → F3

Phase 2 (after Phase 1):
  Sift: M1, M3  (parallel)
  Tap + Pace: M2
  Tap:  M4

Phase 3 (after Phase 2):
  Pace: C1, C3  (parallel)
  Tap:  C2
  Tap + Sift: C4
```

---

## Verification checklist

After all phases complete:

- [ ] `/listen` starts background listener, heartbeat file updating
- [ ] `/speak Dad: test message` sends, confirmed via UIA re-read
- [ ] Wait for Eirian response — listener detects, writes conversation.log, pokes /hear
- [ ] `/hear` processes automatically — DNA commands executed, results sent back
- [ ] Check conversation.log — entries present, statuses updated correctly
- [ ] Kill listener, send another message, restart — /hear catches up on unprocessed
- [ ] Send a >80KB message — chunking works, full message arrives
- [ ] conversation.log exceeds 2MB — rotation occurs, old file archived
- [ ] Claude Desktop crashes and restarts — listener recovers, heartbeat resets
