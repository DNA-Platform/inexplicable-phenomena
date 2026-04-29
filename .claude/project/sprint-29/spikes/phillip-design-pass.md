# Phillip's design pass — sprint 29

Frontend Engineer + UX Designer for `$Chemistry Lab`. First formal pass on
this codebase; Cathy has been driving solo. Doug asked for (1) web research,
(2) a periodic-table cell proposal that subsumes the current four-line
breadcrumb-and-title stack, and (3) a `styled-components` migration plan.

Prior art read: [visual-research.md][prior-vr], [comp-survey.md][prior-cs].
Source read: every file under `src/apparatus/` plus `src/styles/tokens.ts`,
`src/main.tsx`, and `src/data/catalogue.ts` (all 80 sections).

## 1 — Web research

### Periodic-table element-card design

ptable.com and Wikipedia are bot-hostile to plaintext fetchers — the actual
grid is JS-rendered and didn't return cell-level layout data. Reconstructed
from the rendered HTML on-screen and the supporting community sources:

- **Standard cell template** — atomic number top-left (small), symbol centre
  (large bold), element name immediately beneath the symbol (small caps or
  small mixed case), atomic weight bottom-centre (small mono). Cell is
  square-ish, often 60-90px in pedagogical posters and 38-48px on ptable's
  grid view. The symbol dominates the optical weight (≈ 40-50% of cell
  height); everything else is hierarchically subordinate.
  Source: [Periodic Table Element Cards (ScienceNotes)][sn-cells], visual
  inspection of [ptable.com][ptable].
- **Variable-name handling** — ptable simply truncates or shrinks the name
  to a fixed 9-10px line; "Praseodymium" is rendered the same physical width
  as "Iron" by leaning on small type rather than autosizing. Wikipedia's
  `{{infobox element}}` template uses a uniform two-column property table
  underneath a fixed-aspect colour-block header so the name never affects
  the header dimensions. The template is the conformance device — every
  element page looks identical because the data slot is fixed-width, not the
  text itself.
  Source: [Wikipedia Carbon][wiki-carbon] (visual structure of infobox).
