import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Paragraph } from './Paragraph';
import { $Sentence } from './Sentence';
import * as sentences from './Sentence';

// The ground was a TERNARY ON A HEX LITERAL — `theme.ground === '#ffffff'` —
// which breaks the rule that a theme's values are OPAQUE to the framework: a
// theme answering `var(--ink)` took the wrong side of it silently. A consumer
// who wants a different ground for code replaces this component.
export const Listing = styled.pre<{ $theme: $Theme }>`
    font-family: ${p => p.$theme.mono};
    font-size: ${p => p.$theme.step(-1)};
    line-height: ${p => p.$theme.leading(-1)};
    background: ${p => p.$theme.rule};
    border: 1px solid ${p => p.$theme.rule};
    border-radius: 4px;
    padding: ${p => p.$theme.step(-1)} ${p => p.$theme.step(0)};
    overflow-x: auto;
    margin: 0;
`;

export class $Code extends $Paragraph {
    $language? = '';
    $source? = '';

    parenthetical = true;

    $listing = Listing;

    get language(): string { return this.$language || 'text'; }

    get source(): string { return this.$source ?? ''; }

    // A CODE BLOCK IS COMPOSED OF ITS LINES. Doug, ruling that code is writing:
    // "lines by default, and a language-specific subclass divides by its own
    // grammar." A line is to a listing what a sentence is to a paragraph.
    parts(): $Sentence[] {
        const Line = $(sentences.Sentence);
        return this.source.split(String.fromCharCode(10)).map(line => $(<Line>{line || ' '}</Line>) as $Sentence);
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        if (!this.source) return null;
        const Set = this.$listing;
        return (
            <Set $theme={theme} data-language={this.language}>
                <code>{this.source}</code>
            </Set>
        );
    }

    valid(): boolean {
        return $valid(this.source !== '', 'code is the source it carries, and this block carries none');
    }
}

export const Code = $($Code);
