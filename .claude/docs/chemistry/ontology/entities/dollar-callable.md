---
kind: redirect
title: $() (entity)
status: stable
---

# The `$()` callable

The dispatch surface. `$(thing)` selects behavior by the *shape* of `thing`: class → mount-by-class, instance → mount-by-instance, JSX → mount-as-element, string → HTML catalogue lookup.

This page is part of the **ontology spine**: it names the entity and points at the substantive treatment.

- Surface and signature: see [feature page][feat-dollar-callable].
- The shape-based dispatch is itself surprising; the rationale lives in [dollar-dispatch][surprising-dispatch].

<!-- citations -->
[feat-dollar-callable]: ../../features/dollar-callable.md
[surprising-dispatch]: ../surprising/dollar-dispatch.md
