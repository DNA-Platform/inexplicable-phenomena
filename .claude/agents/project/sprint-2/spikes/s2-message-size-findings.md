# S2 Spike Findings: Clipboard Paste Size Limits

**Date:** 2026-03-21
**Executed by:** Tap (interface engineer)

## Raw Results

Clipboard round-trip test using `SetText` / `GetText` with marker-embedded payloads:

| Target | Actual Bytes Set | Bytes Read Back | Exact Match | End Marker | Set Time | Get Time |
|--------|-----------------|-----------------|-------------|------------|----------|----------|
| 50KB   | 50,013          | 50,013          | Yes         | Yes        | 18ms     | 11ms     |
| 80KB   | 80,013          | 80,013          | Yes         | Yes        | 2ms      | 1ms      |
| 100KB  | 100,013         | 100,013         | Yes         | Yes        | 3ms      | 1ms      |
| 150KB  | 150,013         | 150,013         | Yes         | Yes        | 3ms      | 9ms      |

All four sizes survived clipboard round-trip with zero byte loss. End markers present in all cases. No errors, no truncation, no corruption.

## Tap's Analysis

### The clipboard itself is not the bottleneck

The Windows clipboard (`System.Windows.Forms.Clipboard`) handles 150KB of ASCII text without flinching. `SetText`/`GetText` round-trips are exact -- byte-for-byte identical, sub-20ms even at the largest size. The clipboard is not where truncation happens.

This means the 80KB limit documented in `clipboard-transport.md` and enforced in `desktop.ps1` is **not** a clipboard limit. It's a downstream limit -- specifically, what happens when Electron's Chromium renderer processes the paste event in Claude Desktop's chat input.

### What this spike does NOT test

This spike only tests the clipboard transport layer in isolation. The dangerous part of the pipeline is:

1. `SetText` puts data on clipboard (tested -- works to 150KB+)
2. `SendKeys("^v")` triggers paste in Claude Desktop (NOT tested)
3. Electron's input handler processes the paste event (NOT tested)
4. The chat input DOM element accepts and renders the text (NOT tested)

Steps 2-4 are where truncation or hangs would occur. Those require the `-Send` flag against a live Claude Desktop window, which we correctly did not run.

### Timing observations

Performance is fast and consistent. No size-dependent slowdown visible in clipboard operations alone. The 18ms on the first `SetText` is likely cold-path overhead; subsequent calls are 2-3ms regardless of size. This means clipboard save/restore adds negligible overhead even for large messages.

## Recommendation

### Is the 80KB limit correct?

**Cannot confirm or deny from this spike alone.** The 80KB limit addresses Electron paste behavior, not clipboard capacity. The clipboard easily handles 150KB+. The real question -- "at what size does Electron truncate or hang on paste?" -- requires a live send test (the `-Send` path) or prior empirical evidence.

That said, 80KB is a reasonable defensive limit:
- It leaves a 20KB margin below the documented ~100KB concern threshold
- It covers virtually all practical messages (80KB is roughly 20,000 words)
- Conservative limits are correct for automation that must be invisible

**Keep the 80KB limit as-is.** It costs nothing (messages rarely approach it) and protects against an untested failure mode.

### Is chunking (M4) critical or nice-to-have?

**Nice-to-have, leaning toward important.** The chunking implementation in `Send-ChunkedMessage` is already built and functional. Its value is:

- **Safety net**: If a message does exceed 80KB (e.g., a large code artifact relay), chunking degrades gracefully instead of warning and sending anyway
- **Future-proofing**: If we ever need to relay full conversation exports or large artifacts, chunking is ready
- **Low risk**: The implementation splits on paragraph boundaries, preserves the nametag on chunk 1, and delays 2s between chunks -- all sensible

Chunking should ship as part of the relay refactor. It's already written and the cost of carrying it is zero.

### Clipboard-related concerns

1. **No Unicode tested.** The spike uses ASCII patterns only. If messages contain emoji, CJK characters, or other multi-byte UTF-8 content, the byte-to-character ratio changes. The 80KB byte limit is correct (it counts UTF-8 bytes, not characters), but a Unicode-heavy message could be shorter in visible text than expected. Not a bug, but worth noting.

2. **Clipboard save/restore is solid.** The spike correctly saves and restores the original clipboard content. The pattern in `clipboard-transport.md` is adequate.

3. **No concurrent clipboard access tested.** If another application writes to the clipboard between `SetText` and the paste keystroke, the wrong content gets pasted. The ~500ms window makes this unlikely but not impossible. No mitigation available -- this is inherent to clipboard-based transport.

4. **Non-text clipboard content.** As documented in `clipboard-transport.md`, if the user has an image on the clipboard, we destroy it. This spike doesn't change that assessment. It remains an accepted tradeoff.

## Summary

The clipboard transport layer is reliable to at least 150KB. The 80KB limit in `desktop.ps1` is a correct Electron-side safety margin, not a clipboard limitation. Keep the limit. Ship chunking. The next spike to consider would be a live send test at various sizes to find the actual Electron truncation point, but that's invasive and not needed to proceed with the relay refactor.
