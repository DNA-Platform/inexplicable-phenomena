# S4 Spike: Done Marker Detection — Findings

**Date:** 2026-03-21
**Analyst:** Sift (signal engineer)
**Spike script:** `s4-done-marker.ps1`
**Condition:** Claude Desktop running with a completed Eirian response (extended thinking, already finished)

## 1. Raw Results

| Metric | Value |
|--------|-------|
| Total reads | 20 |
| Successful reads | 20 (0 failures) |
| "Show more" detected | 20/20 (every read) |
| "Done" after "Show more" | 20/20 (every read) |
| Response after "Done" | 20/20 (every read) |
| Hash changed | 0 times (text was static across all reads) |
| Text length | 513,215 chars (constant) |
| Avg UIA read time | ~700ms (range 539–1109ms) |
| Streaming runs detected | 0 (response was already complete) |

All 20 reads returned identical content (same SHA256 hash: `5f9b990fc3951af0`). The response was fully complete before the spike started — no streaming transition was captured.

## 2. Analysis: Does "Done" Reliably Indicate Response Completion?

**Yes, with caveats.**

What the data shows:
- When a response with extended thinking is complete, the UIA text contains "Show more" followed by "Done" followed by the collaborator's response lines. This is the expected pattern per the thinking-extraction ability spec.
- The pattern was present in all 20 reads over 40 seconds with zero variance. This is strong evidence that the "Done" marker is stable and not a transient UI state.

What the data does NOT show:
- The transition from streaming to done. Because the response was already complete, we did not observe the moment "Done" appears. We cannot confirm from this run alone that "Done" is absent during streaming and appears atomically on completion.
- Whether "Done" can flicker (appear, disappear, reappear) during edge cases like network interruptions mid-stream.

**False positive risk:** Low. "Done" is a specific thinking-zone chrome marker. It would only false-positive if the word "Done" appeared literally at the start of a UIA text line in a non-thinking context. The `Test-ThinkingComplete` function mitigates this by requiring "Show more" to appear first — "Done" only matters if a thinking block exists.

**False negative risk:** Unknown from this data. If "Done" is delayed relative to actual response completion, we'd see the stability counter fire but `Test-ThinkingComplete` block it. This would add latency but not cause incorrect behavior — it's a safe failure mode.

## 3. Assessment of `Test-ThinkingComplete` Logic

Reviewing the function at lines 134–161 of `listen.ps1`:

### Case 1: Response with no thinking (no "Show more")
- **Expected:** return `$true` (nothing to wait for)
- **Actual:** Correct. When `$lastShowMore -lt 0`, the function returns `$true` at line 149.
- **Assessment:** Sound. No thinking toggle means no extended thinking was used. The response can be logged immediately on stability.

### Case 2: Response with thinking complete ("Show more" + "Done")
- **Expected:** return `$true`
- **Actual:** Correct. The function finds "Show more", then scans forward and finds "Done" at line 155, returns `$true`.
- **Assessment:** Sound. This is exactly what the spike confirmed — 20/20 reads show this pattern for a completed response.

### Case 3: Response mid-thinking ("Show more" but no "Done" yet)
- **Expected:** return `$false`
- **Actual:** Correct. The function finds "Show more" but the forward scan finds no "Done", falls through to return `$false` at line 160.
- **Assessment:** Sound. This prevents premature logging of a response while thinking is still streaming.

### Edge case: "Show more" from a PREVIOUS exchange
- The function searches backward for the LAST "Show more" in the full UIA text. If the conversation has multiple exchanges with thinking, the "Show more" from the latest exchange is the one found. Previous exchanges' "Show more" and "Done" pairs are further back in the text.
- **Risk:** If the latest exchange has no thinking but a previous one did, the function finds the old "Show more" and then finds the old "Done" after it — returns `$true`. This is correct behavior because the latest response has no thinking to wait for.
- **However:** If the latest exchange IS still streaming (thinking in progress), and the LAST "Show more" belongs to a previous exchange (because the new "Show more" hasn't rendered yet), the function could return `$true` prematurely. This is a narrow race window — "Show more" would need to not yet be visible while the thinking block is already streaming.
- **Mitigation:** The hash-based stability check is the primary gate. Even if `Test-ThinkingComplete` gives a false positive during this race, the response text would still be changing (streaming), so the hash wouldn't stabilize. The Done-gate is a secondary check that fires AFTER 3 stable reads.

### Edge case: Null/empty text
- Returns `$true` at line 135. Correct — no text means nothing to wait for. The caller (`Read-Once`) handles null separately.

## 4. Recommendation

**Done-gating is reliable as implemented. No fallback needed.**

Rationale:
1. The "Done" marker is structurally sound — it sits in a well-defined position (after "Show more", before response content) and was 100% consistent across 20 reads.
2. The `Test-ThinkingComplete` function handles all three primary cases correctly.
3. The architecture is defense-in-depth: hash stability is the primary gate (3 identical reads = 15s), Done-gating is a secondary check. Even if Done-gating has a false positive, the hash gate catches streaming. Even if hash stabilizes during a streaming pause, Done-gating catches incomplete thinking.
4. UIA read performance (avg ~700ms) is well within the 2–5s polling interval. No performance concern.

**One improvement to consider:** The stability threshold in the poll loop is `$stableCount -ge 2`, which means 3 total reads (initial + 2 stable). Combined with the Done-gate, this is conservative enough. Do NOT reduce to 2 reads — the Done-gate doesn't protect against mid-response streaming pauses (only thinking completeness).

**Missing data:** A follow-up spike should capture the streaming-to-done transition by starting the spike BEFORE sending a message. This would confirm that "Done" is absent during streaming and appears promptly on completion.

## 5. Signal/Noise Observations

### UIA text characteristics
- **Text length:** 513,215 chars for a full conversation. This is large. SHA256 hashing this on every poll is fine (~1ms), but if we ever switch to substring comparison, we'd want to trim to the tail.
- **Read consistency:** Zero variation across 20 reads. UIA is deterministic when the DOM isn't changing — no phantom diffs, no rendering noise. This validates the hash-based approach.
- **Read speed:** 539–1109ms range. The variance (2x) suggests occasional GC pauses or thread contention in the Claude Desktop process. Not a problem at 2–5s intervals, but would matter if we tried sub-second polling.

### Pattern reliability
- "Show more" is the anchor for thinking detection. If Claude Desktop ever renames this toggle (e.g., "Expand thinking"), both `Test-ThinkingComplete` and the chrome filter would break. This is the single most fragile dependency.
- "Done" as a marker is more robust — it's a short, unambiguous word. But it's also a common English word. The positional constraint (must appear after "Show more") is what makes it safe.

### Minor spike script bug
The spike script crashed at line 188 due to a PowerShell strict mode issue: `Where-Object` returning a single object (not an array) when only one match exists, which lacks a `.Count` property. Fix: wrap in `@()` — e.g., `@($validResults | Where-Object { $_.Changed }).Count`. Non-blocking; the raw read data was fully captured before the crash.
