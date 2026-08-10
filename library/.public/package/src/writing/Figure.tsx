import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from './Paragraph';

// A figure is a paragraph that draws something. What it draws is its CONTENT,
// and content is not writing — a list of names, a card, a piece of source. The
// only words a figure has are its caption, which is its copy.
//
// So a figure is valid because it HAS SOMETHING TO DRAW, not because it has
// letters: a paragraph of prose with no letters is nothing, but a code listing
// with no caption at all is a perfectly good figure. Each kind says what it
// means by having content, and says it in its own words.
//
// Whether the caption reads as part of the prose is the kind's to decide: a
// listing's label is read, a plate's caption may be parenthetical.
export class $Figure extends $Paragraph {
    constructor() {
        super();
        this.inline = false;
    }

    get caption(): string { return this.copy; }

    // What this figure has to draw. A figure with neither content nor caption
    // is not a figure at all.
    drawn(): ReactNode {
        return null;
    }

    view(): ReactNode {
        return (
            <figure className="figure">
                {this.drawn()}
                {this.caption ? <figcaption>{this.caption}</figcaption> : null}
            </figure>
        );
    }

    valid(): boolean {
        return this.drawn() !== null || this.caption !== '';
    }
}

export const Figure = $($Figure);
