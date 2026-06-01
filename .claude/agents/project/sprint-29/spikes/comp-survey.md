# Comp survey — `$Chemistry Lab`

A second look. The first pass ([visual-research.md][prior]) was a reference-site
inventory; this one slices by **layout facet** — twelve sites, twelve different
things the Lab could try to be. Then a position on Doug's
black + Fiverr-green + electric-turquoise direction, a position on the
periodic-table aesthetic, and a single ordered change list.

Compiled by Libby for sprint 29. Doug's brief: pick the facet, commit to it.

## 1 — Twelve sites, twelve facets

### 1. [linear.app][linear] — discipline of the single accent

- **Layout** — single-pane marketing surface; full-width sections stacked,
  sticky top bar, no persistent sidebar; the *app* itself is a left-rail
  three-pane.
- **Color** — near-black canvas (`#08090A`), white type, one electric
  blue/violet accent. Every status chip pulls from a small fixed set;
  no rogue hues.
- **Typography** — Inter Display family throughout. Body 16/1.6, headers
  600/700 stepping 36→48px.
- **Density** — spacious; motion budget under 200ms across the whole product.
- **Lesson it teaches** — *brand-color discipline*. One accent, used
  surgically, makes a product feel premium. The Lab's status palette currently
  has six colors of similar saturation; Linear would have two.

### 2. [docs.stripe.com][stripe] — three-pane mastery

- **Layout** — left product nav (~260px), centred prose (~720px), right
  pane that flips between TOC and a live API/code panel.
- **Color** — neutral light, Stripe purple `#635BFF` reserved for action
  affordances and link hover.
- **Typography** — Stripe's custom sans (Sohne-derived); body ~15/1.6,
  generous heading rhythm.
- **Density** — moderate; whitespace defended at every level.
- **Lesson** — *prose-and-code as one document*. Scroll the article and the
  right pane scrolls to the matching cURL/Node snippet. Language toggle
  persists site-wide. This is the model for the Lab's `$CodePanel`.

### 3. [github.com][github] (a real repo) — the technical default

- **Layout** — three-pane on repo pages: file tree (collapsible, narrow),
  README content, right rail of stats + About + language bar.
- **Color** — Primer light tokens (`#0969DA` link blue, `#1F2328` text,
  `#FFFFFF` canvas, `#D1D9E0` borders). Dark theme (`#0D1117` canvas,
  `#2F81F7` blue) is equally legitimate.
- **Typography** — `-apple-system / Segoe UI` sans for chrome; rendered
  README uses the same; code/tree in `ui-monospace, "SF Mono"`. Body 16,
  README headings 32→24→20.
- **Density** — chrome dense, README spacious. The mode-shift on entering
  prose is itself a design choice.
- **Lesson** — *rendered markdown is the spec*. GitHub's README typography
  is the de-facto reference for technical prose with embedded code. The
  Lab's section pages should be measurable against it directly.

### 4. [github markdown][gh-md] (the rendered style itself)

- **Layout** — single 980px column, 45px padding, no sidebar in the markdown
  surface itself.
- **Color** — h2/h6 carry an underline (`border-bottom: 1px solid #d1d9e0`),
  inline code on `#afb8c133` (translucent gray), blockquotes with a
  `4px solid #d1d9e0` left border and muted text.
- **Typography** — system sans body 16/1.5, headings 2.0/1.5/1.25/1.0/0.875/0.85
  rem, code 85% of body in monospace.
- **Density** — paragraph spacing 16px; list items 4px; pre blocks 16px
  padding with `#f6f8fa` background.
- **Lesson** — *the typographic primitives that Doug already cites as good*.
  If we want the Lab's prose to feel "technical-correct" by default, this
  scale is the one to copy beat-for-beat. It's GitHub's most-imitated CSS
  for a reason.

### 5. [vercel.com/docs][vercel] — dark monochrome restraint

- **Layout** — three-pane: left nav ~280px, content ~800px, right TOC
  ~240px. All sticky.
