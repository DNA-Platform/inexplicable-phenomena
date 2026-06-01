# Visual research — `$Chemistry Lab`

Reference pass on documentation, scientific, and academic-reference sites.
Observed, measured, named. Compiled by Libby.

## Site-by-site notes

### 1. linear.app

Dark-first marketing surface; near-black canvas (~`#08090A`) with white-on-dark
type and electric-blue/violet accents. Inter-family sans throughout, body ~16px
at line-height ~1.6, headers 600/700 stepping up to 36–48px. ~1200px max-width,
fixed top bar, contextual right panels ~320–400px. Status colours map to
green / amber / blue chips. Distinctive: motion budget — every transition uses
sub-200ms easing so the entire surface "feels instant".

### 2. linear.app/method

Long-form manifesto with explicit hierarchical numbering: `1.1`, `2.1–2.4`,
`3.1–3.6` styled as small caps in the margin beside paragraph headings.
Single-column reading, narrow measure (~640px), heavy use of negative space.
Footer is multi-column link grid. Distinctive: numbered methodology framework
treats marketing copy like a textbook chapter set — section IDs visible in the
page itself, not just in the URL.

### 3. docs.stripe.com

Two-then-three pane: left sidebar of products, central prose, right column
that switches to a live API/code sandbox on reference pages. Categorical
(non-numeric) navigation organised "by product". Sans throughout, generous
whitespace, neutral palette with Stripe purple `#635BFF` reserved for action.
Distinctive: code panel mirrors the prose — scrolling the article scrolls the
right-pane example to the matching cURL/Node/Ruby snippet, language toggle
persists across the whole site.

### 4. tailwindcss.com/docs

White/`#F9FAFB` canvas, `#1F2937` text, `#3B82F6`-ish blue links, dark code
blocks. System / Inter sans, mono `ui-monospace`. Sidebar ~280px, content
~800–900px, two-pane (no right TOC on most pages). Headings stepped 32→20→16
at weights 700/700/600, body 16/1.6, code 14. Steps numbered `01 / 02 / 03` in
oversized type. Distinctive: utility-class names inside code blocks are
hyperlinked / hover-previewed — hovering `bg-sky-500` shows the swatch.

### 5. docs.anthropic.com (platform.claude.com/docs)

Behind a JS shell that returns near-empty markup to fetchers; observable from
direct visit: warm off-white canvas, Söhne / system sans, single-accent orange
(~`#CC785C`) tied to the brand mark. Three-pane on reference pages
(nav / prose / "On this page"). Section anchors at h2/h3 with hover-revealed
`#`. Distinctive: brand wordmark uses the same serif as long-form blog,
giving the docs a "magazine" rather than "console" feel.

### 6. vuejs.org

Light canvas, brand green `#42B883` plus secondary `#35495E`. ~250–300px
fixed left sidebar, ~800–900px content, persistent right "On this page" TOC.
Anchor-link `#` icons appear on heading hover. Distinctive: top-of-page
**API preference toggle** (Options API vs Composition API) rewrites every code
example on the site in place — a single switch changes thousands of snippets.

### 7. solidjs.com / docs.solidjs.com

Minimal light scheme, deep-blue brand (~`#2C4F7C`) with red accent
(~`#FF3E00`-adjacent) on links and call-outs. ~800px measure, single right
sidebar, breadcrumb chain at top ("Solid > Router > SolidStart > Meta"),
"Next ›" pager at page foot. Distinctive: card-grid quick-links section
breaks the prose flow with button-like landing cards (Tutorial / Templates /
Ecosystem / Contribute).

### 8. vercel.com/docs and nextjs.org/docs

White / `#0A0A0A` flip, Inter / Geist sans, Vercel blue `#0070F3` for links.
Three-pane: ~280px nav, ~800–900px content, ~250px right-side TOC, all sticky.
H1 ~40 / H2 ~32 / H3 ~24 / body 16 / line-height 1.6–1.8. Distinctive
(Next.js): App Router ↔ Pages Router toggle at the top of the sidebar
re-routes the entire docs tree under `/docs/app` or `/docs/pages`.

### 9. pubchem.ncbi.nlm.nih.gov (compound pages, e.g. CID 2519 Caffeine)

NCBI corporate light theme; pale blue title bar, `#205493`-ish links, Helvetica/
Arial sans. Two-column: long left TOC of sections (1 Structures, 2 Names &
Identifiers, 3 Chemical & Physical Properties, …) with deep numeric nesting,
content right. Each section auto-numbered `1.2.3` and citation-tagged.
Distinctive: every datum carries a provenance pill linking to its source
database — the page is a *manifest* of upstream evidence.

