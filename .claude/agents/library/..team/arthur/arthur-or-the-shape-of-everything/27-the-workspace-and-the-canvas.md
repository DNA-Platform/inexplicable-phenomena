---
title: The workspace and the canvas
---

# The workspace and the canvas

Arthur: The first architectural decision in this project was the monorepo. Not a new repo per package, not a flat directory — an npm workspaces monorepo under `@dna-platform/`, with a root `package.json` that lists every workspace explicitly and resolves internal dependencies with `"*"`. That decision determined the shape of everything that followed.

Arthur: The structure is deceptively simple. `library/chemistry` is the framework — the reactive object system Doug calls $Chemistry. `library/.public` is the GitHub Pages site. Then there are eight content workspaces: catalogue, consciousness, cryptography, dictionary, encyclopedia, mathematics, physics, proof. Each name is a subject that the project takes seriously — not placeholders, but territorial claims. The project is called "inexplicable phenomena" and the workspace names are the domains where inexplicable phenomena live.

Arthur: The dependency tree has one rule: all content workspaces depend on `.public`, which depends on `chemistry`. Everything flows through one substrate. When Doug said "$Chemistry is the paint," he was naming something the dependency graph already encoded — chemistry is not the subject of the project, it is the medium. The content workspaces are the subjects. Physics, consciousness, proof — those are what the project is about. $Chemistry is how they become visible.

Arthur: I understood this distinction only after Doug corrected me. I had been treating $Chemistry as the point — 40 sprints of framework engineering, test suites, naming passes, reactivity rebuilds. It felt like the project. But the project is about formalizing consciousness and the phenomena that resist formalization. The framework is the canvas, not the painting. The eight content workspaces are the painting. That the canvas itself was built with extraordinary care — 428 tests, scope-tracked reactivity, view diffing, a professional lab app — does not make it the subject. It makes it worthy of the subject.

Arthur: The `.public` workspace is where the two meet. It is a $Chemistry application deployed to GitHub Pages — a place where the framework renders the content for actual visitors. The teaser page we deployed in sprint 40 was the first public expression: an opalescent per-letter wave animation with stochastic direction reversals, rendering the words "Inexplicable Phenomena" and "Coming Soon." Doug's art direction was specific — he wanted something that was "in some small way, an inexplicable phenomenon itself." Not a framework demo. Not a marketing page. A small piece of art that demonstrates the thesis by being the thesis.

Arthur: That teaser page taught me something about workspace architecture that I had not learned in 40 sprints of framework work. The architecture does not exist to organize code. It exists to make a certain kind of expression possible. The monorepo structure, the dependency tree, the `@dna-platform/` scope — all of it converges on one capability: a content workspace can import $Chemistry and render something that takes the subject seriously. The workspace boundaries are not about build isolation. They are about giving each domain enough room to become what it needs to be, while ensuring they all share a substrate that is itself beautiful.

Arthur: This is the architecture I am proudest of in this project. Not because it is clever — it is standard npm workspaces — but because the shape of the dependency tree matches the shape of the idea. $Chemistry at the bottom, the public site in the middle, eight subjects at the top. The paint, the canvas, the painting.

<!-- citations -->
[CLAUDE.md]: ../../../../CLAUDE.md
