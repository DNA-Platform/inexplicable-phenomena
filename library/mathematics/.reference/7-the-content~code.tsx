import { MouseEvent, ReactNode } from 'react';
import katex from 'katex';
import { marked } from 'marked';
import { $, selection } from '@dna-platform/chemistry';
import { $Append, $Format, $Paragraph, $Section, $Word, html } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of
// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —
// the object, the result of the effort of the team, looking like what it is, a familiar math textbook chapter.
// On the back the PROJECT — the formal representation of the work: the statement of work, the progress, a plan,
// a discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries
// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of
// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the
// checked control rules what shows — everything that is not the project is the deliverable.
export class $Content extends $Format {
    $canonical = 'deliverable';

    override note(): ReactNode {
        return (
            <label className="pc-content">
                <input
                    type="checkbox"
                    id="pc-flip"
                    defaultChecked={this.$canonical === 'project'}
                />
                <span className="pc-flip" />
            </label>
        );
    }

    // ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of
    // the title and it has no label. One can just explore" — and the back announces itself in the literal:
    // the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.
    // THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of
    // coming out of the matrix. Is there a slight transition... It would have to be very subtle because this
    // is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink
    // to full over 220ms, a print developing; nothing moves, since movement would break the sameness. Two
    // identical keyframes under two names so each direction restarts the settle; reduced motion is honored.
    // THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.
    // Takes up the same space as the other side", then "sameness in layout — the same title in same place,
    // gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:
    // VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas
    // leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:
    // Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on
    // a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's
    // face and ink, so the title's box is identical on both sides; the # sits flush at the column's left
    // edge — his correction of the gutter: "the # has to be left aligned with everything else and the
    // transition was: Title to # Title" — the text easing right by the mark's exact width (Consolas advance
    // .55em, two characters of the title's 1.5 size = 1.65 * size), the Chapter label held still by an equal
    // negative margin animated on the same curve. The staging is his "canonical experience of moving from
    // literal to symbol. From object to its representation": the title eases aside over 300ms making room,
    // and the # arrives a breath later — its fade delayed 120ms on the way to code, undelayed on the way
    // back, so the symbol is last to arrive and first to go; the
    // section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette
    // came from an eight-variant matrix photographed beside the serif reference, on his "Play around. Be
    // creative. Get it to match... Don't have the markdown be LOUD!!": the quiet winner keeps title, headings,
    // leads and body in the book's own ink at regular weight, and colors only the # and ## marks in the
    // theme's link — the color the citations already wear on both sides. His harmony rule finished it: the
    // italics too stay in the ink, italic their only voice; the one foreign magenta went with the blues.
    // THE PERMUTATION TEST, his anchor of 2026-11-16: "the same theme flipped over some axis of code to
    // writing, but occupying the same space and having the same feel... the feel of the permutation while
    // preserving identity." Measured type by type: weight is identity, so the title and the section headings
    // stay bold through the flip; and the tables shed the rendered-markdown cards for the front's own dress —
    // the browser read the book's table as an open grid, no borders, no backgrounds, header row regular —
    // which also obeys his oldest law of the night, no lines anywhere. Columns separate by air, rows by their
    // leading; the cards' ruling of the earlier evening is superseded by the test.
    // One palette across the two faces; the markdown-ness is the face and the marks. THE TRANSITION'S
    // STRETCH, measured on his "Still a stretchiness to the transition": the title's width was innocent
    // (Georgia bold 372px, Consolas regular 364px); the elastic was vertical — the spec's paragraph gaps ran
    // 13px against the serif's 20px and the opening text dropped 41px below the label — so the spec's
    // paragraphs take the theme's own space and the first tucks to a quarter-space under SPECIFICATION.
    override style = selection.div`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        @keyframes pc-settle { from { opacity: 0.35; } to { opacity: 1; } }
        @keyframes pc-settle-back { from { opacity: 0.35; } to { opacity: 1; } }
        &:has(#pc-flip:checked) .pd-chapter { animation: pc-settle 0.22s ease-out; }
        &:not(:has(#pc-flip:checked)) .pd-chapter { animation: pc-settle-back 0.22s ease-out; }
        @media (prefers-reduced-motion: reduce) { .pd-chapter { animation: none !important; } }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, ${({ theme }) => theme.ink} 65%, ${({ theme }) => theme.paper}); background: ${({ theme }) => theme.paper}; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: ${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.78 * ${({ theme }) => theme.size}); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, ${({ theme }) => theme.ink} 52%, ${({ theme }) => theme.paper}); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * ${({ theme }) => theme.size}); line-height: calc(1.412 * ${({ theme }) => theme.size}); margin-block-start: calc(${({ theme }) => theme.space} / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(1.15 * ${({ theme }) => theme.size}); margin-block: ${({ theme }) => theme.space} 0; font-weight: bold; color: ${({ theme }) => theme.ink}; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: ${({ theme }) => theme.link}; }
        .pc-specification .pc-markdown h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: ${({ theme }) => theme.space}; }
        .pc-specification .pc-markdown h2:first-of-type + p { margin-block-start: calc(${({ theme }) => theme.space} / 4); }
        .pd-title { position: relative; transition: padding-inline-start 0.3s ease; }
        .pd-title::before { transition: margin-inline-start 0.3s ease; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; transition: opacity 0.18s ease-out; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({ theme }) => theme.link}; }
        &:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * ${({ theme }) => theme.size}); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * ${({ theme }) => theme.size}); font-family: ${({ theme }) => theme.font}; color: ${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::after { opacity: 1; transition: opacity 0.18s ease-out 0.12s; }
        .pd-section.pc-project { margin-block: calc(${({ theme }) => theme.space} / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: ${({ theme }) => theme.font}; font-size: calc(1.15 * ${({ theme }) => theme.size}); font-weight: bold; margin-block: 1.1em .35em; color: color-mix(in srgb, ${({ theme }) => theme.ink} 76%, ${({ theme }) => theme.link} 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: ${({ theme }) => theme.link}; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: ${({ theme }) => theme.link}; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: ${({ theme }) => theme.space}; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(${({ theme }) => theme.space} / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    `;
}

// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression
// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been
// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the
// author by default as read from the cover; a discussion may stand there. The parts beyond the specification
// are optional. One section of the chapter, the formal register.
// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand
// open and whole, plain sections.
export class $Project extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-project');
    }
}

// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and
// the progress are the project's parts, each a section naming itself in the formal dress. The specification
// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.
export class $Specification extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-specification');
    }
}

export class $Progress extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-progress');
    }
}

// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The
// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a
// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the
// renderer learns that language rather than the document changing. Definitions receive ids; every mention
// becomes a link to its definition, across the project's documents, since both render on one page.
// EQUATIONS IN SPECIFICATIONS, Doug, 2026-11-16: "we need latex in the specification either rendered or in
// latex equation form", then "We need to see equations in specifications" — rendered, in a comparable font.
// The extension tokenizes $...$ and $$...$$ before markdown's emphasis can eat the underscores inside them,
// and KaTeX typesets at bind time into MathML, which the browser renders natively in its math face — no
// stylesheet, no font files shipped. The katex dependency entered the package on his word, beside marked.
const typeset = (passage: string, display: boolean): string =>
    katex.renderToString(passage, { output: 'mathml', throwOnError: false, displayMode: display });

marked.use({
    extensions: [
        {
            name: 'mathBlock',
            level: 'block',
            start(src: string) { const at = src.indexOf('$$'); return at < 0 ? undefined : at; },
            tokenizer(src: string) {
                const match = /^\$\$([\s\S]+?)\$\$/.exec(src);
                if (match !== null) return { type: 'mathBlock', raw: match[0], text: match[1] };
                return undefined;
            },
            renderer(token: { text: string }) { return `<div class="pc-math-block">${typeset(token.text, true)}</div>`; },
        },
        {
            name: 'mathInline',
            level: 'inline',
            start(src: string) { const at = src.indexOf('$'); return at < 0 ? undefined : at; },
            tokenizer(src: string) {
                const match = /^\$(?=\S)([^$\n]*?\S)\$/.exec(src);
                if (match !== null) return { type: 'mathInline', raw: match[0], text: match[1] };
                return undefined;
            },
            renderer(token: { text: string }) { return `<span class="pc-math">${typeset(token.text, false)}</span>`; },
        },
    ],
});

const cited = /\[(\d+(?:,\s*\d+)*)\]|\b[Ss]ections? \d+(?: to \d+)?\b|\b[KCO]\d+\b|\b\d\.\d\b/g;

const place = (citation: string): string => {
    const section = citation.match(/^[Ss]ections? (\d+)/);
    if (section !== null) return `cite-sec-${section[1]}`;
    const label = citation.match(/^([KCO])(\d+)$/);
    if (label !== null) return `cite-${label[1].toLowerCase()}${label[2]}`;
    return `cite-${citation.replace('.', '-')}`;
};

