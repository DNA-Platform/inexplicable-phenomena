import { ReactNode } from 'react';
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
    // the title and it has no label. One can just explore" — a glyph of two stacked sheets; the back sheet
    // fills while the project side shows.
    override style = selection.div`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 4.8rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; inline-size: .9em; block-size: .9em; border: 1.5px solid color-mix(in srgb, ${({ theme }) => theme.ink} 65%, ${({ theme }) => theme.paper}); border-radius: 2px; background: ${({ theme }) => theme.paper}; transition: background .15s ease; }
        .pc-content:hover .pc-flip { border-color: ${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { background: color-mix(in srgb, ${({ theme }) => theme.ink} 70%, ${({ theme }) => theme.paper}); }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation):not(.pc-introduction) { display: none; }
        .pc-introduction { display: none; font-style: italic; color: color-mix(in srgb, ${({ theme }) => theme.ink} 75%, ${({ theme }) => theme.paper}); }
        &:has(#pc-flip:checked) .pc-introduction { display: block; }
        .pc-markdown { font-family: 'Segoe UI', -apple-system, system-ui, sans-serif; font-size: calc(.92 * ${({ theme }) => theme.size}); line-height: 1.65; }
        .pc-markdown h1 { font-family: ${({ theme }) => theme.font}; font-size: 1.55em; font-weight: 600; margin-block: 1.1em .45em; line-height: 1.3; }
        .pc-markdown h2 { font-family: ${({ theme }) => theme.font}; font-size: 1.35em; font-weight: 600; margin-block: 1.5em .45em; }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: 600; }
        .pc-markdown table { width: 100%; border-collapse: separate; border-spacing: 0; margin-block: 1.2em; border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 14%, ${({ theme }) => theme.paper}); border-radius: 8px; overflow: hidden; }
        .pc-markdown th, .pc-markdown td { padding: .55em .85em; text-align: start; vertical-align: top; }
        .pc-markdown thead th { background: color-mix(in srgb, ${({ theme }) => theme.ink} 4%, ${({ theme }) => theme.paper}); color: color-mix(in srgb, ${({ theme }) => theme.ink} 72%, ${({ theme }) => theme.paper}); font-weight: 600; }
        .pc-markdown tbody td, .pc-markdown tbody th { border-block-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 11%, ${({ theme }) => theme.paper}); }
        .pc-markdown th + th, .pc-markdown td + td { border-inline-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 11%, ${({ theme }) => theme.paper}); }
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

// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it
// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,
// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.
export class $Markdown extends $Paragraph {
    $identifier = '';

    get append(): $Append | undefined {
        return this.chapter?.annotations.find($Append).find(append => append.$identifier === this.$identifier);
    }

    override write(): ReactNode {
        const append = this.append;
        if (append === undefined) return null;
        const rendered = marked.parse(html.copy(append.text), { async: false });
        return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-markdown');
    }
}

// THE INTRODUCTION IS THE PROJECT SIDE'S ONE CUE, Doug, 2026-11-16: "The dark line is losing the minimal...
// Perhaps it might have a short introduction, so subtle UX cue that is better than the one you have, and after
// the intro, then it might have specification. That is the key word!!" — a short paragraph shown only when the
// content is flipped, quiet and italic; the dark rule is struck.
export class $Introduction extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-introduction');
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

// THE MATH TEXTBOOK'S DELIVERABLE COMPONENTS, Doug, 2026-11-16: components divide in two families — those that
// express the subject of the project and those that present the deliverable. These present: a theorem counted
// within the chapter and a proof labelled, the familiar dress of a math textbook.
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
export const Introduction = $($Introduction);
export const Markdown = $($Markdown);
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
