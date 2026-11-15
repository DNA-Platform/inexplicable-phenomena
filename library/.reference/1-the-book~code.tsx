import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Cover, Paginated, Theme } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme~code.tsx';
import { Byline as byline, RunningHead as runningHead } from './3-the-masthead-and-the-byline~code.tsx';
import { $Navigation, Front as front, Navigated as navigated } from './4-the-faces~code.tsx';

export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Byline = $(byline);
        const Front = $(front);
        return (
            <>
                <RunningHead chapter={this.cover} />
                <Byline chapter={this.cover} />
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
            if (chapter.is($Cover) || chapter.text.find($Navigation).length > 0) continue;
            chapter.annotations.add(this, <Navigated />);
            chapter.annotations.define();
        }
        super.$Bound();
    }
}

export const TheLibrary = $($TheLibrary);
$(TheLibrary, Theme)(LibraryTheme);
