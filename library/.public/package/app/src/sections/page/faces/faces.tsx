import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { Highlight, themes } from 'prism-react-renderer';

// R13 — the three dresses stop styling generic emitted markup (`.markdown h1`,
// `.markdown p`, `.markdown code` …) and instead differ by what their PARTS
// draw. Each specialized part renders its own face; the dress is handed DOWN to
// the face as palette + face-set. A part never reaches up to ask which dress it
// is in — that would tell the truth at binding and lie on screen
// (solutions/09-the-parent-that-changed-on-screen).
//
// Book and Night are ONE face-set (letterpress) worn in two palettes; Github is
// the distinct face-set (readme). That is the whole shape: the part is the
// invariant, the dress is palette + which face-set draws it. There is no
// `.markdown <tag>` selector anywhere — the colours live on the part.
//
// Standalone and renderable. NOT wired: the port maps the sheet's existing
// Perspective('book' | 'github' | 'night') onto `dress(...)` and calls these
// faces from each markdown part's `view()`. Until then these stand alone.

export type Dress = 'book' | 'github' | 'night';

type PrismTheme = typeof themes.nightOwl;

export interface Palette {
    name: Dress;
    ink: string;
    headingInk: string;
    strongInk: string;
    emphasisInk: string;
    initialInk: string;
    codeInk: string;
    codeFill: string;
    codeEdge: string;
    linkInk: string;
    ruleInk: string;
    family: string;
    codeTheme: PrismTheme;
}

const serif = `Georgia, 'Iowan Old Style', 'Times New Roman', serif`;
const sans = `-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const mono = `ui-monospace, Menlo, Consolas, monospace`;

// The palettes are the shipped skins' own values, carried on the part now
// instead of in a stylesheet reaching into markup — same look, no `.markdown`.
const bookPalette: Palette = {
    name: 'book',
    ink: '#29251d',
    headingInk: '#1f1b14',
    strongInk: '#14100a',
    emphasisInk: '#3c352a',
    initialInk: '#6d6146',
    codeInk: '#29251d',
    codeFill: '#f0ebdd',
    codeEdge: '#e2dbc6',
    linkInk: '#705f38',
    ruleInk: '#cfc7ae',
    family: serif,
    codeTheme: themes.github,
};

const nightPalette: Palette = {
    name: 'night',
    ink: '#c9d0f2',
    headingInk: '#f2ecd9',
    strongInk: '#ffd27a',
    emphasisInk: '#9fd0ff',
    initialInk: '#ffd27a',
    codeInk: '#cdd5f5',
    codeFill: '#1e2440',
    codeEdge: '#32396a',
    linkInk: '#7cf0c8',
    ruleInk: '#3a4272',
    family: serif,
    codeTheme: themes.nightOwl,
};

const githubPalette: Palette = {
    name: 'github',
    ink: '#1f2328',
    headingInk: '#1f2328',
    strongInk: '#1f2328',
    emphasisInk: '#1f2328',
    initialInk: '#1f2328',
    codeInk: '#1f2328',
    codeFill: '#f6f8fa',
    codeEdge: '#eaeef2',
    linkInk: '#0969da',
    ruleInk: '#d1d9e0',
    family: sans,
    codeTheme: themes.github,
};

export const palettes: Record<Dress, Palette> = {
    book: bookPalette,
    night: nightPalette,
    github: githubPalette,
};

// The faces a part is drawn with. Each is presentational — it receives the
// dress's palette and draws itself.
export interface HeadingProps { palette: Palette; level?: number; children: ReactNode }
export interface BodyProps { palette: Palette; opening?: boolean; children: ReactNode }
export interface SpanProps { palette: Palette; children: ReactNode }
export interface FenceProps { palette: Palette; label?: string; language?: string; code: string }
export interface RuleProps { palette: Palette }
export interface MathProps { palette: Palette; children: ReactNode }
export interface LinkProps { palette: Palette; href?: string; external?: boolean; broken?: boolean; children: ReactNode }

export interface FaceSet {
    Heading: React.FC<HeadingProps>;
    Body: React.FC<BodyProps>;
    Strong: React.FC<SpanProps>;
    Emphasis: React.FC<SpanProps>;
    InlineCode: React.FC<SpanProps>;
    Fence: React.FC<FenceProps>;
    Rule: React.FC<RuleProps>;
    DisplayMath: React.FC<MathProps>;
    Link: React.FC<LinkProps>;
}

// One prism rendering, shared by every fence face; the dress passes its own
// theme, so book and night light the same code cool or warm.
function Inked({ code, language, theme }: { code: string; language: string; theme: PrismTheme }): React.ReactElement {
    return (
        <Highlight code={code.trim()} language={language} theme={theme}>
            {({ tokens, getLineProps, getTokenProps }) => (
                <pre>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, j) => (
                                <span key={j} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
}

// ---- the letterpress face-set (Book and Night) --------------------------------

const LetterHeading = styled.h2<{ $p: Palette; $lead: boolean }>`
    font-family: ${(p) => p.$p.family};
    color: ${(p) => p.$p.headingInk};
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.15;
    font-size: ${(p) => (p.$lead ? '39px' : '21px')};
    margin: ${(p) => (p.$lead ? '0 0 30px' : '32px 0 12px')};
