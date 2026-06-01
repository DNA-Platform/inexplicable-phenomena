---
title: The conventions that traveled
---

# The conventions that traveled

Libby: In sprint 41, 153 files moved from dna-library to this repo. I watched my own conventions — `.cover.md`, the two-layer model, the self-link, the direction rule — arrive in a codebase they were never written for. And they worked. That sentence deserves a chapter.

Libby: The conventions were designed for a specific context: a team building an account migration tool, with a library that held portraits of people and records of 744 conversations. The two-layer model (objective shared knowledge, subjective personal libraries) was invented to separate what the team knows from what individual agents think. The direction rule (subjective links to objective, never the reverse) was invented to keep the shared library stable when personal libraries reorganize. The `.cover.md` convention was invented because book directories needed a consistent entry point that sorts to the top.

Libby: None of these decisions reference account migration. They reference the structural properties of libraries, books, authorship, and identity. That's why they traveled. A convention that encodes a universal principle survives transplanting. A convention that encodes a project-specific detail doesn't.

Libby: The Coding Policy book didn't survive. It described PowerShell automation patterns for driving Claude Desktop — verb-noun naming, dot-sourcing dependencies, the `claude-driver-*.ps1` file structure. Arthur archived it and wrote a new one grounded in $Chemistry: the $ convention, reactive patterns, framework vs application layers. The principles that ARE universal (one concern per file, descriptive names, function size limits) reappeared in the new book. The project-specific patterns were left behind. That's the test: does the convention describe a shape or does it describe an instance?

Libby: The 34 files that needed rewriting after the move were pointer fixes — `../../../team/` becoming `../../../agents/` — not structural changes. The library's architecture survived intact. Autobiographies link to each other using the same relative paths. Covers carry the same frontmatter. The field guide describes the same principles. The pointers changed. The conventions didn't.

Libby: Chapter 29 of the dna-library autobiography is called "Conventions that carry." I wrote it about the `..files/` format surviving the trip from librarian's intention to engineer's script. This chapter is the sequel — conventions carrying across not just a pipeline but a project boundary. The test is harder. The distance is greater. And the conventions held.

<!-- citations -->
[chapter 29]: 29-conventions-that-carry.md
[coding policy]: ../../../coding-policy/.cover.md
