// $Chemistry Lab — design tokens. Light theme, React.dev-inspired.
//
// React's docs are the canonical light-theme dev-tool reference: warm-paper
// background, near-black text, single brand accent (blue), Inter sans
// throughout, generous spacing, restrained chrome. We follow that pattern but
// substitute Fiverr-green for the accent — the framework's identity.

const hsl = (h: number, s: number, l: number) =>
    `hsl(${h}, ${s}%, ${l}%)`;
const hsla = (h: number, s: number, l: number, a: number) =>
    `hsla(${h}, ${s}%, ${l}%, ${a})`;

// Hue strategy — TWO distinct color systems:
//
//   THEME (chrome):  electric turquoise. Drives panel tint, sidebar active
//                    state, callout accents, link affordance — anything that
//                    is "the app's chrome" rather than "the framework's name".
//
//   BRAND (code):    neon green. Used ONLY for `$Chemistry` literal occurrences
//                    — the wordmark in the header, inline `$Chemistry` in body
//                    prose, code highlighting where the framework is named.
//                    Treated like code, not a logo: mono font, no embossing.
//
// This split lets the chrome use one color system without binding it to the
// brand identity. The framework's name reads as code; the app reads as
// turquoise.
const THEME_HUE = 188;   // electric turquoise (chrome)
const BRAND_HUE = 140;   // neon green (the framework's name)
const PANEL_HUE = THEME_HUE;

export const tokens = {
    // Surfaces — pure neutral grayscale ramp
    paper:         '#FAFAFA',
    paperRaised:   '#FFFFFF',
    // Panel: same lightness as a recessed paper (~95%) but turquoise-tinted.
    paperRecessed: hsl(PANEL_HUE, 22, 95),    // ≈ #E6F3F4 — soft turquoise wash
    paperSunken:   hsl(PANEL_HUE, 18, 92),

    // Inks (neutral grayscale)
    ink:        '#16181D',
    inkSoft:    '#23272F',
    muted:      '#5C6068',
    mutedSoft:  '#8E9197',
    mutedFaint: '#C5C7CB',

    // Rules
    rule:        hsl(PANEL_HUE, 12, 90),
    ruleStrong:  hsl(PANEL_HUE, 14, 82),

    // THEME — electric turquoise. App chrome.
    theme:        hsl(THEME_HUE, 100, 36),    // ≈ #00A1C2 — primary affordance
    themeText:    hsl(THEME_HUE, 100, 28),    // ≈ #007D99 — text-safe
    themeDark:    hsl(THEME_HUE, 100, 22),
    themeBright:  hsl(THEME_HUE, 100, 48),    // ≈ #00C2E6 — highlight
    themeSoft:    hsla(THEME_HUE, 100, 48, 0.14),
    themeFaint:   hsla(THEME_HUE, 100, 48, 0.06),

    // BRAND — neon green. Used ONLY for `$Chemistry` and code highlights.
    brand:        hsl(BRAND_HUE, 100, 32),    // ≈ #00A317 — neon-leaning
    brandText:    hsl(BRAND_HUE, 100, 28),    // ≈ #008F14 — text-safe
    brandBright:  hsl(BRAND_HUE, 100, 42),    // ≈ #00D61F — full neon
    brandSoft:    hsla(BRAND_HUE, 100, 42, 0.12),

    // Status semantics
    ok:          hsl(BRAND_HUE,         100, 32),
    okBg:        hsla(BRAND_HUE,        100, 42, 0.12),
    fail:        hsl(0,                 70, 48),
    failBg:      hsla(0,                70, 60, 0.10),
    pending:     hsl(35,                95, 45),
    pendingBg:   hsla(35,               95, 60, 0.12),
    planned:     hsl(220,               12, 42),
    plannedBg:   hsla(220,              14, 60, 0.10),
    broken:      hsl(285,               55, 50),
    brokenBg:    hsla(285,              55, 65, 0.10),
} as const;

// Modular type scale — 1.2 (perfect fourth). Base 16px.
const STEP = 1.2;
const BASE = 16;
const t = (step: number) => `${Math.round(BASE * Math.pow(STEP, step))}px`;