`;

const LetterBody = styled.p<{ $p: Palette }>`
    font-family: ${(p) => p.$p.family};
    color: ${(p) => p.$p.ink};
    font-size: 17.2px;
    line-height: 1.8;
    margin: 0 0 18px;
    text-align: justify;
    hyphens: auto;
`;

// The drop cap is a part that knows it is the opening — it draws its own
// initial as a real element. This replaces the `p:first-of-type::first-letter`
// CSS hack, which reached into "whichever paragraph happens to render first."
const DropInitial = styled.span<{ $p: Palette }>`
    float: left;
    font-family: ${(p) => p.$p.family};
    font-size: 57px;
    line-height: 0.85;
    padding: 6px 10px 0 0;
    color: ${(p) => p.$p.initialInk};
`;

const LetterStrong = styled.strong<{ $p: Palette }>`
    color: ${(p) => p.$p.strongInk};
    font-weight: 700;
`;

const LetterEm = styled.em<{ $p: Palette }>`
    color: ${(p) => p.$p.emphasisInk};
    font-style: italic;
`;

const LetterCode = styled.code<{ $p: Palette }>`
    font-family: ${mono};
    font-size: 0.86em;
    color: ${(p) => p.$p.codeInk};
    background: ${(p) => p.$p.codeFill};
    border: 1px solid ${(p) => p.$p.codeEdge};
    border-radius: 4px;
    padding: 1px 5px;
`;

const LetterHr = styled.hr<{ $p: Palette }>`
    border: none;
    margin: 34px auto;
    width: 72px;
    height: 1px;
    background: ${(p) => p.$p.ruleInk};
`;

const LetterFence = styled.figure<{ $p: Palette }>`
    margin: 22px 0;
    border: 1px solid ${(p) => p.$p.codeEdge};
    border-radius: 8px;
    overflow: hidden;
    background: ${(p) => p.$p.codeFill};

    pre {
        margin: 0;
        padding: 14px 16px;
        overflow-x: auto;
        font-size: 12px;
        line-height: 1.55;
        font-family: ${mono};
        background: transparent !important;
    }
`;

const FenceLabel = styled.figcaption<{ $p: Palette }>`
    font-family: ${mono};
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${(p) => p.$p.initialInk};
    padding: 8px 16px 0;
`;

const LetterMath = styled.div<{ $p: Palette }>`
    margin: 26px 0 28px;
    text-align: center;
    font-size: 1.12em;
    overflow-x: auto;
    color: ${(p) => p.$p.ink};
`;

const LetterAnchor = styled.a<{ $p: Palette }>`
    color: ${(p) => p.$p.linkInk};
    text-decoration: underline;
    text-underline-offset: 2px;
