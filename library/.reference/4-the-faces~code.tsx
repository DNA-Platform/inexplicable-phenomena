import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Cover, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, Means as means, Reference as reference, html } from '@dna-platform/public';

// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the synopsis and the imprint on a board of a
// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table
// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the
// cover already says, as the byline is. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it
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
export class $FrontSynopsis extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-synopsis'); }
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
        const Synopsis = $(frontSynopsis);
        const Imprint = $(frontImprint);
        const Means = $(means);
        const Reference = $(reference);
        const synopsis = book.synopsis?.text.find($Paragraph)[0];
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
                <Synopsis>{synopsis === undefined ? '' : html.copy(synopsis.text)}</Synopsis>
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
    override style = selection.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({ theme }) => theme.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `;
}

export class $LibraryTable extends $Table {
    override style = selection(this.style)`
        .pa-table { column-gap: ${({ theme }) => theme.space}; row-gap: calc(${({ theme }) => theme.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `;
}

export const Cover = $($LibraryCover);
export const Synopsis = $($LibrarySynopsis);
export const TableOfContents = $($LibraryTableOfContents);
export const Table = $($LibraryTable);
export const FrontName = $($FrontName);
export const FrontAuthor = $($FrontAuthor);
export const FrontSynopsis = $($FrontSynopsis);
export const FrontImprint = $($FrontImprint);
const frontName = FrontName;
const frontAuthor = FrontAuthor;
const frontSynopsis = FrontSynopsis;
const frontImprint = FrontImprint;
export const Front = $($Front);
