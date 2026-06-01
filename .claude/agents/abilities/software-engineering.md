# Software Engineering

Principles for writing maintainable, correct code. Covers refactoring, DRY, single responsibility, and Gang of Four patterns relevant to framework development.

---

## Refactoring

Refactoring changes structure without changing behavior. The tests must pass before AND after.

**Extract Method:** When a block of code has a comment explaining what it does, extract it into a method whose name IS the explanation. The comment becomes unnecessary.

**Inline Method:** When a method's body is as clear as its name, inline it. Don't create indirection for one-line operations.

**Move Method:** When a method uses more data from another class than its own, move it to the class it's most coupled with.

**Replace Conditional with Polymorphism:** When a switch/if chain selects behavior based on type, replace with subclass overrides. This is core to $Chemistry — `$VeganRecipe` overrides style properties instead of the parent checking `if (recipe.isVegan)`.

---

## DRY (Don't Repeat Yourself)

Every piece of knowledge must have a single, unambiguous, authoritative representation in the system.

**When to apply:** If changing one thing requires changing it in two places, the knowledge is duplicated. Extract it.

**When NOT to apply:** Three similar lines are better than a premature abstraction. DRY is about KNOWLEDGE duplication, not CODE duplication. Two functions that happen to look similar but represent different concepts should NOT be merged.

**In $Chemistry:** The `$` grammar is DRY — the naming convention encodes the intrinsic/extrinsic distinction once. The template pattern is DRY — defaults live on the template, instances inherit.

---

## Single Responsibility Principle

A class should have one reason to change. A function should do one thing.

**In $Chemistry:**
- `$Particle` — identity and lifecycle. One responsibility.
- `$Chemical` — composition and templates. One responsibility (built on particle).
- `$Molecule` — structural metadata. One responsibility.
- `$Bonding` — method wrapping and re-render triggering. One responsibility.
- `$BondOrchestrator` — child processing. One responsibility.
- `reconcile` — view comparison. One responsibility.
- `walk` — tree traversal. One responsibility.

**Test:** "If I change X, does this class need to change?" If yes, the class has responsibility for X. If it has responsibility for X AND Y, consider splitting.

---

## Gang of Four Patterns in $Chemistry

| Pattern | Where | Purpose |
|---------|-------|---------|
| **Template Method** | `$Chemical.view()` | Subclass overrides view; framework calls it |
| **Prototype** | `Object.create(template)` | Instance creation by cloning |
| **Observer** | `$Bonding` → `$update$` | Method mutation notifies React |
| **Composite** | Binding constructors | Parent-child trees of chemicals |
| **Strategy** | Style properties as class fields | `$VeganRecipe.Card = VeganCard` swaps strategy |
| **Decorator** | `@inert()` | Annotates properties without subclassing |
| **Facade** | `.Component` | Hides framework internals behind one accessor |
| **Chain of Responsibility** | Prototype chain | Property lookup walks the chain |
| **Flyweight** | CID counter | Lightweight identity without UUID overhead |

---

## Code Smells in Framework Code

- **Feature Envy:** A method that reaches into another object's internals. Use symbol-keyed properties to keep internals hidden.
- **Shotgun Surgery:** A change that requires touching many files. Indicates scattered responsibility.
- **Primitive Obsession:** Using strings/numbers where a domain type would be clearer. The `$Phase` type is the cure for passing phase strings around.
- **Dead Code:** Code that can't be reached. We identified and removed `$symbolize`, `formula()`, `read()` from rendering paths. Keep hunting.