- **Color** — true black canvas (`#000`), gray scales (`#A1A1A1` muted,
  `#171717` cards), a single Vercel blue (`#0070F3`) for links. Almost no
  other hues.
- **Typography** — Geist Sans body, Geist Mono code. 16/1.6 body. Tight
  heading rhythm.
- **Density** — high; works because the palette is so restrained that even
  packed pages don't feel busy.
- **Lesson** — *true black + one cool accent is enough*. The Lab's planned
  status palette (six hues) would explode here; Vercel proves you can run
  an entire reference site on grayscale + one blue.

### 6. [tailwindcss.com/docs][tailwind] — design-forward light reference

- **Layout** — left nav ~250px, content ~700px, no right TOC on most pages
  (heads-down reading mode).
- **Color** — `#FFFFFF` canvas, `#1F2937` text, sky-blue links (`#0EA5E9`),
  dark code blocks (`#0B1120`-ish). Saturated but disciplined.
- **Typography** — Inter sans, body 16/1.6, headings 32/24/18 700/700/600.
  Code blocks have language tabs and copy buttons.
- **Density** — generous (this is a design-forward docs site).
- **Lesson** — *numbered steps as a primitive*. Tailwind's oversized
  `01 / 02 / 03` step numbers are the cleanest "ordered procedure" device
  on the web. Direct transplant for `$Case` lists inside a `$SectionPage`.

### 7. [docs.claude.com][anthropic] — restrained warm-light

- **Layout** — three-pane (left nav, prose, right "On this page"). Hosted
  on a Mintlify-style shell.
- **Color** — warm off-white canvas, near-black ink, single Anthropic
  orange-clay (`~#CC785C`) accent on links and active nav.
- **Typography** — Söhne-family sans throughout; body around 15/1.6.
  Tip/Note/Steps/CardGroup callouts have soft tinted backgrounds.
- **Density** — moderate; airy.
- **Lesson** — *warm-on-warm with a single accent reads "magazine,"
  not "console."* The current Lab palette (`--paper: #fafaf7`,
  `--accent: #c0392b`) is the same family. If we keep light, this is the
  closest cousin and the bar to clear.

### 8. [developer.apple.com][apple] — encyclopedic hierarchy

- **Layout** — three-pane: hierarchical framework tree (left), content,
  availability/related rail (right). Breadcrumb chain at top.
- **Color** — `#FFFFFF` canvas, `#0071E3` link blue, `#F5F5F7` code panel,
  `#D2D2D7` rule lines.
- **Typography** — SF Pro Display headings, SF Pro Text body, SF Mono code.
  Body 16/1.5; tight property/method tables.
