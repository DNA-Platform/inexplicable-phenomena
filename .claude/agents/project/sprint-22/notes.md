# Sprint-22 — Notes stash

Not a plan yet. Raw thoughts captured mid-discussion, to be folded into the sprint plan after the team finishes the feature-gap review of the old test app.

## Abstraction audit (in-flight)

See the preceding team discussion. Cleared so far:

- Keep `$Bond`. Reactions make and break bonds to alter chemical state — that's why the trigger is called `react()`. The cluster is coherent.
- Every reactive property is a bond; primitive-valued bonds go to an *implicit hydrogen*, chemical-valued bonds go to a visible chemical. The distinction is diagram-level, not class-level.
- `$Atom extends $Chemical` is type-correct ("an atom is a kind of chemical"). Composition ("chemicals are made of atoms") is a different axis — Doug wants to explore it separately, later.
- Still to rename: `$Bonding` (methods), `$Parent` (parent-ref). Method candidates: `$Reagent` (Path A, small churn); `$Reaction` with a rename of the current `$Reaction` port to `$Reactor` (Path B, tighter metaphor).

## Lexical scoping + Component API (Doug, dropped mid-audit)

Doug's working notion, to be folded into the sprint once the feature review lands:

- Lexical scoping is the gap he hit when trying to use a chemical at multiple sites. The current framework doesn't really address it.
- To fix: extend the "template" concept to all chemicals. Being a *template* stops mattering; being *formed* matters instead.
  - The template starts formed.
  - When a template produces new instances, they aren't formed until rendered.
  - When they become formed, they hand out a new version of the component — or we manage that state internally the way we do for templates today.
- Encourage the semantics that *using* a chemical is *using its view as a component*. Ideas (brainstorm, not locked):
  - Maybe drop the `.Component` property entirely.
  - `chemical.view` → a component with no props.
  - `$(chemical)` → `$$Component<T>` with optional props. (Affection for the jQuery homage.)
  - `$($Chemical, [args])` / `$(chemical, [args])` → component with props; also initializes the template.
  - The `$` symbol would carry a dual callable/component nature.
- Doug: *"this is necessary to get that sort of thing right to handle bond construction, because chemicals which have been rendered already are what happens in there."*

## Feature-gap review (active)

Task from Doug: compare the old `../chemistry` test app / archive to the current framework and list what's used there but not supported here. Specifically:

- Features of the bond constructor (what patterns the archive app relies on)
- Error checking & formatting
- Whether HTML tags, function components, and particles can all be pulled from the DOM / JSX children uniformly

Assigned to Queenie (qa-engineer) + Arthur (architect) — Cathy filling in as framework-engineer. Findings land in `review.md` in this sprint directory.