- **Compound Interest infographics** — make the symbol genuinely huge
  (display weight, often 50%+ of the card's vertical), pair it with one
  short factoid line, and let the name sit beneath the symbol at a much
  smaller scale. Uses display-grade letterforms (often a chunky sans like
  Futura or Avenir) rather than mono. The lesson: when the symbol carries
  the brand, **commit hard to the symbol's optical weight** — half the
  card or more — and treat name as a label, not a heading.
  Source: [Compound Interest infographics index][compoundchem].

**For us:** §-IDs like `I.3` already function as "atomic numbers" *and*
"symbols" — they're short, fixed-format, mono-friendly. We do **not** need
a symbol/number split (no "Fe" + "26" duality). The §-ID is the symbol.
That collapses the periodic-cell layout from a four-slot grid into a
three-slot grid: group label (top-left, atomic-number-style), big §-ID
(centre, symbol-style), title (beneath, name-style).

### styled-components best practices for design systems

- **`ThemeProvider`** is mounted high — typically wrapping the whole app —
  and injects an arbitrary theme object via React Context. All descendant
  styled components get `props.theme`. Theme shape is not prescribed; it's
  whatever you author it as.
  Source: [styled-components API docs][sc-api].
- **Transient props (`$prop`)** — v6 standard. Prefix style-only props with
  `$` so they are consumed by the styled component and **not** forwarded to
  the DOM (avoiding "Unknown Prop" warnings). Standard usage:
  `<Button $variant="primary">`. Source: [styled-components FAQs][sc-faqs],
  [Robin Wieruch's best-practices guide][rw-sc].
- **`css` helper vs full `styled`** — use `css` for reusable mixins / shared
  conditional blocks composed inside other styled components; use full
  `styled` for renderable React components. The `css` helper specifically
  exists so that template literals containing function-interpolations behave
  correctly when nested.
  Source: [styled-components API docs][sc-api].
- **File organisation** — community convergence is *co-locate*: each
  component module owns its `*.styled.ts` sibling. Centralised
  `src/styles/` directories tend to grow into pile-ups. Keep shared
  *primitives* (Box, Stack, Text) centralised; keep *component-specific*
  styled subparts next to the component.
  Sources: [Codevertiser folder structure][cv-folder],
  [Robin Wieruch][rw-sc].
- **`createTheme()` (v6.4+)** — generates a CSS-variable-backed theme
  object that works in React Server Components where `ThemeProvider`'s
  Context is unavailable. Not relevant for us yet (Lab is fully
  client-side), but flag it for sprint 35+.
  Source: [styled-components Releases][sc-rel].

### Reference-doc landing-cell patterns

- **Apple Developer / SF Symbols** — symbol pages lead with a large
  monospace symbol name, an *availability badge row* immediately under it
  ("iOS 17.0+ / macOS 14.0+ / watchOS 10.0+"), and breadcrumb above. The
  identity is carried by the **mono symbol name treated as code** — same
  move we already make for `$Chemistry` in the header. Confirms our
  instinct that the §-ID rendered in JetBrains Mono is the right primary.
  Source: [SF Symbols HIG][apple-sf].
- **Stripe API reference** — section identity is conveyed by tight
  three-pane layout (nav / prose / code panel) rather than a hero card.
  The header is a single sans heading + small mono path
  (`POST /v1/charges`) above it. They lean on **the code panel itself** as
  the page's identity — page = method signature on the right, prose on
  the left. Lesson: if the §-ID is in mono and big, we don't need a hero
  card *and* a heavy code panel — pick one to carry weight.
  Source: [Stripe API Reference][stripe-api].
- **Material Design component pages** — every component page leads with a
  hero illustration tile, a one-line subtitle, and a tab row (Overview /
  Specs / Implementation). The hero is *decorative*, not informational.
  Lesson rejected for our context: `$Chemistry Lab` is a reference, not a
  marketing surface; we want the hero to *carry data*, not decoration.

### Variable-length text in fixed-size cards

- **`clamp(min, preferred, max)`** is the native CSS primitive — bounds a
  fluid value between min/max. For our titles in a fixed 240×240 card we
  can't use viewport-width preferred values (`vw`) because the card is
  fixed-size; we need **container-query-based** units (`cqw`, `cqh`) or a
  fixed two-tier scale.
  Source: [MDN clamp()][mdn-clamp], [CSS-Tricks fluid clamp][css-tricks-clamp].
- **`text-wrap: balance`** (CSS Text 4, ~93% support 2026) — distributes
  multi-line text evenly so a two-line title doesn't end with one orphan
  word. Direct fit for our title slot.
  Source: [MDN text-wrap][mdn-textwrap].
- **JS auto-sizing libraries** (Fitty, textFit, fit-to-width) binary-search
  for the largest font-size that fits — overkill for our 80 known strings.
  We can author a fixed two-tier rule: titles ≤ 20 chars get the large
  size, titles > 20 chars get the small size. No JS, no measurement, no
  reflow jitter.
  Source: [Fitting Text to a Container (CSS-Tricks)][css-tricks-fit],
  [Lorp/fit-to-width][lorp-ftw].

**Top three surprises:**

1. ptable doesn't auto-size element names — it uses a uniform tiny font
   size and just lets long names look cramped. The metaphor we're echoing
   is *less* sophisticated than I assumed.
2. Stripe API ref carries identity via the code panel, not a hero — which
   means our hero card might *replace* the code panel's prominence rather
   than coexist with it. Worth Cathy's review.
3. styled-components v6 actively discourages dynamic style switching via
   prop interpolation (the v5 way) in favour of *variant components*
   (`PassButton` / `FailButton`) over `<Button $variant="pass">`. Our
   existing chemistry-class pattern (`$Pass`, `$Fail`, `$Planned`)
   **already does this**. The framework's polymorphism-without-props move
   maps 1:1 onto styled-components v6's recommended pattern. Free win.

## 2 — Periodic-table cell design proposal

### The element card replaces *all* of these:

```
§ I · FOUNDATION › § I.3       ← breadcrumb
§ I.3 Types                    ← heading
FOUNDATION                     ← group tag
```

### Card spec

**Dimensions: 280 × 280 px** square, fixed.

Why 280: anything smaller makes a 31-char title (e.g. "particular constructor
argument") visibly crammed even at the small tier; anything larger competes
with the 720px content column for visual weight. 280 is exactly 280/720 ≈
38.9% of content width — close to the golden-ratio inverse (≈ 0.382), which
reads as "secondary element" rather than "page-eating banner."

**Position on page:** **left-aligned at the top of the content column**,
not centred, not full-width. The 720px content column has 280px reserved
for the card on the left; the remaining 416px (with a 24px gutter) gets a
short *deck* paragraph (a one-sentence framing of the section, populated
from `section.deck` when sprint-30 prose lands; empty in sprint-29).

When the deck is empty (sprint 29), the card sits flush left and the
right-side area stays blank — the card is the only thing in the lede.

This left-anchored placement echoes ptable's **cell-as-anchor** move
(the cell *is* the page header, not a decoration above it), and matches
[Wikipedia][wiki-carbon]'s right-floated infobox pattern in spirit while
inverting the side (we're left because LTR reading order makes the §-ID
the *first* thing the eye lands on in our flow).

### Layout inside the card

```
┌─────────────────────────────────────┐
│ FOUND.  § I            ·         §  │  ← top row, 28px tall
│                                      │
│                                      │
│                                      │
│             I . 3                    │  ← symbol slot, ~140px tall
│                                      │
│                                      │
│                                      │
│  Types                               │  ← title slot, ~80px tall
│                                      │
│                                CELL  │  ← bottom-right tag, 28px tall
└─────────────────────────────────────┘
   ←—————— 280px ——————→
```

With dimensions:

- **Card outer** — 280 × 280 px, `border-radius: 4px`,
  `background: paperRaised` (`#FFFFFF`), `border: 1px solid rule`,
  `box-shadow: 0 1px 0 rule, 0 8px 24px -12px hsla(188, 30%, 20%, 0.12)`
  (a hairline ground line + a soft theme-tinted ambient drop).
- **Card padding** — `20px` all sides except the symbol slot which uses
  flex centring within the remaining height.
- **Top row** — flex row, `justify-content: space-between`,
  `align-items: baseline`, height 28px:
  - **Left: group context** — `FOUND.` (4-letter abbreviation of group
    title, uppercase, sans, 11px, weight 700, `letter-spacing: 0.16em`,
    color `muted`) + a single space + `§` glyph + Roman numeral `I` in
    JetBrains Mono 13px weight 700, color `themeText`.
    Combined string: `FOUND. § I`. The mono Roman is the eye-catch — like
    an atomic-number proper.
  - **Right: a small `§` glyph alone**, JetBrains Mono 13px, color
    `mutedFaint` — a fixed visual rhyme with the left, signals
    "section-cell" without competing with the centre.
- **Symbol slot** — flex-centred in the remaining height (~140px after the
  top row + gap):
  - **Section ID** — JetBrains Mono, **`font-size: clamp(56px, 22cqw, 88px)`**
    where the container query unit (`cqw`) reads off the 280px card width;
    at 280 the preferred is `~62px`, so the §-ID prints at ~62px. weight
    700, `letter-spacing: -0.02em`, color `ink`,
    `font-variant-numeric: tabular-nums`, `line-height: 1`.
  - The §-ID treats `.` as a thin glyph; "I.3" prints as
    `I` + thin period + `3`. For three-segment IDs (`II.10`, `XIII.4`)
    the same `clamp()` produces ~52px which still fits comfortably.
- **Title slot** — `~80px` tall, flex-end (text sits at the bottom of the
  slot, just above the bottom row):
  - **Title** — `font-family: sans` (Inter), `font-weight: 700`,
    `letter-spacing: -0.01em`, `color: ink`, `line-height: 1.15`,
    `text-wrap: balance`,
    **`font-size: clamp(15px, length-tier(title), 24px)`** where
    `length-tier` is a pure CSS rule, not JS:

    ```ts
    // pseudo: title typography ladder
    title.length <= 12   →  font-size: 24px;  // "Types", "Symbols", "Identity"
    title.length <= 22   →  font-size: 19px;  // "The binding constructor", "Reactive properties"
    title.length <= 32   →  font-size: 15px;  // "particular constructor argument", "Cross-chemical writes"
    title.length >  32   →  font-size: 13px;  // "Single-letter $<x> props were inert"
    ```

    Implemented as a transient prop on the styled component:
    `<Title $tier={tier(title)}>`. Tier function lives in `data/catalogue.ts`
    next to the data — pre-computed once.

  - **Mono detection:** if the title starts with `$` or contains `(`, the
    title slot uses `font-family: mono` instead of sans, and the tier
    ladder bumps down one step (because mono runs ~10% wider per char).
    Catches `$Reflection.isReactive(name)`, `view()`, `$is<T>`, etc.
  - **Wrap behaviour:** allow up to 3 lines via the slot's `~80px` height
    at the largest tier (24px × 1.15 lh × 3 = 82.8px → fits with a hair to
    spare). Short titles use one line; medium use one or two; long use
    two or three. `text-wrap: balance` keeps the line breaks even.
  - **Overflow guarantee:** the smallest tier (13px × 1.15 lh × 3 = 44.85px)
    accommodates **140 chars at width 280px less padding (~240px)**, far
    above any catalogue entry's char count. No catalogue title overflows.
- **Bottom row** — absolute-positioned bottom-right corner inside the
  padding box, height 28px:
  - **Context tag** — `CELL` (uppercase, sans, 10px, weight 800,
    `letter-spacing: 0.18em`, color `themeText`).
    Reads like the periodic table's "noble gas / alkali metal" category
    label but in our domain — the *kind* of thing this section is. Tag
    values are a small fixed set: `CELL` (default), `INTERNAL`
    (group XV — implementation modules), `RESOLVED` (group XIII —
    caveats), `OPEN` (group XIV — provisional), `MANIFESTO` (groups 0,
    XVI). One word, no punctuation.

### Title-overflow strategy chosen

**Discrete four-tier length ladder** (24 / 19 / 15 / 13 px) selected by
character count of the title string, applied via transient prop
`$tier` on the styled `Title` component. **Plus** mono-detection that
bumps the tier down one step when the title contains `$` or `(`.
**Plus** `text-wrap: balance` for graceful 2-3 line wrap.

Rejected alternatives:
- *Fluid `clamp()` with `cqw`* — works for the §-ID where char count is
  fixed, fails for the title where we want hard breakpoints between
  "still feels like a title" (24px) and "feels like a caption" (13px).
- *JS auto-sizing (Fitty, textFit)* — measurement reflow; over-engineered
  for 80 known strings.
- *Truncation with ellipsis* — loses information; titles are content.

### Hover / transitions

The card is *not* interactive (the §-ID is the section's identity, not a
link to itself). Static, no hover. The only animation is the
**section-change crossfade**: when `$lab.$activeSection` changes, the
card's content fades through at 120ms ease-out with a 1px translate-Y.
That's the entire motion budget for this component.

Selection (`::selection`) on the §-ID inherits the global theme-soft
selection style — gives the card one moment of interactivity for users
who try to copy the §-ID.

### Interaction with the existing `<Breadcrumb>` and `<h1>` blocks

**Both are deleted.** The card subsumes:
- `§ I · FOUNDATION › § I.3` → group abbreviation top-left + §-ID centre
- `§ I.3 Types` → §-ID centre + title in title slot
- `FOUNDATION` (uppercase tag) → group abbreviation top-left

The `<PrevNext>` pager at the bottom is unaffected — it still uses the
small mono `§ III.4` + sans title pattern, which is a different idiom
(navigation, not identity).

### Pseudo-CSS for Cathy

```ts
// apparatus/section-page.styled.ts
import styled from 'styled-components';

export const Card = styled.aside`
    width: 280px;
    height: 280px;
    flex-shrink: 0;
    background: ${p => p.theme.tokens.paperRaised};
    border: 1px solid ${p => p.theme.tokens.rule};
    border-radius: 4px;
    box-shadow:
        0 1px 0 ${p => p.theme.tokens.rule},
        0 8px 24px -12px hsla(188, 30%, 20%, 0.12);
    padding: 20px;
    display: grid;
    grid-template-rows: 28px 1fr auto 28px;
    container-type: inline-size;
    container-name: section-card;
`;

export const TopRow = styled.header`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

export const GroupContext = styled.span`
    font-family: ${p => p.theme.fonts.sans};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${p => p.theme.tokens.muted};

    & > .roman {
        font-family: ${p => p.theme.fonts.mono};
        font-size: 13px;
        font-weight: 700;
        color: ${p => p.theme.tokens.themeText};
        letter-spacing: 0;
        margin-left: 6px;
    }
`;

export const SectionGlyph = styled.span`
    font-family: ${p => p.theme.fonts.mono};
    font-size: 13px;
    color: ${p => p.theme.tokens.mutedFaint};
`;

export const SymbolSlot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SectionId = styled.span`
    font-family: ${p => p.theme.fonts.mono};
    font-size: clamp(48px, 22cqi, 72px);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${p => p.theme.tokens.ink};
    font-variant-numeric: tabular-nums;
    line-height: 1;
`;

export const TitleSlot = styled.div`
    display: flex;
    align-items: flex-end;
`;

const TIER_SIZES = { xl: '24px', l: '19px', m: '15px', s: '13px' } as const;
type Tier = keyof typeof TIER_SIZES;

export const Title = styled.h1<{ $tier: Tier; $mono: boolean }>`
    font-family: ${p => p.$mono ? p.theme.fonts.mono : p.theme.fonts.sans};
    font-size: ${p => TIER_SIZES[p.$tier]};
    font-weight: 700;
    letter-spacing: -0.01em;
    color: ${p => p.theme.tokens.ink};
    line-height: 1.15;
    text-wrap: balance;
    margin: 0;
`;

export const ContextTag = styled.span`
    align-self: end;
    justify-self: end;
    font-family: ${p => p.theme.fonts.sans};
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${p => p.theme.tokens.themeText};
`;
```

```ts
// data/catalogue.ts — add to Section type
export type Section = {
    id: string;
    title: string;
    cases: string[];
    /** 4-letter group abbreviation for the card's top-left. */
    groupAbbr?: string;
    /** Pre-computed title tier for the card's title slot. */
    tier?: 'xl' | 'l' | 'm' | 's';
    /** Whether the title should render in mono. */
    mono?: boolean;
    /** The card's bottom-right context tag. */
    cardTag?: 'CELL' | 'INTERNAL' | 'RESOLVED' | 'OPEN' | 'MANIFESTO';
};

const tierFor = (title: string, mono: boolean): 'xl' | 'l' | 'm' | 's' => {
    const len = title.length;
    const bump = mono ? 1 : 0;
    const base = len <= 12 ? 0 : len <= 22 ? 1 : len <= 32 ? 2 : 3;
    return (['xl', 'l', 'm', 's'] as const)[Math.min(3, base + bump)];
};

const isMono = (t: string) => t.startsWith('$') || t.includes('(') || t.includes('<');
```

### Worked examples (all 80 sections fit)

| Title | Length | Mono | Tier | Renders at |
|-------|-------:|:----:|:----:|-----------:|
| Types | 5 | no | xl | 24px, 1 line |
| view() | 6 | yes | l | 19px, 1 line |
| Symbols | 7 | no | xl | 24px, 1 line |
| Identity | 8 | no | xl | 24px, 1 line |
| The class | 9 | no | xl | 24px, 1 line |
| The lifecycle | 13 | no | l | 19px, 1 line |
| Render filters | 14 | no | l | 19px, 1 line |
| Reactive properties | 19 | no | l | 19px, 1-2 lines |
| The binding constructor | 23 | no | m | 15px, 2 lines |
| Cross-chemical writes | 21 | no | l | 19px, 2 lines |
| particular constructor argument | 31 | no | m | 15px, 2-3 lines |
| Single-letter $<x> props were inert | 35 | yes (`<`) | s | 13px, 3 lines |
| $Reflection.isReactive(name) | 28 | yes (`$`/`(`) | s | 13px, 2 lines |
| src/implementation/representation.ts | 36 | yes (slash) | s | 13px, 3 lines |

Largest worst-case typeset (s tier, 3 lines mono):
13px × 1.15 lh × 3 = ~45px. Title slot has 80px — comfortable headroom.

## 3 — styled-components migration plan

### Verification

`styled-components ^6.1.0` is in `library/chemistry/package.json`
devDependencies (line 55, confirmed). Installed at the workspace root
`node_modules/styled-components/` (workspace hoisting). **No additional
install needed.** Import path: `import styled from 'styled-components';`

### Where `<ThemeProvider>` mounts

Top of `src/main.tsx`, wrapping `<Lab />`:

```tsx
// src/main.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
// ...
const Lab = labInstance.Component;
createRoot(root).render(
    <ThemeProvider theme={theme}>
        <Lab />
    </ThemeProvider>
);
```

The `globalStyles` injection stays as-is — it owns CSS variables, page
reset, and `body`-level typography that doesn't belong inside React. The
ThemeProvider feeds the per-component styled rules; the global stylesheet
seeds the variables those rules reference.

### How tokens flow into the theme object

Promote the existing `tokens / type / fonts / sizes` exports into a single
theme object. **No values change** — we're remapping shape only:

```ts
// src/styles/theme.ts (new file; replaces tokens.ts as the import source)
import { tokens, type, fonts, sizes } from './tokens';

export const theme = {
    tokens,
    type,
    fonts,
    sizes,
} as const;

export type Theme = typeof theme;

// styled-components type augmentation
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
```

Keep `tokens.ts` as the single source of truth (values, scales). The new
`theme.ts` is a 4-line re-export plus the type augmentation. Migration is
**non-destructive**: existing code that imports `{ tokens, fonts, sizes }`
keeps working until each module is refactored to use `props.theme.tokens`.

### File structure: co-locate

Each apparatus module gets a sibling `*.styled.ts` file. Co-location wins
over centralisation here because (a) chemicals are the unit of concern and
co-located styling reinforces the chemistry register, and (b) the apparatus
folder already has a clear one-file-per-chemical pattern that shouldn't be
fragmented across two folders.

```
src/apparatus/
├── lab.tsx
├── lab.styled.ts          ← NEW
├── header.tsx
├── header.styled.ts       ← NEW
├── sidebar.tsx
├── sidebar.styled.ts      ← NEW
├── section-page.tsx
├── section-page.styled.ts ← NEW (contains the periodic card)
├── case.tsx
├── case.styled.ts         ← NEW
├── status.tsx
├── status.styled.ts       ← NEW
├── callout.tsx
├── callout.styled.ts      ← NEW
├── code-panel.tsx
├── code-panel.styled.ts   ← NEW (sprint 30)
├── layout.tsx
├── layout.styled.ts       ← NEW
└── router.tsx             ← invisible, no styles
```

11 new files (router has no view).

### Naming convention

**Apparatus styled components have no `$` prefix.** They are React
components (built by styled-components), not chemicals (built by our
framework). The `$` membrane is for our chemistry classes; styled
components live outside it.

```ts
// section-page.styled.ts
export const Card = styled.aside` ... `;
export const TopRow = styled.header` ... `;
export const SymbolSlot = styled.div` ... `;
```

**Chemicals retain the `$` prefix** and use styled components internally:

```tsx
// section-page.tsx
import { $Chemical } from '@/index';
import * as S from './section-page.styled';

export class $SectionPage extends $Chemical {
    view() {
        return (
            <S.Card>
                <S.TopRow>
                    <S.GroupContext>...</S.GroupContext>
                </S.TopRow>
                ...
            </S.Card>
        );
    }
}
```

The convention reads as: `$Foo` is *us* (a chemical), `S.Foo` is *the DOM
element that chemical renders*. They never collide because they live in
different name spaces (`$` for chemicals, `S.` namespace for styled).

**Naming clash check:** the codebase's existing chemicals are
`$Sidebar`, `$SidebarLink`, `$Header`, `$Lab`, `$ThreePaneLayout`,
`$ContentArea`, `$Router`, `$SectionPage`, `$Breadcrumb`, `$PrevNext`,
`$Case`, `$PlannedCase`, `$Status` (+ subclasses), `$Callout` (+ subclasses),
`$CodePanel`. All `$`-prefixed; no collision with `S.Sidebar`,
`S.SidebarLink`, etc.

### Transient props inventory

Surveyed every dynamic style in the existing inline styles. These need
transient props on their styled-components:

| Component | Transient prop | Type | Source |
|-----------|---------------|------|--------|
| `S.SidebarLink` | `$active` | `boolean` | `lab.$activeSection === id` |
| `S.NavButton` | `$direction` | `'prev' \| 'next'` | text-align flip |
| `S.CaseCard` | `$status` | `'planned' \| 'pending' \| 'pass' \| 'fail' \| 'broken'` | status type |
| `S.CaseCard` | `$isPlanned` | `boolean` | border colour switch |
| `S.StatusPill` | `$color` | `string` | `$status.color` |
| `S.StatusPill` | `$bg` | `string` | `$status.bg` |
| `S.Callout` | `$accent` | `string` | `tokens.theme / ink / pending / ...` |
| `S.Title` (card) | `$tier` | `'xl' \| 'l' \| 'm' \| 's'` | length tier |
| `S.Title` (card) | `$mono` | `boolean` | starts-with-$ or has paren |

Note: `$Status` subclasses (`$Pass`, `$Fail`, etc.) currently set
`color`/`bg` instance fields. The styled-components-v6 idiom would prefer
**variant components** (`PassPill`, `FailPill`) over a single `Pill` with
a `$color` prop. **However**, the chemistry pattern already gives us
variant chemicals (`$Pass`, `$Fail`, ...) — each can hand its own
colour/bg into a single shared `S.Pill` via transient props. The two
patterns compose: chemistry handles polymorphism at the *behaviour* level,
styled-components handles styling at the *DOM* level. Don't replace the
chemistry pattern with styled variants; pass the colour through.

### Pilot — first migration

**`$Status` → `status.tsx` + `status.styled.ts` first.**

Three reasons:

1. **Smallest surface area** — one chemical, one rendered element (a
   single `<span>`), six lines of dynamic styling. Done in one sitting.
2. **Exercises every concern** — transient props (`$color`, `$bg`),
   nested styled components (the inner dot), theme access. If this works,
   the pattern is proved.
3. **Highest visual ROI** — status pills appear on every `$Case` and
   thus on every section page; getting them onto styled-components first
   makes the migration visible early.

After `$Status` lands and is reviewed, migrate in this order (simple →
complex):

1. `$Status` (pilot)
2. `$Callout` family (small, six subclasses share one shape)
3. `$Header` (medium; has the brand mark + ⌘K stub)
4. `$Layout` / `$ContentArea` / `$Lab` outer wrapper (small; just
   layout primitives)
5. `$Sidebar` + `$SidebarLink` (medium; has active state)
6. `$Case` / `$PlannedCase` (medium; has hover state)
7. `$Breadcrumb` + `$PrevNext` (medium; pager has hover state)
8. `$SectionPage` — and at this step, **introduce the new periodic-card
   composition**, deleting `$Breadcrumb` and the old heading stack from
   the page in the same commit.
9. `$CodePanel` (deferred to sprint 30 anyway).

### Effort estimate

12 apparatus files (11 styled, 1 router invisible). Sized by current line
count of inline-style payloads:

| Module | Lines of style today | Effort | Notes |
|--------|---------------------:|-------:|-------|
| `status.tsx` | ~20 | 30 min | pilot |
| `callout.tsx` | ~25 | 30 min | family of 6 |
| `header.tsx` | ~80 | 1 h | brand mark + ⌘K stub |
| `layout.tsx` | ~25 | 30 min | three flex containers |
| `lab.tsx` | ~10 | 15 min | outer flex column |
| `sidebar.tsx` | ~80 | 1.5 h | hover + active state |
| `case.tsx` | ~50 | 1 h | hover state |
| `section-page.tsx` (without card) | ~120 | 1.5 h | dense |
| `section-page.tsx` — periodic card | new | 2 h | new component, four-tier ladder, container query |
| `code-panel.tsx` | 0 (sprint-30) | — | deferred |

**Total: ~9 hours of focused work**, splittable into three sittings:
(1) pilot + callouts + simple modules ≈ 3h, (2) sidebar + case + page
prose ≈ 3h, (3) periodic card composition ≈ 3h. The card itself is the
biggest single chunk because the four-tier ladder + container query +
mono detection are all new behaviour, not a refactor.

### Catalogue data changes

`data/catalogue.ts` needs three new optional fields on each `Section`
(`groupAbbr`, `tier`, `mono`, `cardTag`) plus the `tierFor()` and
`isMono()` helpers. Better: compute those at module load by mapping the
catalogue array, so the source data stays minimal:

```ts
// data/catalogue.ts (after the literal definition)
export const enriched = catalogue.map(group => ({
    ...group,
    abbr: abbreviate(group.title), // 4-letter, uppercase
    sections: group.sections.map(s => ({
        ...s,
        mono: isMono(s.title),
        tier: tierFor(s.title, isMono(s.title)),
        groupAbbr: abbreviate(group.title),
        cardTag: cardTagFor(group.roman),
    })),
}));
```

Computed once at module load; section pages read enriched, sidebar reads
the original (it doesn't need card metadata).

## Summary for Doug

- **Card: 280×280**, left-aligned at top of content column, replaces
  breadcrumb + heading + group tag in one component.
- **Title overflow: discrete 4-tier length ladder** (24/19/15/13px),
  pre-computed via transient `$tier` prop, plus mono detection that
  bumps tier down one step, plus `text-wrap: balance` for graceful 2-3
  line wrap. Verified against all 80 catalogue titles.
- **styled-components first step: migrate `$Status` as the pilot** —
  smallest surface, every pattern present, highest visual ROI. Then
  `$Callout`, `$Header`, layout primitives, sidebar, case, prose, and
  finally `$SectionPage` with the new card. ~9 hours total across the
  apparatus.
- **Top three research surprises:**
  1. ptable doesn't auto-size element names; we're echoing a less
     sophisticated metaphor than I assumed (so committing to discrete
     tiers is *more* faithful, not less).
  2. Stripe API ref carries identity through the code panel, not a hero
     card — our card may want to *replace* the code panel's prominence
     rather than coexist with it. Worth Cathy's review.
  3. styled-components v6 prefers variant components over `$variant`
     props; our chemistry polymorphism (`$Pass`, `$Fail`, ...) already
     matches that pattern beat-for-beat. The framework's
     polymorphism-without-props move is a free win.

<!-- citations -->

[prior-vr]: ./visual-research.md
[prior-cs]: ./comp-survey.md
[ptable]: https://ptable.com
[wiki-carbon]: https://en.wikipedia.org/wiki/Carbon
[sn-cells]: https://sciencenotes.org/periodic-table-element-cells/
[compoundchem]: https://www.compoundchem.com
[sc-api]: https://styled-components.com/docs/api
[sc-faqs]: https://styled-components.com/docs/faqs
[sc-rel]: https://styled-components.com/releases
[rw-sc]: https://www.robinwieruch.de/styled-components/
[cv-folder]: https://www.codevertiser.com/styled-components-folder-structure/
[apple-sf]: https://developer.apple.com/design/human-interface-guidelines/sf-symbols
[stripe-api]: https://docs.stripe.com/api
[mdn-clamp]: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
[mdn-textwrap]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
[css-tricks-clamp]: https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
[css-tricks-fit]: https://css-tricks.com/fitting-text-to-a-container/
[lorp-ftw]: https://github.com/Lorp/fit-to-width