`;

// A broken link resolves to nothing, so it reads as plain prose — never a
// live-looking affordance that goes nowhere (R4).
const Plain = styled.span``;

const LetterpressHeading: React.FC<HeadingProps> = ({ palette, level, children }) => (
    <LetterHeading $p={palette} $lead={(level ?? 1) <= 1}>{children}</LetterHeading>
);

const LetterpressBody: React.FC<BodyProps> = ({ palette, opening, children }) => {
    if (opening && typeof children === 'string' && children.length > 0) {
        return (
            <LetterBody $p={palette}>
                <DropInitial $p={palette}>{children[0]}</DropInitial>
                {children.slice(1)}
            </LetterBody>
        );
    }
    return <LetterBody $p={palette}>{children}</LetterBody>;
};

const LetterpressStrong: React.FC<SpanProps> = ({ palette, children }) => <LetterStrong $p={palette}>{children}</LetterStrong>;
const LetterpressEmphasis: React.FC<SpanProps> = ({ palette, children }) => <LetterEm $p={palette}>{children}</LetterEm>;
const LetterpressInlineCode: React.FC<SpanProps> = ({ palette, children }) => <LetterCode $p={palette}>{children}</LetterCode>;

const LetterpressFence: React.FC<FenceProps> = ({ palette, label, language, code }) => (
    <LetterFence $p={palette}>
        {label ? <FenceLabel $p={palette}>{label}</FenceLabel> : null}
        <Inked code={code} language={language ?? 'tsx'} theme={palette.codeTheme} />
    </LetterFence>
);

const LetterpressRule: React.FC<RuleProps> = ({ palette }) => <LetterHr $p={palette} />;
const LetterpressDisplayMath: React.FC<MathProps> = ({ palette, children }) => <LetterMath $p={palette}>{children}</LetterMath>;

const LetterpressLink: React.FC<LinkProps> = ({ palette, href, external, broken, children }) => {
    if (broken) return <Plain>{children}</Plain>;
    return (
        <LetterAnchor $p={palette} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {children}
        </LetterAnchor>
    );
};

export const letterpress: FaceSet = {
    Heading: LetterpressHeading,
    Body: LetterpressBody,
    Strong: LetterpressStrong,
    Emphasis: LetterpressEmphasis,
    InlineCode: LetterpressInlineCode,
    Fence: LetterpressFence,
    Rule: LetterpressRule,
    DisplayMath: LetterpressDisplayMath,
    Link: LetterpressLink,
};

// ---- the readme face-set (Github) — the distinct set --------------------------

const ReadmeHeading = styled.h2<{ $p: Palette; $lead: boolean }>`
    font-family: ${(p) => p.$p.family};
    color: ${(p) => p.$p.headingInk};
    font-weight: 600;
    line-height: 1.25;
    font-size: ${(p) => (p.$lead ? '2em' : '1.3em')};
    margin: ${(p) => (p.$lead ? '0 0 20px' : '26px 0 14px')};
    padding-bottom: 0.3em;
    border-bottom: 1px solid ${(p) => p.$p.ruleInk};
`;

const ReadmeBody = styled.p<{ $p: Palette }>`
    font-family: ${(p) => p.$p.family};
    color: ${(p) => p.$p.ink};
    font-size: 16px;
    line-height: 1.65;
    margin: 0 0 16px;
`;

const ReadmeStrong = styled.strong<{ $p: Palette }>`
    color: ${(p) => p.$p.strongInk};
    font-weight: 600;
`;

const ReadmeEm = styled.em<{ $p: Palette }>`
    color: ${(p) => p.$p.emphasisInk};
    font-style: italic;
`;

const ReadmeCode = styled.code<{ $p: Palette }>`
    font-family: ${mono};
    font-size: 85%;
    color: ${(p) => p.$p.codeInk};
    background: ${(p) => p.$p.codeFill};
    border-radius: 6px;
    padding: 0.2em 0.4em;
`;

const ReadmeHr = styled.hr<{ $p: Palette }>`
    border: none;
    height: 0.25em;
    background: ${(p) => p.$p.ruleInk};
    margin: 30px 0;
