import { ElementType, ReactNode } from 'react';
import { $, $check, selection } from '@dna-platform/chemistry';
import { $Annotation, $Chapter, $Cover, $Format, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, $Writing, AnnotationSpecification, Means as means, Next as nextWord, Previous as previousWord, Reference as reference, Word as word, html, specify } from '@dna-platform/public';

// A TAGLINE IS ONE LINE OF WHAT THE BOOK IS, said of a cover as its author and its subject are, written in the cover
// file and drawn on the front; the synopsis is the block, and has its own page. Doug, 2026-11-12, Sprint 127: "You
// can add a one line note about what the book is. That would be a tagline, but an extensive block is a synopsis".
// PROXY name.
export class $Tagline extends $Annotation {
    specification = new TaglineSpecification();
    get line(): string { return html.copy(this.text); }
    override write(): ReactNode { return this.line; }
}
export class TaglineSpecification extends AnnotationSpecification {
    @specify('a tagline is said of a cover')
    $saidOfACover(writing: $Writing): void {
        $check(writing instanceof $Chapter && writing.is($Cover), 'a tagline is said of a cover, and this is not one');
    }
}

// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the tagline and the imprint on a board of a
// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table
// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the
// cover already says, as the byline is. The synopsis's first paragraph stood on the board until 2026-11-12,
// Sprint 127, Doug: "get rid of the big wad of text on the cover... those notes are the synopsis, and they aren't
// bad, but then use the synopsis page"; the synopsis is its own chapter, reached from the table, and the tagline
// took its place on the board the same day. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it
// should have the author and subject on the cover and not have the header", and on the first build, "various things
// should be clickable on the cover - author, subject and getting to the table", and "I don't like this 'Filed under'
// because that isn't about a subject", so the imprint names the subject plainly. Sketch 004 of the design book,
// form a. PROXY names: Front and its four words.
export class $FrontName extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-name'); }
}
export class $FrontAuthor extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-author'); }
}
export class $FrontTagline extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-tagline'); }
}
export class $FrontImprint extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-imprint'); }
}

export class $Front extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-front');
    }

    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const Name = $(frontName);
        const Author = $(frontAuthor);
        const Tagline = $(frontTagline);
        const Imprint = $(frontImprint);
        const Means = $(means);
        const Reference = $(reference);
        const tagline = book.cover?.annotations.expressed($Tagline);
        // THE TABLE'S ADDRESS IS ITS TITLE'S, as the running head reads it: a chapter's means is the means its title
        // carries, and the table chapter itself carries none.
        const table = book.table?.canonical;
        return (
            <>
                <Name>
                    <Reference>{table?.means?.identifier}</Reference>
                    {book.title?.name}
                </Name>
                <Author>
                    <Reference>{book.author?.means?.identifier}</Reference>
                    {book.author?.name}
                </Author>
                {tagline === undefined ? null : <Tagline>{tagline.line}</Tagline>}
                <Imprint>
                    <Reference>{book.subject?.means?.identifier}</Reference>
                    {book.subject?.name}
                </Imprint>
                <Imprint>
                    <Means>$[[ Inexplicable Phenomena ]]</Means>
                </Imprint>
            </>
        );
    }
}

// THE NAVIGATION, Doug, 2026-11-16: "You need next and table of contents and previous on the top and bottom of
// every chapter in the library. We need to be able to move easily." One line of apparatus in the running head's
// register: the previous chapter's title on the left, Contents in the middle on the table's address, the next
// chapter's title on the right; an edge with no neighbour keeps its place empty so the line holds. Written into
// a chapter for now; the seam that puts it on every chapter of the library awaits his word on the layer.
// PROXY name. Styled by the theme as pd-navigation.
export class $Navigation extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-navigation');
    }

    // THE WORDS ARE MADE AT THE BOND, not in write(): Previous and Next take their references in their own bond,
    // and the bond reaches only the authored tree, so a word made at render stood on the page as plain text, seen
    // on the bound textbook page on 2026-11-16, Contents the only link of the three. At an edge the package
    // answers the chapter itself, never nothing, and Next means it as a Self; the theme keeps that edge's place
    // and hides it.
    protected override $Bound(): void {
        const chapter = this.chapter;
        const book = this.book;
        if (chapter !== undefined && book !== undefined && [...this.text].length === 0) {
            const Previous = $(previousWord);
            const Next = $(nextWord);
            const Word = $(word);
            const Reference = $(reference);
            const table = book.table?.canonical;
            // THREE CHARACTERS IN A ROW, Doug, 2026-11-16, after the buttons were refused: "Not a button!! I
            // wanted in three characters a left triangle (not arrow) and then a square in the middle that goes
            // to table, then the right arrow as a triangle. Three characters in a row like the arrow we use in
            // catalogues to go straight to a book", and on sight: "ALL WHITE OUTLINE characters!! Just three
            // characters. left triangle square (not filled in!!!) right arrow. Grey it but don't hide it. Don't
            // make it take up the whole line" — ◁ □ ▷, outline glyphs, solid grey, a cluster of their own width.
            // LSR, Doug, 2026-11-16: "Three characters. Up against each other. Spaced like in text. Same height.
            // White with outline. Two triangles and a square. The ones we use in cataloguing pages and we used to
            // use in my library for a canonical reference." — and, on the plain square inking 8px against the
            // triangles' 13, "Not the same size!!", and on the rounded ▢, "It has rounded edges. Pretty sure
            // there is a character. But all three have to match": measured in Chrome, ☐ inks 12×13 at ascent 12
            // with sharp corners — the triangles' own metrics — so the trio is ◁ ☐ ▷, typed tight at text size;
            // no edge is ever hidden.
            this.text.add(this,
                <Previous>◁</Previous>,
                <Word>
                    <Reference>{table?.means?.identifier}</Reference>
                    ☐
                </Word>,
                <Next>▷</Next>
            );
        }
        super.$Bound();
    }
}

