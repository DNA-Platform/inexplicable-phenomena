import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $check, $valid } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as locations from '../reference/Location';
import * as paths from '../reference/Path';
import { $Writing } from '../writing/Writing';
import { $Composition } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Annotation } from './Annotation';
import { $Type } from './Type';
import { $Author } from './Author';
import { $Subject } from './Subject';
import { $Canonical } from './Canonical';
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

export const Sheet = styled.article<{ $theme: $Theme }>`
    max-width: ${p => p.$theme.measure};
    margin: 0 auto;
    line-height: ${p => p.$theme.leading(0)};
    color: ${p => p.$theme.ink};
    background: ${p => p.$theme.ground};
    font-family: ${p => p.$theme.face};
    font-size: ${p => p.$theme.step(0)};
`;

export const Leaf = styled.div<{ $theme: $Theme }>`
    margin-bottom: ${p => p.$theme.rhythm};
`;

export const Running = styled.a<{ $theme: $Theme }>`
    display: block;
    margin-bottom: ${p => p.$theme.rhythm};
    font-size: ${p => p.$theme.step(-2)};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${p => p.$theme.faint};
    text-decoration: none;
    cursor: pointer;

    &:hover { color: ${p => p.$theme.accent}; }
`;

export const Turning = styled.nav<{ $theme: $Theme }>`
    display: flex;
    justify-content: space-between;
    gap: ${p => p.$theme.step(1)};
    margin-top: ${p => p.$theme.rhythm};
    padding-top: ${p => p.$theme.step(0)};
    border-top: 1px solid ${p => p.$theme.rule};

    @media print { display: none; }
`;

export const Step = styled.a<{ $side: 'left' | 'right'; $theme: $Theme }>`
    max-width: 45%;
    text-align: ${p => p.$side};
    color: ${p => p.$theme.accent};
    text-decoration: none;
    cursor: pointer;

    small {
        display: block;
        font-size: ${p => p.$theme.step(-2)};
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${p => p.$theme.faint};
    }

    span { font-size: ${p => p.$theme.step(-1)}; }

    &:hover span { text-decoration: underline; text-underline-offset: 0.15em; }
`;

// THE SHELF, which was here the whole time with nothing drawing it. Its method
// was deleted one commit ago as a drawing that never reached the page, and the
// reason it never reached it is that a subject's entries became CHAPTERS — so a
// subject could show at most one of the books it catalogues, because a book is
// read a chapter at a time. A catalogue is CONSULTED rather than read.
export const Shelf = styled.ul<{ $theme: $Theme }>`
    margin: ${p => p.$theme.rhythm} 0 0;
    padding: 0;
    list-style: none;
`;

export class $Book extends $Referent implements $Composition<$Chapter>, $Catalogue<$Book> {
    $parts: $Chapter[] = [];

    /** THIS BOOK'S OWN CARD. An annotation validates against cards and opens no
     *  book, so it has to be able to reach its own book's card — and the one
     *  thing that knows which card goes with which book is the compiler. */
    $card?: $$Book = undefined;

    get card(): $$Book | undefined { return this.$card; }

    parenthetical = false;

    get copy(): string { return this.parts().filter(c => !c.parenthetical).map(c => c.copy).join(' '); }
    get canonical(): $Cover { return this.cover; }
    get cover(): $Cover { return this.chapters[0] as $Cover; }

    get synopsis(): $Synopsis { return this.chapters.find(c => this.accounts(c)) as $Synopsis; }
    get title(): $Title | undefined { return this.cover instanceof $Cover ? this.cover.title : undefined; }
    get subtitle(): $Subtitle | undefined { return this.cover instanceof $Cover ? this.cover.subtitle : undefined; }

    // A BOOK LIFTS ITS ANNOTATIONS FROM WHAT REPRESENTS IT, and its canonical is
    // the DEFAULT answer rather than the reason. Doug: "Listing annotations from
    // one's canonical might be a standard way, but obviously that isn't always
    // true. The cover represents the book."
    //
    // AND REPRESENTATION IS NOT IN THE FRAMEWORK YET. $Cover implements
    // $Reference<$Book> — it POINTS AT the book — and nothing says it STANDS FOR
    // it. In the derivation a representation is a reference whose third term is
    // the OBJECT rather than the subject, and it specializes reference. Until
    // that exists, position stands in for a relation, and this member is
    // overridable so a book that is represented otherwise can say so.
    get annotations(): $Annotation[] {
        const of = this.canonical;
        return of instanceof $Writing ? of.annotations : [];
    }

