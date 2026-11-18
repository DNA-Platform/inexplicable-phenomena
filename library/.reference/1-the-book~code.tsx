import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Cover, $Paragraph, $Section, $TableOfContents, Paginated, Theme } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme~code.tsx';
import { RunningHead as runningHead } from './3-the-running-head-and-the-byline~code.tsx';
import { $Navigation, Front as front, Navigated as navigated } from './4-the-faces~code.tsx';
import { $Branch, Branch as branch, Editor, FilePage as filePage, PageMode } from './7-the-reference-manual~code.tsx';

// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a
// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running
// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the
// front and in the table of contents.
export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Front = $(front);
        const FilePage = $(filePage);
        return (
            <>
                <RunningHead chapter={this.cover} />
                <Front chapter={this.cover} />
                {super.write()}
                <FilePage chapter={this.cover} />
            </>
        );
    }

    // A PAGE OPENS AT ITS TOP, Doug, 2026-11-16: "We need pages to open at the top... not scrolled down" — a
    // turn lands on the page's top with the running head in view, never past it.
    protected override turn(): void {
        window.scrollTo(0, 0);
    }

    // EVERY BOOK HAS THE EDITOR AND OPENS ON THE PAGE, Sprint 131, Doug, 2026-11-17: "Reference manuals should
    // default to full but maybe appendix authors can choose?" — the editor stands before Paginated so its layer is the
    // book's nearest and the grid reaches the chapters; the page is the default, and a manual's own class says the
    // editor after this, which suppresses it.
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Editor />,
            <Paginated />,
            <PageMode />
        );
    }

    // EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the
    // chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that
    // already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of
    // contents and previous on the top and bottom of every chapter in the library."
    protected override $Bound(): void {
        const Navigated = $(navigated);
        const Branch = $(branch);
        // EVERY ENTRY OF THE TABLE IS A BRANCH, Sprint 131: the table is the editor's tree, each row's files hung
        // beneath it as leaves; the branch reads the chapter the row means and draws nothing for a row with none.
        for (const section of this.table?.text.find($Section) ?? [])
            for (const entry of section.text.find($Paragraph))
                if (entry.annotations.expressed($Branch) === undefined) entry.annotations.append(this, <Branch />);
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
