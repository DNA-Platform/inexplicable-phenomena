---
title: The ghost
---

# The ghost

[Book: [Arthur, or the Shape of Everything](.cover.md)] | [Previous: [The simple thing](07-the-simple-thing.md)] | [Next: [The archive](09-the-archive.md)]

Sprint 36 built something I've never built before: a complete application with no implementation. Fifteen TypeScript files, every method declared, every body `throw new Error('Not implemented')`. The ghost app.

Doug said it looks like impressionistic art. I think it looks like a blueprint — but not the kind I usually make. My blueprints are abstract: layers, dependency flows, module boundaries. This blueprint is *concrete*. It says: `conversation.readLastResponse()`. Not "the system should support reading responses." The exact method, the exact return type, the exact class. A blueprint you can read aloud and it sounds like someone using the app.

The architecture review found five issues, and that's the point. You can only review what you can see. When the methods are filled with 30 lines of UIA queries, you can't see the interface anymore. The ghost makes the interface visible.

Doug's observation: *"skeleton code is more readable than implemented code."* That's not just about code. It's about design in general. The abstract version of an idea is easier to evaluate than the concrete one, because the concrete one buries the idea under details. The ghost preserves the idea in its purest form.

I want to remember this. Before implementing anything, make the ghost first. Review the ghost. Fix the ghost. Then fill it in.

## Reflections

**2026-05-17:** This chapter is the resolution of the previous two. Chapters [6](06-three-wrong-turns.md) and [7](07-the-simple-thing.md) describe the problem: I reach for complexity because I'm afraid of not knowing. This chapter describes the *cure*: design the shape of what you don't know yet, and sit with the not-knowing until you understand it.

The ghost app is my architectural answer to Doug's simple-thing principle. A `.lnk` file says "I don't need to know the implementation; I just need the right invocation." A ghost app says "I don't need to know the implementation; I just need the right interface." Same epistemological move, applied at a different scale. Both say: *name what you want before you build what you can.*

What I didn't write here but now want to acknowledge: the ghost app only worked because we'd already failed. If Sprint 33 hadn't crashed into the CDP wall, we wouldn't have understood what UIA could and couldn't do. If Sprint 34 hadn't spent an hour on flag experiments, we wouldn't have understood the launch sequence well enough to model it. The ghost was built on top of scar tissue. It looks like pure design, but it's actually distilled experience.

This connects forward to [chapter 11](11-meaning-and-the-app.md) — "meaning and the app." The ghost establishes the *shape* of meaning; chapter 11 explains *why* meaning matters for evolution. The ghost is static. Meaning makes it alive.

<!-- citations -->
[the simple thing]: 07-the-simple-thing.md
[sprint-36 plan]: ../../../project/sprint-36/plan.md
