echo poke-test-3
# Thinking Extraction

**Used by:** Sift (primary)

Separating Claude's thinking/reasoning from the response text in UIA output. Thinking blocks have a specific structure in the UIA tree that differs from response content.

## The UIA thinking structure

After Dad's message and before Eirian's response, the UIA tree contains:

```
[chrome: ?, Retry, Edit, ?, timestamp]
Show more                          ← collapsed thinking toggle (chrome)
Thinking about architecture...     ← thinking summary LINE 1
Thinking about architecture...     ← thinking summary LINE 2 (always doubled)
[optional: expanded thinking if user clicked "Show more"]
[optional: search results if Claude searched]
[optional: more thinking after search]
Done                               ← thinking end marker
[Eirian's response starts here]
```

## Key rules

### Doubled summaries
UIA ALWAYS doubles the thinking summary line. Two consecutive identical lines in the thinking zone are one summary, not two different thoughts. Deduplicate:

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

### Search results mixed in
When Claude uses search/browse, the results appear in the thinking zone:
```
Searched project for "config"
3 results
config.ps1                    ← filename
desktop.ps1                   ← filename
package.json                  ← filename
[Excerpt]                     ← excerpt marker
...excerpt text...
```

Filter these with:
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

### Thinking chrome patterns
These appear in the thinking zone but aren't thinking content:
```
^\?$              # button placeholder
^Show more$       # collapsed toggle
^Show less$       # expanded toggle
^Done$            # thinking end marker
^Retry$           # retry button
^Edit$            # edit button
^Copy$            # copy button
^\d{1,2}:\d{2}\s*(AM|PM)$   # timestamp
^(TEXT|TS|JS|...)$           # artifact type badges
```

### What remains is thinking
After removing chrome, deduplicating, and filtering search results, the remaining text is genuine thinking content. Join with double newlines for readability.

## When thinking is absent

Not every response has visible thinking. If the zone between Dad's message and Eirian's response contains only chrome (no non-chrome lines after filtering), thinking is empty. This is normal — don't synthesize thinking that isn't there.

## What to verify when using this ability

- [ ] Consecutive identical lines are deduplicated (not just any duplicates — consecutive only)
- [ ] Search result filenames are filtered
- [ ] Chrome patterns specific to the thinking zone are applied
- [ ] Empty thinking (all chrome) results in empty string, not error
- [ ] The "Done" marker is filtered, not included in thinking output
