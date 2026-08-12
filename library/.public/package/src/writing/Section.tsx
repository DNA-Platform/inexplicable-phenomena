import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { type $Composition$ } from './Composition';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Writing, type Level } from './Writing';
import { $Letter } from './Letter';
import { $Paragraph } from './Paragraph';
import * as paragraphs from './Paragraph';
import { $Title } from './Title';
import { $Subtitle } from './Subtitle';
import * as subtitles from './Subtitle';
import { $Tagline } from './Tagline';
import * as taglines from './Tagline';
import { $Sentence } from './Sentence';
import { $Word } from './Word';
import { type $Document } from '../document/Document';

export class $Section extends $Writing<$Paragraph> implements $Composition$<$Paragraph> {
    title!: $Html<'block'>;

    constructor() {
        super();
        this.inline = false;
    }

    get paragraphs(): $Paragraph[] { return this.parts(); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get level(): Level { return 'section'; }

    // A section's first paragraph is its title, and it wears 0 — the canonical
    // at every level is the special first. The levels beneath count from 1.
    get first(): number { return 0; }

    get canonical(): $Paragraph {
        const T = $(this.title as any);
        const Paragraph = $(paragraphs.Paragraph);
        return $(<Paragraph><T /></Paragraph>);
    }

    get ref(): $$Section { return new $$Section(this); }

    get document(): $Document {
        return this.parent as $Document;
    }

    // A section is divided at its blank lines.
    divide(prose: string): string[] {
        return prose.split(/\n{2,}/).map(p => p.trim());
    }

    compose(prose: string): $Paragraph {
        const Paragraph = $(paragraphs.Paragraph);
        return $(<Paragraph>{prose}</Paragraph>);
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
        const Subtitle = $(subtitles.Subtitle);
        const subtitle: $Subtitle = $(<Subtitle>{t.slice(colon + 1).trim()}</Subtitle>);
        return subtitle;
    }

    get tagline(): $Tagline | undefined {
        const body = this.parts().slice(1).flatMap(p => p.sentences);
        if (!body.length) return undefined;
        const copy = body.length === 1 ? body[0].copy : body[0].copy.replace(/[.!?]+$/, '') + '…';
        const Tagline = $(taglines.Tagline);
        const tagline: $Tagline = $(<Tagline>{copy}</Tagline>);
        return tagline;
    }

    $Section(...writing: unknown[]) {
        super.$Writing(...writing);
        const first = this.elements[0];
        this.title = (first instanceof $Title ? first.text : first) as $Html<'block'>;
    }

    view(): ReactNode {
        return this.parenthetical ? null : super.view();
    }

    valid(): boolean {
        return super.valid() && text(this.title) !== '';
    }
}

export class $$Section implements $Catalogue$<$Paragraph>, $Reference$<$Section> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Section) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Paragraph> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Paragraph>[] {
        return this.of.parts().map((paragraph, slot) => {
            const reference = this.of.at(paragraph.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference$<$Paragraph>) => boolean): $Reference$<$Paragraph>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Paragraph>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Paragraph>) => boolean): $Reference$<$Paragraph> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<$Paragraph>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Paragraph> {
        return $Composible$.follow(this);
    }

    read(): $Section {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Section, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Section = $($Section);
