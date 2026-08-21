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
import { $Theme } from './Theme';

import { $Letter } from './Letter';
import { $Paragraph, $$Paragraph } from './Paragraph';
import * as paragraphs from './Paragraph';
import { $Title } from './Title';
import * as titles from './Title';
import * as codes from './Code';
import * as figures from './Figure';
import * as formulas from './Formula';
import * as sections from './Section';
import { $Subtitle } from './Subtitle';
import * as subtitles from './Subtitle';
import { $Tagline } from './Tagline';
import * as taglines from './Tagline';
import { $Sentence } from './Sentence';
import { $Word } from './Word';
import { $Document } from '../document/Document';

const display = () => /\$\$[\s\S]+?\$\$/g;
const displayed = /^\$\$([\s\S]+?)\$\$$/;
const heading = /^[ \t]*(#{1,6})[ \t]+(.+)(?:\n|$)/;
const opens = /^```([^\n]*)\n([\s\S]*?)(?:\n```)?$/;
const bullet = /^\s*([-*+]|\d+[.)])\s+(.*)$/;
const quote = /^\s*>/;
const picture = /^!\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const rule = /^(-{3,}|\*{3,}|_{3,})$/;

const blocks = (prose: string): string[] => {
    if (!prose.trim()) return [];
    const pieces: string[] = [];
    const found = lexer(prose) as { type: string; raw: string; depth?: number }[];
    for (let i = 0; i < found.length;) {
        const at = found[i];
        if (at.type === 'space') { i++; continue; }
        if (at.type === 'heading') {
            pieces.push(at.raw);
            i++;
            continue;
        }

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

const blankFirst = /^\s*\n\s*\n/;
const blankLast = /\n\s*\n\s*$/;

export class $Section extends $Writing<$Paragraph> implements $Composition$<$Paragraph> {
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

    parts(): $Paragraph[] {
        const Paragraph = $(paragraphs.Paragraph);
        const found: $Paragraph[] = [];
        let held: (string | $Chemical)[] = [];

        const close = () => {
            if (!held.length) return;
            const alone = held.length === 1 && typeof held[0] === 'string' ? held[0] as string : undefined;
            if (alone !== undefined && !alone.trim()) { held = []; return; }
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

    compose(prose: string): $Paragraph {
        const asDisplay = displayed.exec(prose.trim());
        if (asDisplay) {
            const Paragraph = $(paragraphs.Paragraph);
            return $(<Paragraph mark="$$">{'$' + asDisplay[1].trim() + '$'}</Paragraph>) as $Paragraph;
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
        const title: unknown = this.title;
        return title instanceof $Title ? title.heading : String((title as { copy?: string })?.copy ?? '');
    }

    get subtitle(): $Subtitle | undefined {
        const title: unknown = this.title;
        const rest = title instanceof $Title ? title.rest : '';
        if (!rest) return undefined;
        const Subtitle = $(subtitles.Subtitle);
        return $(<Subtitle>{rest}</Subtitle>) as $Subtitle;
    }

    get tagline(): $Tagline | undefined {
        const body = this.parts().slice(1).flatMap(p => p.sentences).filter(s => s.copy.trim() !== '');
        if (!body.length) return undefined;
        const said = body[0].copy.trimEnd();
        const copy = body.length === 1 ? said : said.replace(/[.!?]+$/, '') + '…';
        const Tagline = $(taglines.Tagline);
        const tagline: $Tagline = $(<Tagline>{copy}</Tagline>);
        return tagline;
    }

    $Section(...writing: unknown[]) {
        super.$Writing(...writing);
    }

    override uniform(): boolean {
        return false;
    }

    view(): ReactNode {
        return this.theme.draws(this) ? super.view() : null;
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return <section style={{ marginBottom: theme.rhythm }}>{contents}</section>;
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