    get author(): $Author | undefined { return this.annotations.find(a => a instanceof $Author) as $Author | undefined; }
    get subject(): $Subject | undefined { return this.annotations.find(a => a instanceof $Subject) as $Subject | undefined; }

    /** What a book says it IS. A type is carried rather than inherited, so what
     *  `Autobiography` means is written in the library and not encoded here. */
    get type(): $Type[] { return this.annotations.filter(a => a instanceof $Type) as $Type[]; }

    // A CARD COMPUTE OPENS NONE. The climb happens card to card and exactly one
    // book is opened — the answer. This used to call card.read() at every step,
    // so asking a leaf for its library opened every book on the path, which is
    // the one thing a catalogue exists to make unnecessary.
    get library(): $Book | undefined {
        const found = this.subject?.card?.library;
        if (!found) return undefined;
        try {
            return found.read();
        } catch {
            return undefined;
        }
    }

    protected canonicals(cover: $Cover): $Canonical[] {
        return cover.words.filter(w => w instanceof $Canonical) as $Canonical[];
    }

    protected pointed(reference?: { card?: $$Book }): $Book | undefined {
        try {
            return reference?.card?.read();
        } catch {
            return undefined;
        }
    }

    get chapters(): $Chapter[] { return this.parts(); }
    get sections(): $Section[] { return this.selectMany(c => c.sections); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.sections.flatMap(s => s.letters); }

    get theme(): $Theme { return $(themes.Theme).$ as $Theme; }

    get ref(): $Cover { return this.cover; }

    protected located<T extends $Referent>(position: number): $Location<T> {
        const Location = $(locations.Location);
        return $(<Location i={position} of={this as never} />);
    }

    at(position: number): $Location<$Chapter> {
        return this.located<$Chapter>(position);
    }

    parts(): $Chapter[] {
        return this.$parts;
    }

    get entries(): $Reference<$Book>[] {
        return this.chapters.filter(c => {
            if (c instanceof $Synopsis && c.card !== undefined) return !this.accounts(c);
            try { return c.read() !== this; } catch { return false; }
        });
    }

