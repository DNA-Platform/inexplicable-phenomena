import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Reference } from '../ref/Reference';
import { text } from '../tools/html';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Paragraph, Paragraph } from './Paragraph';
import { $Title } from './Title';
import { $Subtitle, Subtitle } from './Subtitle';
import { $Tagline, Tagline } from './Tagline';
import { $Sentence } from './Sentence';

export class $Section extends $Writing implements $Composition<$Paragraph> {
    title?: $Html<'block'>;

    constructor() {
        super();
        this.inline = false;
    }

    get paragraphs(): $Paragraph[] { return this.parts; }
    get sentences(): $Sentence[] { return this.parts.flatMap(p => p.sentences); }

    get canonical(): $Paragraph {
        const T = $(this.title as any);
        return $(<Paragraph><T /></Paragraph>);
    }

    get parts(): $Paragraph[] {
        const paragraphs: $Paragraph[] = this.copy.split(/\n{2,}/).map(p => $(<Paragraph>{p.trim()}</Paragraph>));
        return paragraphs.filter(p => p.valid()).map((p, i) => {
            p.index = i;
            if (this.ref) p.ref = this.ref.compose(p.index);
            return p;
        });
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

    where(match: (part: $Paragraph) => boolean): $Paragraph[] {
        return this.parts.filter(match);
    }

    select<U>(pick: (part: $Paragraph) => U): U[] {
        return this.parts.map(pick);
    }

    single(match?: (part: $Paragraph) => boolean): $Paragraph | undefined {
        const found = match ? this.parts.filter(match) : this.parts;
        return found.length === 1 ? found[0] : undefined;
    }

    $Section(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
        const els = (this.block as any)?.$elements as unknown[] | undefined;
        if (els?.length) {
            const top = els[0] instanceof $Reference ? els[0] : undefined;
            const bottom = !top && els[els.length - 1] instanceof $Reference ? els[els.length - 1] : undefined;
            const written = top ?? bottom;
            if (written) {
                els.splice(els.indexOf(written), 1);
                this.$ref = written as $Reference;
            }
        }
        const first = this.block?.$elements?.[0];
        this.title = first instanceof $Title ? first.block : first as $Html<'block'> | undefined;
    }

    view(): ReactNode {
        return this.parenthetical ? null : super.view();
    }

    valid(): boolean {
        return super.valid() && text(this.title) !== '';
    }
}

export const Section = $($Section);
