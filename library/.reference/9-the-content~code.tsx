import { DragEvent, MouseEvent, ReactNode } from 'react';
import katex from 'katex';
import { marked } from 'marked';
import { $, selection } from '@dna-platform/chemistry';
import { $Append, $Format, $Paragraph, $Section, $Word, html } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of
// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —
// the object, the result of the effort of the team, looking like what it is, a familiar chapter. On the back
// the PROJECT — the formal representation of the work: the statement of work, the progress, a plan, a
// discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries
// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of
// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the
// checked control rules what shows — everything that is not the project is the deliverable.
// LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be reused and at
// the right level reference manual. We will need this everywhere there is content with a project, which will
// be in a lot of places" — the general family lives here in Our Reference; a subject specializes the
// deliverable's dress, as mathematics does with Theorem and Proof beside its own manual chapter. One flagged
// wart rides with the lift: the theorem and proof rules stay in this style, inert until a subject's classes
// activate them, because a subclass cannot yet extend a format's style — the composition seam is an open
// question for the framework, named rather than hacked around.
export class $Content extends $Format {
    $canonical = 'deliverable';

    // THE DISSOLVE, Doug, 2026-11-17: "I still don't like the transition... It feels too slow. The flicker is
    // bad", "You must know what a good and a bad transition is", "It should be faster, less perceptible and
    // if there is a white flash, it is perceptible." The flipbook frames convicted the dip: an omitted
    // keyframe property interpolates to its base rather than stepping, so the out direction glided 28px over
    // six frames with the font swapping mid-slide and the label lurching when margin and padding fell out of
    // step — and the trough itself was the white flash, a title-shaped gap of paper. The good transition is
    // the platform's own cross-dissolve: the flip runs inside startViewTransition, the old frame never
    // leaving before the new covers it — no absence, no motion, one dissolve of the whole page at 140ms.
    // Every hand-rolled keyframe is retired; the states swap instantly inside the update and the browser
    // carries the blend. The duration rules ride a plain style tag because view-transition pseudos live at
    // the document root, beyond a scoped sheet's reach; reduced motion collapses the dissolve to the swap.
    flip = (press: MouseEvent<HTMLLabelElement>): void => {
        press.preventDefault();
        cover();
        const box = document.getElementById('pc-flip');
        if (!(box instanceof HTMLInputElement)) return;
        const turn = (): void => { box.checked = !box.checked; };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition === undefined) turn();
        else doc.startViewTransition(turn);
    };

    override note(): ReactNode {
        return (
            <>
                <style>{'::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.14s; animation-timing-function: ease; } @media (prefers-reduced-motion: reduce) { ::view-transition-old(root), ::view-transition-new(root) { animation: none !important; } }'}</style>
                <label className="pc-content" onClick={this.flip}>
                    <input
                        type="checkbox"
                        id="pc-flip"
                        defaultChecked={this.$canonical === 'project'}
                    />
                    <span className="pc-flip" />
                </label>
            </>
        );
    }

    // ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of
    // the title and it has no label. One can just explore" — and the back announces itself in the literal:
    // the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.
    // THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of
    // coming out of the matrix. Is there a slight transition... It would have to be very subtle because this
    // is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink
    // to full, a print developing; nothing moves, since movement would break the sameness. Two identical
    // keyframes under two names so each direction restarts the settle; reduced motion is honored.
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
    // negative margin animated on the same curve. The motion is his "canonical experience of moving from
    // literal to symbol. From object to its representation", pulled back on his "this is plain text. It
    // needs to be the plain text version of a transition": one clock, one curve, the staged delay of the
    // first cut retired as theater. THE GLIDE RETIRED, Doug, 2026-11-17: "There's a sort of jank when going
    // to specification mode" — photographed frame by frame, the title had already turned to Consolas and the
    // body to the specification at the first frame, and the title then slid right for 160ms after the fact;
    // a swap that lands at once and then moves is two events, and the second reads as the first stuttering.
    // Plain text has no tween: the title takes its code form and its place in the same frame, the mark with
    // it, and the settle alone is the transition — the whole chapter, title included, developing from dimmed
    // ink to full. THE DIP, Doug, the same night: "The appearance of the symbol and change in font is weird.
    // It feels off... Font and position can happen concurrently unless it's janky" — the one-frame swap was
    // still watchable, so it moves to where it cannot be watched: the title dims over 120ms, and at the
    // trough the font, the place, the label's hold and the mark all change together in one hidden instant —
    // concurrent, as he allows — then it rises as code over 120ms. The discrete steps live inside the
    // keyframes at 49.9/50.1 so nothing ever changes while visible; the glide stays retired. The dip dims by
    // COLOR, not opacity — his "You have chapter1 disappearing. Why?" — because element opacity sinks the
    // ::before label with the text; the text alone fades to transparent, the label's ink pinned on both
    // states, the # on its own clock. The frame never flickers, and the label changes with nothing.
    // The section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette
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
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, ${({ theme }) => theme.ink} 65%, ${({ theme }) => theme.paper}); background: ${({ theme }) => theme.paper}; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: ${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.8 * ${({ theme }) => theme.size}); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, ${({ theme }) => theme.ink} 70%, ${({ theme }) => theme.paper}); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * ${({ theme }) => theme.size}); line-height: calc(1.412 * ${({ theme }) => theme.size}); margin-block-start: calc(${({ theme }) => theme.space} / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(.9 * ${({ theme }) => theme.size}); margin-block: ${({ theme }) => theme.space} 0; font-weight: 600; color: ${({ theme }) => theme.ink}; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: ${({ theme }) => theme.link}; }
        .pc-specification .pc-markdown > h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: ${({ theme }) => theme.space}; }
        .pc-specification .pc-markdown > h2:first-of-type + p { margin-block-start: calc(${({ theme }) => theme.space} / 4); }
        .pc-specification .pc-markdown .pc-spart:first-of-type > h2 { display: none; }
        .pc-specification .pc-markdown .pc-spart:first-of-type > .pc-kids { margin-inline-start: 0; }
        .pd-title { position: relative; }
        .pd-title::before { color: ${({ theme }) => theme.ink}; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({ theme }) => theme.link}; }
        &:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * ${({ theme }) => theme.size}); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * ${({ theme }) => theme.size}); font-family: ${({ theme }) => theme.font}; color: ${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(${({ theme }) => theme.space} / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: ${({ theme }) => theme.font}; font-size: calc(1 * ${({ theme }) => theme.size}); font-weight: 600; margin-block: 1.1em .35em; color: color-mix(in srgb, ${({ theme }) => theme.ink} 76%, ${({ theme }) => theme.link} 24%); }
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
        .pc-tree-bar { display: flex; align-items: center; gap: 1.6em; font-size: calc(.7 * ${({ theme }) => theme.size}); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, ${({ theme }) => theme.ink} 70%, ${({ theme }) => theme.paper}); margin-block-end: calc(${({ theme }) => theme.space} / 2); user-select: none; }
        .pc-layerbox { display: inline-flex; align-items: center; gap: .6em; cursor: pointer; }
        .pc-anno-master, .pc-sec-anno { appearance: none; inline-size: .85em; block-size: .85em; border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 65%, ${({ theme }) => theme.paper}); background: ${({ theme }) => theme.paper}; margin: 0; cursor: pointer; flex: none; }
        .pc-anno-master:checked, .pc-sec-anno:checked { border-width: 3px; }
        .pc-sec-anno { margin-inline-start: .9em; vertical-align: -1px; }
        .pc-showall { display: none; cursor: pointer; color: ${({ theme }) => theme.link}; }
        .pc-tree:has(.pc-hidden) .pc-showall { display: inline; }
        .pc-spart { position: relative; }
        .pc-spart > h2 { cursor: pointer; user-select: none; }
        .pc-kids { margin-inline-start: 2ch; }
        .pc-folded > .pc-kids { display: none; }
        .pc-count { display: none; font-weight: 400; opacity: .5; margin-inline-start: .75em; }
        .pc-folded > h2 .pc-count { display: inline; }
        .pc-part { position: relative; }
        .pc-hidden { display: none; }
        .pc-x { position: absolute; inset-inline-start: -2.6ch; inset-block-start: 0; inline-size: 2ch; text-align: center; opacity: 0; cursor: pointer; }
        .pc-sec-x { inset-block-start: calc(${({ theme }) => theme.space} + .2em); }
        .pc-part:hover > .pc-x, .pc-spart:hover > .pc-sec-x { opacity: .35; }
        .pc-x:hover { opacity: .7; }
        .pc-before { box-shadow: 0 -2px 0 0 color-mix(in srgb, ${({ theme }) => theme.link} 55%, transparent); }
        .pc-after { box-shadow: 0 2px 0 0 color-mix(in srgb, ${({ theme }) => theme.link} 55%, transparent); }
        .pc-claused { position: relative; }
        .pc-anno { position: absolute; inset-inline-start: calc(100% + 32px); inset-block-start: 2px; inline-size: 196px; font-family: ${({ theme }) => theme.font}; font-size: calc(.73 * ${({ theme }) => theme.size}); line-height: 1.45; letter-spacing: normal; text-transform: none; font-weight: 400; display: none; }
        .pc-spart:has(> h2 .pc-sec-anno:checked) .pc-anno { display: block; }
        .pc-anno-tag { font-size: .85em; letter-spacing: .14em; text-transform: uppercase; }
        .pc-open { opacity: .5; }
        .pc-anno-why { opacity: .7; }
        .pc-anno[data-claim] { cursor: pointer; }
        td > .pc-anno { position: static; display: none; inline-size: auto; margin-inline-start: .9em; white-space: nowrap; opacity: .6; }
        .pc-spart:has(> h2 .pc-sec-anno:checked) td > .pc-anno { display: inline; }
    `;
}

// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression
// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been
// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the
// author by default as read from the cover; a discussion may stand there. The parts beyond the specification
// are optional. One section of the chapter, the formal register.
// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand
// open and whole, plain sections. SUPERSEDED FOR THE SPECIFICATION'S TREE, Doug, 2026-11-17, Sprint 130's
// twelfth round: "We should be able to collapse a part with sub parts... hide (entirely) and show-all parts
// again... move them around to compare... toggle the annotations on what is visible." The parts still stand
// open BY DEFAULT: the earlier ruling was against the page deciding for the reader, and the tree's fold is
// the reader deciding — Our Reference / The Specification, section 9, holds the tree's specification.
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

// ALL THE PARTS AT THE TOP, Doug, 2026-11-17, Sprint 130's fifteenth round: "We should have this definitely
// in the library at the top - content with project and specification and all the other parts." The project's
// named parts stand complete in the general family — Specification, Identification, Intuition, Progress, the
// order of the work itself — each a section naming itself. The justification is deliberately NOT a section:
// by the record's 4.2 and 7.3 it is the manner of the identifying, carried as annotations between the
// identification and the specification, the computed coverage above its first sort.
export class $Identification extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-identification');
    }
}

export class $Intuition extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-intuition');
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

export const place = (citation: string): string => {
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

// THE TREE, Doug, 2026-11-17, Sprint 130's twelfth round: "Specifications should always have numbers or
// codes, always have nesting, and their numbers should nest... collapse a part with sub parts... hide
// (entirely) and show-all parts again... move them around to compare... toggle the annotations on what is
// visible" — and the fourteenth: "We have to implement this and it needs to be interactive and have great
// examples." The specification of the tree is Our Reference / The Specification, section 9. This second
// pass nests what connect identified — each heading gathers its section, each block of a section is a
// part — and the controls ride in the markup: the fold on the heading with its quiet count, the hide in
// the gutter, show-all and the page's annotation square in a quiet bar, a square per section in its
// heading. Every press lands in the one dispatcher on the document below.
const treeify = (rendered: string): string => {
    const sections = rendered.split(/(?=<h2)/);
    const lead = sections.shift() ?? '';
    const bar = '<span class="pc-tree-bar"><label class="pc-layerbox"><input type="checkbox" class="pc-anno-master" checked />annotations</label><span class="pc-showall">show all</span></span>';
    return bar + lead + sections.map(section => {
        const heading = section.indexOf('</h2>');
        const parts = section.slice(heading + 5).split(/(?=<(?:p|ul|ol|table|div|h3|blockquote|pre)[ >])/).filter(part => part.trim() !== '');
        const head = `${section.slice(0, heading)}<span class="pc-count">${parts.length} parts</span><input type="checkbox" class="pc-sec-anno" checked /></h2>`;
        const kids = parts.map(part => `<div class="pc-part" draggable="true"><span class="pc-x" title="hide">×</span>${part}</div>`).join('');
        return `<section class="pc-spart" draggable="true"><span class="pc-x pc-sec-x" title="hide">×</span>${head}<div class="pc-kids">${kids}</div></section>`;
    }).join('');
};

// COVERAGE FROM THE CITATIONS, clause 4.2 of Sprint 130's record made mechanism: "justifications frequently
// map to the citations on the project side." The deliverable already cites the specification through Cite,
// so the marks are computed from the page's own citations, never authored twice: a claimed clause wears
// Cited and the mark leads back to the claim; an unclaimed clause reads Open; a table-row clause takes the
// quiet inline form. Computed once, lazily, at the first flip — the client's own pass, nothing walked at
// the server's draw.
const cover = (): void => {
    const tree = document.querySelector('.pc-tree');
    if (tree === null || tree.classList.contains('pc-covered')) return;
    tree.classList.add('pc-covered');
    const claims = new Map<string, { at: string; count: number }>();
    document.querySelectorAll('.pc-cite a').forEach(cite => {
        const id = place(cite.textContent ?? '');
        const claim = claims.get(id);
        if (claim === undefined) {
            cite.id = `claim-${id}`;
            claims.set(id, { at: `claim-${id}`, count: 1 });
        } else claim.count += 1;
    });
    tree.querySelectorAll('strong[id^="cite-"], td[id^="cite-"], h2[id^="cite-sec-"]').forEach(clause => {
        const claim = claims.get(clause.id);
        const mark = document.createElement('span');
        if (clause.tagName === 'TD') {
            mark.className = claim === undefined ? 'pc-anno pc-open' : 'pc-anno';
            mark.textContent = claim === undefined ? '· open' : claim.count > 1 ? `· cited ×${claim.count}` : '· cited';
            if (claim !== undefined) mark.setAttribute('data-claim', claim.at);
            clause.appendChild(mark);
            return;
        }
        const block = clause.tagName === 'H2' ? clause : clause.closest('p, li') ?? clause;
        block.classList.add('pc-claused');
        mark.className = 'pc-anno';
        if (claim === undefined) {
            mark.innerHTML = '<span class="pc-anno-tag pc-open">Open</span><br><span class="pc-anno-why">No part of the chapter cites this clause.</span>';
        } else {
            mark.setAttribute('data-claim', claim.at);
            mark.innerHTML = `<span class="pc-anno-tag">Cited${claim.count > 1 ? ` · ${claim.count} places` : ''}</span><br><span class="pc-anno-why">The chapter claims this part; the mark leads to the claim.</span>`;
        }
        block.appendChild(mark);
    });
};

let dragged: HTMLElement | null = null;

const aim = (over: Element | null): HTMLElement | null => {
    if (dragged === null || over === null) return null;
    const group = dragged.classList.contains('pc-spart');
    const target = group ? over.closest<HTMLElement>('.pc-spart') : over.closest<HTMLElement>('.pc-part') ?? over.closest<HTMLElement>('.pc-spart');
    if (target === null || target === dragged || dragged.contains(target)) return null;
    return target;
};

const unseat = (): void => {
    document.querySelectorAll('.pc-before, .pc-after').forEach(seat => seat.classList.remove('pc-before', 'pc-after'));
};

// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it
// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,
// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.
// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.
// With tree on — the specification's document — the one click handler is the tree's dispatcher too: the
// gutter hides, show-all restores, the squares rule the annotation layer with the bar's square as every
// section's at once, a heading press folds, a mark with a claim turns the page back to the citation that
// claims it, and a citation press lands as it always has.
export class $Markdown extends $Paragraph {
    $identifier = '';
    $tree = false;

    follow = (press: MouseEvent<HTMLDivElement>): void => {
        const pressed = press.target as Element;
        const x = pressed.closest('.pc-x');
        if (x !== null) {
            x.closest(x.classList.contains('pc-sec-x') ? '.pc-spart' : '.pc-part')?.classList.add('pc-hidden');
            return;
        }
        if (pressed.closest('.pc-showall') !== null) {
            press.currentTarget.querySelectorAll('.pc-hidden').forEach(part => part.classList.remove('pc-hidden'));
            return;
        }
        const master = pressed.closest('.pc-anno-master');
        if (master instanceof HTMLInputElement) {
            press.currentTarget.querySelectorAll<HTMLInputElement>('.pc-sec-anno').forEach(box => { box.checked = master.checked; });
            return;
        }
        if (pressed.closest('.pc-sec-anno') !== null) {
            const boxes = [...press.currentTarget.querySelectorAll<HTMLInputElement>('.pc-sec-anno')];
            const all = press.currentTarget.querySelector<HTMLInputElement>('.pc-anno-master');
            if (all !== null) all.checked = boxes.every(box => box.checked);
            return;
        }
        const mark = pressed.closest('.pc-anno');
        if (mark !== null) {
            const claim = mark.getAttribute('data-claim');
            if (claim !== null) {
                const turn = (): void => {
                    const flip = document.getElementById('pc-flip');
                    if (flip instanceof HTMLInputElement) flip.checked = false;
                    document.getElementById(claim)?.scrollIntoView({ block: 'center' });
                };
                const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
                if (doc.startViewTransition === undefined) turn();
                else doc.startViewTransition(turn);
            }
            return;
        }
        const heading = pressed.closest('.pc-spart > h2');
        if (heading !== null) {
            heading.parentElement?.classList.toggle('pc-folded');
            return;
        }
        const citation = pressed.closest('a[href^="#cite-"]');
        if (citation === null) return;
        press.preventDefault();
        const landing = document.getElementById(citation.getAttribute('href')?.slice(1) ?? '');
        landing?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    grab = (grip: DragEvent<HTMLDivElement>): void => {
        const part = (grip.target as Element).closest<HTMLElement>('.pc-part, .pc-spart');
        if (part === null) return;
        dragged = part;
        grip.dataTransfer.setData('text/plain', 'part');
        grip.dataTransfer.effectAllowed = 'move';
    };

    over = (drag: DragEvent<HTMLDivElement>): void => {
        const target = aim(drag.target as Element);
        unseat();
        if (target === null) return;
        drag.preventDefault();
        const box = target.getBoundingClientRect();
        target.classList.add(drag.clientY < box.top + box.height / 2 ? 'pc-before' : 'pc-after');
    };

    drop = (fall: DragEvent<HTMLDivElement>): void => {
        const target = aim(fall.target as Element);
        unseat();
        if (target === null || dragged === null) return;
        fall.preventDefault();
        const box = target.getBoundingClientRect();
        const before = fall.clientY < box.top + box.height / 2;
        if (!dragged.classList.contains('pc-spart') && target.classList.contains('pc-spart')) {
            const kids = target.querySelector('.pc-kids');
            if (kids !== null) {
                if (before) kids.prepend(dragged);
                else kids.append(dragged);
            }
        } else {
            target.parentElement?.insertBefore(dragged, before ? target : target.nextSibling);
        }
        dragged = null;
    };

    settle = (): void => {
        unseat();
        dragged = null;
    };

    get append(): $Append | undefined {
        return this.chapter?.annotations.find($Append).find(append => append.$identifier === this.$identifier);
    }

    override write(): ReactNode {
        const append = this.append;
        if (append === undefined) return null;
        const connected = connect(marked.parse(html.copy(append.text), { async: false }));
        const rendered = this.$tree ? treeify(connected) : connected;
        return (
            <div
                className={this.$tree ? `pc-doc-${this.$identifier} pc-tree` : `pc-doc-${this.$identifier}`}
                onClick={this.follow}
                onDragStart={this.grab}
                onDragOver={this.over}
                onDrop={this.drop}
                onDragEnd={this.settle}
                dangerouslySetInnerHTML={{ __html: rendered }}
            />
        );
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
    // The flip and the landing scroll both run inside the view transition's update, so the dissolve lands
    // directly on the cited clause.
    follow = (press: MouseEvent<HTMLAnchorElement>): void => {
        const part = press.currentTarget.textContent ?? '';
        const turn = (): void => {
            const flip = document.getElementById('pc-flip');
            if (flip instanceof HTMLInputElement) flip.checked = true;
            document.getElementById(place(part))?.scrollIntoView({ block: 'center' });
        };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition === undefined) turn();
        else doc.startViewTransition(turn);
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
// rule of the specification's form.
export class $Interpolated extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-interpolated');
    }
}

export const Content = $($Content);
export const Project = $($Project);
export const Specification = $($Specification);
export const Identification = $($Identification);
export const Intuition = $($Intuition);
export const Progress = $($Progress);
export const Markdown = $($Markdown);
export const Cite = $($Cite);
export const Interpolated = $($Interpolated);