### 10. ptable.com

Element grid as the entire viewport: each cell is a coloured tile keyed to
category (alkali / alkaline-earth / transition / metalloid / nonmetal / noble
gas / lanthanide / actinide). Cell layout is fixed: atomic number top-left,
symbol centre (large), name + atomic weight beneath in small type. Top tab bar
swaps the data layer (Properties / Electrons / Isotopes / Compounds). Decay-
mode legend (α, β⁻, ϵ, stable). Distinctive: the table itself *is* the
navigation — there is no separate menu hierarchy; selecting a cell reveals
deep data inline.

### 11. compoundchem.com

Magazine / blog grid: large infographic thumbnails over short titles, pastel
neutrals with a pink accent. Top nav links Home / About / Infographics Index /
Newsletter / Shops. Distinctive: every article centres on a hand-designed
chemical infographic — text is supplementary to the diagram, inverting the
usual docs hierarchy.

### 12. doc.rust-lang.org/reference

mdBook scaffold. Six theme presets exposed in a dropdown: Auto / Light / Rust /
Coal / Navy / Ayu (with `Rust` ≈ warm tan `#E1B382`-adjacent on cream, `Coal`
near-black, `Navy` deep blue, `Ayu` warm dark). Left collapsible TOC,
~800px reading column, keyboard nav (`←/→` chapters, `S` or `/` search,
`?` help). Distinctive: every clause carries a **rule identifier in
square brackets** with hierarchical dotted notation —
`[destructors.scope.nesting.function-body]` — and a `[Tests]` link that opens
the conformance tests for that exact rule.

### 13. en.wikipedia.org (chemistry articles, e.g. *Carbon*)

Black-on-white, blue links, gray rule lines. Linux Libertine / Charter-style
serif for body in legacy theme; Vector-2022 uses sans. Left rail of site nav,
~960px article column, **right-floated infobox** (~250–300px) of element data
beside the lede. Citations as superscript `[1]` linking to numbered footnotes;
collapsible TOC at top of page. Distinctive: the chemistry infobox is a
*standardised template* (`{{infobox element}}`) that produces identical
property tables across all 118 articles — typographic uniformity through data
rather than design.

### 14. supabase.com/docs

Brand green `#3ECF8E` on near-black `#1C1C1C` (dark default) and white
(light). Top-bar grouped nav (Start / Products / Build / Manage / Reference /
Resources), `Ctrl K` palette, framework quick-start carousel of language icons.
Distinctive: docs and reference share one shell — the language picker on a
reference page reflows code samples without losing scroll position.

### 15. react.dev

Light canvas with React turquoise `#087EA4`-ish accent, generous serif-ish
sans body, large illustrative emoji per section. Centred ~800px column, left
sidebar, chapter pager. Distinctive: **Sandpack** — every code example is a
live, editable mini-IDE embedded in the prose, with a file tree and console.

## Patterns that recur across sites

1. **Three-pane on reference pages.** ~280px left nav, ~800–900px reading
   column, ~250px right TOC. Stripe, Vercel, Vue, Anthropic, Next.js all
   converge on roughly these proportions.
2. **Sticky everything.** Sidebars, TOCs, and top bars all use
   `position: sticky` so scroll never loses orientation. The only thing that
   actually moves is the prose column.
3. **`Cmd/Ctrl-K` command palette.** Universal. Tailwind, Stripe, Vercel,
   Supabase, Linear, react.dev all bind it; users now expect it.
4. **Heading anchor on hover.** `#` glyph fades in to the left of an h2/h3 on
   hover; click copies the deep-link URL. Anchors live in URL fragments
   keyed to slugified heading text.
5. **Code-block language tab.** Stripe, Supabase, Vercel, Tailwind: a tab row
   above each block (cURL / Node / Python / Ruby) with site-wide persistence
   of the chosen language.
6. **Numeric step blocks for procedures.** Tailwind's `01 / 02 / 03`
   oversized numerals are echoed by Vercel's getting-started flows and by
   Linear Method's `1.1 / 2.1` chapter numbers.
7. **Status / category chips.** Small uppercase labels in pill shape — used
   for `BETA` / `DEPRECATED` / `AI` / element category. Always `text-xs`,
   `font-medium`, slight `letter-spacing`, rounded-full.