- **Density** — high in symbol pages (parameter tables, return types, "see
  also" lists).
- **Lesson** — *availability badges as first-class status*. Every Apple
  symbol page header carries an "iOS 17.0+ / macOS 14.0+" badge row. This
  is the mental model the Lab's status pills are reaching for: *attached
  to the artifact, not to the prose*.

### 9. [developer.mozilla.org][mdn] — neutral comprehensive reference

- **Layout** — three-pane (left tree, content, right TOC). Structured
  property pages: syntax box → values list → formal definition table →
  examples → browser-compat → spec links.
- **Color** — light by default, neutral grays, blue links. Boxed
  syntax highlighter.
- **Typography** — system sans throughout, monospace for syntax. Tables
  dominate above the fold.
- **Density** — high; the layout is built around well-defined section
  templates that repeat across thousands of pages.
- **Lesson** — *typographic uniformity through templating*. MDN's
  consistency is structural — every property page has identical sections in
  identical order. The Lab's `$SectionPage` should commit to a single
  spine: Definition → Rules → Cases → See also, no exceptions.

### 10. [ptable.com][ptable] — table-as-navigation

- **Layout** — the periodic grid *is* the UI. Top tab bar swaps the data
  layer (Properties / Electrons / Isotopes / Compounds). Click a cell,
  detail blooms inline.
- **Color** — categorical fills per element family (alkali rose, alkaline-
  earth peach, transition pale-rose, metalloid muted-yellow, reactive
  nonmetal pale-yellow-green, noble gas pale-cyan, lanthanoid magenta,
  actinoid pink). Soft, pastel.
- **Typography** — small sans, atomic number top-left, symbol large centre,
  name beneath, weight bottom — fixed cell template.
- **Density** — extreme; 118 cells in one viewport.
- **Lesson** — *if you commit to a periodic-table aesthetic, the table is
  the navigation, not a decoration*. Ptable doesn't have a table somewhere
  on the page; the page **is** the table.

### 11. [goldbook.iupac.org][goldbook] — chemistry-domain reference

- **Layout** — single-column term entries with prominent definition block,
  formula display, references, related-term cross-links.
- **Color** — academic-light: white, navy headers, blue links, no decorative
  hues.
- **Typography** — serif headings, sans body, italic for chemical
  variables.
- **Density** — low (one term per page).
- **Lesson** — *chemistry-domain register is austere, not decorative*. Real
  chemistry references look like a textbook printer's job: serif, navy,
  formal. If `$Chemistry Lab` is reaching for chemistry register, it should
  be more like Gold Book / Wikipedia chemistry articles than like ptable.

### 12. [mathworld.wolfram.com][mathworld] — math-domain register

- **Layout** — left collapsible nav, central prose, very long "See also"
  block at the bottom.
- **Color** — neutral light with Wolfram orange-red accent on headers and
  active links.
- **Typography** — sans nav, serif body, inline SVG formulas.
- **Density** — high cross-reference density (40+ "See also" links per
  article is normal).
- **Lesson** — *the knowledge graph is visible*. MathWorld's "See also" is
  half the page, and that's the point — math is a graph, and it shows.
  `$Chemistry Lab`'s catalogue is also a graph (callouts already include
  `$InTheLab` cross-refs); MathWorld argues that link density is a feature,
  not a smell.

### Honourable mentions (read but not slotted)

- **VS Code Marketplace** — top stat row (installs / rating / version)
  pattern, useful for a future "Lab status" header summary.
- **Notion / Figma docs** — block-based, fluid; not the right register
  for a testing application that wants to feel like a reference manual.

## 2 — Color schemes: like / don't like

### Like

**A. Black + one bright + one cool — the direction Doug floated.**
Canvas `#000` or `#08090A`, type near-white (`#EDEDED`), primary
Fiverr-green `#1DBF73` for action, electric-turquoise `#00E5FF` reserved
for cooler highlights (active state, focus ring, current section).
Exemplars: [Linear][linear], [Vercel][vercel] (with green substituted for
Vercel-blue), [Supabase][supabase] dark mode. **Verdict: yes, this is the
strongest direction we've considered.** Black makes monospace text feel
like a CRT terminal — exactly the register a "testing application" wants.
The two-accent split (warm action, cool state) gives the status palette
somewhere to go without the page becoming a parade.

**B. Vercel-style monochrome dark + single cool accent.**
Canvas `#000`, gray scales, one blue. No second accent at all.
Exemplar: [Vercel][vercel].
**Verdict: too austere for a testing application that needs five status
colors.** Save this restraint as a target *floor* — never use more accents
than necessary — but pass + fail + planned + pending + broken want at
least three distinguishable hues.

**C. GitHub light Primer.**
`#FFFFFF` canvas, `#1F2328` ink, `#0969DA` link blue, `#D1D9E0` rules.
Exemplar: [github.com][github] / [GitHub markdown][gh-md].
**Verdict: respectable, low-risk, well-trodden.** The Lab would feel like
"a good open-source project's docs." Less distinctive than the dark
direction, but Doug specifically called this out as good — so it's a
legitimate alternate target.

**D. Warm off-white + single restrained accent (current Lab).**
`--paper: #fafaf7`, `--ink: #1a1a1a`, `--accent: #c0392b`.
Exemplar: [docs.claude.com][anthropic], current Lab.
**Verdict: refined, magazine-like, but the brick-red accent feels
arbitrary against chemistry register.** It reads "literary" rather than
"laboratory."

