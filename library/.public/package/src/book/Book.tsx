import { ReactNode } from 'react';
import { $, $Block, $check, Component } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Section, $TypeOfSection, Section as section } from '@/writing/Section';
import { Heading as heading } from '@/writing/Heading';
import { Paragraph as paragraph } from '@/writing/Paragraph';
import { Ref as ref } from '@/reference/Ref';
import { $TypeOfChapter } from './Chapter';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfCover, Cover as cover } from './Cover';
import { $TypeOfSynopsis, Synopsis as synopsis } from './Synopsis';
import { $TypeOfTableOfContents, TableOfContents as table } from './TableOfContents';
import { $TypeOfIndex, Index as index } from './Index';
import { BodyFormat as body } from '@/encyclopedia/BodyFormat';
import { HeaderFormat as header } from '@/encyclopedia/HeaderFormat';
import { SidebarFormat as sidebar } from '@/encyclopedia/SidebarFormat';
import { ContentFormat as content } from '@/encyclopedia/ContentFormat';
import { FooterFormat as footer } from '@/encyclopedia/FooterFormat';

export interface $Book$ extends $Composition$ {
    cover: $Writing;
    synopsis: $Writing;
    table: $Writing;
    index: $Writing;
    readonly chapters: $Writing[];
}

export interface $$Book$ extends $Paragraph$ { }

export class $Book extends $Composition implements $Book$ {
    _opening!: $Block;
    _contents!: $Block;
    _body!: $Block;
    _closing!: $Block;
    cover!: $Writing;
    synopsis!: $Writing;
    table!: $Writing;
    index!: $Writing;

    get chapters(): $Writing[] {
        return this.searchFor($TypeOfChapter).filter(chapter =>
            chapter !== this.cover && chapter !== this.synopsis && chapter !== this.table && chapter !== this.index);
    }

    $Book(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfBook);
        this.cover = this.placed($TypeOfCover, cover);
        this.synopsis = this.placed($TypeOfSynopsis, synopsis);
        this.table = this.searchForOne($TypeOfTableOfContents) ?? this.contents();
        this.index = this.placed($TypeOfIndex, index);
        const chapters = this.chapters;
        this._opening = this._block.filter(piece => piece === this.cover || piece === this.synopsis);
        this._contents = this._block.filter(piece => piece === this.table);
        this._body = this._block.filter(piece => piece instanceof $Writing && chapters.includes(piece));
        this._closing = this._block.filter(piece => piece === this.index);
    }

    override view(): ReactNode {
        const Header = $(header);
        const Sidebar = $(sidebar);
        const Content = $(content);
        const Footer = $(footer);
        const Opening = $(this._opening);
        const Contents = $(this._contents);
        const Chapters = $(this._body);
        const Closing = $(this._closing);

        return (
            <>
                <Header><Opening /></Header>
                <Sidebar><Contents /></Sidebar>
                <Content><Chapters /></Content>
                <Footer><Closing /></Footer>
            </>
        );
    }

    override frame(): ReactNode {
        const Body = $(body);

        return <Body>{super.frame()}</Body>;
    }

    protected contents(): $Writing {
        const TableOfContents = $(table);
        const Section = $(section);
        const Heading = $(heading);
        const Paragraph = $(paragraph);
        const Ref = $(ref);
        const named = this.chapters.map(chapter => html.text(chapter.searchFor<$Section>($TypeOfSection)[0]?.heading()?._block)).filter(name => name !== '');
        const made = $(
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    {named.map((name, at) => <Paragraph key={at}><Ref>[{name}](#{name.replace(/\s+/gu, '_')})</Ref></Paragraph>)}
                </Section>
            </TableOfContents>,
            TableOfContents
        );
        this._block = this._block.concat(made);
        return made;
    }

    protected placed<T extends $Writing>(type: new() => $Type, kind: Component<T>): T {
        const found = this.searchForOne<T>(type);
        if (found !== undefined) return found;
        const made = $check(kind, '!');
        this._block = this._block.concat(made);
        return made;
    }
}

export class $$Book extends $Composition implements $$Book$ {
    $$Book(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfParagraph);
        this.addType($TypeOf$Book);
    }
}

export class $TypeOfBook extends $Type {
    override name = 'Book';
    protected override specification: Specification<$Writing> = new BookSpecification();

    override below(): new() => $TypeOfChapter { return $TypeOfChapter; }
}

export class BookSpecification extends WritingSpecification {
    @specify('a book is written in chapters')
    $writtenInChapters(writing: $Writing): void {
        $check(this.composed(writing).every(part => reflection.instanceOf(part, $TypeOfChapter)),
            'a book is written in chapters, and this one holds something else');
    }

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

    @specify('a book ends with its index')
    $endsWithIndex(writing: $Writing): void {
        const parts = this.composed(writing);
        $check(reflection.instanceOf(parts[parts.length - 1], $TypeOfIndex),
            'a book ends with its index, and this one ends with something else');
    }

    protected standing(writing: $Writing, kind: new() => $Type, place: number): boolean {
        return this.composed(writing).findIndex(part => reflection.instanceOf(part, kind)) === place;
    }
}

export class $TypeOf$Book extends $TypeOfReference {
    override name = '$Book';
    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class $BookSpecification extends ReferenceSpecification {
}

export const Book = $($Book);
export const book = $($$Book);
export const TypeOf$Book = $($TypeOf$Book);
export const TypeOfBook = $($TypeOfBook);
