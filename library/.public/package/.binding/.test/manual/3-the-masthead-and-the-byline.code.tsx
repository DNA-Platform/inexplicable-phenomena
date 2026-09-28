import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph, $Word, Means as means, Reference as reference, Word as word } from '@dna-platform/public';

// THE RUNNING HEAD: the library's name as a link to the library, then the book it stands in and a link
// to that book's table, read from its book alone — so a chapter that wears it never names its book,
// and a book renamed is followed with no edit. On the library's own page the library stands alone.
export class $RunningHead extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-running-head');
    }

    override write(): ReactNode {
        const book = this.$book;
        if (book === undefined) return null;
        const table = book.table?.canonical;
        const top = book.subject?.means?.identifier === book.title?.means?.identifier;
        const Means = $(means);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                {top ? null : <><Means>$[ The Library ]</Means> / </>}
                <Word>{book.title?.name}</Word>: <Word><Reference>{table?.means?.identifier}</Reference>{table?.name}</Word>
            </>
        );
    }
}

// THE BYLINE: who wrote the book and where it stands, each under a label, read from the book's cover
// alone — so a reader knows which link is the author and which is the subject.
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
        const book = this.$book;
        if (book === undefined) return null;
        const Label = $(label);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Label>Author</Label> <Word><Reference>{book.author?.means?.identifier}</Reference>{book.author?.name}</Word>
                <Label>Filed under</Label> <Word><Reference>{book.subject?.means?.identifier}</Reference>{book.subject?.name}</Word>
            </>
        );
    }
}

export const RunningHead = $($RunningHead);
export const Label = $($Label);
const label = Label;
export const Byline = $($Byline);
