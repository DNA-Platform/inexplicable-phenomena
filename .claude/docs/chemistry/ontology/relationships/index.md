---
kind: index
title: Relationships
status: evolving
---

# Relationships

How the entities connect. Each page names a *relationship* — a structural pattern that crosses two or more entities — and explains how it works.

| Relationship | Bridges |
|---|---|
| [reactive prop as React prop][rel-reactive-prop] | `$x` field on a chemical ↔ a React prop on its rendered output |
| [chemical as React component][rel-chemical-component] | `$Chemical` instance ↔ React `Component` (via the `Component` getter and `$lift`) |
| [particle and its derivatives][rel-derivatives] | held instance ↔ each `$lift` mount's prototypal child |
| [parent and catalyst][rel-parent-catalyst] | composed chemical ↔ its parent's catalyst graph (the `$parent` setter) |
| [template and instance][rel-template] | `$$template$$` ↔ `instance` (the first instance is the template) |

These pages are the *load-bearing* part of the ontology. An entity in isolation is a noun; the relationships are what make the framework do anything.

<!-- citations -->
[rel-reactive-prop]: ./reactive-prop-as-react-prop.md
[rel-chemical-component]: ./chemical-as-react-component.md
[rel-derivatives]: ./particle-and-its-derivatives.md
[rel-parent-catalyst]: ./parent-and-catalyst.md
[rel-template]: ./template-and-instance.md
