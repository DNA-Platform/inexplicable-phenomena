import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph, $Word, Means as means, Reference as reference, Word as word } from '@dna-platform/public';

export class $RunningHead extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-running-head');
    }

    // THE MINIMAL HEADING, Doug, 2026-11-16: "a minimal heading, at least with the book title and if you click it
    // it should go to the table of contents except the version on the table and that one takes you to the cover" —
    // just the book's title, both destinations bound, the theme showing the one the open page calls for.
    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const table = book.table?.canonical;
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <span className="pd-to-table">
                    <Word>
                        <Reference>{table?.means?.identifier}</Reference>
                        {book.title?.name}
                    </Word>
                </span>
                <span className="pd-to-cover">
                    <Word>
                        <Reference>{book.means?.identifier}</Reference>
                        ☐
                    </Word>
                </span>
            </>
        );
    }
}

export class $Label extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-label');
    }
}

export class $Byline extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-byline');
    }

    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const Label = $(label);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Label>Author</Label> <Word>
                    <Reference>{book.author?.means?.identifier}</Reference>
                    {book.author?.name}
                </Word>
                {book.about === undefined ? null : <>
                    <Label>About</Label> <Word>
                        <Reference>{book.about.means?.identifier}</Reference>
                        {book.about.name}
                    </Word>
                </>}
                <Label>Subject</Label> <Word>
                    <Reference>{book.subject?.means?.identifier}</Reference>
                    {book.subject?.name}
                </Word>
            </>
        );
    }
}

export const RunningHead = $($RunningHead);
export const Label = $($Label);
const label = Label;
export const Byline = $($Byline);
