# Stability Sensing

**Used by:** Sift (primary), Pace (understands timing guarantees)

Determining when a streaming response from Claude Desktop is complete. Claude streams responses token-by-token. If we read mid-stream, we get a partial response. We need to wait until the response has stabilized before logging it.

## The hash-based approach

On each poll interval (default 5s), compute SHA256 of the extracted response text. Track:
- `$prevHash` — hash of the last response we already wrote to the log
- `$candidateHash` — hash of a response we think might be new
- `$stableCount` — how many consecutive reads matched `$candidateHash`

```
Read 1: hash=A (different from prev)  → candidate=A, stableCount=1
Read 2: hash=A (same as candidate)    → stableCount=2
Read 3: hash=A (same as candidate)    → stableCount=3 → STABLE. Write to log.
```

Three consecutive identical reads means the response hasn't changed for 15 seconds (3 × 5s interval). This is our confidence threshold.

## The tradeoff

| Threshold | Wait time | Risk |
|-----------|-----------|------|
| 2 reads (10s) | Faster | May capture a streaming pause (Eirian is thinking mid-response, or network hiccup) |
| 3 reads (15s) | Moderate | Good balance. Catches most streaming completions. |
| 4 reads (20s) | Slow | Very safe but adds 20s latency to every response |

We use 3 reads. The rationale: Claude's streaming has natural pauses (thinking, searching), but they rarely last > 10 seconds. A 15-second stable window catches genuine completions while filtering out most pauses.

## What changes the hash

- New tokens in the response (streaming in progress)
- Thinking block expanding (user clicked "Show more")
- Claude Desktop re-rendering (rare, happens on window resize)
- New chrome appearing (e.g., "Give feedback" buttons appear after response completes)

The hash is computed on the EXTRACTED response text (after chrome filtering and boundary detection), not the raw UIA text. This means chrome changes don't trigger false instability.

## When the hash matches prevHash

This means the response we're seeing is the same one we already logged. Skip it. This prevents double-logging when the listener continues polling after processing.

## When the response changes mid-stability

```
Read 1: hash=A → candidate=A, stableCount=1
Read 2: hash=B → candidate=B, stableCount=1  ← RESET
Read 3: hash=B → stableCount=2
Read 4: hash=B → stableCount=3 → STABLE
```

The candidate and count reset whenever the hash changes. This handles the case where we start tracking a partial response and it keeps growing.

## Error state handling

If Claude Desktop is showing an error ("This isn't working right now"), the error text might be stable but we don't want to log it as a response. The extraction function checks for error patterns and returns `@{ error = $true }` instead of response text. The stability loop resets its count on errors.

## What to verify when using this ability

- [ ] Hash is computed on extracted text, not raw UIA text
- [ ] Stability count resets when hash changes
- [ ] Previous hash prevents double-logging
- [ ] Error states reset the counter, not trigger logging
- [ ] The poll interval and stability threshold are configurable
