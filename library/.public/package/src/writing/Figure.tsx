import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Paragraph } from './Paragraph';
import { $Caption } from './Caption';
import * as captions from './Caption';

export class $Figure extends $Paragraph {
    $caption? = '';

    get caption(): $Caption {
        const Caption = $(captions.Caption);
        const caption: $Caption = $(<Caption>{this.$caption || this.copy}</Caption>);
        return caption;
    }

    drawn(): ReactNode {
        return null;
    }

    view(): ReactNode {
        return (
            <figure>
                {this.drawn()}
                {this.parenthetical ? null : <figcaption>{this.caption.copy}</figcaption>}
            </figure>
        );
    }

    valid(): boolean {
        return $valid(this.caption.valid(), 'a figure carries a caption, possibly parenthetical but never absent, and this one has none');
    }
}

export const Figure = $($Figure);
