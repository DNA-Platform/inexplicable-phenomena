---
kind: stub
title: Open question — isView symbol branch
status: open
---

# Open question: isView symbol branch

## The question

A code path in the view-detection logic checks for a symbol-keyed marker that may be unreachable in current usage. Migrated from a sprint-26 AUDIT comment.

## What we suspect

Either the branch is dead and should be deleted, or it covers a case that no current test exercises and should be confirmed by Lab specimen. The cost of the wrong choice is small (dead branch is cosmetic), but the question is on the list.

## Path to resolution

- Identify the exact branch in source.
- Check whether any test exercises it. If yes, document the case and pin it. If no, write a specimen for the case, confirm behavior, then either delete the branch or pin it.

<!-- citations -->
