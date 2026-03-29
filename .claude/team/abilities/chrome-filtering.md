# Chrome Filtering

**Used by:** Sift (primary), Pace (knows what clean data looks like)

Identifying and removing UI chrome from UIA flat text. Claude Desktop's accessibility tree mixes conversation content with button labels, navigation items, timestamps, and structural markers. This ability is the filter that separates them.

## The chrome vocabulary

These regex patterns match lines that are UI chrome, not conversation content. Each has a reason.

### Navigation and layout
```
^\?$                          # Button placeholder (action buttons render as "?")
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

### Sidebar and metadata
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

### Model and UI labels
```
^Max plan$                    # Subscription tier
^Extended$                    # Thinking toggle
^(Opus|Sonnet|Haiku)\s+[\d.]+   # Model version labels
```

### Timestamps and file indicators
```
^\d{1,2}:\d{2}\s*(AM|PM)$    # Message timestamps
^(Jan|Feb|...|Dec)\s+\d{1,2}$   # Date labels
^\d+ lines$                   # Code block line counts
^\d{1,3}(,\d{3})?\s+lines$   # Large code block line counts
^(TEXT|TS|JS|SQL|...)$        # Artifact type badges
```

### Warnings and errors
```
^Claude is AI and can make mistakes   # Footer disclaimer
^Please double-check responses        # Footer disclaimer
^This isn.t working right now          # Error state
^You can try again later               # Error state
```

### Structural noise
```
^\[Excerpt\]                  # Search result marker
^Reply\.\.\.$                 # Reply placeholder
^Press and hold to record$    # Voice input hint
```

### Unicode replacement characters
```
^[\uFFFC\uFFFD]+$            # Object replacement / unknown chars
^[\uFFFC\uFFFD\s]*$          # Same with whitespace
```

### Project-specific
```
^(Doug|Eirian).s (Library|ELM)   # Known project/library names in sidebar
```

## Maintenance strategy

This list WILL go stale. Claude Desktop updates change button labels, add features, rename sections. When Sift encounters a line that:
- Appears between known chrome (e.g., between "Retry" and a timestamp)
- Is very short (< 20 chars) and doesn't contain a nametag
- Appears in multiple reads at the same position

...it's probably new chrome. Add it to the pattern list.

When Claude Desktop ships a major update, do a fresh UIA dump (`Read-ChatContentUIA` on a known conversation) and diff against the pattern list.

## The conservative default

Sift's rule: **When in doubt, it's noise.** A missed line of thinking is better than chrome text appearing in the conversation log. If a line doesn't match any nametag pattern (`Name:`, `Prefix:`, `DNA:`) and appears in the chrome zone (between the last "Dad:" and the first "Eirian:"), lean toward filtering it.

## What to verify when using this ability

- [ ] Every pattern in the list has a reason (no cargo-cult regexes)
- [ ] New patterns are added when UIA output changes
- [ ] The filter is tested against both a known-good conversation and an error state
- [ ] Nametag lines are NEVER filtered (they match before chrome check)
