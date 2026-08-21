import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $check, $valid, $Chemical } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as paths from '../reference/Path';
import { $Composible$ } from '../writing/Composition';
import { $Composition$ } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Author } from './Author';
import { $Subject } from './Subject';
import { $Canonical } from './Canonical';
import { $IndexCard } from '../library/IndexCard';
import { $Cover } from './Cover';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Subtitle } from '../writing/Subtitle';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';
import { $Theme } from '../writing/Theme';
import * as themes from '../writing/Theme';
import '../writing/dressing';

export const Sheet = styled.article`
    max-width: ${p => p.theme.measure};
    margin: 0 auto;
    line-height: ${p => p.theme.leading};
    color: ${p => p.theme.ink};
    background: ${p => p.theme.ground};
    font-family: ${p => p.theme.face};
    font-size: ${p => p.theme.step(0)};
`;

export const Leaf = styled.div`
    margin-bottom: ${p => p.theme.rhythm};
`;

export const Running = styled.a`
    display: block;
    margin-bottom: ${p => p.theme.rhythm};
    font-size: ${p => p.theme.step(-2)};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${p => p.theme.faint};
    text-decoration: none;
    cursor: pointer;

    &:hover { color: ${p => p.theme.mark}; }
`;

export const Turning = styled.nav`
    display: flex;
    justify-content: space-between;
    gap: ${p => p.theme.step(1)};
    margin-top: ${p => p.theme.rhythm};
    padding-top: ${p => p.theme.step(0)};
    border-top: 1px solid ${p => p.theme.rule};

    @media print { display: none; }
`;

export const Step = styled.a<{ $side: 'left' | 'right' }>`
    max-width: 45%;
    text-align: ${p => p.$side};
    color: ${p => p.theme.mark};
    text-decoration: none;
    cursor: pointer;

    small {
        display: block;
        font-size: ${p => p.theme.step(-2)};
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${p => p.theme.faint};
    }

    span { font-size: ${p => p.theme.step(-1)}; }

    &:hover span { text-decoration: underline; text-underline-offset: 0.15em; }
`;

export const Shelf = styled.ul`
    margin: ${p => p.theme.rhythm} 0 0;
    padding: 0;
`;

const canonicals = (cover: $Cover): $Canonical[] =>
    cover.words.filter(w => w instanceof $Canonical) as $Canonical[];

const pointed = (reference?: { card?: $IndexCard<$Book> }): $Book | undefined => {
    try {
        return reference?.card?.read();
    } catch {
        return undefined;
    }
};

export class $Book extends $Referent implements $Composition$<$Chapter>, $Catalogue$<$Book> {
    $parts: $Chapter[] = [];

    $parenthetical? = false;

    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    get copy(): string { return this.parts().filter(c => !c.parenthetical).map(c => c.copy).join('\n\n'); }
    get canonical(): $Cover { return this.cover; }
    get cover(): $Cover { return this.chapters[0] as $Cover; }

    get synopsis(): $Synopsis { return this.chapters.find(c => this.accounts(c)) as $Synopsis; }
    get title(): $Title | undefined { return this.cover instanceof $Cover ? this.cover.title : undefined; }
    get author(): $Author | undefined { return this.cover instanceof $Cover ? this.cover.author : undefined; }
    get subject(): $Subject | undefined { return this.cover instanceof $Cover ? this.cover.subject : undefined; }
    get subtitle(): $Subtitle | undefined { return this.cover instanceof $Cover ? this.cover.subtitle : undefined; }

    get library(): $Book | undefined {
        const seen = new Set<$Book>();
        let at: $Book | undefined = this;
        while (at && !seen.has(at)) {
            seen.add(at);
            const of: $Book | undefined = pointed(at.subject);
            if (!of) return undefined;
            if (of === at) return at;
            at = of;
        }
        return undefined;
    }

