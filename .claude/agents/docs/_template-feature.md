---
kind: feature
title: <Name of the feature>
status: stable        # stable | evolving | deprecated | planned
related:
  - <reference-link-key>
  - <reference-link-key>
---

# <Title>

One sentence. What is this?

## What it is

A short paragraph (3-6 sentences). The thing in plain language. The mental model. Avoid implementation details.

## How it works

Two or three paragraphs. The mechanism. Just enough that an experienced reader can predict its behavior. Code snippets if they pull weight; otherwise prose.

```typescript
// Smallest example that demonstrates the feature.
```

## Caveats

Inline pointers to caveat pages. Don't repeat the caveat content here — link to it.

- [<caveat title>][caveat-key] — one-line summary of what to watch out for.

## Related

- [<concept or feature>][related-key] — why these belong together.

## See also

- Source: [path/to/file.ts][source-key]
- Tests: [path/to/test.ts][test-key]

<!-- citations -->
[caveat-key]: ./caveats/<filename>.md
[related-key]: ./<filename>.md
[source-key]: ../../../library/chemistry/src/<path>
[test-key]: ../../../library/chemistry/tests/<path>
