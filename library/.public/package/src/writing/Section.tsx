import React, { type ReactNode } from 'react';
import { lexer } from 'marked';
import { $, $check, $Html } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { $Composition$ } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Writing, Level, Role } from './Writing';
import { $Letter } from './Letter';
import { $Paragraph, $$Paragraph } from './Paragraph';
import * as paragraphs from './Paragraph';
import { $Title } from './Title';
import * as titles from './Title';
import * as codes from './Code';
import * as figures from './Figure';
import * as sections from './Section';
import { $Subtitle } from './Subtitle';
import * as subtitles from './Subtitle';
import { $Tagline } from './Tagline';
import * as taglines from './Tagline';
import { $Sentence } from './Sentence';
import { $Word } from './Word';
import { $Document } from '../document/Document';

// THE NOTATION IS THE SECTION'S OWN. It is not a kind of writing — it is how
// writing is written, so it lives here rather than in a class of its own, and
// the word for it appears nowhere in this package.
//
// `marked`'s lexer answers where the boundaries are; the classes below answer
// what each piece is. A section still divides at blank lines, because that is
// what the lexer does with prose — what it adds is everything else a person
// actually writes.
// Built fresh on every call, never hoisted: a global regex carries `lastIndex`
// between calls, so a shared one would start the second section mid-string.
const display = () => /\$\$[\s\S]+?\$\$/g;
const displayed = /^\$\$([\s\S]+?)\$\$$/;
const heading = /^[ \t]*(#{1,6})[ \t]+(.+)(?:\n|$)/;
const opens = /^```([^\n]*)\n([\s\S]*?)(?:\n```)?$/;
const bullet = /^\s*([-*+]|\d+[.)])\s+(.*)$/;
const quote = /^\s*>/;
const picture = /^!\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const rule = /^(-{3,}|\*{3,}|_{3,})$/;

// One run of prose, cut into the pieces a section holds.
const blocks = (prose: string): string[] => {
    if (!prose.trim()) return [];
    const pieces: string[] = [];
    const tokens = lexer(prose) as { type: string; raw: string; depth?: number }[];
    for (let i = 0; i < tokens.length;) {
        const at = tokens[i];
        if (at.type === 'space') { i++; continue; }
        if (at.type === 'heading') {
            pieces.push(at.raw);
            i++;
            continue;
        }

        // A LIST is many parts and a QUOTE is one. An item is a paragraph in its
        // own right, because the notation marks each one; a quotation broken over
        // several lines is a single paragraph, because ONLY A BLANK LINE divides
        // prose — three lines under one angle are a stanza, not three paragraphs.
        if (at.type === 'list') {
            for (const item of ((at as { items?: { raw: string }[] }).items ?? [])) {
                if (item.raw.trim()) pieces.push(item.raw.trim());
            }
            i++;
            continue;
        }
        const piece = at.raw.trim();
        if (piece) pieces.push(at.type === 'code' ? at.raw.trim() : piece);
        i++;
    }
    return pieces;
};

// A SECTION COMPOSES PARAGRAPHS, flat. A heading of any depth opens a new
// section, so depth is a containment to bolt on later rather than a tree the
// parse carries.
export class $Section extends $Writing<$Paragraph> implements $Composition$<$Paragraph> {
    // THE TITLE IS PART ZERO. It is not lifted out into a member of its own — it
    // stands where it was written, as the canonical part of the section, which is
    // the cover-and-synopsis shape one grade down.
    get title(): $Paragraph { return this.parts()[0] as $Paragraph; }

    get accepts(): Level[] { return ['paragraph']; }

    get paragraphs(): $Paragraph[] {
        return this.parts();
    }

    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get level(): Level { return 'section'; }

    get canonical(): $Paragraph { return this.parts()[0] as $Paragraph; }

    get ref(): $$Section { const Entry = $($$Section); return $(<Entry of={this} />) as $$Section; }

    get document(): $Document {
        return this.parent as $Document;
    }

    // Display mathematics is not this notation's, so it is pulled whole before
    // the lexer sees anything — otherwise a formula's underscores are emphasis.
    divide(prose: string): string[] {
        const pieces: string[] = [];
        const whole = display();
        let last = 0;
        for (let m = whole.exec(prose); m; m = whole.exec(prose)) {
            pieces.push(...blocks(prose.slice(last, m.index)));
            pieces.push(m[0]);
            last = m.index + m[0].length;
        }
        pieces.push(...blocks(prose.slice(last)));
        return pieces;
    }

    // What each piece IS. The notation named it; this answers with the kind.
    compose(prose: string): $Paragraph {
        const asDisplay = displayed.exec(prose.trim());
        if (asDisplay) {
            const Figure = $(figures.Figure);
            return $(<Figure caption={asDisplay[1].trim()} />) as $Paragraph;
        }

        const asHeading = heading.exec(prose);
        if (asHeading) {
            const Title = $(titles.Title);
            return $(<Title>{asHeading[2].trim()}</Title>) as $Paragraph;
        }

        if (rule.test(prose.trim())) {
            const Figure = $(figures.Figure);
            return $(<Figure caption={prose.trim()} parenthetical />) as $Paragraph;
        }

        const asPicture = picture.exec(prose.trim());
        if (asPicture) {
            const Figure = $(figures.Figure);
            return $(<Figure caption={asPicture[1] || asPicture[2]} />) as $Paragraph;
        }

        if (quote.test(prose)) {
            const Paragraph = $(paragraphs.Paragraph);
            // Every line loses its angle, and the lines stay together: the mark is
            // syntax on each of them, and the quotation is one paragraph.
            const said = prose.split('\n').map(line => line.replace(/^\s*>\s?/, '')).join('\n').trim();
            return $(<Paragraph mark=">">{said}</Paragraph>) as $Paragraph;
        }

        const asBullet = bullet.exec(prose);
        if (asBullet) {
            const Paragraph = $(paragraphs.Paragraph);
            return $(<Paragraph mark={asBullet[1]}>{asBullet[2]}</Paragraph>) as $Paragraph;
        }

        const asFence = opens.exec(prose.trim());
        if (asFence) {
            const Code = $(codes.Code);
            return $(<Code language={asFence[1].trim()} source={asFence[2]} caption={asFence[1].trim() || 'code'} parenthetical />) as $Paragraph;
        }

        const Paragraph = $(paragraphs.Paragraph);
        return $(<Paragraph>{prose}</Paragraph>);
    }

    get heading(): string {
        const t = this.title?.copy ?? '';
        const colon = t.indexOf(':');
        return colon < 0 ? t : t.slice(0, colon).trim();
    }

    get subtitle(): $Subtitle | undefined {
        const t = this.title?.copy ?? '';
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
    }

    view(): ReactNode {
        return this.parenthetical ? null : super.view();
    }

    valid(): boolean {
        return super.valid() && text(this.title) !== '';
    }
}

export class $$Section extends $Paragraph implements $Reference$<$Section>, $Catalogue$<$Paragraph> {
    $of!: $Section;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{this.copy}</>; }

    get of(): $Section { return this.$of; }
    get copy(): string { return this.of.copy; }
    get canonical(): $$Paragraph { return $Composible$.canonical(this); }

    parts(): $$Paragraph[] {
        const Entry = $($$Paragraph);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Paragraph);
    }

    where(match: (part: $$Paragraph) => boolean): $$Paragraph[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $$Paragraph) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (part: $$Paragraph) => boolean): $$Paragraph {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$$Paragraph> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Paragraph> {
        return $Composible$.follow(this as never);
    }

    read(): $Section {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Section = $($Section);
