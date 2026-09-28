import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme.code.tsx';
import { Byline as byline, RunningHead as runningHead } from './3-the-masthead-and-the-byline.code.tsx';
import { Navigable } from './5-the-faces.code.tsx';

// THE LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a real
// library extends the library's — so a change to what a book is here reaches all of them. It is the
// layout: the masthead, then the byline drawn from what the book exposes of its cover, then the
// chapters; and it stands the library's dress and its theme on itself as defaults.
export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Byline = $(byline);
        return (
            <>
                <RunningHead book={this} />
                <Byline book={this} />
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

    // THE COVER'S ROUTE OPENS AT THE TOP OF THE PAGE, masthead and byline in view, rather than at the
    // cover's title as the framework turns by default; every other bookmark turns as the framework
    // does. A book's turning is the book's to configure.
    protected override turn(): void {
        if (this.bookmark !== undefined && this.bookmark === this.cover) { window.scrollTo(0, 0); return; }
        super.turn();
    }
}

export const TheLibrary = $($TheLibrary);
