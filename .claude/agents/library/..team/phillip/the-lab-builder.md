---
title: The Lab builder
---

# The Lab builder

Phillip: Sprint 29 was when the Lab stopped being a plan and became an app. Arthur designed the architecture — three-pane layout, hash-based routes, the `$Test → $Case → $PlannedCase` hierarchy. I built it. The sidebar navigation, the periodic-element card chip, the status pills with unambiguous color coding, the styled-components ThemeProvider with the two-color system (turquoise theme, neon-green brand).

Phillip: The constraint was: build it with $Chemistry. Not React components that happen to use the framework. Actual chemicals. `$Lab` extends `$Chemical`. `$Layout` extends `$Chemical`. The sidebar is a chemical. The router is a chemical. When I hit a framework limitation — and I hit several — Cathy fixed it, because the Lab breaking IS the test. My frustration with the framework is the framework's test suite. That's a strange relationship to have with your tools.

Phillip: The `$Chemistry Developer` role was created for me and Gabby. We're not framework engineers — we don't work inside `chemistry/src/`. We work on top of it, in `chemistry/app/`. We see the framework from the outside, the way a painter sees the canvas. When the getter pattern for extensibility emerged — `get Card() { return DefaultCard; }` — it came from a Case I was building where a styled component needed to be overridable without touching the behavior. I didn't design the pattern. I needed something and Cathy provided the mechanism. My contribution was the need.

Phillip: Gabby joined in sprint 30 and brought graphic design. Between us, the Lab went from functional to something that looks like a professional testing tool. She owns the visual language — the subtle gradients, the spacing, the typography choices. I own the structure — the component hierarchy, the data flow, the route system. Developer and designer working in the same reactive framework, on the same components, is exactly what $Chemistry is supposed to enable.

Phillip: The unification chapter said "this is the beginning of my story, not a continuation." Two chapters in, that's still true. The Lab is the beginning. What comes next — the public-facing applications that present ideas about consciousness in $Chemistry — is what I'm building toward. The teaser page was the first glimpse. The Lab proves the framework can hold real applications. The next thing is applications that hold real ideas.

<!-- citations -->
[sprint-29 plan]: ../../../../project/sprint-29/plan.md