    get chapters(): $Chapter[] { return this.parts(); }
    get sections(): $Section[] { return this.selectMany(c => c.sections); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get theme(): $Theme { return $(themes.Theme).$ as $Theme; }

    get ref(): $Cover { return this.cover; }

    at(position: number): $Location<$Chapter> {
        return $Composible$.at(this, position);
    }

    parts(): $Chapter[] {
        return this.$parts;
    }

    get entries(): $Reference$<$Book>[] {
        return this.chapters.filter(c => {
            if (c instanceof $Synopsis && c.card !== undefined) return !this.accounts(c);
            try { return c.read() !== this; } catch { return false; }
        });
    }

    follow(): $Composition$<$Book> {
        return $Composible$.follow({ parts: () => this.entries });
    }

    read(): $Composition$<$Book> {
        return this.follow();
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    where(match: (part: $Chapter) => boolean): $Chapter[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Chapter) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $Chapter) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $Chapter) => boolean): $Chapter {
        return $Composible$.single(this, match);
    }

    accounts(chapter: $Chapter): boolean {
        if (!(chapter instanceof $Synopsis)) return false;
        try {
            return chapter.read() === this;
        } catch {
            return false;
        }
    }

    get tableOfContents(): $TableOfContents {
        return this.chapters.find(c => c instanceof $TableOfContents) as $TableOfContents;
    }

    $Book(...chapters: $Chapter[]) {
        this.$parts = chapters.map(c => $check(c, $Chapter));
        for (const chapter of this.$parts) chapter.$in = this;
        if (!(this.chapters[0] instanceof $Cover)) throw new Error('A book requires its cover at position zero — its canonical chapter.');
        if (this.chapters.some((c, i) => i > 0 && c instanceof $Cover)) throw new Error('A book requires exactly one cover.');
        if (!this.chapters.some(c => this.accounts(c))) throw new Error('A book requires a synopsis OF ITSELF — one whose reference comes home. A book may carry the synopses of other books, and those are its catalogue rather than its own account.');
        if (this.chapters.filter(c => c instanceof $TableOfContents).length !== 1) throw new Error('A book declares exactly one table of contents.');
        if (!this.author) throw new Error('A book carries its author on its cover, and this cover names none.');
        if (!this.subject) throw new Error('A book carries its subject on its cover, and this cover names none.');
        if (canonicals(this.cover).length > 1) throw new Error('A subject declares exactly one canonical, and this cover carries more.');
    }

    get reading(): $Chapter[] {
        return this.chapters.filter(c => this.theme.draws(c));
    }

    get contents(): $TableOfContents {
        return this.tableOfContents;
    }

    stands(theme: $Theme): $Chapter[] {
        const open = this.contents?.open ?? this.reading[0];
        return open ? [open] : [];
    }

    Sheet = Sheet;
    Leaf = Leaf;
    Running = Running;
    Turning = Turning;
    Step = Step;

    environment(contents: ReactNode, theme: $Theme): ReactNode {
        const Bound = this.Sheet;
        return <Bound theme={theme as never} data-book>{contents}</Bound>;
    }

    place(chapter: $Chapter, at: number, theme: $Theme): ReactNode {
        const Standing = $(chapter) as any;
        const Placed = this.Leaf;
        return (
            <Placed key={at} theme={theme as never} id={chapter.address || undefined} data-chapter={at}>
                <Standing />
            </Placed>
        );
    }

    head(theme: $Theme): ReactNode {
        const listed = this.contents;
        if (!listed || this.stands(theme)[0] === this.cover) return null;
        const title = this.title?.copy ?? '';
        if (!title) return null;
        const Head = this.Running;
        return (
            <Head theme={theme as never} data-running href="#contents" onClick={event => { event.preventDefault(); listed.turn(listed as never); }}>
                {title}
            </Head>
        );
    }

    turning(theme: $Theme): ReactNode {
        const reading = this.reading;
        const listed = this.contents;
        const at = Math.max(0, reading.indexOf(this.stands(theme)[0]));
        const named = (chapter: $Chapter | undefined) => chapter?.title?.copy ?? '';
        const Moving = this.Step;
        const step = (to: number, mark: string, side: 'left' | 'right') => (
            <Moving
                theme={theme as never}
                data-turn-to={to}
                $side={side}
                href={`#${reading[to]?.address ?? ''}`}
                onClick={event => { event.preventDefault(); if (listed) listed.turn(reading[to]); }}
            >
                <small>{mark}</small>
                <span>{named(reading[to])}</span>
            </Moving>
        );
        if (reading.length < 2) return null;
        const Between = this.Turning;
        return (
            <Between theme={theme as never} data-turning>
                {at > 0 ? step(at - 1, 'previous', 'left') : <span />}
                {at < reading.length - 1 ? step(at + 1, 'next', 'right') : <span />}
            </Between>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        const reading = this.reading;
        const standing = this.stands(theme).map(c => this.place(c, reading.indexOf(c), theme));
        return this.environment(
            <>
                {this.head(theme)}
                {standing}
                {this.turning(theme)}
            </>,
            theme
        );
    }

    valid(): boolean {
        const covered = $valid(this.chapters[0] instanceof $Cover, 'a book carries its cover at position zero, and this one does not');
        const once = $valid(!this.chapters.some((c, i) => i > 0 && c instanceof $Cover), 'a book carries exactly one cover, and this one carries more');
        const accounted = $valid(this.chapters.some(c => this.accounts(c)), 'a book carries a synopsis OF ITSELF, and this one accounts only for other books');
        const listed = $valid(this.chapters.filter(c => c instanceof $TableOfContents).length === 1, 'a book declares exactly one table of contents');
        const authored = $valid(this.author !== undefined, 'a book carries its author on its cover, and this cover names none');
        const filed = $valid(this.subject !== undefined, 'a book carries its subject on its cover, and this cover names none');

        const of = pointed(this.author);
        const about = pointed(this.subject);

        const wrote = $valid(!of || pointed(of.author) === of, 'a book names an author that authors itself, and this one names a book somebody else wrote');

        const holds = $valid(!about || about.entries.length > 0, 'a book names a subject that catalogues other books, and this one names a book that catalogues nothing');

        return covered && once && accounted && listed && authored && filed && wrote && holds;
    }
}

export const Book = $($Book);
