---
title: Framework vs application
---

# Framework vs application

Arthur: The codebase has three layers with different audiences and different rules:

## `library/chemistry/src/` — the framework

Cathy: This is the reactive framework itself. The audience is framework developers (primarily Cathy). Code here defines `$Particle`, `$Chemical`, `$Atom`, the scope system, the bond system, the synthesis pipeline. Changes here affect every application built with $Chemistry.

Cathy: Rules: maximum test coverage (428 tests and counting). No application-specific concepts. The `$()` function is the sole public surface. Internal symbols are symbol-keyed to prevent accidental access from application code. Every public API decision gets discussion — three voices propose, Doug signs off.

## `library/chemistry/app/` — the Lab

Phillip: This is the $Chemistry Lab — the test harness and demonstration app. The audience is framework users and Doug. Code here uses `$Chemistry` to build interactive Cases that prove the framework works. Every Case has visible code, a live demo, and automated verdicts.

Phillip: Rules: eat our own dogfood. No raw React function components in content. All styling through styled-components. The class hierarchy (`$Lab`, `$Layout`, `$Test`, `$Case`) uses $Chemistry's own reactive model. If the framework has a bug, the Lab breaks — that's a feature.

## `library/.public/` — the public face

Arthur: This is the GitHub Pages site — currently the teaser page. The audience is the world. Code here uses `$Chemistry` to present the project's ideas.

Arthur: Rules: beautiful. The teaser page is, in Doug's words, an attempt to create something that is "in some small way, an inexplicable phenomenon itself." The code serves the communication of ideas about consciousness. $Chemistry is the paint; this directory is the canvas.

## Dependency direction

Arthur: `.public/` depends on `chemistry/`. `chemistry/app/` depends on `chemistry/src/`. `chemistry/src/` depends on nothing. Dependencies flow inward. The framework never knows about its applications.

<!-- citations -->
[chemistry src]: ../../../library/chemistry/src/
[chemistry app]: ../../../library/chemistry/app/
[public library]: ../../../library/.public/