const link = (citation: string): string => {
    if (citation.startsWith('[')) {
        return '[' + citation.slice(1, -1).split(',').map(number =>
            `<a href="#cite-ref-${number.trim()}">${number.trim()}</a>`).join(', ') + ']';
    }
    return `<a href="#${place(citation)}">${citation}</a>`;
};

const mention = (passage: string, sections: boolean): string =>
    passage.split(/(<[^>]*>)/).map((piece, index, pieces) => {
        if (piece.startsWith('<')) return piece;
        const previous = pieces[index - 1];
        const lead = previous !== undefined && previous.includes('id="cite-')
            ? (piece.match(/^(?:[KCO]\d+|\d+\.\d+|\d+\.)/) ?? [''])[0]
            : '';
        return lead + piece.slice(lead.length).replace(cited, found =>
            !sections && /^[Ss]ection/.test(found) ? found : link(found));
    }).join('');

const connect = (rendered: string): string => {
    const identified = rendered
        .replace(/<h2>(\d+)\. /g, (whole, section) => `<h2 id="cite-sec-${section}">${section}. `)
        .replace(/<(strong|td)>(\d+)\.(\d+) /g, (whole, tag, section, part) => `<${tag} id="cite-${section}-${part}">${section}.${part} `)
        .replace(/<(strong|td)>([KCO])(\d+) /g, (whole, tag, letter, number) => `<${tag} id="cite-${letter.toLowerCase()}${number}">${letter}${number} `);
    const boundary = identified.indexOf('<h2>Related work</h2>');
    if (boundary === -1) return mention(identified, true);
    let count = 0;
    const references = identified.slice(boundary).replace(/<li>/g, () => `<li id="cite-ref-${++count}">`);
    return mention(identified.slice(0, boundary), true) + mention(references, false);
};

// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it
// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,
// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.
// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.
export class $Markdown extends $Paragraph {
    $identifier = '';

    follow = (press: MouseEvent<HTMLDivElement>): void => {
        const citation = (press.target as Element).closest('a[href^="#cite-"]');
        if (citation === null) return;
        press.preventDefault();
        const place = document.getElementById(citation.getAttribute('href')?.slice(1) ?? '');
        place?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    get append(): $Append | undefined {
        return this.chapter?.annotations.find($Append).find(append => append.$identifier === this.$identifier);
    }

    override write(): ReactNode {
        const append = this.append;
        if (append === undefined) return null;
        const rendered = connect(marked.parse(html.copy(append.text), { async: false }));
        return <div className={`pc-doc-${this.$identifier}`} onClick={this.follow} dangerouslySetInnerHTML={{ __html: rendered }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-markdown');
    }
}

// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between
// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number
// or label, and the citation leads there: it flips the content to the project side and lands on the part named.
export class $Cite extends $Word {
    $part = '';

    // The part is read back from the clicked anchor's own text: the handler's instance predates the pass
    // that applies props to the held one, so the rendered citation is the one source the click can trust.
    follow = (press: MouseEvent<HTMLAnchorElement>): void => {
        const part = press.currentTarget.textContent ?? '';
        const flip = document.getElementById('pc-flip');
        if (flip instanceof HTMLInputElement) flip.checked = true;
        requestAnimationFrame(() =>
            document.getElementById(place(part))?.scrollIntoView({ block: 'center' }));
    };

    override write(): ReactNode {
        return <a onClick={this.follow}>{this.$part}</a>;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-cite');
    }
}

// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something
// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation
// rule of the textbook's specification, 2.7.
export class $Interpolated extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-interpolated');
    }
}

// THE DELIVERABLE'S DRESS, Doug, 2026-11-16: components divide in two families — those that express the
// subject of the project and those that present the deliverable. These present: a theorem counted within the
// chapter and a proof labelled — the familiar dress of a math textbook. THE SPECIFICATION IS THE LEGAL
// DOCUMENT, his correction of the same day — the deliverable is not; the preamble is the specification's
// first paragraph, set off by its margins above.
export class $Theorem extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-theorem');
    }
}

export class $Proof extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-proof');
    }
}

export const Content = $($Content);
export const Project = $($Project);
export const Specification = $($Specification);
export const Progress = $($Progress);
export const Markdown = $($Markdown);
export const Cite = $($Cite);
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
