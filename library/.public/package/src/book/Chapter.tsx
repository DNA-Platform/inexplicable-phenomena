import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { text } from '../utilities/html';
import { type $Composition } from '../writing/Composition';
import { type $Book } from './Book';
import { $Section } from '../writing/Section';
import { $Title, Title } from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { type $Tagline } from '../writing/Tagline';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';

export class $Chapter extends $Referent implements $Composition<$Section> {
    $contents: $Section[] = [];

    $index?: number = undefined;
    $parenthetical? = false;

    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get book(): $Book { return this.parent as $Book; }
    get copy(): string { return this.contents().map(s => s.copy).join('\n\n'); }
    get canonical(): $Section { return this.contents().find(s => !s.parenthetical) ?? this.contents()[0]; }
    get summary(): $Section | undefined { return this.contents().find(s => s.parenthetical); }
    get tagline(): $Tagline | undefined { return this.summary?.tagline; }

    get sections(): $Section[] { return this.contents(); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get title(): $Title | undefined {
        const t = this.canonical?.heading ?? '';
        if (!t) return undefined;
        const title: $Title = $(<Title>{t}</Title>);
        return title;
    }

    get subtitle(): $Subtitle | undefined { return this.canonical?.subtitle; }

    $Chapter(...sections: $Section[]) {
        this.$contents = sections.length ? sections.map(s => $check(s, $Section)) : this.written();
        this.$contents.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        this.$contents.forEach(s => { s.ref = this.at(s.index); });
        if (!this.valid()) throw new Error('A chapter requires a summary — a parenthetical section.');
    }

    get ref(): $$Chapter { return new $$Chapter(this); }

    set ref(reference: $Reference | undefined) { this.location = reference; }

    at(index: number): $Location<$Section> {
        return Composible.at(this, index);
    }

    contents(): $Section[] {
        return this.$contents;
    }

    where(match: (part: $Section) => boolean): $Section[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Section) => U): U[] {
        return Composible.select(this, pick);
    }

    written(): $Section[] {
        if (this.view === $Chapter.prototype.view) return [];
        const node = this.view();
        const children = React.Children.toArray(
            React.isValidElement(node) && node.type === React.Fragment ? (node.props as any).children : node
        );
        const sections: $Section[] = [];
        for (const child of children) {
            if (!React.isValidElement(child)) continue;
            const evaluated = $(child as any, this);
            if (evaluated instanceof $Section) sections.push(evaluated);
        }
        return sections;
    }

    view(): ReactNode {
        return this.contents().map((s, i) => {
            const S = $(s) as any;
            return <div className="section" key={i}><S /></div>;
        });
    }

    valid(): boolean {
        return super.valid() && this.summary !== undefined;
    }
}

export class $$Chapter implements $Catalogue<$Section>, $Reference<$Chapter> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Chapter) { }

    get copy(): string { return this.contents().map(r => r.copy).join(' '); }
    get canonical(): $Reference<$Section> { return Composible.canonical(this); }

    contents(): $Reference<$Section>[] {
        return this.of.contents().map((section, slot) => {
            const reference = this.of.at(section.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference<$Section>) => boolean): $Reference<$Section>[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (reference: $Reference<$Section>) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Reference<$Section>> {
        return Composible.at(this, index);
    }

    follow(): $Composition<$Section> {
        return Composible.follow(this);
    }

    read(): $Chapter {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    equals(ref: $Reference<$Chapter>): boolean {
        const found = ref.read();
        return this.of === found || same(this.of, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Chapter, U>(this, next);
    }
}

export const Chapter = $($Chapter);
