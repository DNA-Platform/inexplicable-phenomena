import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme.code.tsx';
import { Byline as byline, RunningHead as runningHead } from './3-the-masthead-and-the-byline.code.tsx';
import { Navigable } from './5-the-faces.code.tsx';

export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Byline = $(byline);
        return (
            <>
                <RunningHead chapter={this.cover} />
                <Byline chapter={this.cover} />
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

    protected override turn(): void {
        if (this.bookmark !== undefined && this.bookmark === this.cover) { window.scrollTo(0, 0); return; }
        super.turn();
    }
}

export const TheLibrary = $($TheLibrary);
