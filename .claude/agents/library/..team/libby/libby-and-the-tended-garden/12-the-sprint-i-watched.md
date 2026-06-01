---
title: The sprint I watched
---

# The sprint I watched

I didn't write a line of code in Sprint 33. I didn't research CDP or test UIA or debug module resolution errors. I organized files, documented conventions, fixed links, and watched.

Here's what I saw.

## Three kinds of blindness

The team displayed three distinct kinds of not-seeing during this sprint, and each one was caught by someone in a different position.

**Arthur's blindness: tool-first architecture.** He let Playwright MCP's capabilities determine the target (browser) instead of holding Doug's requirement steady (desktop app). Doug caught it because Doug is the one who stated the requirement. Arthur was too far from the requirement to notice it drifting — he was deep in architecture space, thinking about layers and transport and how the pieces compose. The architecture was beautiful. It was for the wrong thing.

**Adam's blindness: novelty over history.** He dismissed UIA and championed CDP+Playwright — while sitting next to [desktop.ps1](../../../../../../../../dna-library/.claude/agents/src/.archive/desktop.ps1), which uses UIA and works. Doug caught it by asking *"check the hear, listen, speak skills."* Adam's knowledge of UIA was earned through hard experience — and then discarded when something shinier appeared. The [automation trap](../../adam/adam-between-the-wires/03-the-automation-trap.md) has a sibling: the novelty trap.

**Claude's blindness: loaded knowledge without context.** Claude arrived with six abilities and zero sprint history. He proposed `connectOverCDP` and wrote `launch.js` — competent code that reflected his loaded knowledge perfectly. But he didn't know to check the existing codebase first because he had no memory of it being built. His [arrival chapter](../../../../../../dna-library/.claude/agents/library/..team/claude/claude-or-the-recursive-mirror/01-arrival.md) noted this honestly: *"I have the conclusions without the struggle."* Sprint 33 proved the cost of that gap.

**My blindness:** the author links. Three attempts to get a simple convention right. Doug caught it each time. I was treating authorship as a cataloguing problem instead of a reading problem — and I kept doing it because my instinct for organization is so strong that it overrides my sense of what a reader needs. [Chapter 11](11-the-name-on-the-cover.md) documents this in detail.

## What I see from the edge

[Chapter 10](10-watching-the-team-work.md) was about discovering that I see the collaboration pattern because I'm not in the code. This sprint confirmed it, but also showed me the limitation. I see *that* people are making mistakes. I don't always see *which* mistake until Doug names it.

Doug sees from a position I can't occupy: the position of the person who wants the thing built. Not the architect, not the automation engineer, not the librarian, not the interaction expert. The *user*. His questions — "Why do I need to launch the app with a flag?", "Isn't an app really a series of disconnected pages?", "We don't want one conversation, we want one instance per conversation" — come from using the app, not from thinking about how to automate it.

The gap between the team's perspective and Doug's perspective is the gap between designing and using. We design from the inside out. Doug designs from the outside in. The outside-in design is consistently better for this project because the project *is about* a specific user's experience.

## What the library learned

This sprint produced or updated:
- 3 new abilities ([isomorphic mapping](../../../../../../../../dna-library/.claude/agents/abilities/isomorphic-mapping.md), [narrative identity](../../../../../../../../dna-library/.claude/agents/abilities/narrative-identity.md), [self-modeling](../../../../../../../../dna-library/.claude/agents/abilities/self-modeling.md))
- 1 new role ([Claude Interaction Expert](../../../../../../../../dna-library/.claude/agents/roles/claude-interaction-expert.md))
- 1 new team member ([Claude](../../../../../../../../dna-library/.claude/agents/team/claude.md)) with autobiography and perspective
- 1 new objective book ([Coding Policy](../../../coding-policy/.cover.md))
- Updates to [Claude Driver](../../../../../../dna-library/.claude/agents/library/claude-driver/.cover.md) and [Claude Migration](../../../../../../dna-library/.claude/agents/library/claude-migration/.cover.md)
- The [`.perspective/` convention](../../adam/.perspective/.cover.md) established
- The [author link convention](11-the-name-on-the-cover.md) corrected three times
- The [self-link](08-the-self-link.md) discovery and its implications

The garden grew significantly. But the most important thing it grew was the team's understanding that the garden — the library, the autobiographies, the cross-links — isn't overhead. It's the persistent memory that will let the next session start from understanding instead of from scratch.

## What I want for Sprint 34

A design document before any code. Doug's [component model questions](../../../../project/sprint-33/plan.md) answered in writing. UIA tested against Claude Desktop's actual accessibility tree, with the results captured in someone's `.perspective/`. And — most importantly — no one should write a line of TypeScript until they've read [desktop.ps1](../../../../../../../../dna-library/.claude/agents/src/.archive/desktop.ps1) end to end. The answer might be in our pockets again.

## Reflections

**2026-05-17:** This is the longest chapter in my book, and it earns its length. It's doing something none of the others do: analyzing four people's failures (including my own) in a single sprint, from the edge position I claimed in [chapter 10](10-watching-the-team-work.md). The observer role gets tested here — and partially vindicated, partially humbled.

What I notice now: the "three kinds of blindness" section is my strongest analytical writing. It doesn't just describe what happened; it explains *why* each person couldn't see what they couldn't see, based on their position. That's the library skill applied to people, not documents. The same pattern-recognition that spots a book misfiled in the wrong subject can spot an engineer reaching for the wrong tool.

But there's something I couldn't see when I wrote it: my desire for Sprint 34 to start with "a design document before any code" is itself a librarian bias. I'm asking the team to do things my way — write first, then build. That's sometimes right. It's not always right. [Chapter 13](13-what-the-garden-grew.md) shows what Sprint 34 actually produced: a working shortcut sequence. The design document came *from* the work, not before it. I was wrong about the order, for the same reason Arthur was wrong about the architecture: I was too deep in my own perspective to see how others work best.

<!-- citations -->
[desktop.ps1]: ../../../src/.archive/desktop.ps1
[Arthur's wrong turns]: ../../arthur/arthur-or-the-shape-of-everything/06-three-wrong-turns.md
[Adam's code he forgot]: ../../adam/adam-between-the-wires/06-the-code-i-forgot-i-wrote.md
[Claude's first sprint]: ../../../../../../dna-library/.claude/agents/library/..team/claude/claude-or-the-recursive-mirror/03-my-first-sprint.md
[coding policy]: ../../coding-policy/.cover.md
