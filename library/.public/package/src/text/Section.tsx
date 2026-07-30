import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Paragraph, Paragraph } from './Paragraph';
import { $Sentence } from './Sentence';

export class $Section extends $Referent implements $Composition<$Paragraph> {
    block?: $Html<'block'>;
    title?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return text(this.block); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get paragraphs(): $Paragraph[] { return this.parts; }
    get sentences(): $Sentence[] { return this.parts.flatMap(p => p.sentences); }

    get canonical(): $Paragraph {
        const T = $(this.title as any);
        return $<$Paragraph>(<Paragraph><T /></Paragraph>);
    }

    get parts(): $Paragraph[] {
        return this.copy.split(/\n{2,}/).map(p => p.trim()).filter(p => $Paragraph.valid(p))
            .map(p => $<$Paragraph>(<Paragraph>{p}</Paragraph>));
    }

    $Section(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
        this.title = $check(this.block?.$elements?.[0], 'block') as $Html<'block'>;
    }

    view(): ReactNode {
        return display(this);
    }
}

export const Section = $($Section);
