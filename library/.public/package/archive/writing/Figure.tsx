import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $check } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Paragraph } from './Paragraph';
import { $Caption } from './Caption';
import * as captions from './Caption';

export const Plate = styled.figure<{ $theme: $Theme }>`
    margin: ${p => p.$theme.rhythm} 0;
`;

export const Said = styled.figcaption<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(-1)};
    color: ${p => p.$theme.faint};
    margin-top: ${p => p.$theme.step(-2)};
    line-height: ${p => p.$theme.leading(-1)};
`;

export class $Figure extends $Paragraph {
    $caption? = '';

    $plate = Plate;
    $said = Said;

    get caption(): $Caption {
        const Caption = $(captions.Caption);
        const caption: $Caption = $(<Caption>{this.$caption || this.copy}</Caption>);
        return caption;
    }

    // A FIGURE IS ITS CAPTION, which is why valid() has always required one.
    // A caption is at sentence grade, which is the grade a paragraph composes,
    // so a figure is composed of exactly the part it is specified to carry.
    parts(): $Caption[] { return [this.caption]; }

    drawn(): ReactNode {
        return null;
    }

    // JOINED TO THE TEMPLATE. It used to override view() outright and never
    // reach gathered() or set(), which is why no theme could reach it.
    override gathered(): ReactNode {
        return this.drawn();
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const caption = this.parenthetical ? null : this.caption.copy;
        if (!contents && !caption) return null;
        const Shown = this.$plate;
        const Named = this.$said;
        return (
            <Shown $theme={theme}>
                {contents}
                {caption ? <Named $theme={theme}>{caption}</Named> : null}
            </Shown>
        );
    }

    valid(): boolean {
        return $check(this.caption.valid(), 'a figure carries a caption, possibly parenthetical but never absent, and this one has none');
    }
}

export const Figure = $($Figure);
