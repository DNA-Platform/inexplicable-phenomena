import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph, Means as means, Reference as reference, Word as word } from '@dna-platform/public';

// A RESOURCE OF THE FIRST CHAPTER: the library's name as a link to the library, which every book of
// the test library could wear, and then the book it stands in and a link to that book's table, read
// from its book alone — so a chapter that wears it never names its book, and a book renamed is
// followed with no edit to the chapter. Doug: "just have the book expose its cover, table,
// synopsis... and other things use it from there." It is the test library's own and faces no reader
// of `.public` — Doug: "that doesn't belong in the .public library. It can be a component of something
// not user facing."
export class $RunningHead extends $Paragraph {
    override write(): ReactNode {
        const book = this.$book;
        if (book === undefined) return null;
        const table = book.table?.canonical;
        const Means = $(means);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Means>$[ The Library ]</Means> / <Word>{book.title?.name}</Word>: <Word><Reference>{table?.reference?.identifier}</Reference>{table?.name}</Word>
            </>
        );
    }
}

export const RunningHead = $($RunningHead);
