import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Paragraph, Paragraph } from './Paragraph';
import { $Title } from './Title';
import { $Subtitle, Subtitle } from './Subtitle';
import { $Tagline, Tagline } from './Tagline';
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
        return $(<Paragraph><T /></Paragraph>);
    }

    get parts(): $Paragraph[] {
        const paragraphs: $Paragraph[] = this.copy.split(/\n{2,}/).map(p => $(<Paragraph>{p.trim()}</Paragraph>));
        return paragraphs.filter(p => p.valid()).map((p, i) => { p.index = i; return p; });
    }

    get subtitle(): $Subtitle | undefined {
        const t = text(this.title);
        const colon = t.indexOf(':');
        if (colon < 0) return undefined;
        const subtitle: $Subtitle = $(<Subtitle>{t.slice(colon + 1).trim()}</Subtitle>);
        return subtitle;
    }

    get tagline(): $Tagline | undefined {
        const body = this.parts.slice(1).flatMap(p => p.sentences);
        if (!body.length) return undefined;
        const copy = body.length === 1 ? body[0].copy : body[0].copy.replace(/[.!?]+$/, '') + '…';
        const tagline: $Tagline = $(<Tagline>{copy}</Tagline>);
        return tagline;
    }

    select(key: number): $Paragraph | undefined {
        return this.parts.find(p => p.index === key);
    }

    $Section(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
        const first = this.block?.$elements?.[0];
        this.title = first instanceof $Title ? first.block : $check(first, 'block') as $Html<'block'>;
    }

    view(): ReactNode {
        return this.parenthetical ? null : display(this);
    }

    valid(): boolean {
        return super.valid() && text(this.title) !== '';
    }
}

export const Section = $($Section);
