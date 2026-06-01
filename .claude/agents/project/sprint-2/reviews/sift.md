# Sift's Review

Reviewed: 2026-03-19

## Assessment: Signal Extraction and Parsing

### Chrome Filtering

**Status: Solid core, known gaps, staleness risk HIGH**

The pattern list covers documented buttons and UI elements well. Each pattern has a reason.

Gap: Artifact badge whitelist is incomplete. Only covers `(TEXT|TS|JS|SQL|JSON|PY|MD|HTML|CSS)`. Missing: RUST, GO, JAVA, DOCKERFILE, YML, YAML, TOML, KOTLIN, SWIFT, RUBY, PHP, DART. If Eirian returns a Rust artifact, the badge leaks into the log.

Staleness: No automated test. Pattern list will silently go stale on Claude Desktop updates. Button labels may change ("Give positive feedback" → "Helpful"), new UI elements appear, model labels change.

Recommendation: Make the badge pattern permissive (`'^[A-Z]{1,12}$'`) to catch future additions. Create a fresh-UIA-dump spike when Desktop updates.

### Conversation Boundary Detection

**Status: Sound algorithm, edge cases handled implicitly**

The backward scan for last `Dad:` + forward scan for `Eirian:` range works correctly. Multi-exchange handling is sound — we only extract the latest exchange.

Edge cases reviewed:
- Interleaved DNA messages between Eirian lines: handled (included in the range between first and last Eirian line)
- No response yet: returns null correctly
- Dad message with no response: returns null correctly
- Multi-paragraph Dad: extracts until first chrome/response line. Hidden assumption that chrome doesn't appear mid-Dad-message, but this is unlikely in practice.

Concern: The 5-character minimum for response length is weak. Could let through `"Eirian: ."` (10 chars). Not critical but sloppy.

### Stability Sensing

**Status: CRITICAL RISK with extended thinking**

3 reads × 5s = 15s window is appropriate for synchronous responses. But:

Extended thinking scenario: Eirian starts responding, tokens stream for 2s, then thinking pauses for 20+ seconds. The hash is stable at read 3. We log an incomplete response — Eirian is still thinking.

The hash is computed on extracted text (after chrome filtering), which is good — chrome changes don't trigger false instability. But mid-thinking pauses DO create stable hashes because the extracted text doesn't change during a thinking pause.

Recommendation: Gate stability on the "Done" marker. Don't fire until "Done" appears in the raw UIA text. Fall back to hash-only for responses without thinking blocks (short/simple responses).

### Thinking Extraction

**Status: Solid, one fragile heuristic**

Deduplication of consecutive identical lines: correct. Chrome patterns in thinking zone: correct. "Done" marker filtered: correct.

Fragility: Filename filter (`$line -match '\.\w{1,5}$' -and $line.Length -lt 80`) catches legitimate thinking content that mentions filenames. If Eirian's thinking says "I examined config.ps1 and found..." and that appears as a single line, it's filtered.

Recommendation: Replace with explicit search-result detection. Lines between "Searched project for" and the next nametag/"Done" are search results. Only filter those.

### Voice.md → Conversation.log Transition

**Status: Simplifies pipeline, loses metadata**

Lost:
- Artifact boundaries (voice.md used `<details>` blocks)
- Thinking/response separation (was explicit in voice.md)
- Code block language classification

Mitigated: Code fences with language tags (` ```sql`) ARE preserved in the log text. /hear can parse them. The log format is sufficient for immediate goals.

Risk: Future tools that need artifact extraction or thinking audit will need to re-parse from conversation text. No explicit metadata.

### Recommended Improvements

1. **Done-gated stability** (critical) — eliminates extended-thinking risk
2. **Permissive badge pattern** (quick fix) — prevents silent data loss
3. **Surgical filename filter** (medium) — reduces false negatives in thinking
4. **Document boundary detection assumptions** — helps future maintainers
5. **Chrome pattern freshness spike** — captures UIA dump, diffs against list
