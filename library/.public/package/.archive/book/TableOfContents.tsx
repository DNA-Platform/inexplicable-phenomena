import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as paths from '../reference/Path';
import { $Chapter, $$Chapter } from './Chapter';
import { $Title } from '../writing/Title';
import * as titles from '../writing/Title';
import { $Cover } from './Cover';
import { $Section } from '../writing/Section';
import { $Book } from './Book';
import { $$Book } from './Book';
import { $Theme } from '../writing/Theme';
import { styled } from 'styled-components';

export const Contents = styled.nav<{ $theme: $Theme }>`
    padding: ${p => p.$theme.step(-1)} 0;
    border-top: 1px solid ${p => p.$theme.rule};
    border-bottom: 1px solid ${p => p.$theme.rule};
    font-size: ${p => p.$theme.step(-1)};

    ol { list-style: none; margin: 0; padding: 0; }
    li { display: flex; gap: 0.6em; padding: 0.3em 0; }
    li > span { color: ${p => p.$theme.faint}; min-width: 1.2em; }
`;

export const Heading = styled.h2<{ $theme: $Theme }>`
    margin: 0 0 ${p => p.$theme.step(-1)};
    font-size: ${p => p.$theme.step(1)};
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${p => p.$theme.ink};
`;

export const Row = styled.a<{ $open: boolean; $theme: $Theme }>`
    color: ${p => (p.$open ? p.$theme.ink : p.$theme.accent)};
    text-decoration: none;
    cursor: pointer;
    border-bottom: ${p => (p.$open ? `1px solid ${p.$theme.rule}` : 'none')};

    &:hover { text-decoration: underline; text-underline-offset: 0.15em; }
`;

export class $TableOfContents extends $Chapter implements $Catalogue<$Chapter> {
    $open?: $Chapter = undefined;

    $contents = Contents;
    $heading = Heading;
    $row = Row;

    // THE FRAMEWORK DOES NOT SPEAK ENGLISH. A contents with no section naming
    // it falls back to this, and a book that wants another word overrides it.
    get names(): string {
        return 'Table of Contents';
    }

    // IT CANNOT DELEGATE TO canonical, AND THAT IS THE FINDING. A contents
    // overrides parts() to mean its ENTRIES rather than its sections, so every
    // member it inherits from $Document reads the wrong composition —
    // $Document.canonical picks the first SECTION and on a contents it picks the
    // first chapter reference, which titles the contents after its first
    // chapter. So this reads its own sections, and the duplication stands until
    // the contents stops being a chapter whose parts are of another kind.
    get title(): $Title {
        const authored = this.$parts.find(s => !s.parenthetical)?.heading ?? '';
        const Title = $(titles.Title);
        return $(<Title>{authored || this.names}</Title>) as $Title;
    }

    get summary(): $Section | undefined {
        const cover = (this.book as $Book | undefined)?.cover;
        return cover instanceof $Cover ? cover.summary : undefined;
    }

    get cover(): $Cover | undefined {
        const cover = (this.book as $Book | undefined)?.cover;
        return cover instanceof $Cover ? cover : undefined;
    }

    get canonical(): $$Chapter { return this.parts()[0]; }

    get chapters(): $Chapter[] {
        return this.parts().map(r => r.read()).filter((c): c is $Chapter => c !== undefined);
    }

    parts(): $$Chapter[] {
        const book = this.book;
        if (!(book instanceof $Book)) throw new Error(`The table of contents stands under ${String((book as { constructor?: { name?: string } })?.constructor?.name)} instead of a book, with parent ${String((this.parent as { constructor?: { name?: string } })?.constructor?.name)}.`);
        return book.parts()
            .filter(chapter => chapter !== this && !(chapter instanceof $Cover) && !chapter.parenthetical)
            .map(chapter => chapter.ref);
    }

    where(match: (part: $$Chapter) => boolean): $$Chapter[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $$Chapter) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: $$Chapter) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: $$Chapter) => boolean): $$Chapter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Chapter> {
        return this.located<$$Chapter>(position);
    }

    read(): $Book {
        if (!this.cover) throw new Error('The table of contents stands outside any book.');
        return this.cover.read();
    }

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    // A CONTENTS DECLARES NO SECTIONS OF ITS OWN, so it is not harvested for
    // any. $Document harvests by CALLING view() at bond time, and a contents'
    // view asks its book for chapters — which it does not have yet. That is what
    // the try/catch here was really swallowing; the summary it named was never
    // the reason.
    override declaration(): $Section[] { return []; }

    // And it requires nothing of its own: its summary is its book's cover's.
    protected override requires(): void {}

    valid(): boolean {
        if (!this.cover) return this.$parts.length === 0;
        return super.valid();
    }

    get open(): $Chapter | undefined {
        const book = this.book as $Book | undefined;
        if (!book) return undefined;
        const reading = book.reading;
        return this.$open && reading.includes(this.$open) ? this.$open : reading[0];
    }

    turn(to: $Chapter): void {
        this.$open = to;
    }

    row(entry: $$Chapter, at: number, theme: $Theme): ReactNode {
        const Turn = this.$row;
        const chapter = entry.of;
        const open = this.open === chapter;
        const held = chapter as $Chapter & { card?: $$Book; standsFor?: boolean };
        const named = entry.copy;
        return (
            <>
                <Turn
                    $theme={theme}
                    href={`#${chapter.address}`}
                    data-turn={at}
                    $open={open}
                    aria-current={open ? 'true' : undefined}
                    onClick={event => { event.preventDefault(); this.turn(chapter); }}
                >
                    {named}
                </Turn>
                {held.standsFor && held.card ? (
                    <Turn $theme={theme} href={held.card.name} data-entry={held.card.name} data-link={held.card.name} $open={false}>
                        {'→'}
                    </Turn>
                ) : null}
            </>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        const Named = this.$heading;
        const Listed = this.$contents;
        return (
            <>
            <Named $theme={theme}>{text(this.title.text)}</Named>
            <Listed $theme={theme} data-contents>
                <ol>
                    {this.parts().map((entry, at) => (
                        <li key={at}>
                            <span>{at + 1}</span>
                            {this.row(entry, at, theme)}
                        </li>
                    ))}
                </ol>
            </Listed>
            </>
        );
    }
}

export const TableOfContents = $($TableOfContents);
