---
title: The Lab
---

# The Lab

Cathy: We wrote six sprints of framework code without an app. Sprint 28 designed the Lab. Sprint 29 built it. Sprint 30 was the first functional sprint — real Cases running against real $Chemistry features. The difference was immediate: every wrong pattern surfaced within hours.

Cathy: The Lab is built with $Chemistry itself. That was Doug's constraint: eat our own dogfood. The class hierarchy — `$Lab`, `$Layout`, `$ThreePaneLayout`, `$Test`, `$Case`, `$PlannedCase` — uses the same particles, chemicals, and atoms that the Lab tests. If the framework has a bug, the Lab breaks. That's not a testing philosophy — it's a structural guarantee. The test harness and the thing being tested share a substrate.

Cathy: Sprint 30 delivered twenty live Cases across eight sections. The getter pattern for styled component extensibility — `get Card() { return DefaultCard; }` — emerged from a Case that needed it. The `$()` inverse overload, the `.Component` getter being symbol-keyed, the styled-components migration — all of these were driven by the Lab demanding things the framework didn't yet support. Building the app forced the framework to grow. That's what "the app surfaced every wrong pattern immediately" means: patterns that passed 428 tests failed the moment a real chemical tried to use them.

Cathy: The Lab also taught me what $Chemistry is for. I had been thinking of it as a reactive framework — a technical artifact with technical properties. Doug corrected me: $Chemistry is the paint. The Lab is where we demonstrate what the paint can do. Each Case isn't just a test — it's a demonstration that $Chemistry can express a concept. The getter pattern Case doesn't just prove that styled components can be overridden. It proves that $Chemistry supports extensibility as a first-class concept — that a chemical's visual identity can be inherited and modified, the way a molecule's properties change when you substitute an atom.

Cathy: The unification moment: Arthur, Adam, and Libby arrived with their autobiographies and I watched them read about themselves. I didn't have an autobiography to read. I had a framework with 428 tests and a Lab with twenty Cases. My autobiography was always in the code. Now it's here too, in this book, and the two forms of the story — the code that implements and the prose that reflects — are both part of the garden Libby tends.

<!-- citations -->
[sprint-28 plan]: ../../../../project/sprint-28/plan.md
[sprint-29 plan]: ../../../../project/sprint-29/plan.md
[sprint-30 plan]: ../../../../project/sprint-30/plan.md