// NAVIGATED, said of a chapter by its book, the seam of 2026-11-16: a format whose layer wraps the chapter's
// element with the navigation above it and below it. The two lines are the format's own text, so the chapter's
// bond reaches them and their words take their links; the layer draws those two instances and makes nothing at
// render. A format's layer stands outside the chapter's element, which Paginated hides by a class on the element
// itself, so the layer hides itself whenever its page is not the open one. The book says it of every chapter but
// the cover, whose page is the front, and leaves alone a chapter that already says Navigation in its own text.
// PROXY name; reads "this chapter is Navigated".
export class $Navigated extends $Format {
    specification = new NavigatedSpecification();
    protected _layer?: ElementType;
    override style = selection.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `;

    protected override $Define(): void {
        super.$Define();
        const Navigation = $(navigation);
        this.text.add(this,
            <Navigation />,
            <Navigation />
        );
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-navigated');
        writing.containers.add(this, this.layer);
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
        writing.classes.revert(this);
    }

    protected get layer(): ElementType {
        if (this._layer !== undefined) return this._layer;
        const Style = this.style as ElementType;
        const [above, below] = [...this.text];
        const Above = $(above);
        const Below = $(below);
        return this._layer = ({ className, children }: { className?: string; children?: ReactNode }) => (
            <Style className={className}>
                <Above />
                {children}
                <Below />
            </Style>
        );
    }
}

export class NavigatedSpecification extends AnnotationSpecification {
    @specify('navigated is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'navigated is said of a chapter, and this is not one');
    }
}

export class $LibraryCover extends $Cover {
    override style = selection.header`
        .pd-chapter.pa-cover { margin-block: ${({ theme }) => theme.space} calc(2 * ${({ theme }) => theme.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({ theme }) => theme.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `;
}

export class $LibrarySynopsis extends $Synopsis {
    style = selection.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `;
}

export class $LibraryTableOfContents extends $TableOfContents {

    // ONE VOICE FOR THE TABLE, Doug, 2026-11-19: "Your headings are smaller and different font than the links and the
    // links are blue which maybe isn't right?... I like subtlety in design and thoughtful choices about saliency,
    // accent, comfort on the eyes" — the headings in the text's own voice at its size, bold in the theme's slate,
    // and every row in ink: a list that is all links says nothing by colouring each one. Chosen from the sketch's
    // form d, "one row, headed", the same day.
    override style = selection.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading { font-size: 1em; font-weight: bold; color: ${({ theme }) => theme.slate}; margin-block: ${({ theme }) => theme.space} calc(${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-section > .pd-heading { margin-block-start: 0; }
        .pa-table-of-contents .pd-paragraph.pa-reference, .pa-table-of-contents .pd-paragraph .pa-reference, .pa-table-of-contents .pd-paragraph .pa-content { color: ${({ theme }) => theme.ink}; }
    `;
}

export class $LibraryTable extends $Table {
    override style = selection(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({ theme }) => theme.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({ theme }) => theme.space} / 3) calc(0.75 * ${({ theme }) => theme.space}) calc(${({ theme }) => theme.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 15%, ${({ theme }) => theme.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({ theme }) => theme.ink} 35%, ${({ theme }) => theme.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 15%, ${({ theme }) => theme.paper}); }
    `;
}

export const Cover = $($LibraryCover);
export const Synopsis = $($LibrarySynopsis);
export const TableOfContents = $($LibraryTableOfContents);
export const Table = $($LibraryTable);
export const FrontName = $($FrontName);
export const FrontAuthor = $($FrontAuthor);
export const FrontTagline = $($FrontTagline);
export const FrontImprint = $($FrontImprint);
export const Tagline = $($Tagline);
const frontName = FrontName;
const frontAuthor = FrontAuthor;
const frontTagline = FrontTagline;
const frontImprint = FrontImprint;
export const Front = $($Front);
export const Navigation = $($Navigation);
const navigation = Navigation;
export const Navigated = $($Navigated);
