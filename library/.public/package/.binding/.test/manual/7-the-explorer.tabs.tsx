import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, $Paragraph, Reference as reference, Word as word } from '@dna-platform/public';
import { $Tabbed } from './7-the-explorer.paging.tsx';

export class $Tabs extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-tabs');
    }

    override write(): ReactNode {
        const book = this.$book;
        const open = book?.annotations.expressed($Tabbed)?.open;
        if (book === undefined) return null;
        const opened = book.text.find($Chapter).filter(chapter => [...chapter.classes].includes('pa-opened'));
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                {opened.map(chapter => (
                    <Word key={chapter.mention?.identifier}>
                        <Reference>{chapter.mention?.identifier}</Reference>
                        <span className={chapter === open ? 'pd-tab pa-active' : 'pd-tab'}>{chapter.title?.name}</span>
                    </Word>
                ))}
            </>
        );
    }
}

export const Tabs = $($Tabs);
