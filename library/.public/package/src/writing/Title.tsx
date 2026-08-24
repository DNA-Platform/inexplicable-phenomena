import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Paragraph } from './Paragraph';

export const Opening = styled.h1<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(3)};
    color: ${p => p.$theme.ink};
    font-weight: ${p => p.$theme.weight(3)};
    letter-spacing: ${p => p.$theme.tracking(3)};
    line-height: ${p => p.$theme.leading(3)};
    margin: 0;
`;

export const Heading = styled.h2<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(1)};
    color: ${p => p.$theme.ink};
    font-weight: ${p => p.$theme.weight(1)};
    letter-spacing: ${p => p.$theme.tracking(1)};
    line-height: ${p => p.$theme.leading(1)};
    margin: 0 0 ${p => p.$theme.step(-1)};
`;

export const Rest = styled.p<{ $theme: $Theme; $at: number }>`
    font-size: ${p => p.$theme.step(p.$at)};
    color: ${p => p.$theme.faint};
    font-weight: 400;
    margin: ${p => p.$theme.step(-2)} 0 ${p => p.$theme.step(0)};
`;

export class $Title extends $Paragraph {
    $opening = Opening;
    $heading = Heading;
    $rest = Rest;

    get heading(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? this.copy : this.copy.slice(0, colon).trim();
    }

    get rest(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? '' : this.copy.slice(colon + 1).trim();
    }

    // A TITLE IS OPENING WHEN THE CHAPTER IT STANDS IN IS ITS BOOK'S COVER.
    // Identity against the book's own answer — no flag, no bounded walk.
    //
    // Doug asked for `instanceof $Cover`; importing $Cover here closes a cycle
    // (Title -> Cover -> Chapter -> Document -> Section -> Title) and the class
    // is undefined at evaluation. The structural comparison needs no import and
    // asks the same question of the same two hops.
    get opening(): boolean {
        const section = this.parent as { parent?: unknown } | undefined;
        const chapter = section?.parent as { book?: { cover?: unknown } } | undefined;
        return !!chapter && chapter.book?.cover === chapter;
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const opening = this.opening;
        const rest = this.rest;
        const body = rest ? this.heading : contents;
        const Named = opening ? this.$opening : this.$heading;
        const head = <Named $theme={theme}>{body}</Named>;
        if (!rest) return head;
        const Under = this.$rest;
        return (
            <>
                {head}
                <Under $theme={theme} $at={opening ? 1 : 0} data-subtitle>{rest}</Under>
            </>
        );
    }

    valid(): boolean {
        return $valid(this.copy !== '', 'a title has words, and this one is empty');
    }
}

export const Title = $($Title);
