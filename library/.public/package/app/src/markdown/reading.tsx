import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $MarkdownSection, MarkdownSection, $Equation, $Rule } from './section';
import { $Code } from '@/writing/Code';
import { $Figure } from '@/writing/Figure';

import { $Link } from '@/reference/Link';
import { $Formula } from '@/writing/Formula';
import { $Snippet } from '@/writing/Snippet';
import { dress, type Dress, type DressSpec } from '../sections/page/faces/faces';

// The port. The page stops running its own parse and reads the model instead —
// so `title`, `paragraphs`, `words` and `formulas` are all readings, and there
// is one parse in the demo where there were two.
//
// The dress is handed DOWN, never reached up for: a part is given its faces by
// whoever draws it, because a member that climbs `parent` tells the truth at
// binding and lies on screen (solutions/09).

// A heading bounds a section and IS its title — so the source is cut at its
// headings and each piece becomes a section of its own.
const heads = /^(#{1,6})[ \t]+(.+)$/gm;

export type Cut = { title: string; depth: number; body: string };

export function cut(source: string): Cut[] {
    const found: Cut[] = [];
    const marks: { at: number; end: number; depth: number; title: string }[] = [];
    for (let m = heads.exec(source); m; m = heads.exec(source)) {
        marks.push({ at: m.index, end: m.index + m[0].length, depth: m[1].length, title: m[2].trim() });
    }
    if (!marks.length) return [{ title: '', depth: 0, body: source }];
    if (marks[0].at > 0) found.push({ title: '', depth: 0, body: source.slice(0, marks[0].at) });
    marks.forEach((mark, i) => {
        const to = i + 1 < marks.length ? marks[i + 1].at : source.length;
        found.push({ title: mark.title, depth: mark.depth, body: source.slice(mark.end, to) });
    });
    return found;
}

// KEYED TO THE SOURCE. Building the sections inside the view meant a fresh set
// every render — so the section a reader acted on was never the section that
// drew, and nothing it held survived. That is TWO POPULATIONS OF ONE OBJECT,
// the defect this branch has already filed twice, arriving one level up. The
// key is the source: a reading never goes stale, and identity never churns.
let keyed: string | undefined;
let made: $MarkdownSection[] = [];

export function sections(source: string): $MarkdownSection[] {
    if (keyed === source) return made;
    keyed = source;
    made = cut(source)
        .filter(c => c.title || c.body.trim())
        .map(c => $(<MarkdownSection><Title>{c.title || '—'}</Title>{`\n\n${c.body.trim()}`}</MarkdownSection>) as $MarkdownSection);
    return made;
}

// A reading of the whole source, off the model — never a second parse.
export class Readings {
    constructor(public readonly parts: $MarkdownSection[], public readonly cuts: Cut[]) { }

    get title(): string {
        return this.cuts.find(c => c.depth === 1)?.title ?? this.cuts.find(c => c.title)?.title ?? '';
    }

    get paragraphs(): $Paragraph[] {
        // A section may hold sections now, so the flat list reaches through them.
        return this.parts.flatMap(s => s.paragraphs).filter(p => !(p instanceof $Code));
    }

    get words(): $Word[] {
        return this.paragraphs.flatMap(p => p.sentences).flatMap(s => s.words);
    }

    // Formulas are read off `parts()` — display math is a paragraph-grade
    // figure, inline math a part of its sentence. Nothing scans `$elements`
    // looking for instances of a class, which is what the old getter did.
    get formulas(): number {
        const shown = this.parts.flatMap(s => s.parts()).filter(p => p instanceof $Figure).length;
        const within = this.paragraphs
            .flatMap(p => p.sentences)
            .flatMap(s => s.parts())
            .filter(w => w instanceof $Formula).length;
        return shown + within;
    }
}

export function read(source: string): Readings {
    return new Readings(sections(source), cut(source));
}

// --- drawing -------------------------------------------------------------
// Each part is drawn by the face its KIND names, and the faces come from the
// dress. There is no `.markdown <tag>` selector anywhere in this path.
//
// The faces STYLE; they do not typeset. A formula's content is TeX, so drawing
// it means running katex over it and handing the result to the face — the model
// decides what the content is, the dress decides how it looks.

function typeset(tex: string, display: boolean): string {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false });
}

