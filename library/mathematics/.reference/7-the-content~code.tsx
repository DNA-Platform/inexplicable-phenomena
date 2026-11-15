import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Section, $Word } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15: "on the back is a specification, and on the
// front is the identification. It's like the two sides of a wikipedia page." Not a type of chapter; the design of
// the abstraction applies to anything written in any book, tested here on the math textbook, 2026-11-16. The names
// Content and Specification collide with the base library's own words and every name here is a PROXY until the
// thing moves up. The content is a format said of its chapter: its note draws the bar of modes in place, and its
// style wraps the chapter, so the checked mode rules the sides. It opens in the object mode — the front — with the
// canonical side overridable; the toggle is played as a flip in place, labels over hidden radio inputs and no
// script — whether the real movement is this flip or a turn of the book is still his to rule.
export class $Content extends $Format {
    $canonical = 'identification';

    override note(): ReactNode {
        return (
            <div className="pc-content">
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-identification"
                        defaultChecked={this.$canonical === 'identification'}
                    />
                    <label htmlFor="pc-mode-identification">identification</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-specification"
                        defaultChecked={this.$canonical === 'specification'}
                    />
                    <label htmlFor="pc-mode-specification">specification</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-progress"
                        defaultChecked={this.$canonical === 'progress'}
                    />
                    <label htmlFor="pc-mode-progress">progress</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-together"
                        defaultChecked={this.$canonical === 'together'}
                    />
                    <label htmlFor="pc-mode-together">together</label>
                </span>
            </div>
        );
    }

    override style = selection.div`
        counter-reset: theorem;
        .pc-content { display: flex; gap: 1.75em; margin-block: ${({ theme }) => theme.space}; }
        .pc-mode input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-mode label { cursor: pointer; font-size: calc(0.7 * ${({ theme }) => theme.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .55; }
        .pc-mode input:checked + label { opacity: 1; font-weight: bold; border-block-end: 2px solid currentColor; }
        &:has(#pc-mode-identification:checked) .pc-specification { display: none; }
        &:has(#pc-mode-identification:checked) .pc-progress { display: none; }
        &:has(#pc-mode-specification:checked) .pc-identification { display: none; }
        &:has(#pc-mode-specification:checked) .pc-progress { display: none; }
        &:has(#pc-mode-progress:checked) .pc-identification { display: none; }
        &:has(#pc-mode-progress:checked) .pc-specification { display: none; }
        &:has(#pc-mode-together:checked) .pc-identification { display: none; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    `;
}

// THE SIDES, the parts of the object model said back in the chapter: the identification on the front, the
// specification on the back, and the progress of the content's project — Doug, 2026-11-15: "progress can be more
// of a narrative of independent things, which perhaps refer to each other", shown alone or on top of the
// specification. Each side is a section of the chapter, its heading its name.
export class $Identification extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-identification');
    }
}

export class $Specification extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-specification');
    }
}

export class $Progress extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-progress');
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

// THE MATH TEXTBOOK'S SPECIALIZATIONS, Doug, 2026-11-16: "You can specialize them in components for math textbooks
// specifically if you need a bit more structure" — a theorem counted within the chapter and a proof labelled, the
// general content above knowing nothing of either.
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
export const Identification = $($Identification);
export const Specification = $($Specification);
export const Progress = $($Progress);
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
