import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Book, $Format, $Theme, Paragraph as paragraph, Reference as reference, Word as word } from '@dna-platform/public';
import { Navigable, RunningHead as runningHead } from './1-the-shelves.tsx.tsx';

// THE TEST LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a
// real library extends the library's — so a change to what a book is here reaches all five. It is
// the layout, and it draws what the book exposes of its cover: who wrote it and what it is filed under.
export default class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Paragraph = $(paragraph);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <RunningHead book={this} />
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
            <Navigable />,
            <LibraryTheme />
        );
    }
}

// AND ITS THEME: the library's own, a class under .public's Theme that sets two of the eight and nothing
// else, since the default sheet is the minimal viewing of a library and comprehends every class — Doug,
// 2026-09-27: "one puts their theme in the book"; and, 2026-09-25, "it is a format annotation that is also a
// theme that is global to a book."
export class $LibraryTheme extends $Theme {
    link = 'darkslateblue';
}

export const LibraryTheme = $($LibraryTheme);

// A FORMAT THAT WORKS IN DIFFERENT PLACES: a frame drawn from the theme's own values, stood by Some
// Projects on itself in its $Define and by the persona's book on each of its chapters at its bind — and
// in front of the theme where it stands beside one, since the front-most annotation draws innermost and a
// format reads the theme only from inside its provider. Doug, 2026-09-27: "Consider adding test formats
// for books and chapters, as annotations that work in different places, and maybe have them set in
// Define, and maybe all of them can work with the theme."
export class $Framed extends $Format {
    style = selection.div`
        border: 1px solid ${(props: { theme: { ink?: string } }) => props.theme.ink ?? 'currentColor'};
        padding: ${(props: { theme: { space?: string } }) => props.theme.space ?? '1rem'};
        margin-block: ${(props: { theme: { space?: string } }) => props.theme.space ?? '1rem'};
    `;
}

export const Framed = $($Framed);
