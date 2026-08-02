import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { type $Composition } from './Composition';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';
import { $Letter } from './Letter';
import { $Paragraph, Paragraph } from './Paragraph';
import { $Title } from './Title';
import { $Subtitle, Subtitle } from './Subtitle';
import { $Tagline, Tagline } from './Tagline';
import { $Sentence } from './Sentence';
import { $Word } from './Word';

export class $Section extends $Writing implements $Composition<$Paragraph> {
    title!: $Html<'block'>;

    constructor() {
        super();
        this.inline = false;
    }

    get paragraphs(): $Paragraph[] { return this.contents(); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get canonical(): $Paragraph {
        const T = $(this.title as any);
        return $(<Paragraph><T /></Paragraph>);
    }

    get ref(): $$Section { return new $$Section(this); }

    set ref(reference: $Reference | undefined) { this.location = reference; }

    at(index: number): $Location<$Paragraph> {
        return Composible.at(this, index);
    }

    contents(): $Paragraph[] {
        const paragraphs: $Paragraph[] = this.copy.split(/\n{2,}/).map(p => $(<Paragraph>{p.trim()}</Paragraph>));
        return paragraphs.filter(p => p.valid()).map((p, i) => {
            p.index = i;
            p.ref = this.at(p.index);
            return p;
        });
    }

    get heading(): string {
        const t = text(this.title);
        const colon = t.indexOf(':');
        return colon < 0 ? t : t.slice(0, colon).trim();
    }

    get subtitle(): $Subtitle | undefined {
        const t = text(this.title);
        const colon = t.indexOf(':');
        if (colon < 0) return undefined;
        const subtitle: $Subtitle = $(<Subtitle>{t.slice(colon + 1).trim()}</Subtitle>);
        return subtitle;
    }

    get tagline(): $Tagline | undefined {
        const body = this.contents().slice(1).flatMap(p => p.sentences);
        if (!body.length) return undefined;
        const copy = body.length === 1 ? body[0].copy : body[0].copy.replace(/[.!?]+$/, '') + '…';
        const tagline: $Tagline = $(<Tagline>{copy}</Tagline>);
        return tagline;
    }

    where(match: (part: $Paragraph) => boolean): $Paragraph[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Paragraph) => U): U[] {
        return Composible.select(this, pick);
    }

    $Section(text?: $Html<'block'>) {
        this.text = $check(text, 'block');
        const first = this.text?.$elements?.[0];
        this.title = (first instanceof $Title ? first.text : first) as $Html<'block'>;
    }

    view(): ReactNode {
        return this.parenthetical ? null : super.view();
    }

    valid(): boolean {
        return super.valid() && text(this.title) !== '';
    }
}

export class $$Section implements $Catalogue<$Paragraph>, $Reference<$Section> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Section) { }

    get copy(): string { return this.contents().map(r => r.copy).join(' '); }
    get canonical(): $Reference<$Paragraph> { return Composible.canonical(this); }

    contents(): $Reference<$Paragraph>[] {
        return this.of.contents().map((paragraph, slot) => {
            const reference = this.of.at(paragraph.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference<$Paragraph>) => boolean): $Reference<$Paragraph>[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (reference: $Reference<$Paragraph>) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Reference<$Paragraph>> {
        return Composible.at(this, index);
    }

    follow(): $Composition<$Paragraph> & { follow(): $Composition<any> } {
        return Composible.follow(this);
    }

    read(): $Section {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    equals(ref: $Reference<$Section>): boolean {
        const found = ref.read();
        return this.of === found || same(this.of, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Section, U>(this, next);
    }
}

export const Section = $($Section);
