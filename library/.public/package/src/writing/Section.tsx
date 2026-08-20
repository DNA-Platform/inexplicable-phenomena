import React, { type ReactNode } from 'react';
import { lexer } from 'marked';
import { $, $check, $Html, $Chemical } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { $Composition$ } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Writing, Role } from './Writing';

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
// `marked` answers where the boundaries are; the classes below answer
// what each piece is. A section still divides at blank lines, because that is
// what `marked` does with prose — what it adds is everything else a person
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

// One stretch of prose, cut into the pieces a section holds.
const blocks = (prose: string): string[] => {
    if (!prose.trim()) return [];
    const pieces: string[] = [];
    const found = lexer(prose) as { type: string; raw: string; depth?: number }[];
    for (let i = 0; i < found.length;) {
        const at = found[i];
        // OWED: a blank line between paragraphs is still dropped here, and the
        // ruling is that nothing a parse meets is thrown out. Attaching it to the
        // paragraph it ends was tried and cascades: `marked` already folds a
        // trailing newline into a heading's and a fence's own `raw`, so appending
        // its space token double-counts and three promises go red — a heading
        // stops being a title, a fence stops choosing its figure, and the flat
        // reading loses a level. It wants the whole divider rewritten off
        // `marked`'s positions rather than its trimmed text.
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
// section, so depth is a containment to bolt on later rather than a nesting the
// parse carries.

// A blank line divides prose. One at the START of a stretch closes whatever was
// open before it; one at the END closes what that stretch just built.
const blankFirst = /^\s*\n\s*\n/;
const blankLast = /\n\s*\n\s*$/;

export class $Section extends $Writing<$Paragraph> implements $Composition$<$Paragraph> {
    // THE TITLE IS PART ZERO. It is not lifted out into a member of its own — it
    // stands where it was written, as the canonical part of the section, which is
    // the cover-and-synopsis shape one grade down.
    get title(): $Paragraph { return this.parts()[0] as $Paragraph; }

    get paragraphs(): $Paragraph[] {
        return this.parts();
    }

    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }


    get canonical(): $Paragraph { return this.parts()[0] as $Paragraph; }

    get ref(): $$Section { const Entry = $($$Section); return $(<Entry of={this} />) as $$Section; }

    get document(): $Document {
        return this.parent as $Document;
    }

    // Display mathematics is not this notation's, so it is pulled whole before
    // `marked` sees anything — otherwise a formula's underscores are emphasis.
    // A SECTION READS ITS OWN CONTENTS, accumulating until a blank line closes a
    // paragraph. A written element joins the paragraph it was written into, and
    // ITS OWN TEXT IS NEVER READ FOR BOUNDARIES — a part cannot be split, so
    // nothing inside one may divide what holds it.
    parts(): $Paragraph[] {
        const Paragraph = $(paragraphs.Paragraph);
        const found: $Paragraph[] = [];
        let held: (string | $Chemical)[] = [];

        const close = () => {
            if (!held.length) return;
            const alone = held.length === 1 && typeof held[0] === 'string' ? held[0] as string : undefined;
            if (alone !== undefined && !alone.trim()) { held = []; return; }
            // Pure prose still forks the way it always did — a display becomes a
            // figure, a heading a title. Contents carrying a written element are
            // handed to the paragraph as they stand.
            const made = alone !== undefined
                ? this.compose(alone)
                : $(<Paragraph />, ...held) as $Paragraph;
            if (made) {
                if (made.parent !== this) made.parent = this as never;
                found.push(made);
            }
            held = [];
        };

        for (const written of (this.text.$elements ?? []) as (string | number | $Chemical)[]) {
            if (typeof written === 'object') {
                if (written instanceof $Paragraph) { close(); found.push(written); continue; }
                held.push(written);
                continue;
            }
            const prose = String(written);
            if (blankFirst.test(prose)) close();
            const pieces = this.divide(prose);
            pieces.forEach((piece, at) => {
                held.push(piece);
                if (at !== pieces.length - 1 || blankLast.test(prose)) close();
            });
        }
        close();
        return found;
    }

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
        // A SENTENCE THAT READS AS NOTHING IS NOT PART OF THE READING. A cover's
        // author and subject are parenthetical — mentioned, passed over — and
        // they became visible here the day written elements stopped dissolving.
        // Counting one would put an ellipsis after a summary with no more to say.
        const body = this.parts().slice(1).flatMap(p => p.sentences).filter(s => s.copy.trim() !== '');
        if (!body.length) return undefined;
        // A TAGLINE IS A READING, so it does not carry the separator the sentence
        // keeps. A sentence runs to its stop and the whitespace after it — that
        // space is written and is held, and a tagline still reads without it.
        const said = body[0].copy.trimEnd();
        const copy = body.length === 1 ? said : said.replace(/[.!?]+$/, '') + '…';
        const Tagline = $(taglines.Tagline);
        const tagline: $Tagline = $(<Tagline>{copy}</Tagline>);
        return tagline;
    }

    $Section(...writing: unknown[]) {
        super.$Writing(...writing);
    }

    // A SECTION'S PARTS DIFFER IN KIND BY CONSTRUCTION — a title stands at
    // position zero, and a figure, a fence or a quote may stand among the
    // paragraphs. So they are never one run, and this is the level where the
    // parse finally reaches the page.
    override uniform(): boolean {
        return false;
    }

    // A PARENTHETICAL SECTION IS NOT DRAWN, and a theme may say otherwise.
    // The guard lives here rather than on $Writing because `parenthetical`
    // means two different things at two grades: a summary is not shown, while
    // an author's name is parenthetical and IS shown — it is simply not prose.
    view(): ReactNode {
        return this.theme.draws(this) ? super.view() : null;
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

    selectMany<U>(pick: (part: $$Paragraph) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
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
