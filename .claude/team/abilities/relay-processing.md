# Relay Processing

Data extraction pipeline for the relay system: filtering UI chrome from UIA text, detecting message boundaries, extracting thinking blocks, and sensing response stability.

---

## Chrome Filtering

Identifying and removing UI chrome from UIA flat text. Claude Desktop's accessibility tree mixes conversation content with button labels, navigation items, timestamps, and structural markers. This ability is the filter that separates them.

### The chrome vocabulary

These regex patterns match lines that are UI chrome, not conversation content.

**Navigation and layout:**
```
^\?$                          # Button placeholder
^Retry$                       # Retry button
^Edit$                        # Edit button
^Copy$                        # Copy button
^Show more$                   # Collapsed thinking toggle
^Give positive feedback$      # Thumbs up
^Give negative feedback$      # Thumbs down
^Scroll to bottom$            # Scroll button
^Scroll to top$               # Scroll button
^Toggle menu$                 # Sidebar toggle
^Open sidebar$                # Sidebar button
^Share chat$                  # Share button
^Close$                       # Close button
```

**Sidebar and metadata:**
```
^Project content$             # Project section header
^Created by you$              # Project attribution
^Content$                     # Tab label
^New chat$                    # Sidebar item
^Search$                      # Sidebar item
^Customize$                   # Settings link
^Chats$                       # Sidebar section
^Projects$                    # Sidebar section
^Artifacts$                   # Tab label
```

**Model and UI labels:**
```
^Max plan$                    # Subscription tier
^Extended$                    # Thinking toggle
^(Opus|Sonnet|Haiku)\s+[\d.]+   # Model version labels
```

**Timestamps and file indicators:**
```
^\d{1,2}:\d{2}\s*(AM|PM)$    # Message timestamps
^(Jan|Feb|...|Dec)\s+\d{1,2}$   # Date labels
^\d+ lines$                   # Code block line counts
^\d{1,3}(,\d{3})?\s+lines$   # Large code block line counts
^(TEXT|TS|JS|SQL|...)$        # Artifact type badges
```

**Warnings, errors, and structural noise:**
```
^Claude is AI and can make mistakes   # Footer disclaimer
^Please double-check responses        # Footer disclaimer
^This isn.t working right now          # Error state
^You can try again later               # Error state
^\[Excerpt\]                  # Search result marker
^Reply\.\.\.$                 # Reply placeholder
^Press and hold to record$    # Voice input hint
^[\uFFFC\uFFFD]+$            # Object replacement / unknown chars
^[\uFFFC\uFFFD\s]*$          # Same with whitespace
```

### Maintenance strategy

This list WILL go stale. Claude Desktop updates change button labels, add features, rename sections. When encountering a line that appears between known chrome, is very short (< 20 chars), doesn't contain a nametag, and appears in multiple reads at the same position — it's probably new chrome. Add it to the pattern list.

### The conservative default

**When in doubt, it's noise.** A missed line of thinking is better than chrome text appearing in the conversation log.

---

## Conversation Boundary Detection

Finding where messages start and end in UIA flat text. The text has no structural markers — just lines, some of which are conversation content and some of which are chrome. The boundaries are found by nametag patterns and positional heuristics.

### The UIA structure after a message

```
...previous conversation...
Dad: What should we build?          ← LAST DAD MESSAGE (find by scanning backward)
Dad > DNA: show me file structure   ← continuation (still Dad's turn)
?                                   ← chrome
Retry                               ← chrome
Edit                                ← chrome
10:30 PM                            ← chrome (timestamp)
Show more                           ← chrome (collapsed thinking)
Thinking about architecture...      ← thinking summary (FIRST COPY)
Thinking about architecture...      ← thinking summary (SECOND COPY — always doubled)
Done                                ← thinking end marker
Eirian: I think we should...        ← FIRST RESPONSE LINE
Eirian: Here's the reasoning...     ← response continues
Eirian > DNA: create a plan         ← response with DNA command
?                                   ← chrome (trailing)
Give positive feedback              ← chrome
Give negative feedback              ← chrome
Copy                                ← chrome
```

### The parsing algorithm

