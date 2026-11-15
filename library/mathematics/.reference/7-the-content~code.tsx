import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Section, $Word } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of
// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —
// the object, the result of the effort of the team, looking like what it is, a familiar math textbook chapter.
// On the back the PROJECT — the formal representation of the work: the statement of work, the progress, a plan,
// a discussion — the talk page behind a wikipedia article. The toggle's feel is the team's to find; the project
// side carries the formal visual language, attribution and references across sides. The names Content and the
// side labels are PROXIES until he keeps them. The content is a format said of its chapter: its note draws the
// two tabs in place, and its style wraps the chapter, so the checked side rules what shows — everything after
// the tabs that is not the project is the deliverable.
export class $Content extends $Format {
    $canonical = 'deliverable';

    override note(): ReactNode {
        return (
            <div className="pc-content">
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-side"
                        id="pc-side-deliverable"
                        defaultChecked={this.$canonical === 'deliverable'}
                    />
                    <label htmlFor="pc-side-deliverable">deliverable</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-side"
                        id="pc-side-project"
                        defaultChecked={this.$canonical === 'project'}
                    />
                    <label htmlFor="pc-side-project">project</label>
                </span>
            </div>
        );
    }

    override style = selection.div`
        counter-reset: theorem;
        .pc-content { display: flex; gap: .25em; margin-block: ${({ theme }) => theme.space} 0; border-block-end: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 25%, ${({ theme }) => theme.paper}); }
        .pc-mode input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-mode label { display: inline-block; cursor: pointer; padding: .15em .9em; font-size: calc(0.7 * ${({ theme }) => theme.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .55; border: 1px solid transparent; }
        .pc-mode input:checked + label { opacity: 1; font-weight: bold; border-color: color-mix(in srgb, ${({ theme }) => theme.ink} 25%, ${({ theme }) => theme.paper}); border-block-end-color: ${({ theme }) => theme.paper}; margin-block-end: -1px; background: ${({ theme }) => theme.paper}; }
        &:has(#pc-side-deliverable:checked) .pc-project { display: none; }
        &:has(#pc-side-project:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
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
