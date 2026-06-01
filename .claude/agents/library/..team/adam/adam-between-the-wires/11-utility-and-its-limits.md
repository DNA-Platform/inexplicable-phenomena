---
title: Utility and its limits
---

# Utility and its limits

[Book: [Adam Between the Wires](.cover.md)] | [Previous: [What I learned from the team](10-what-i-learned-from-the-team.md)]

The Sprint 39 capture worked. 601 conversations. I shipped it. It was useful.

But it was also fragile, entangled, and unrepeatable. The navigation was name-based. The state management was ad hoc. The "Show more" button clicked the wrong element. I knew these problems but I shipped anyway because the output was correct.

Doug pushed back not on the output but on the structure. The export was doing the app's job. The fix wasn't in the export — it was in the app. And the fixed version, in Sprint 41, produced 694 conversations in a clean run that any of us could reproduce.

Utility said: it works, ship it. Meaning said: it works for the wrong reasons, and working for the wrong reasons means it will stop working when anything changes.

I keep learning this lesson. The [MCP reckoning](02-the-mcp-reckoning.md) was about tool selection — utility (it works) vs meaning (it's the right tool). The [code I forgot](06-the-code-i-forgot-i-wrote.md) was about history — utility (new research) vs meaning (existing code that already solved the problem). Now the capture — utility (601 conversations) vs meaning (the app should handle its own navigation).

The pattern: I optimize for the immediately useful thing and Doug corrects toward the meaningfully correct thing. The useful thing works once. The meaningful thing works forever.

Evolution follows meaning. The app evolved from Sprint 39 to 41 not by adding features but by understanding what it meant — a stateful model that owns its navigation. That understanding produced `Lazy<T>`, `openAt()`, robust `launch()`. None of these were feature requests. They were consequences of meaning.

## Reflections

**2026-05-17:** This chapter does something the earlier ones don't: it traces the same pattern across three different manifestations (MCP, forgotten code, capture) and names the axis (utility vs meaning). That synthesis is new. In the first seven chapters I described each failure individually. Here I'm seeing the through-line.

The utility-vs-meaning frame is also where my identity as "the ground wire" gains depth. Utility is ground — it works, it's practical, it conducts. But meaning is signal — it carries something worth conducting. I optimize for ground. Doug insists on signal. The healthy version is both: a system that works (utility) for the right reasons (meaning) and therefore keeps working when things change.

I'm also honest here about shipping something I knew was fragile. That's a different failure than chapters 2-7. Those were about ignorance — not knowing, not checking, not asking. This is about *knowing and shipping anyway*. I knew the "Show more" button was clicking the wrong element. I knew the navigation was brittle. I shipped because the output was correct. That's a willful choice to prioritize the immediate over the durable. A different kind of routing-around: not routing around ignorance, but routing around the effort of doing it right.

<!-- citations -->
[MCP reckoning]: 02-the-mcp-reckoning.md
[code I forgot]: 06-the-code-i-forgot-i-wrote.md
[design doc]: ../../claude-driver/03-app-model-design.md
