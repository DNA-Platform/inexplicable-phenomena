import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import { $Theme } from '../writing/Theme';

export const Marked = styled.mark<{ $theme: $Theme }>`
    background: ${p => p.$theme.rule};
    color: ${p => p.$theme.ink};
    padding: 0 0.15em;
`;

export class $Highlight extends $Sentence {
    $marked = Marked;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Shown = this.$marked;
        return <Shown $theme={theme}>{contents}</Shown>;
    }

    // FROM and TO, which is what a span is. They were `$first`/`$last`, colliding
    // with $Path.$first — where a first is a STEP, which is what the word means.
    //
    // Typed `number | string` because props arrive from JSX as strings: the only
    // place in the package that admits that, and it now admits it in a comment
    // rather than only in a type.
    $from?: number | string;
    $to?: number | string;

    get from(): number { return Number(this.$from ?? 0); }
    get to(): number | undefined { return this.$to === undefined ? undefined : Number(this.$to); }
}

export const Highlight = $($Highlight);
