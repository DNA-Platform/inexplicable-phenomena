import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Section, $Word } from '@dna-platform/public';

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
        position: relative;
        counter-reset: theorem;
        .pc-content { position: absolute; inset-block-start: .4rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; inline-size: .7em; block-size: .85em; border: 1.5px solid color-mix(in srgb, ${({ theme }) => theme.ink} 60%, ${({ theme }) => theme.paper}); background: ${({ theme }) => theme.paper}; box-shadow: .3em .3em 0 -1.5px ${({ theme }) => theme.paper}, .3em .3em 0 0 color-mix(in srgb, ${({ theme }) => theme.ink} 60%, ${({ theme }) => theme.paper}); transition: background .15s ease, box-shadow .15s ease; }
        .pc-content:hover .pc-flip { border-color: ${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { background: color-mix(in srgb, ${({ theme }) => theme.ink} 65%, ${({ theme }) => theme.paper}); box-shadow: .3em .3em 0 -1.5px ${({ theme }) => theme.paper}, .3em .3em 0 0 color-mix(in srgb, ${({ theme }) => theme.ink} 30%, ${({ theme }) => theme.paper}); }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        .pc-project { font-size: calc(.93 * ${({ theme }) => theme.size}); border-inline-start: 3px double color-mix(in srgb, ${({ theme }) => theme.ink} 35%, ${({ theme }) => theme.paper}); padding-inline-start: 1.25rem; }
        .pc-project .pd-heading + .pd-paragraph { font-size: calc(0.75 * ${({ theme }) => theme.size}); letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
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
export class $Project extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-project');
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
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
