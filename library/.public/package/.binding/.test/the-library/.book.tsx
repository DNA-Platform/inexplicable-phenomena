import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Theme, Paragraph as paragraph, Reference as reference, Word as word } from '@dna-platform/public';

// THE TEST LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a
// real library extends the library's — so a change to what a book is here reaches all five. It is
// the layout, and it draws what the book exposes of its cover: who wrote it and what it is filed under.
export default class $TheLibrary extends $Book {
    override write(): ReactNode {
        const Paragraph = $(paragraph);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Paragraph>
                    by <Word><Reference>{this.author?.means?.identifier}</Reference>{this.author?.name}</Word>,
                    filed under <Word><Reference>{this.subject?.means?.identifier}</Reference>{this.subject?.name}</Word>
                </Paragraph>
                {super.write()}
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <LibraryTheme />
        );
    }
}

// AND ITS THEME: the library's own, a class under .public's Theme that sets two of the eight and nothing
// else, since the default sheet is the minimal viewing of a library and comprehends every class — Doug,
// 2026-09-27: "one puts their theme in the book"; and, 2026-09-25, "it is a format annotation that is also a
// theme that is global to a book."
export class $LibraryTheme extends $Theme {
    paper = 'ivory';
    link = 'darkslateblue';
}

export const LibraryTheme = $($LibraryTheme);