    // A READING — the books this one catalogues, dereferenced. It is not a
    // chemical and stands for nothing in the library, which is why it is built
    // here rather than being a class.
    read(): $Composition<$Book> {
        const found = (): $Book[] => this.entries.map(r => r.read());
        const reading: $Composition<$Book> = {
            get canonical() { return found()[0]; },
            parts: found,
            where: match => found().filter(match),
            select: pick => found().map(pick),
            selectMany: pick => found().flatMap(pick),
            single: match => {
                const kept = found().filter(match);
                if (kept.length !== 1) throw new Error(`single expected exactly one part and found ${kept.length}.`);
                return kept[0];
            },
            at: position => this.located<$Book>(position),
            get copy() { return found().map(b => b.copy).join(' '); },
            valid: () => true,
            parenthetical: false,
        };
        return reading;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    where(match: (part: $Chapter) => boolean): $Chapter[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $Chapter) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: $Chapter) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: $Chapter) => boolean): $Chapter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    accounts(chapter: $Chapter): boolean {
        if (!(chapter instanceof $Synopsis)) return false;
        try {
            return chapter.read() === this;
        } catch {
            return false;
        }
    }

    $Book(...chapters: $Chapter[]) {
        this.$parts = chapters.map(c => $check(c, $Chapter));
        for (const chapter of this.$parts) chapter.$in = this;
        // A SYNOPSIS THAT ACCOUNTS FOR THIS BOOK IS NOT PART OF ITS COPY; one
        // that stands for ANOTHER book is what makes this book a catalogue. The
        // book knows which is which the moment it holds them, so it says so once
        // rather than leaving each synopsis to re-derive it on every read.
        for (const chapter of this.$parts) {
            if (chapter instanceof $Synopsis) chapter.parenthetical = !chapter.card || this.accounts(chapter);
        }
        const broken = this.structure().find(said => !said.holds);
        if (broken) throw new Error(broken.says);
    }

    // WHAT A BOOK IS, STATED ONCE AND READ TWICE. The bond raises on the first
    // of these that fails and valid() states them all; before, each was written
    // out in both places in different words, and one pair had already drifted.
    protected structure(): { holds: boolean; says: string }[] {
        return [
            { holds: this.chapters[0] instanceof $Cover, says: 'a book carries its cover at position zero, and this one does not' },
            { holds: !this.chapters.some((c, i) => i > 0 && c instanceof $Cover), says: 'a book carries exactly one cover, and this one carries more' },
            { holds: this.chapters.some(c => this.accounts(c)), says: 'a book carries a synopsis OF ITSELF — one whose reference comes home — and this one accounts only for other books' },
            { holds: this.chapters.filter(c => c instanceof $TableOfContents).length === 1, says: 'a book declares exactly one table of contents' },
            { holds: this.author !== undefined, says: 'a book carries its author on its cover, and this cover names none' },
            { holds: this.subject !== undefined, says: 'a book carries its subject on its cover, and this cover names none' },
            { holds: this.canonicals(this.cover).length <= 1, says: 'a subject declares exactly one canonical, and this cover carries more' },
        ];
    }

    get reading(): $Chapter[] {
        return this.chapters.filter(c => !c.parenthetical);
    }

    get contents(): $TableOfContents {
        return this.chapters.find((c): c is $TableOfContents => c instanceof $TableOfContents)!;
    }

    stands(): $Chapter[] {
        const open = this.contents?.open ?? this.reading[0];
        return open ? [open] : [];
    }

    $sheet = Sheet;
    $shelf = Shelf;
    $leaf = Leaf;
    $running = Running;
    $turning = Turning;
    $step = Step;

    environment(contents: ReactNode, theme: $Theme): ReactNode {
        const Bound = this.$sheet;
        return <Bound $theme={theme} data-book>{contents}</Bound>;
    }

    place(chapter: $Chapter, at: number, theme: $Theme): ReactNode {
        const Standing = $(chapter) as any;
        const Placed = this.$leaf;
        return (
            <Placed key={at} $theme={theme} id={chapter.address || undefined} data-chapter={at}>
                <Standing />
            </Placed>
        );
    }

    head(theme: $Theme): ReactNode {
        const listed = this.contents;
        if (!listed || this.stands()[0] === this.cover) return null;
        const title = this.title?.copy ?? '';
        if (!title) return null;
        const Head = this.$running;
        return (
            <Head $theme={theme} data-running href="#contents" onClick={event => { event.preventDefault(); listed.turn(listed as never); }}>
                {title}
            </Head>
        );
    }

    // The two words a turning speaks. `mark` was a parameter holding a WORD and
    // saying nothing about it; these say what they are and a book may replace them.
    get backward(): string { return 'previous'; }

    get forward(): string { return 'next'; }

    turning(theme: $Theme): ReactNode {
        const reading = this.reading;
        const listed = this.contents;
        const at = Math.max(0, reading.indexOf(this.stands()[0]));
        const named = (chapter: $Chapter | undefined) => chapter?.title?.copy ?? '';
        const Moving = this.$step;
        const step = (to: number, said: string, side: 'left' | 'right') => (
            <Moving
                $theme={theme}
                data-turn-to={to}
                $side={side}
                href={`#${reading[to]?.address ?? ''}`}
                onClick={event => { event.preventDefault(); if (listed) listed.turn(reading[to]); }}
            >
                <small>{said}</small>
                <span>{named(reading[to])}</span>
            </Moving>
        );
        if (reading.length < 2) return null;
        const Between = this.$turning;
        return (
            <Between $theme={theme} data-turning>
                {at > 0 ? step(at - 1, this.backward, 'left') : <span />}
                {at < reading.length - 1 ? step(at + 1, this.forward, 'right') : <span />}
            </Between>
        );
    }

    // A CATALOGUE IS CONSULTED, NOT READ, so the books this one catalogues are
    // all out at once and none of them waits its turn in the reading. A book
    // that catalogues nothing draws no shelf, which is how a reader says so.
    shelf(theme: $Theme): ReactNode {
        const held = this.entries;
        if (!held.length) return null;
        const Held = this.$shelf;
        return (
            <Held $theme={theme} data-entries={held.length}>
                {held.map((entry, at) => {
                    const Standing = $(entry) as never as React.ComponentType;
                    return <Standing key={at} />;
                })}
            </Held>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        const reading = this.reading;
        const standing = this.stands().map(c => this.place(c, reading.indexOf(c), theme));
        return this.environment(
            <>
                {this.head(theme)}
                {standing}
                {this.shelf(theme)}
                {this.turning(theme)}
            </>,
            theme
        );
    }

    valid(): boolean {
        // Every one is evaluated: a short-circuit in front of a $valid call is a
        // reason nobody hears.
        const structural = this.structure().map(said => $valid(said.holds, said.says));

        const of = this.pointed(this.author);
        const about = this.pointed(this.subject);
        const wrote = $valid(!of || this.pointed(of.author) === of, 'a book names an author that authors itself, and this one names a book somebody else wrote');
        const holds = $valid(!about || about.entries.length > 0, 'a book names a subject that catalogues other books, and this one names a book that catalogues nothing');

        return structural.every(Boolean) && wrote && holds;
    }
}

