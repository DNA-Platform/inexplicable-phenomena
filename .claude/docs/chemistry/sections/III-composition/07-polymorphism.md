---
kind: catalogue-section
section: III.7
title: Polymorphism without props
status: stub
---

# § III.7 Polymorphism without props

## Definition

A `$Chemical` subclass can change appearance simply by overriding a property whose type is another `$Chemical` class. Because the parent's `view()` references the property by name (e.g. `this.Card`), and because the subclass's prototype shadows the property, the parent's render code is unchanged while the visible result differs. This is polymorphism delivered by the prototype chain rather than by props.

## Rules

- *(TBD — subclass overrides a class-typed property.)*
- *(TBD — parent's `view()` is unchanged.)*

## Cases

- `$VeganRecipe extends $Recipe { Card = VeganCard }` — same parent code, different card.

## See also

- [§ III.1 The class][s-III-1] — the composition base.
- [§ III.3 The binding constructor][s-III-3] — where typed children land.

<!-- citations -->
[s-III-1]: ./01-the-class.md
[s-III-3]: ./03-binding-constructor.md