### Don't like

**E. Pastel categorical (ptable-style applied broadly).**
Eight pastel category fills running across element cells.
Exemplar: [ptable.com][ptable].
**Verdict: works *only* on the table itself, fails everywhere else.**
Bring the pastels into a docs surface and it instantly looks like a
children's-book chemistry kit. If we adopt periodic table, the pastels
must stay confined to the element-card component.

**F. Many-accent product-marketing.**
Three-or-more distinct brand hues (purple, pink, teal, gold) used at
similar weight.
**Verdict: cheap signal.** Doug's plan.md explicitly names "many colors"
as the cheap-signal failure mode.

**G. Weak-contrast accents.**
Current `--accent: #c0392b` on `--paper: #fafaf7` passes contrast for
text but feels muted. Same problem the prior visual-research.md flagged
with teal `#10B89B` (2.6:1 — fails AA). **Verdict: WCAG AA is the floor;
anything that fails it is a non-starter regardless of taste.**

## 3 — The periodic-table question

### Argument *for* committing to it

The codebase and product are both literally called `$Chemistry`. Every
construct already has a name — atom, chemical, bond, particle, element.
The catalogue is structured into 16 Roman-numeral sections, which maps
naturally to element-grid rows. Status pills become tiny element cards.
Section IDs become atomic numbers. Code blocks could carry a small
"isotope" tag (variant marker). And ptable proves the aesthetic can be
the navigation, not just the chrome.

When the metaphor goes all the way down, it stops being a metaphor and
becomes the product's identity. That's how Linear "feels like Linear" —
the brand is in every chip and corner radius. The Lab is one of the few
products in software where this metaphor is *non-arbitrary*.

### Argument *against*

ptable's pastels are decorative for a reason: there are 118 elements and
the human eye needs categorical fills to scan them. The Lab has ~80
sections, but they don't have *categories* in the chemistry sense — they
have a single Roman-numeral hierarchy. Trying to shoehorn "alkali / noble
gas / transition" colorings onto the catalogue is forcing the metaphor.

Real chemistry references (Gold Book, Wikipedia chemistry articles)
**don't look like ptable.** They look austere — serif, navy, formal.
ptable is the outlier in chemistry-on-the-web, not the norm. Going
periodic-table-everywhere risks the Lab feeling more like an
edutainment site than a framework reference.

### Position

**Yes — but selectively.** Commit to the periodic-element-card aesthetic
in **a small, fixed set of places** and let the rest of the surface stay
GitHub-markdown austere. This is how Linear does it: the brand lives in
chips, status indicators, and the 4px corner radius — *not* in the body
prose, which is plain.

If we go this way (see §5 for the commitment list), the rest of the app
should be **dark + Fiverr-green + electric-turquoise**, with the element
cards living *inside* that frame as the brand-bearing component. The
cards become the "Linear chip" of the Lab.

If we don't go this way, the visual identity should be
**dark monochrome + Fiverr-green for action + electric-turquoise for
state** with no chemistry-specific decoration — and the
periodic-element-card section header drops in favour of a clean numbered
heading. That direction is Vercel-with-different-accents and is also
defensible.

**Recommendation: go periodic — but the *cards*, not the *colors*.**
Take the cell *structure* (atomic-number top-left, symbol centre, name
under, status bottom-right) and let it carry the brand at status pills,
section headers, and a 16-section landing grid. Drop ptable's category
pastels entirely; everything stays on the dark + green + turquoise
palette.

## 4 — Proposed change list — one ordered list

### A. Theme-defining (must-do, defines everything else)

1. **Switch to dark theme.** Canvas `#08090A` (Linear black), surface
   `#111214`, type `#EDEDED` body / `#9CA3AF` muted. Per
   [Linear][linear] / [Vercel][vercel].
