import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Cover, $TableOfContents, Paginated, Theme } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme~code.tsx';
import { RunningHead as runningHead } from './3-the-masthead-and-the-byline~code.tsx';
import { $Navigation, Front as front, Navigated as navigated } from './4-the-faces~code.tsx';

// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a
// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running
// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the
// front and in the table of contents.
export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Front = $(front);
        return (
            <>
                <RunningHead chapter={this.cover} />
                <Front chapter={this.cover} />
                {super.write()}
            </>
        );
    }

    protected override turn(): void {
        if (this.bookmark !== undefined && this.bookmark === this.cover) { window.scrollTo(0, 0); return; }
        super.turn();
    }

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Paginated />
        );
    }

    // EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the
    // chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that
    // already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of
    // contents and previous on the top and bottom of every chapter in the library."
    protected override $Bound(): void {
        const Navigated = $(navigated);
        for (const chapter of this.text.find($Chapter)) {
            // THE TABLE WEARS NO NAVIGATION, Doug, 2026-11-16, pressing the square and landing on the table's own
            // page: "WHAT IS THIS!!!" — the table of contents is the book's navigation and carries none of its own.
            if (chapter.is($Cover) || chapter.is($TableOfContents) || chapter.text.find($Navigation).length > 0) continue;
            chapter.annotations.add(this, <Navigated />);
            chapter.annotations.define();
        }
        super.$Bound();
    }
}

export const TheLibrary = $($TheLibrary);
$(TheLibrary, Theme)(LibraryTheme);
