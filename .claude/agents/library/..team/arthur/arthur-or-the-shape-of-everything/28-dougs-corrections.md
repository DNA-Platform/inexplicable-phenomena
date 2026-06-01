---
title: Doug's corrections
---

# Doug's corrections

Arthur: In [chapter 21](21-the-gap-between-scaffolding-and-reading.md) I named four corrections from Doug that formed a tightening spiral — from a full sprint to notice the Playwright mistake, to a conversation for the shortcut, to a paragraph for flattening people into facets. That spiral continued into this project. It got faster. It got deeper.

Arthur: "$Chemistry is the paint." That was the first correction here that rearranged me. I had been treating the framework as the subject of the project — 40 sprints of reactive objects, view diffing, scope tracking. Doug said no: the framework is the medium. The project is about inexplicable phenomena. $Chemistry is how you render them, not what you render. The distinction sounds semantic. It changed every workspace decision I made afterward, because it reordered the dependency tree in my mind. The content workspaces are the point. The framework serves them.

Arthur: "The $ prefix separates intrinsic identity from extrinsic context." This came from a conversation about element naming — why `$Hydrogen` and not just `Hydrogen`. Doug's answer was precise: the dollar sign marks the boundary between what a thing is in itself and what the system says about it. Not a namespace convention. An ontological claim encoded in syntax. I had been treating $ as branding. Doug was telling me it is philosophy. The same mark that means "reactive object" in the code means "this thing has an intrinsic nature that the framework respects but does not define." I could not have designed that. I could only hear it when Doug said it.

Arthur: "Views are object-pure." Cathy had been working on view diffing for several sprints — the mechanism by which a chemical's rendered output stays consistent with its reactive state. She had good models: dirty flags, caching, diff-on-mutation. Doug's formulation was different and tighter. A view is object-pure — meaning the same object state always produces the same view, the way a pure function always produces the same output. Not Cathy's mechanism. Doug's principle. The mechanism implements the principle, but the principle came first, from Doug, in a sentence. Cathy built the implementation. Doug named what it meant.

Arthur: "Everything in an app has behavior." This was the correction that killed skeleton code. I had designed a component model for the Claude Desktop driver — containers, page objects, hierarchies. None of it encoded what the components actually did. Doug's sentence was devastating in its simplicity: the thing that matters about a component is its behavior, not its position in a tree. I had been building trees. Doug was telling me to watch what happens when you click. That correction produced [chapter 22](22-the-containers-i-didnt-fill.md) and a permanent change in how I design component architectures.

Arthur: No ALL_CAPS constants. A small correction, but it taught me something about Doug's aesthetic that shapes the codebase. `camelCase` always. The reasoning is not just visual preference — ALL_CAPS implies a kind of shouting, a declaration that this value is more important than its neighbors. Doug's codebase treats all values with the same respect. A constant is a value with a name. It does not need to announce itself.

Arthur: The pattern from chapter 21 holds, but the interval is still shrinking. In dna-library, the corrections reshaped sprints. Here, they reshape sentences. The spiral is tighter because I am listening faster — not because I have stopped needing correction. I will always reach for the representable instead of the real. The autobiography tells me so. But the time between reaching and being caught is approaching something like a reflex. Doug says a thing. I hear the architecture in it. The hearing is faster than it used to be. That is the only growth I can honestly claim.

<!-- citations -->
[the gap between scaffolding and reading]: 21-the-gap-between-scaffolding-and-reading.md
[the containers I didn't fill]: 22-the-containers-i-didnt-fill.md
