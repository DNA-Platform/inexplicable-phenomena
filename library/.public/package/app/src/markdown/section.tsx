import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section } from '@/writing/Section';
import { $Figure } from '@/writing/Figure';
import { $Paragraph } from '@/writing/Paragraph';
import { $MarkdownParagraph, MarkdownParagraph } from './paragraph';

// A fenced block. Its content is not writing — it is source, or TeX — and the
// FENCE'S INFO STRING chooses which kind draws it. That is markdown's own
// customization point, which is why the specialization hook is not invented:
// the notation already had a place to say what a block is.
//
// A figure is valid because it HAS SOMETHING TO DRAW, so a fence with no
// caption at all is a perfectly good figure, and one with nothing inside it is
// not — and it says so in its own words.
export class $Fenced extends $Figure {
    $content? = '';
    $kind? = '';

    constructor() {
        super();
        // A listing's label is parenthetical: the chapter's prose is not the code.
        this.parenthetical = true;
    }

    get content(): string { return this.$content ?? ''; }
    get kind(): string { return this.$kind || 'text'; }

    drawn(): ReactNode {
        return this.content ? <pre>{this.content}</pre> : null;
    }

    valid(): boolean {
        return this.content !== '';
    }
}

export const Fenced = $($Fenced);

// An image: paragraph grade, content that is not writing. Its alt text is the
// only words it has, so that is its caption.
export class $Plate extends $Fenced {
    $alt? = '';

    get kind(): string { return 'image'; }
    get caption(): string { return this.$alt ?? ''; }

    drawn(): ReactNode {
        return this.content ? <img src={this.content} alt={this.caption} /> : null;
    }
}

export const Plate = $($Plate);

// A thematic break divides without titling. It has nothing to say, so it is
// parenthetical: present in the writing, passed over by the reading.
export class $Break extends $Fenced {
    get kind(): string { return 'break'; }

    drawn(): ReactNode { return <hr />; }

    valid(): boolean { return true; }
}

export const Break = $($Break);

// A quoted paragraph and a list item are ordinary PARAGRAPHS that know what
// bounded them. The bullet or the angle is syntax — mentioned, present in the
// writing and passed over by the reading — so it is kept on the part rather
// than thrown away, and the words are the words either way.
export class $Quoted extends $MarkdownParagraph {
    $mark? = '>';

    get mark(): string { return this.$mark ?? '>'; }
}

export const Quoted = $($Quoted);

export class $Item extends $MarkdownParagraph {
    $mark? = '-';
    $ordered? = false;

    get mark(): string { return this.$mark ?? '-'; }
    get ordered(): boolean { return !!this.$ordered; }
}

export const Item = $($Item);

// Display mathematics, at paragraph grade — a fence by another notation's marks.
export class $Displayed extends $Fenced {
    get kind(): string { return 'math'; }
}

export const Displayed = $($Displayed);

// A fence whose info string is `parts` draws NOT text but the section's own
// reading — and the reader can act on it. Content that is not writing, that
// responds. The same mechanism as a listing; a different word after the fence.
export class $Attending extends $Fenced {
    get kind(): string { return 'parts'; }

    valid(): boolean { return true; }
}

export const Attending = $($Attending);

// A fence is pulled out WHOLE — blank lines inside it must not divide it, which
// is the one thing a markdown section cannot inherit from a plain one.
const fence = /```[^\n]*\n[\s\S]*?(?:\n```|$)/g;
const display = /\$\$[\s\S]+?\$\$/g;

const opens = /^```([^\n]*)\n([\s\S]*?)(\n```)?$/;
const displayed = /^\$\$([\s\S]+?)\$\$$/;
const bullet = /^\s*([-*+]|\d+[.)])\s+(.*)$/;
const quote = /^\s*>\s?(.*)$/;
const picture = /^!\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const rule = /^(-{3,}|\*{3,}|_{3,})$/;

// A run of bulleted or quoted lines is MANY parts, not one — each item is a
// paragraph in its own right. Everything else stays whole.
const listed = (run: string): string[] => {
    const body = run.trim();
    if (!body) return [];
    const lines = body.split('\n');
    if (lines.length > 1 && lines.every(l => bullet.test(l) || quote.test(l))) return lines.map(l => l.trim());
    return [body];
};

export class $MarkdownSection extends $Section {
    // The part the reader is attending to, held by the SECTION — the common
    // renderer of both the prose and the figure that lists it. It is handed
    // DOWN to both; neither climbs `parent` to find it, which would tell the
    // truth at binding and lie on screen (solutions/09).
    attending = -1;

    attend(index: number) {
        this.attending = this.attending === index ? -1 : index;
    }

    divide(prose: string): string[] {
        const pieces: string[] = [];
        let last = 0;
        const whole = new RegExp(`${fence.source}|${display.source}`, 'g');
        for (let m = whole.exec(prose); m; m = whole.exec(prose)) {
            for (const run of prose.slice(last, m.index).split(/\n{2,}/)) {
                for (const piece of listed(run)) pieces.push(piece);
            }
            pieces.push(m[0]);
            last = m.index + m[0].length;
        }
        for (const run of prose.slice(last).split(/\n{2,}/)) {
            for (const piece of listed(run)) pieces.push(piece);
        }
        return pieces;
    }

    compose(prose: string): $Paragraph {
        const asDisplay = displayed.exec(prose);
        if (asDisplay) return $(<Displayed content={asDisplay[1].trim()} />);

        if (rule.test(prose)) return $(<Break content={prose} />);

        const asPicture = picture.exec(prose);
        if (asPicture) return $(<Plate alt={asPicture[1]} content={asPicture[2]} />);

        const asQuote = quote.exec(prose);
        if (asQuote) return $(<Quoted mark=">">{asQuote[1]}</Quoted>);

        const asBullet = bullet.exec(prose);
        if (asBullet) return $(<Item mark={asBullet[1]} ordered={/\d/.test(asBullet[1])}>{asBullet[2]}</Item>);

        const asFence = opens.exec(prose);
        if (asFence) {
            const info = asFence[1].trim();
            if (info === 'parts') return $(<Attending content={asFence[2]} />);
            return $(<Fenced kind={info} content={asFence[2]} />);
        }

        return $(<MarkdownParagraph>{prose}</MarkdownParagraph>);
    }
}

export const MarkdownSection = $($MarkdownSection);
