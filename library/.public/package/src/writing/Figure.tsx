import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
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
        const theme = this.theme;
        const body = this.drawn();
        const caption = this.parenthetical ? null : this.caption.copy;
        if (!body && !caption) return null;
        return (
            <figure style={{ margin: `${theme.rhythm} 0` }}>
                {body}
                {caption ? (
                    <figcaption style={{ fontSize: theme.step(-1), color: theme.faint, marginTop: theme.step(-2), lineHeight: 1.5 }}>
                        {caption}
                    </figcaption>
                ) : null}
            </figure>
        );
    }

    valid(): boolean {
        return $valid(this.caption.valid(), 'a figure carries a caption, possibly parenthetical but never absent, and this one has none');
    }
}

export const Figure = $($Figure);
