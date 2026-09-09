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
import { Paragraph as paragraph, $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { List as list } from '@/writing/List';
import { Item as item } from '@/writing/Item';
import { Ref as ref } from '@/reference/Ref';
import { $Document$, $Document, $TypeOfDocument } from './Document';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfCover, Cover as cover } from './Cover';
import { $TypeOfSynopsis, Synopsis as synopsis } from './Synopsis';
import { $TypeOfTableOfContents, TableOfContents as table } from './TableOfContents';
import { $TypeOfIndex, Index as index } from './Index';
import { $TypeOfFooter, Footer as footer } from './Footer';
import { $Theme, $TypeOfTheme, Theme as theme } from '@/formatting/Theme';

export interface $Book$ extends $Document$ {
    cover: $Writing;
    synopsis: $Writing;
    table: $Writing;
    index: $Writing;
    footer: $Writing;
    readonly documents: $Writing[];
}

export interface $$Book$ extends $Paragraph$ { }

// A BOOK IS A KIND OF DOCUMENT, which is where Doug put it: "have a document at the top of writing.
// We can't have it be book. And so I think chapter has to be a type of document and so does book, so
// we can add the book property to chapter." A document is the top of the WRITING ladder; a book and
// a chapter are both documents, and what makes them the second ladder is what they COMPOSE.
export class $Book extends $Document implements $Book$ {
    cover!: $Writing;
    synopsis!: $Writing;
    table!: $Writing;
    index!: $Writing;
    footer!: $Writing;

    get documents(): $Writing[] {
        return this.searchFor($TypeOfDocument).filter(document =>
            document !== this.cover && document !== this.synopsis && document !== this.table && document !== this.index && document !== this.footer);
    }

    $Book(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check($TypeOfBook, '!')));
        this.cover = this.placed($TypeOfCover, cover);
        this.synopsis = this.placed($TypeOfSynopsis, synopsis, this.cover);
        this.table = this.searchForOne($TypeOfTableOfContents) ?? this.contents(this.synopsis);
        const documents = this.documents;
        this.index = this.placed($TypeOfIndex, index, documents[documents.length - 1] ?? this.table);
        this.footer = this.placed($TypeOfFooter, footer, this.index);
        this.placed($TypeOfTheme, theme, this.footer);
    }

    // A book type says what stands above its cover and below its footer without rewriting how a book draws.
    masthead(): ReactNode { return null; }
    colophon(): ReactNode { return null; }

    // A BOOK SHOULD CHOOSE WHAT IT WEARS, AND TWICE IT COULD NOT — recorded rather than left as a
    // half-built member, because both failures are about the framework and not about the feature.
    //
    // A BOOK CANNOT KNOW ITS OWN SCOPE. $register registers a sheet for a COMPONENT, and
    // $(this.constructor) is not the component the tree was built from — measured, the toggle went
    // silent, the body stayed Latin Modern and all 64 numbers kept drawing, because the registration
    // landed on a component nothing renders. A chemical knows its class; it does not know the
    // component a caller fetched for it.
    //
    // AND AN INERT FIELD HOLDING A CLASS DID NOT COMPARE. `@inert() worn` was chosen because a class
    // on a REACTIVE field is answered wrapped by the membrane — identity meets an impostor — but
    // read back through wearing() it never equalled the sheet that had just been assigned. Neither
    // button read as chosen, before any click.
    //
    // So the demo keeps its own two lines for now and this stays a design owed.

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>{this.masthead()}{content}{this.colophon()}</div>;
    }

    protected contents(after?: $Writing): $Writing {
        const TableOfContents = $(table);
        const Section = $(section);
        const Heading = $(heading);
        const made = $(
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    {this.listed(this.documents)}
                </Section>
            </TableOfContents>,
            TableOfContents
        );
        return this.following(made, after);
    }

    // A CONTENTS IS THE SECTIONS A CHAPTER HOLDS, HOWEVER DEEPLY, and parts() answers exactly that.
    // It read searchFor before, which is ONE level, so a paper of nested sections listed only its
    // top ones — measured, a document of five sections across three levels listed two.
    //
    // AND IT IS A LIST OF LISTS. Doug, 2026-09-09, on seeing a flat run of paragraphs carrying an
    // indent number: "no! You nest them... that is fine stylistically, but I would remove it and
    // make it semantic. All you did was nullify the utility of the recursion I built." Exactly so —
    // the walk produces a TREE and the old reading flattened it to {name, indent}, throwing the
    // tree away and then paying to fake it back with a pd-indent class and three CSS rules. A
    // <ul> inside an <li> is the semantic form, the indentation is structural, and nested counters
    // number it without anything having to say how deep it is.
    protected listed(holders: $Writing[]): ReactNode {
        const List = $(list);
        const Item = $(item);
        const Ref = $(ref);
        // AN ENTRY CARRIES WHAT HOLDS WHAT IT NAMES, and the book does not have to understand it —
        // it passes on the classes that writing already writes. That is what lets a SHEET say the
        // apparatus is not numbered, in the contents, with the same :not() it uses in the document,
        // without $Book in the base ever hearing of an appendix or a bibliography.
        const parts = holders
            .flatMap(holder => holder instanceof $Composition ? holder.parts() : [])
            .filter(part => reflection.instanceOf(part, $TypeOfSection));
        // A SECTION WITH NEITHER A NAME NOR A NAMED SECTION UNDER IT IS NOT AN ENTRY. Written as a
        // map it made an EMPTY <li> for one, and the specification refused it exactly as it should
        // have — "a piece of writing says something, and this one says nothing at all".
        const entries = parts
            .map(part => ({
                name: html.text(part.searchForOne($TypeOfHeading)?._block),
                held: part.parent instanceof $Writing ? part.parent.className : '',
                under: this.listed([part])
            }))
            .filter(entry => entry.name !== '' || entry.under !== null);
        if (entries.length === 0) return null;
        return <List>
            {entries.map((entry, at) => <Item key={at} className={entry.held}>
                {entry.name === '' ? null : <Ref>[{entry.name}](#{entry.name.replace(/\s+/gu, '_')})</Ref>}
                {entry.under}
            </Item>)}
        </List>;
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

export class $TypeOfBook extends $TypeOfDocument {
    override name = 'Book';
    protected override specification: Specification<$Writing> = new BookSpecification();

    override below(): new() => $Type { return $TypeOfDocument; }
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