8. **Right-floated infobox / sandbox.** Wikipedia (data infobox) and Stripe
   (live API panel) use the same architectural move: lede on the left,
   structured-data column on the right.
9. **Dual-API toggle.** Vue (Options/Composition), Next.js (App/Pages
   router), Supabase (language). One switch rewrites all examples.
10. **Theme presets, not just light/dark.** Rust Reference exposes six;
    ptable exposes Wide / Top-bar / Sidebar / Dark; this is now common in
    technical docs.

## Math + theory

### HSL relationships (formulas)

Given a base hue `H` (degrees, 0–360):

- **Complementary** — `H + 180`. Maximum chromatic contrast, low harmony.
- **Analogous** — `{H − 30, H, H + 30}`. Calm, single-mood palettes.
- **Split-complementary** — `{H, H + 150, H + 210}`. Complementary contrast
  without the visual harshness of pure 180°.
- **Triadic** — `{H, H + 120, H + 240}`. Vivid; needs careful saturation
  control or the palette fights itself.
- **Tetradic / square** — `{H, H + 90, H + 180, H + 270}`. Four equal points;
  generally too many primaries for a docs site.

For `$Chemistry Lab`'s teal `#10B89B` (≈ HSL 169°, 84%, 39%):

- Complementary: ≈ `#B81030` (hot rose).
- Split-complementary: ≈ `#B81074` and `#B86310` (magenta + ochre) — useful
  pair for FAIL / PENDING status pills against the teal PASS.
- Analogous: ≈ `#10B863` (chartreuse-green) and `#1093B8` (cyan-blue) —
  candidate accents for sub-status states.

### Modular type scales

Fixed multiplicative ratios applied to a base size (typically 16px):

| Ratio   | Name                | Feel                                 |
|---------|---------------------|--------------------------------------|
| 1.067   | minor second        | Tight, dense — code-heavy reference  |
| 1.125   | major second        | Conservative, technical              |
| 1.200   | minor third         | Common in product UI                 |
| 1.250   | major third         | Most-used docs scale (Tailwind, Vue) |
| 1.333   | perfect fourth      | Editorial, generous                  |
| 1.414   | augmented fourth    | Decorative                           |
| 1.500   | perfect fifth       | Marketing / landing                  |
| 1.618   | golden ratio (φ)    | Display headlines                    |

For technical docs the empirically dominant choice is **1.250**: at base 16px
it produces 16 / 20 / 25 / 31.25 / 39 / 48.8 — gives a recognisable five-step
hierarchy without the headlines becoming billboard-sized. **1.333** is the
right choice if the reference page reads like a long-form chapter.

### Line length and line height

- **60–75 characters per line** for body prose. CSS: `max-width: 65ch`.
- **Body line-height ~1.5–1.65** for serif body, ~1.6–1.75 for sans.
- **Heading line-height ~1.1–1.25** — tighter than body, scales inversely
  with font size.
- Smashing's research-based shortcut: `line-height: calc(1ex / 0.32)` for
  digital body, `calc(1ex / 0.42)` for h1/h2.

### WCAG 2.2 contrast

| Level | Normal text (<18pt / <14pt bold) | Large text (≥18pt or ≥14pt bold) | Non-text UI |
|-------|----------------------------------|----------------------------------|-------------|
| AA    | **4.5 : 1**                      | **3 : 1**                        | 3 : 1 (1.4.11) |
| AAA   | 7 : 1                            | 4.5 : 1                          | n/a         |

Conversions: 18pt = 24px, 14pt bold ≈ 18.66px.
Teal `#10B89B` on white = ~2.6 : 1 — **fails AA** for body text. Either
darken to ~`#0A8D78` for body-on-white, or reserve current teal strictly for
borders/large headings/iconography (where 3:1 suffices) and use a darker
text variant.

### Tonal palettes (Material 3 / HCT-style)

Generate ten tones at fixed lightness steps from a single brand hue:
**0 / 10 / 20 / 30 / 40 / 50 / 60 / 70 / 80 / 90 / 95 / 99 / 100** in HCT
"tone" (perceptual L* in CIELAB). Light theme assigns:
`primary = T40`, `on-primary = T100`, `primary-container = T90`,
`on-primary-container = T10`, `surface = T99`, `surface-variant = T90`,
`outline = T50`. Dark theme inverts: `primary = T80`, `on-primary = T20`,
`primary-container = T30`, etc. The trick is that two adjacent tones are
guaranteed ≥3:1 by construction, and tones `T10 ↔ T90` are guaranteed ≥7:1 —
contrast is encoded in the palette structure, not enforced afterwards.

