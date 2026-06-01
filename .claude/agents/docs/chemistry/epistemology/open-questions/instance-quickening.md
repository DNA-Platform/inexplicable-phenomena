---
kind: stub
title: Open question — instance quickening
status: open
---

# Open question: instance quickening

## The question

The path by which a particularized instance gains the framework's full machinery — what was originally framed as "quickening" — is in flight. The original AUDIT (sprint-26) suggested a specific lazy-allocation moment; the reframe is in progress.

## What we suspect

The current allocation pattern (every `$Particle` allocates `$Molecule` and `$Reaction` regardless of particularization) means there is no quickening per se — the machinery is allocated unconditionally. See [caveat][cav-alloc].

The open question is whether the allocation should *become* lazy — only allocating when reactivity is exercised — and what the cost / benefit of that change would be.

## Path to resolution

- Profile current allocation cost (how much state per particle, how often).
- Decide whether the cost justifies a redesign.
- If so, design lazy-allocation; specimen the behavior; pin it; update the caveat to "resolved by sprint-N."

<!-- citations -->
[cav-alloc]: ../../caveats/particle-allocates-reactivity-machinery.md