export class $$Book extends $Referent implements $Reference<$Book>, $Catalogue<$Book> {
    $name = '';
    $of?: () => $Book = undefined;

    parenthetical = false;

    // THE CATALOGUE HALF. What this card lists is what the book it stands for
    // catalogues — and a card's entries are other CARDS, which is why the
    // recursion opens nothing.
    $entries: $$Book[] = [];

    /** The card of the subject this one is filed under. A card's subject is
     *  another CARD, which is what lets the library be computed without opening
     *  anything. */
    $subject?: $$Book = undefined;

    get subject(): $$Book | undefined { return this.$subject; }

    // THE LIBRARY, COMPUTED CARD TO CARD. Itself where it is filed under itself,
    // otherwise its subject's — and the emitted catalogue writes the fixed point
    // (`library.$subject = library`), so the walk arrives rather than running on.
    // The seen-set is cycle detection rather than a bound: a hand-made catalogue
    // that loops answers `undefined` instead of hanging.
    get library(): $$Book | undefined {
        const seen = new Set<$$Book>();
        let at: $$Book | undefined = this;
        while (at && !seen.has(at)) {
            seen.add(at);
            const of: $$Book | undefined = at.subject;
            if (!of) return undefined;
            if (of === at) return at;
            at = of;
        }
        return undefined;
    }

    parts(): $$Book[] { return this.$entries; }

    get canonical(): $$Book { return this.parts()[0]; }

    where(match: (part: $$Book) => boolean): $$Book[] { return this.parts().filter(match); }

    select<U>(pick: (part: $$Book) => U): U[] { return this.parts().map(pick); }

    selectMany<U>(pick: (part: $$Book) => U[]): U[] { return this.parts().flatMap(pick); }

    single(match: (part: $$Book) => boolean): $$Book {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Book> {
        const Location = $(locations.Location);
        return $(<Location i={position} of={this as never} />);
    }


    constructor() {
        super();
        this.inline = false;
    }

    get name(): string { return this.$name; }

    // THE BOOK'S INTERFACE, REFLECTED. The same property names, with references
    // replaced by cards — which is what makes a card a book present without the
    // book rather than a hand-picked subset of one. A generated catalogue fills
    // these; the framework says which they are.
    $title = '';
    $subtitle = '';
    $author?: $$Book = undefined;
    $chapters: string[] = [];

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get author(): $$Book | undefined { return this.$author; }

    get chapters(): string[] { return this.$chapters; }

    /** What this book catalogues, as cards. A book answers this with the chapters
     *  that read away; a card carries the answer so nothing is opened. */
    get entries(): $$Book[] { return this.$entries; }

    get copy(): string { return this.properties().map(name => `${name}: ${this.written(name)}`).join(' '); }

    // WHAT A CARD IS, rather than what it CARRIES. A card gained a composition
    // when it became a reference form, and reflection cannot tell a structural
    // member from a field — so the structure is named here.
    protected get structure(): Set<string> {
        return new Set(['copy', 'canonical', 'structure', 'library', 'entries']);
    }

    properties(): string[] {
        const carried: string[] = [];
        const structure = this.structure;
        let proto = Object.getPrototypeOf(this);
        let reached = false;
        while (proto && !reached) {
            const keys = Object.getOwnPropertyNames(proto);
            const accessor = (key: string) => Object.getOwnPropertyDescriptor(proto, key)?.get !== undefined;
            const lifted = keys.some(key => key.startsWith('$') && accessor(key));
            if (!lifted) {
                reached = Object.prototype.hasOwnProperty.call(proto, 'properties');
                carried.unshift(...keys.filter(key => accessor(key) && !key.startsWith('$') && !structure.has(key) && !carried.includes(key)));
            }
            proto = Object.getPrototypeOf(proto);
        }
        return carried;
    }

    written(property: string): string {
        const value = (this as any)[property];
        if (value === undefined || value === null) return '';
        if (value instanceof $$Book) return value.name;
        if (value instanceof $Writing) return value.copy;
        if (Array.isArray(value)) return value.map(part => this.printed(part)).join(', ');
        return this.printed(value);
    }

    printed(value: unknown): string {
        if (value instanceof $$Book) return value.name;
        if (value instanceof $Writing) return value.copy;
        if (value && typeof value === 'object' && 'name' in value) return String((value as { name: unknown }).name);
        return String(value);
    }

    read(): $Book {
        const of = this.$of?.();
        if (!of) throw new Error(`The card for ${JSON.stringify(this.name)} stands for nothing — it never pointed.`);
        return of;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.name !== '';
    }
}

export const Book = $($Book);

export const Card = $($$Book);