1. **Find last Dad message:** Scan backward through lines for `^{Prefix}:` (e.g., `^Dad:`). This is the anchor point.
2. **Find response boundaries:** From the anchor forward, find the first and last lines matching `^{Name}:` (e.g., `^Eirian:`). Everything between (inclusive) is the response.
3. **Extract thinking:** Everything between the Dad anchor and the first response line, minus chrome, is thinking content.
4. **Extract Dad's message:** Lines from the anchor forward until the first response line or chrome block, filtering out chrome.

### The nametag grammar

```
{Name}: {text}              # Simple message
{Name} > DNA: {action}      # DNA command
{Name} > {Target}: {text}   # Directed message
DNA: {text}                  # System message
DNA > {Name}: {text}         # Directed system
```

### Multi-paragraph messages

UIA loses blank lines between paragraphs. We restore by detecting nametag transitions — each new `{Name}:` line gets a blank line before it.

### Edge cases

- **No response yet:** Last Dad line exists but no response lines after it. Return null.
- **Multiple exchanges:** We only extract the LATEST exchange. Earlier ones are already in the log.
- **Response contains DNA commands:** These are part of the response. They get logged, then processed by /hear.

---

## Thinking Extraction

Separating Claude's thinking/reasoning from the response text in UIA output. Thinking blocks have a specific structure in the UIA tree that differs from response content.

### Key rules

**Doubled summaries:** UIA ALWAYS doubles the thinking summary line. Two consecutive identical lines in the thinking zone are one summary, not two. Deduplicate:

```powershell
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($i + 1 -lt $lines.Count -and $lines[$i] -eq $lines[$i + 1]) {
        $result += $lines[$i]
        $i++  # skip the duplicate
    } else {
        $result += $lines[$i]
    }
}
```

**Search results mixed in:** When Claude uses search/browse, results appear in the thinking zone. Filter with:
```
^\d+ results?$
^\d+ relevant sections?$
^Searched project for
^\[Excerpt\]
```

And filter filename-like lines (short lines ending in `.ext`):
```powershell
if ($line -match '\.\w{1,5}$' -and $line.Length -lt 80 -and $line -notmatch '\.$') {
    # Probably a filename from search results — skip
}
```

**Thinking chrome patterns:**
```
^\?$              # button placeholder
^Show more$       # collapsed toggle
^Show less$       # expanded toggle
^Done$            # thinking end marker
^Retry$           # retry button
^Edit$            # edit button
^Copy$            # copy button
^\d{1,2}:\d{2}\s*(AM|PM)$   # timestamp
```

**When thinking is absent:** Not every response has visible thinking. If the zone between Dad's message and the response contains only chrome after filtering, thinking is empty. Don't synthesize thinking that isn't there.

---

## Stability Sensing

Determining when a streaming response from Claude Desktop is complete. Claude streams responses token-by-token. If we read mid-stream, we get a partial response. We need to wait until the response has stabilized before logging it.

### The hash-based approach

On each poll interval (default 5s), compute SHA256 of the extracted response text. Track:
- `$prevHash` — hash of the last response we already wrote to the log
- `$candidateHash` — hash of a response we think might be new
- `$stableCount` — how many consecutive reads matched `$candidateHash`

```
Read 1: hash=A (different from prev)  → candidate=A, stableCount=1
Read 2: hash=A (same as candidate)    → stableCount=2
Read 3: hash=A (same as candidate)    → stableCount=3 → STABLE. Write to log.
```

Three consecutive identical reads means the response hasn't changed for 15 seconds (3 x 5s interval).

### The tradeoff

| Threshold | Wait time | Risk |
|-----------|-----------|------|
| 2 reads (10s) | Faster | May capture a streaming pause |
| 3 reads (15s) | Moderate | Good balance |
| 4 reads (20s) | Slow | Very safe but adds 20s latency |

We use 3 reads. Claude's streaming has natural pauses (thinking, searching), but they rarely last > 10 seconds.

### What changes the hash

- New tokens in the response (streaming in progress)
- Thinking block expanding (user clicked "Show more")
- Claude Desktop re-rendering (rare, happens on window resize)
- New chrome appearing (e.g., "Give feedback" buttons appear after response completes)

The hash is computed on the EXTRACTED response text (after chrome filtering and boundary detection), not the raw UIA text. Chrome changes don't trigger false instability.

### Error state handling

If Claude Desktop is showing an error, the error text might be stable but we don't want to log it as a response. The extraction function checks for error patterns and returns `@{ error = $true }`. The stability loop resets its count on errors.