## What would make `$Chemistry Lab` more striking

1. **Adopt a three-pane reference layout** with sticky left nav (~280px),
   centred reading column (~720px / `65ch`), and a right rail for "On this
   page" *and* the live code panel. Section IDs (`§ III.3`) anchor in URLs.
2. **Print the section ID in the margin**, not inline. A small teal box
   pulled into the left margin opposite the heading reads as an
   atomic-number cell against a periodic-table-styled cell strip rather than
   as inline ornament.
3. **Generate a tonal palette from `#10B89B`** at tones 10/20/30/40/50/
   60/70/80/90 and reserve roles (primary text, primary surface, container,
   border, hover). Stop hand-picking shades.
4. **Darken brand teal to ~`#0A8D78` for text-on-white**; keep
   `#10B89B` for borders, icons, and large display only. Adds AA compliance
   without changing brand identity.
5. **Define five status hues by HSL rotation from the brand**:
   PASS = teal `H 169`, PENDING = ochre `H 38`, FAIL = rose `H 349`,
   BROKEN = violet `H 289`, PLANNED = neutral grey. Split-complementary
   structure makes the pills feel like one family.
6. **Pick a modular scale and stick to it.** 1.250 (major third) at 16px
   base. Forbid arbitrary `font-size` values in the design tokens.
7. **Inter for sans, Charter for serif body, JetBrains Mono for code** —
   already chosen; lock body line-length to `max-width: 65ch` and body
   line-height to `1.6` so prose pages feel uniform regardless of width.
8. **Add a `Cmd-K` palette.** Three commands: jump-to-section, toggle theme,
   run-test. Universal docs convention; no docs site of this calibre lacks
   one.
9. **Keyboard chapter navigation.** Borrow Rust Reference: `←/→` to step
   chapters, `/` to focus search, `?` to show help overlay.
10. **Status pills at `font-size: 0.6875rem` (11px), uppercase,
    `letter-spacing: 0.06em`, `border-radius: 9999px`**, with a 1px ring
    in the same hue at 40% alpha. The ring is what makes them read as
    chemistry tokens rather than generic Bootstrap badges.
11. **Treat each section as a periodic-element card.** Above the heading,
    a 96×96px tile: section ID top-left (atomic-number style), big symbol
    (e.g. `Fe` for "Iron of the Framework"), section name beneath, status
    pill bottom-right. Card colour keys to category (Concepts / Reference /
    Internals / Tests).
12. **Right-rail "infobox"** for every reference page (Wikipedia move):
    summary table of *kind*, *since version*, *replaces*, *tested in*,
    *related symbols*. Same template across the whole site, generated from
    metadata, not authored per page.
13. **`[Test]` links per clause.** Every normative paragraph gets a small
    `[T]` superscript opening a modal of conformance tests — Rust
    Reference's distinctive move; perfect fit for a Lab.
14. **Theme presets, not just dark/light.** Offer `Lab` (current light teal),
    `Hood` (dark teal-on-near-black), `Bench` (parchment + sepia serif),
    `Console` (mono-only, near-black). Theme name as a chemistry pun is on-
    brand.
15. **Animate transitions under 200ms** with a single shared easing curve.
    Linear's "everything feels instant" effect comes from one timing token,
    not per-component motion design.

<!-- citations -->

[linear]: https://linear.app
[linear-method]: https://linear.app/method
[stripe-docs]: https://docs.stripe.com
[tailwind-docs]: https://tailwindcss.com/docs
[anthropic-docs]: https://platform.claude.com/docs
[vue]: https://vuejs.org/guide/introduction.html
[solid]: https://docs.solidjs.com
[vercel-docs]: https://vercel.com/docs
[next-docs]: https://nextjs.org/docs
[pubchem]: https://pubchem.ncbi.nlm.nih.gov/compound/2519
[ptable]: https://ptable.com
[compoundchem]: https://www.compoundchem.com
[rust-reference]: https://doc.rust-lang.org/reference/
[wikipedia-carbon]: https://en.wikipedia.org/wiki/Carbon
[supabase-docs]: https://supabase.com/docs
[react-dev]: https://react.dev/learn
[smashing-legibility]: https://www.smashingmagazine.com/2020/07/css-techniques-legibility/
[wcag-contrast]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
[material3-color]: https://m3.material.io/styles/color/system/overview
