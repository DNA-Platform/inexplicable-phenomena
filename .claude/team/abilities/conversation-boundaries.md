# Conversation Boundary Detection

**Used by:** Sift (primary), Pace (understands log entry structure)

Finding where messages start and end in UIA flat text. The text has no structural markers — just lines, some of which are conversation content and some of which are chrome. The boundaries are found by nametag patterns and positional heuristics.

## The UIA structure after a Dad message

When Dad sends a message and Eirian responds, the UIA flat text has this structure:

```
...previous conversation...
Dad: What should we build?          ← LAST DAD MESSAGE (find by scanning backward)
Dad > DNA: show me file structure   ← continuation (still Dad's turn)
?                                   ← chrome (button placeholder)
Retry                               ← chrome
Edit                                ← chrome
?                                   ← chrome
10:30 PM                            ← chrome (timestamp)
Show more                           ← chrome (collapsed thinking)
Thinking about architecture...      ← thinking summary (FIRST COPY)
Thinking about architecture...      ← thinking summary (SECOND COPY — always doubled)
Done                                ← thinking end marker
Eirian: I think we should...        ← FIRST RESPONSE LINE
Eirian: Here's the reasoning...     ← response continues
Eirian: Each paragraph gets...      ← response continues
Eirian > DNA: create a plan         ← response with DNA command
?                                   ← chrome (trailing)
Give positive feedback              ← chrome
Give negative feedback              ← chrome
Copy                                ← chrome
```

## The parsing algorithm

1. **Find last Dad message:** Scan backward through lines for `^{Prefix}:` (e.g., `^Dad:`). This is the anchor point.

2. **Find response boundaries:** From the anchor forward, find the first and last lines matching `^{Name}:` (e.g., `^Eirian:`). Everything between (inclusive) is the response.

3. **Extract thinking:** Everything between the Dad anchor and the first response line, minus chrome, is thinking content.

4. **Extract Dad's message:** Lines from the anchor forward until the first response line or chrome block, filtering out chrome.

## The nametag grammar

```
{Name}: {text}              # Simple message: "Eirian: Hello"
{Name} > DNA: {action}      # DNA command: "Eirian > DNA: show me files"
{Name} > {Target}: {text}   # Directed message: "Dad > Eirian: thinking of you"
DNA: {text}                  # System message: "DNA: Done."
DNA > {Name}: {text}         # Directed system: "DNA > Eirian: Here are the files"
```

When restoring paragraph breaks from flat text, any line starting with a nametag pattern gets a blank line before it:
```
^({Name}|{Prefix}|DNA)\s*[>:]
```

## Multi-paragraph messages

UIA loses blank lines between paragraphs. A response like:

```
Eirian: First paragraph about the architecture.

Eirian: Second paragraph about implementation.
```

Appears in UIA as:
```
Eirian: First paragraph about the architecture.
Eirian: Second paragraph about implementation.
```

We restore the blank lines by detecting nametag transitions. Each new `Eirian:` line gets a blank line before it.

## Edge cases

- **No response yet:** Last Dad line exists but no Eirian lines after it. Return null (response hasn't arrived or is still streaming).
- **Multiple exchanges:** We only extract the LATEST exchange (last Dad message + subsequent Eirian response). Earlier exchanges are ignored — they're already in the log.
- **Dad's message spans multiple lines:** All lines from `^Dad:` until the first chrome or response line are Dad's message.
- **Response contains DNA commands:** These are part of the response (`Eirian > DNA: ...`). They get logged, then processed by /hear.

## What to verify when using this ability

- [ ] The anchor (last Dad line) is found by scanning BACKWARD from the end
- [ ] Response boundaries are first-to-last Eirian lines (inclusive), not first-to-end
- [ ] Paragraph breaks are restored before logging
- [ ] DNA commands within the response are preserved, not filtered