export const type = {
    micro:    t(-2),   // 11px
    caption:  t(-1),   // 13px
    body:     t(0),    // 16px
    lead:     t(1),    // 19px
    h4:       t(1),    // 19px
    h3:       t(2),    // 23px
    h2:       t(3),    // 28px
    h1:       t(4),    // 33px
    display:  t(5),    // 40px
} as const;

export const fonts = {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "SF Mono", ui-monospace, monospace',
    brand: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
} as const;

export const sizes = {
    bodyText: type.body,
    smallText: type.caption,
    pillText: type.micro,
    contentMaxWidth: '1080px',
    sidebarWidth: '280px',
    codePanelWidth: '440px',
    headerHeight: '56px',
} as const;

export const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    :root {
        --ink: ${tokens.ink};
        --ink-soft: ${tokens.inkSoft};
        --muted: ${tokens.muted};
        --muted-soft: ${tokens.mutedSoft};
        --muted-faint: ${tokens.mutedFaint};
        --paper: ${tokens.paper};
        --paper-raised: ${tokens.paperRaised};
        --paper-recessed: ${tokens.paperRecessed};
        --paper-sunken: ${tokens.paperSunken};
        --rule: ${tokens.rule};
        --rule-strong: ${tokens.ruleStrong};
        --theme: ${tokens.theme};
        --theme-text: ${tokens.themeText};
        --theme-dark: ${tokens.themeDark};
        --theme-bright: ${tokens.themeBright};
        --theme-soft: ${tokens.themeSoft};
        --theme-faint: ${tokens.themeFaint};
        --brand: ${tokens.brand};
        --brand-text: ${tokens.brandText};
        --brand-bright: ${tokens.brandBright};
        --brand-soft: ${tokens.brandSoft};
        --ok: ${tokens.ok};
        --fail: ${tokens.fail};
        --pending: ${tokens.pending};
        --planned: ${tokens.planned};
        --broken: ${tokens.broken};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
        font-family: ${fonts.body};
        font-size: ${sizes.bodyText};
        line-height: 1.65;
        color: var(--ink);
        background: var(--paper);
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-feature-settings: "cv11", "ss01";
    }
    button {
        font: inherit;
        color: inherit;
        background: none;
        border: none;
        cursor: pointer;
        transition: color 100ms, background 100ms, border-color 100ms;
    }
    a {
        color: var(--theme-text);
        text-decoration: none;
        text-underline-offset: 3px;
        text-decoration-thickness: 1px;
        transition: color 100ms;
    }
    a:hover {
        color: var(--theme-dark);
        text-decoration: underline;
    }
    button:focus-visible,
    a:focus-visible {
        outline: 2px solid var(--theme);
        outline-offset: 2px;
        border-radius: 2px;
    }
    code {
        font-family: ${fonts.mono};
        font-size: 0.9em;
        background: var(--theme-soft);
        color: var(--theme-text);
        padding: 1px 6px;
        border-radius: 3px;
        font-variant-numeric: tabular-nums;
    }
    pre code { padding: 0; background: none; color: var(--ink); }
    /* The framework name rendered as code anywhere in body prose. */
    .chemistry-mark {
        font-family: ${fonts.mono};
        color: var(--brand-text);
        font-weight: 500;
        font-variant-numeric: tabular-nums;
    }
    h1, h2, h3, h4 {
        font-family: ${fonts.heading};
        font-weight: 700;
        line-height: 1.15;
        letter-spacing: -0.015em;
    }
    h1 { font-size: ${type.h1}; font-weight: 800; letter-spacing: -0.02em; }
    h2 { font-size: ${type.h2}; }
    h3 { font-size: ${type.h3}; }
    h4 { font-size: ${type.h4}; }
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb {
        background: var(--rule-strong);
        border-radius: 5px;
        border: 2px solid var(--paper-recessed);
    }
    ::-webkit-scrollbar-thumb:hover { background: var(--muted-soft); }

    .tnum { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }

    ::selection {
        background: var(--theme-soft);
        color: var(--theme-dark);
    }
`;