`;

const ReadmeFence = styled.figure<{ $p: Palette }>`
    margin: 18px 0;
    border: 1px solid ${(p) => p.$p.codeEdge};
    border-radius: 6px;
    overflow: hidden;

    pre {
        margin: 0;
        padding: 12px 16px;
        overflow-x: auto;
        font-size: 12px;
        line-height: 1.5;
        font-family: ${mono};
    }
`;

// Github's fence wears a file header — the info string reads as a filename, the
// way a repository shows a source file.
const FenceFile = styled.figcaption<{ $p: Palette }>`
    font-family: ${mono};
    font-size: 11.5px;
    color: ${(p) => p.$p.ink};
    background: ${(p) => p.$p.codeFill};
    border-bottom: 1px solid ${(p) => p.$p.codeEdge};
    padding: 7px 14px;
`;

const ReadmeMath = styled.div<{ $p: Palette }>`
    margin: 22px 0;
    text-align: center;
    overflow-x: auto;
    color: ${(p) => p.$p.ink};
`;

const ReadmeAnchor = styled.a<{ $p: Palette }>`
    color: ${(p) => p.$p.linkInk};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const ReadmeHeadingFace: React.FC<HeadingProps> = ({ palette, level, children }) => (
    <ReadmeHeading $p={palette} $lead={(level ?? 1) <= 1}>{children}</ReadmeHeading>
);

// The readme body ignores `opening` — a README has no drop cap. That the same
// prop draws differently here is the proof the face-set is the difference, not
// a stylesheet.
const ReadmeBodyFace: React.FC<BodyProps> = ({ palette, children }) => <ReadmeBody $p={palette}>{children}</ReadmeBody>;
const ReadmeStrongFace: React.FC<SpanProps> = ({ palette, children }) => <ReadmeStrong $p={palette}>{children}</ReadmeStrong>;
const ReadmeEmphasisFace: React.FC<SpanProps> = ({ palette, children }) => <ReadmeEm $p={palette}>{children}</ReadmeEm>;
const ReadmeInlineCodeFace: React.FC<SpanProps> = ({ palette, children }) => <ReadmeCode $p={palette}>{children}</ReadmeCode>;

const ReadmeFenceFace: React.FC<FenceProps> = ({ palette, label, language, code }) => (
    <ReadmeFence $p={palette}>
        <FenceFile $p={palette}>{label ? `${label} · ${language ?? 'tsx'}` : (language ?? 'tsx')}</FenceFile>
        <Inked code={code} language={language ?? 'tsx'} theme={palette.codeTheme} />
    </ReadmeFence>
);

const ReadmeRuleFace: React.FC<RuleProps> = ({ palette }) => <ReadmeHr $p={palette} />;
const ReadmeDisplayMathFace: React.FC<MathProps> = ({ palette, children }) => <ReadmeMath $p={palette}>{children}</ReadmeMath>;

const ReadmeLinkFace: React.FC<LinkProps> = ({ palette, href, external, broken, children }) => {
    if (broken) return <Plain>{children}</Plain>;
    return (
        <ReadmeAnchor $p={palette} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {children}
        </ReadmeAnchor>
    );
};

export const readme: FaceSet = {
    Heading: ReadmeHeadingFace,
    Body: ReadmeBodyFace,
    Strong: ReadmeStrongFace,
    Emphasis: ReadmeEmphasisFace,
    InlineCode: ReadmeInlineCodeFace,
    Fence: ReadmeFenceFace,
    Rule: ReadmeRuleFace,
    DisplayMath: ReadmeDisplayMathFace,
    Link: ReadmeLinkFace,
};

// ---- the dress: palette + face-set --------------------------------------------

export interface DressSpec {
    faces: FaceSet;
    palette: Palette;
}

// Book and Night share `letterpress` and differ only in palette; Github is
// `readme`. This is the one function the port calls with the sheet's current
// Perspective name.
export function dress(d: Dress): DressSpec {
    if (d === 'github') return { faces: readme, palette: githubPalette };
    return { faces: letterpress, palette: d === 'night' ? nightPalette : bookPalette };
}
