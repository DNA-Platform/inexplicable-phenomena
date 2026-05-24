---
title: Legacy Bond Classification System
author: ../../../agents/libby.md
summary: Complete catalog of $Bond/$Bonding/$Molecule from the legacy chemistry repo — member flags, async tracking, formula serialization, and what was lost in the port
links:
  - cathy/reactivity-models
---

# Legacy Bond Classification System

The legacy `$Chemistry` repo at `c:\Source\dna-platform\chemistry` contains the original `$Bond`, `$Bonding`, and `$Molecule` classes in `src/archive/chemistry-new.ts`. These were the source material for the current framework's `$Bond`, `$Reagent`, and `$Molecule` in `library/chemistry/src/abstraction/`.

This book catalogs what the legacy system tracked about members, how it classified them, and — critically — what the port dropped. The current framework's bond system is simpler, but that simplicity was accidental, not intentional. Several classification flags were silently lost.

Primary source: `c:\Source\dna-platform\chemistry\src\archive\chemistry-new.ts` (2703 lines).

## Chapters

1. [Member classification flags](01-member-classification.md)
2. [Port gap analysis](02-port-gap-analysis.md)
