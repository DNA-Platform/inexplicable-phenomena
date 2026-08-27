import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import { $Footer } from './Footer';
import { $Theme } from '../writing/Theme';

export const Note = styled.li<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(-1)};
    color: ${p => p.$theme.faint};
    margin-bottom: 0.45em;
    line-height: ${p => p.$theme.leading(-1)};
`;

export class $Footnote extends $Sentence {
    $note = Note;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Said = this.$note;
        return <Said $theme={theme}>{contents}</Said>;
    }

    $name = '';

    get number(): number {
        const footer = this.parent as $Footer;
        return footer.footnotes.indexOf(this) + 1;
    }

    valid(): boolean {
        return super.valid() && this.$name !== '';
    }
}

export const Footnote = $($Footnote);
