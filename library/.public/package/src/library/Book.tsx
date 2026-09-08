import { ReactNode } from 'react';
import { $, $Block, $check, Component } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection, Section as section } from '@/writing/Section';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { Paragraph as paragraph } from '@/writing/Paragraph';
import { Ref as ref } from '@/reference/Ref';
import { $TypeOfChapter } from './Chapter';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfCover, Cover as cover } from './Cover';
import { $TypeOfSynopsis, Synopsis as synopsis } from './Synopsis';
import { $TypeOfTableOfContents, TableOfContents as table } from './TableOfContents';
import { $TypeOfIndex, Index as index } from './Index';
import { $TypeOfFooter, Footer as footer } from './Footer';
import { $TypeOfTheme, Theme as theme } from '@/formatting/Theme';

export interface $Book$ extends $Composition$ {
    cover: $Writing;
    synopsis: $Writing;
    table: $Writing;
    index: $Writing;
    footer: $Writing;
    readonly chapters: $Writing[];
}

export interface $$Book$ extends $Paragraph$ { }

export class $Book extends $Composition implements $Book$ {
    cover!: $Writing;
    synopsis!: $Writing;
    table!: $Writing;
    index!: $Writing;
    footer!: $Writing;

    get chapters(): $Writing[] {
        return this.searchFor($TypeOfChapter).filter(chapter =>
            chapter !== this.cover && chapter !== this.synopsis && chapter !== this.table && chapter !== this.index && chapter !== this.footer);
    }

    $Book(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfBook, '!')));
        this.cover = this.placed($TypeOfCover, cover);
        this.synopsis = this.placed($TypeOfSynopsis, synopsis, this.cover);
        this.table = this.searchForOne($TypeOfTableOfContents) ?? this.contents(this.synopsis);
        const chapters = this.chapters;
        this.index = this.placed($TypeOfIndex, index, chapters[chapters.length - 1] ?? this.table);
        this.footer = this.placed($TypeOfFooter, footer, this.index);
        this.placed($TypeOfTheme, theme, this.footer);
    }

    // A book type says what stands above its cover and below its footer without rewriting how a book draws.
    masthead(): ReactNode { return null; }
    colophon(): ReactNode { return null; }

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>{this.masthead()}{content}{this.colophon()}</div>;
    }

    protected contents(after?: $Writing): $Writing {
        const TableOfContents = $(table);
        const Section = $(section);
        const Heading = $(heading);
        const Paragraph = $(paragraph);
        const Ref = $(ref);
        const named = this.chapters
            .flatMap(chapter => chapter.searchFor<$Section>($TypeOfSection))
            .map(part => ({ name: html.text(part.searchForOne($TypeOfHeading)?._block), indent: part.$indent }))
            .filter(entry => entry.name !== '');
        const made = $(
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    {named.map((entry, at) => <Paragraph key={at} indent={entry.indent}><Ref>[{entry.name}](#{entry.name.replace(/\s+/gu, '_')})</Ref></Paragraph>)}
                </Section>
            </TableOfContents>,
            TableOfContents
        );
        return this.following(made, after);
    }

    protected placed<T extends $Writing>(type: new() => $Type, kind: Component<T>, after?: $Writing): T {
        const found = this.searchForOne<T>(type);
        if (found !== undefined) return found;
        return this.following($check(kind, '!'), after);
    }

    protected following<T extends $Writing>(made: T, after?: $Writing): T {
        const at = after === undefined ? 0 : this._block.elements.indexOf(after) + 1;
        this._block = this._block.filter((piece, was) => was < at).concat(made, this._block.filter((piece, was) => was >= at));
        return made;
    }
}

export class $$Book extends $Catalogue implements $$Book$ {
    $$Book(block: $Block) {
        super.$Catalogue($check(block, $Block, '!').concat($check($TypeOfParagraph, '!')).concat($check($TypeOf$Book, '!')));
    }
}

export class $TypeOfBook extends $Type {
    override name = 'Book';
    protected override specification: Specification<$Writing> = new BookSpecification();

    override below(): new() => $TypeOfChapter { return $TypeOfChapter; }
}

export class BookSpecification extends WritingSpecification {
    @specify('a book opens with its cover')
    $opensWithCover(writing: $Writing): void {
        $check(reflection.instanceOf(this.composed(writing)[0], $TypeOfCover),
            'a book opens with its cover, and this one opens with something else');
    }

    @specify('a book carries its synopsis second')
    $synopsisStandsSecond(writing: $Writing): void {
        $check(this.standing(writing, $TypeOfSynopsis, 1),
            'a book carries its synopsis second, and this one carries it elsewhere or not at all');
    }

    @specify('a book carries its table of contents third')
    $tableStandsThird(writing: $Writing): void {
        $check(this.standing(writing, $TypeOfTableOfContents, 2),
            'a book carries its table of contents third, and this one carries it elsewhere or not at all');
    }

    @specify('a book is drawn in one theme')
    $isDrawnInATheme(writing: $Writing): void {
        const worn = writing.searchFor($TypeOfTheme).length;
        $check(worn === 1, `a book is drawn in one theme, and this one is drawn in ${worn}`);
    }

    @specify('a book ends with its footer')
    $endsWithFooter(writing: $Writing): void {
        const parts = this.composed(writing);
        $check(reflection.instanceOf(parts[parts.length - 1], $TypeOfFooter),
            'a book ends with its footer, and this one ends with something else');
    }

    protected standing(writing: $Writing, kind: new() => $Type, place: number): boolean {
        return this.composed(writing).findIndex(part => reflection.instanceOf(part, kind)) === place;
    }
}

export class $TypeOf$Book extends $Type {
    override name = '$Book';
    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class $BookSpecification extends WritingSpecification {
}

export const Book = $($Book);
export const book = $($$Book);
export const TypeOf$Book = $($TypeOf$Book);
export const TypeOfBook = $($TypeOfBook);
