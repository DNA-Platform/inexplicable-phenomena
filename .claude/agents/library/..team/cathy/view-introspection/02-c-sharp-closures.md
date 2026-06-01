---
title: "C# closures: lifting state into invisible classes"
---

# C# closures: lifting state into invisible classes

Doug's intuition named this chapter: anonymous functions in C# are compiled down to invisible classes. You write a lambda; the compiler generates a class, lifts the captured locals into fields on that class, and rewrites the lambda as a method on it. The consumer never sees the class. It's *there* in the IL, not in the source.

That's the shape of the witness-object idea for $Chemistry. Before we design the witness, it helps to understand how C# does its version, because the engineering problems are closely analogous.

## The DisplayClass pattern

When you write `Func<int> f = () => x + 1;` in C#, the compiler does not emit a delegate that "remembers" `x`. IL has no concept of a free variable. Instead, the compiler performs **closure conversion**: it lifts `x` into a field of a synthesized class (conventionally named `<>c__DisplayClass0_0`), rewrites the lambda as a method on that class, and the delegate you hold is an ordinary `Func<int>` whose target is an instance of the class.

```csharp
// source
int x = 3;
Func<int> f = () => x + 1;

// roughly what Roslyn emits
sealed class <>c__DisplayClass0_0 { public int x; public int <M>b__0() => x + 1; }
var dc = new <>c__DisplayClass0_0();
dc.x = 3;
Func<int> f = new Func<int>(dc.<M>b__0);
```

The name `DisplayClass` is debugger-team jargon — the debugger is taught to unwrap it so captured locals appear as locals during inspection. Eric Lippert (former C# compiler lead) has commented that `ClosureClass` would have been clearer.

## Three capture profiles, three allocation costs

**No capture.** `() => 42` references only constants. Roslyn emits it as a `static` method on a sibling `<>c` singleton and caches the delegate in a static field. First invocation allocates one delegate; every subsequent invocation reuses it. Zero per-call allocation.

**Captures an instance field.** `() => this.y` doesn't need a DisplayClass — `this` is already a reference. The lambda is emitted as an instance method on the enclosing type; only the delegate gets allocated.

**Captures a local.** Full DisplayClass treatment: one allocation for the DisplayClass, one for the delegate, per execution of the enclosing method. The captured local's lifetime is extended to the DisplayClass's lifetime — a common source of surprise memory leaks.

## Multiple scopes chain

Each lexical scope that contributes captures gets its own DisplayClass (`<>c__DisplayClass0_0`, `<>c__DisplayClass0_1`, ...). A lambda capturing across scopes holds a reference from the inner DisplayClass to the outer one, forming a chain. This is why the classic `for (int i...) funcs.Add(() => i)` bug exists: `for` shares a single DisplayClass slot across iterations, so every lambda sees the final value.

## State machines: the same trick, different problem

`yield return` iterators and `async`/`await` methods use the same compiler technique — **rewriting the method as a state machine**. Roslyn generates a type with an `int <>1__state` field, one field per local, and a `MoveNext()` method containing a `switch` on the state that jumps to the correct resume label. In release builds the async state machine is a *struct* that gets boxed only if the method actually suspends — the hot "already completed" path is allocation-free.

Closures, iterators, and async are the same move applied to different problems: **promote stack state to heap state so a single method body can be re-entered with its context intact**.

## Why this matters for $Chemistry

The witness-object idea is structurally identical to closure conversion:

- **View is a method on a chemical.** Like a C# lambda on an outer method.
- **The view "captures" reads of `this.X`, intermediate computations like `this.$items[this.$index]`, and values that flow into the DOM.**
- **At compile time, we lift those captured values into a flat record — the witness — that lives alongside the chemical for as long as the render does.**
- **The consumer of view (the user of $Chemistry) doesn't see the witness.** It's compiled in, like DisplayClass.

The C# compiler has been doing this for ~20 years at production scale. The engineering pattern is well-understood: parse → identify captures → emit lifted class → rewrite method body to reference the class → adjust lifetimes. Each step is tractable.

The key engineering lesson from C# closures: **the hard part is tracking what gets captured**, not generating the class. In C#, the compiler does dataflow analysis to determine which locals cross the lambda boundary. For our witness, we'd do an analogous analysis over `view()` to determine which `this.X` reads, intermediate subexpressions, and external reads flow into the JSX output.

The next chapter looks at React Compiler — an existence proof that this analysis is feasible for JSX, in 2025, shippable at Meta scale.
