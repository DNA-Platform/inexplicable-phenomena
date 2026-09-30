import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $TheLibrary } from './1-the-book.code.tsx';
import { ManualTheme } from './7-the-explorer.theme.tsx';
import { Tabbed } from './7-the-explorer.paging.tsx';
import { Explorer } from './7-the-explorer.layout.tsx';
import { Tabs as tabs } from './7-the-explorer.tabs.tsx';

export default class $TheManual extends $TheLibrary {
    override write(): ReactNode {
        const Tabs = $(tabs);
        return (
            <>
                {super.write()}
                <Tabs chapter={this.cover} />
            </>
        );
    }

    protected override turn(): void { }

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <ManualTheme />
        );
        this.annotations.add(this,
            <Tabbed />,
            <Explorer />
        );
    }
}

export * from './1-the-book.code.tsx';
export * from './2-the-theme.code.tsx';
export * from './3-the-masthead-and-the-byline.code.tsx';
export * from './4-the-catchword.code.tsx';
export * from './5-the-faces.code.tsx';
export * from './7-the-explorer.appendix.tsx';
export * from './7-the-explorer.paging.tsx';
export * from './7-the-explorer.layout.tsx';
export * from './7-the-explorer.tree.tsx';
export * from './7-the-explorer.tabs.tsx';
export * from './7-the-explorer.theme.tsx';
