---
title: "The problem: precision without the cost of deep snapshots"
---

# The problem: precision without the cost of deep snapshots

The post-lifecycle diff in $Chemistry exists to answer one question: *did lifecycle-phase state mutations change anything the view depends on?* If yes, re-render; if no, commit as-is.

The [reactivity-models book](../reactivity-models/) walked through how other frameworks answer this. The baseline $Chemistry should adopt is **deep state snapshot**: capture all bonded state after the main render's `view()`, capture it again after effects resolve, compare. Any change → force update. This is correct, O(state size) per commit, and matches the "mutate plainly and the framework figures it out" idiom $Chemistry wants.

So why do we want more?

## Deep snapshot's cost profile

Deep snapshot cost is proportional to the size of the chemical's reactive state. For small chemicals — a counter, a form field — this is negligible. For rich chemicals — a table row with 30 bonded fields backing a view that only reads 3 of them — we're comparing 27 properties every render that view doesn't care about.

Deep snapshot is also *defensive*: because it doesn't know what view reads, it has to snapshot everything, and compare everything. It can't short-circuit on the basis of "the view never looks at `$metadata`, so skip that." It doesn't have that information.

## Deep snapshot's correctness profile

Deep snapshot is correct modulo the chemical's state surface. If the chemical reads external state in view (`Date.now()`, `window.innerWidth`), deep snapshot misses it. If the chemical stores state in a place the framework doesn't track (a module-level variable, a Map owned by some other module), deep snapshot misses it.

Neither of these is a deep-snapshot *bug*. They're out-of-scope by design. But they are limitations we should state clearly — and if there were a mechanism that *also* covered external-state reads, it would be strictly better.

## What a compile-time view analysis would give us

If we knew *exactly* what view reads, we could:

1. **Snapshot precisely.** Capture only the intermediate values view actually depends on — not all bonded state.
2. **Cover external-state reads.** If view reads `Date.now()`, the witness contains that time. A later check sees the time advanced and re-renders (or doesn't, depending on design).
3. **Warn about suspicious reads.** View reads `this.count` but `count` isn't bonded — maybe a bug? Compile-time warning.
4. **Generate documentation.** Each chemical's dependency set becomes a machine-readable artifact.

The witness-object design is the concrete mechanism for (1) and (2). Static warnings (3) and dep-graph docs (4) fall out as bonus properties.

## Why this isn't premature optimization

Deep snapshot will work for $Chemistry's near-term use cases. But three things make this worth thinking about *now*:

1. **The architecture decision is load-bearing.** If we build the post-lifecycle diff around deep snapshot, and later want to layer a precise analysis on top, we need to have kept the seams clean. The book exists partly to make sure future-us doesn't paint into a corner.
2. **The Self/Scheme ethos.** $Chemistry is explicitly trying to be a framework that treats JavaScript as the metaprogrammable language it is. Introspecting view source is *exactly* the kind of move that expresses the framework's identity, even if we don't ship it tomorrow.
3. **React Compiler happened.** Meta's React Compiler shipped a 1.0 in late 2025. The question "can production frameworks rely on compile-time analysis of component source?" has been answered: yes. We no longer have to defend the premise.

## What this book is not

This is a *design* study. It's not an implementation plan. No code gets shipped from this book directly. What ships is Cathy's understanding of what this *would* look like, enough to:

- Rule it in or out for future sprints.
- Avoid architectural decisions that would foreclose it.
- Answer Doug the next time he asks "can we make the post-render check precise?"

The next chapter looks at C# closures — not because $Chemistry is going to emit .NET assemblies, but because C#'s closure compilation is the canonical example of *lifting state into invisible classes*, which is the conceptual move Doug's proposal makes for JSX.