// Inline mathematics draws INLINE. Sending it through the display face put a
// block inside a paragraph, which React reported as a nesting error before any
// human noticed it.
const Formula: React.FC<{ tex: string }> = ({ tex }) => (
    <span className="katex-inline" dangerouslySetInnerHTML={{ __html: typeset(tex, false) }} />
);

const Shown: React.FC<{ tex: string }> = ({ tex }) => (
    <span dangerouslySetInnerHTML={{ __html: typeset(tex, true) }} />
);

function drawSentence(sentence: $Sentence, spec: DressSpec, key: React.Key): ReactNode {
    const { faces: F, palette } = spec;
    let bold = false;
    let italic = false;
    const drawn: ReactNode[] = [];
    sentence.parts().forEach((part, i) => {
        if (part instanceof $Link) {
            const external = /^[a-z]+:\/\//i.test(part.url);
            drawn.push(<F.Link key={i} palette={palette} href={part.url} external={external}>{part.copy}</F.Link>);
            return;
        }
        if (part instanceof $Formula) {
            drawn.push(<Formula key={i} tex={part.copy} />);
            return;
        }
        if (part instanceof $Snippet) {
            drawn.push(<F.InlineCode key={i} palette={palette}>{part.copy}</F.InlineCode>);
            return;
        }
        const copy = part.copy;
        if (copy === '**' || copy === '__') { bold = !bold; return; }
        if (copy === '*' || copy === '_') {
            // A lone mark that never pairs is punctuation, and it must print.
            const rest = sentence.parts().slice(i + 1).some(p => p.copy === copy);
            if (rest || italic) { italic = !italic; return; }
            drawn.push(<React.Fragment key={i}>{copy}</React.Fragment>);
            return;
        }
        const body = <React.Fragment key={i}>{copy}</React.Fragment>;
        if (bold) drawn.push(<F.Strong key={i} palette={palette}>{copy}</F.Strong>);
        else if (italic) drawn.push(<F.Emphasis key={i} palette={palette}>{copy}</F.Emphasis>);
        else drawn.push(body);
    });
    return <React.Fragment key={key}>{drawn}</React.Fragment>;
}

// A fence whose info string is `parts` draws NOT text but the section's own
// parts, and the reader can act on it. Content that is not writing, that
// responds. It stopped needing a class of its own the moment the notation moved
// into the framework: a fence carries its info string, and what draws a fence is
// the demo's business, which is exactly where this belongs.
const attends = (part: unknown): boolean =>
    part instanceof $Code && (part as $Code).language === 'parts';

// The figure that responds. It holds REFERENCES to the section's parts, not the
// parts themselves — reading one forward lands on the very part the prose
// renders, and that shared identity is what makes it a check rather than a
// claim. Acting on it sets what the SECTION is attending to; the section hands
// that down to both surfaces. Nothing announces that it can be clicked.
const Attend: React.FC<{ section: $MarkdownSection; spec: DressSpec; at: number; attend: (i: number) => void }> = ({ section, spec, at, attend }) => {
    // The address is the position, read off the section's own walk — the figure
    // and the prose agree because they count the same list, not because a number
    // was written onto each part.
    return (
        <PartsFigure $ink={spec.palette.ink}>
            {section.parts().map((part, position) => attends(part) ? null : (
                <PartRow
                    key={position}
                    $ink={spec.palette.ink}
                    $lit={at === position}
                    onClick={() => attend(position)}
                >
                    <span>{position}</span>
                    <span>{part instanceof $Code ? (part as $Code).language : grade(part)}</span>
                    <span>{((part.copy || (part as $Code).source) || '—').slice(0, 52)}</span>
                </PartRow>
            ))}
        </PartsFigure>
    );
};