2. **Adopt Doug's two-accent palette.** `--green: #1DBF73` (Fiverr) for
   primary action, active sidebar item, PASS status, "implement" CTAs.
   `--cyan: #00E5FF` for current-section / focus-ring / live-state. Two
   accents only. Exemplar: [Linear][linear] (one accent + neutrals);
   we permit two because the Lab needs warm+cool separation.
3. **Lock typography.** Body and chrome in `Inter` (or system-sans
   fallback `-apple-system, "Segoe UI"`). Code in `JetBrains Mono` /
   `ui-monospace`. **Drop Charter/Georgia serif** — the dark + cyan
   register asks for sans, not literary serif. Per [Vercel][vercel],
   [Linear][linear], [github markdown][gh-md] dark.
4. **Modular scale 1.250 (major third) at 16px base.** Sizes
   16/20/25/31/39/49 px, line-heights 1.55 body / 1.2 headings.
   Per [Tailwind][tailwind] / [github markdown][gh-md] beat-for-beat.
5. **Lock body line length to `max-width: 65ch`.** No exceptions.
   Per [github markdown][gh-md].

### B. Layout-defining (scaffolds)

6. **Three-pane: left nav 280px / content centred 720px / code panel
   right 480px.** All sticky. Per [Stripe][stripe] / [Vercel][vercel].
7. **Sidebar: left nav has thin 3px left border on active item in
   `--cyan`, no fill, no movement on hover (background shift only).**
   Per current plan + [Vercel][vercel].
8. **Header: thin top bar `#08090A` matching canvas, monospace
   logotype `$Chemistry Lab`, top-right slot for `Cmd-K` palette.**
   Per [Linear][linear] / [Vercel][vercel].
9. **Breadcrumb directly below header on each section page** — `§ III ›
   3 › The binding constructor`. Per [Apple][apple] / [Solid].
10. **Right pane is the `$CodePanel`, not a TOC.** Per [Stripe][stripe].
    Right-pane TOC is a future addition; the Lab's current right pane is
    the test source / fixture, which is more Stripe than MDN.

### C. Content-defining (units)

11. **Section header is a periodic-element card.** 96×96px tile at top of
    each `$SectionPage`. Section ID top-left (e.g., `III.3`), big symbol
    centre (e.g., `Bc` for "binding constructor"), section name beneath,
    overall section status bottom-right. **Card carries the brand —
    everything else stays plain.** Per [ptable][ptable] cell structure
    only; reject ptable category fills.
12. **Status pills as compound symbols.** Tiny element-style chips:
    `Ps` = pass, `Fl` = fail, `Pn` = pending, `Pl` = planned, `Bk` =
    broken. Two-letter monospace symbol + status color dot. Replaces
    current emoji-circle pills. The five chemicals already exist in
    `$Status`; the *visual* is what changes. Per [Apple][apple]
    availability badges as model.
13. **Numbered Case blocks (`01 / 02 / 03`)** with oversized numerals
    in the left margin of the Cases section. Per [Tailwind][tailwind].
14. **Code blocks: dark `#0B0E11`, JetBrains Mono 14/1.5, language tab
    row above (cURL / TS / chemistry-source toggle), copy button
    top-right.** Per [Stripe][stripe] / [Tailwind][tailwind].
15. **Callouts (`$Definition`, `$Rules`, `$Pitfall`, `$DeepDive`,
    `$InTheLab`) get a 1px left border in a callout-specific tint and
    a small uppercase label.** Per [GitHub markdown][gh-md] blockquotes
    + [docs.claude.com][anthropic] Tip/Note callouts.
16. **Right-rail infobox per section** (slot in `$CodePanel` when no
    source loaded): `kind / since / replaces / tested in / related`.
    Per [Wikipedia][wiki-carbon] infobox + [Apple][apple] availability.
17. **`See also` block at end of each section** — link grid with
    `→ § III.4 The bond constructor`. Per [MathWorld][mathworld] +
    [Solid][solid] card grid.

### D. Polish (finish)

18. **`Cmd-K` palette.** Three commands minimum: jump-to-section,
    toggle theme, view-source. Per [Linear][linear] / [Vercel][vercel] /
    every modern docs site.
19. **Keyboard chapter nav: `←/→` step prev/next section, `/` focus
    search, `?` show shortcut overlay.** Per [Rust Reference][rust-ref].
20. **Single shared transition: 150ms color-only, ease-out.** No layout
    animation, no movement on hover. Per [Linear][linear]'s
    sub-200ms motion budget.
21. **Custom scrollbars: 8px thin, `#333` thumb on `#08090A` track,
    no arrows.** Per [Vercel][vercel].
22. **Anchor-on-hover glyphs on h2/h3.** `#` fades in left of heading,
    click copies deep link. Per [github markdown][gh-md] /
    [docs.claude.com][anthropic].
23. **Lock contrast: every accent passes WCAG AA for body text.**
    Fiverr-green on `#08090A` = ~7.5:1 (AAA). Cyan `#00E5FF` on
    `#08090A` = ~14:1 (AAA). Both safe.

## 5 — The periodic-table commitment (eight places it must show up)

If §3 lands as "yes," the periodic aesthetic must appear in **at least
these eight places** to feel committed rather than ornamental:

1. **Section header card** — 96×96 tile at top of every `$SectionPage`.
   Atomic-number-style ID, symbol, name, status. Card is the brand-bearing
   component.
2. **Status pills as element-style chips** — 2-letter symbol + dot
   (`Ps` `Fl` `Pn` `Pl` `Bk`). Replaces emoji circles globally.
3. **Lab landing page is a 16-cell grid** — one tile per Roman-numeral
   group, mimicking a periodic-table block layout. Each cell carries
   group ID, group name, "n of m cases passing" mini-rollup. *This is
   the move that makes the metaphor structural rather than decorative.*
4. **Sidebar group headers carry a tiny element badge** — square chip
   with the group's Roman numeral + symbol, matching the landing-grid
   tiles.
5. **Breadcrumb segments rendered as element-cell mini-tiles** —
   `[III] › [3] › binding constructor` with the first two segments as
   small square chips.
6. **`$Case` cards carry a "compound" header** — case name +
   element-style status chip + small "isotope" variant marker for case
   type (`Vc` visual / `Ec` error / `Ac` async — when those land in
   sprint 30+).
7. **404 / empty state is the lanthanoid bench** — dropped-out row of
   "unknown / unmounted" cells with the same chip language.
8. **Footer "atomic legend" strip** — the five status types displayed
   together with their symbols + colors at the bottom of every page.
   Becomes the visual signature: every page tells the reader, in the same
   five pixels of width, what passing and failing look like.

If these eight all ship, the metaphor is committed. If only the section-
header card ships, it's decoration and we should drop it and run the dark
+ green + cyan palette plain (Vercel-style).

---

**Summary recommendation**: dark canvas, Fiverr-green primary,
electric-turquoise state accent, Inter sans + JetBrains Mono, drop the
Charter serif, three-pane Stripe-shaped, GitHub-markdown rendering scale,
periodic-element-card aesthetic committed to the eight load-bearing
slots above and *nowhere else*. Ptable pastels rejected; the cards
inherit the dark theme.

<!-- citations -->

[prior]: ./visual-research.md
[linear]: https://linear.app
[stripe]: https://docs.stripe.com
[github]: https://github.com/anthropics/claude-code
[gh-md]: https://github.com/sindresorhus/github-markdown-css
[vercel]: https://vercel.com/docs
[tailwind]: https://tailwindcss.com/docs
[anthropic]: https://docs.claude.com/en/docs/intro
[apple]: https://developer.apple.com/documentation/swiftui/view
[mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
[ptable]: https://ptable.com
[goldbook]: https://goldbook.iupac.org
[mathworld]: https://mathworld.wolfram.com/Calculus.html
[supabase]: https://supabase.com/docs
[rust-ref]: https://doc.rust-lang.org/reference/
[solid]: https://docs.solidjs.com
[wiki-carbon]: https://en.wikipedia.org/wiki/Carbon