function drawPart(part: $Paragraph | $Section, spec: DressSpec, key: React.Key, opening: boolean, lit = false): ReactNode {
    const { faces: F, palette } = spec;
    if (lit) {
        return <Lit key={key} $ink={palette.initialInk}>{drawPart(part, spec, `${key}-in`, opening)}</Lit>;
    }
    // A subsection draws its own parts in place — nothing is dropped because the
    // notation has not learned to nest yet.
    if (part instanceof $Section) {
        return (
            <React.Fragment key={key}>
                {part.parts().map((inner, k) => drawPart(inner, spec, `${key}-${k}`, false))}
            </React.Fragment>
        );
    }
    if (part instanceof $Equation) {
        return <F.DisplayMath key={key} palette={palette}><Shown tex={part.mathematics} /></F.DisplayMath>;
    }
    if (part instanceof $Rule) {
        return <hr key={key} />;
    }
    if (part instanceof $Figure) {
        const Drawn = $(part) as any;
        return <Drawn key={key} />;
    }
    if (part instanceof $Code) {
        const fence = part as $Code;
        return <F.Fence key={key} palette={palette} language={fence.language} label={fence.language} code={fence.source} />;
    }
    return (
        <F.Body key={key} palette={palette} opening={opening}>
            {part.sentences.map((s, i) => drawSentence(s, spec, i))}
        </F.Body>
    );
}

export function Reading({ source, as, at = -1, attend = () => { } }: { source: string; as: Dress; at?: number; attend?: (i: number) => void }): React.ReactElement {
    const spec = dress(as);
    const { faces: F, palette } = spec;
    const cuts = cut(source).filter(c => c.title || c.body.trim());
    const built = sections(source);
    let opened = false;
    return (
        <>
            {built.map((section: $Section, i: number) => {
                const c = cuts[i];
                const body = section.parts().slice(1);
                return (
                    <React.Fragment key={i}>
                        {c?.title ? <F.Heading palette={palette} level={c.depth}>{c.title}</F.Heading> : null}
                        {body.map((part, j) => {
                            // body is parts().slice(1) — the title stands at 0.
                            const position = j + 1;
                            const first = !opened && !(part instanceof $Code);
                            if (first) opened = true;
                            if (attends(part)) {
                                return <Attend key={`${i}-${j}`} section={section as $MarkdownSection} spec={spec} at={at} attend={attend} />;
                            }
                            return drawPart(part, spec, `${i}-${j}`, first, at === position);
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
}

const PartsFigure = styled.figure<{ $ink: string }>`
    margin: 1.8em 0;
    padding: 0;
    border-top: 1px solid ${(p) => p.$ink}22;
    border-bottom: 1px solid ${(p) => p.$ink}22;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11.5px;
`;

// THE GRADE IS THE CLASS. `level` was a string every class carried beside its
// type, saying the same thing twice; the type is the only answer now.
const grade = (part: { constructor: { name: string } }): string =>
    part.constructor.name.replace(/^\$/, '').toLowerCase();

const PartRow = styled.div<{ $ink: string; $lit: boolean }>`
    display: grid;
    grid-template-columns: 2.4rem 5.4rem minmax(0, 1fr);
    gap: 10px;
    padding: 5px 8px;
    color: ${(p) => p.$ink}b0;
    background: ${(p) => (p.$lit ? `${p.$ink}12` : 'transparent')};
    transition: background 260ms ease, color 260ms ease;

    span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    &:hover { color: ${(p) => p.$ink}; }
`;

// Attention is a glow, never a slab.
const Lit = styled.div<{ $ink: string }>`
    background: linear-gradient(180deg, transparent 4%, ${(p) => p.$ink}1f 4%, ${(p) => p.$ink}1f 96%, transparent 96%);
    box-shadow: 0 0 0 6px ${(p) => p.$ink}0d;
    transition: background 300ms ease, box-shadow 300ms ease;
`;
