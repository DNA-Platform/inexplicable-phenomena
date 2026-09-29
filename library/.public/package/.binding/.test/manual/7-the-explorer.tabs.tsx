import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Chapter, $Format, $Paragraph, $Section, $Writing, Reference as reference, Word as word } from '@dna-platform/public';
import { $Appendix } from './7-the-explorer.appendix.tsx';
import { $Tabbed } from './7-the-explorer.paging.tsx';
import { $Explorer } from './7-the-explorer.layout.tsx';

export class $Close extends $Format {
    $chapter?: $Chapter;
    $appendix?: $Section;

    $Close(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this.style = (props: { className?: string; children?: ReactNode }) => {
            const book = this.$book;
            const explorer = book?.annotations.expressed($Explorer);
            const tabbed = book?.annotations.expressed($Tabbed);
            const chapter = this.$chapter;
            if (book === undefined || explorer === undefined || tabbed === undefined || chapter === undefined) return <span {...props} />;
            const appendix = this.$appendix;
            const reading = $Appendix.of(chapter).find(each => [...each.classes].includes('pa-open'));
            const active = appendix === undefined ? tabbed.open === chapter : reading === appendix;
            const opened = book.text.find($Chapter).filter(each => [...each.classes].includes('pa-opened'));
            const index = opened.indexOf(chapter);
            const neighbour = (opened[index - 1] ?? opened[index + 1] ?? book.cover)?.mention?.identifier;
            const to = appendix === undefined ? neighbour : chapter.mention?.identifier;
            const taken = (): void => {
                if (appendix !== undefined) { appendix.classes.revert(explorer); appendix.classes.revert(tabbed); return; }
                chapter.classes.revert(explorer);
                for (const each of $Appendix.of(chapter)) { each.classes.revert(explorer); each.classes.revert(tabbed); }
            };
            return <a {...props} href={active ? to : book.$bookmark} onClick={event => { taken(); if (!active) event.preventDefault(); }} />;
        };
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-close');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export class $Tabs extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-tabs');
    }

    override write(): ReactNode {
        const book = this.$book;
        const tabbed = book?.annotations.expressed($Tabbed);
        if (book === undefined || tabbed === undefined) return null;
        const open = tabbed.open;
        const opened = book.text.find($Chapter).filter(chapter => [...chapter.classes].includes('pa-opened'));
        const Word = $(word);
        const Reference = $(reference);
        const Close = $(close);
        return (
            <>
                {opened.map((chapter, index) => {
                    const appendices = $Appendix.of(chapter).filter(appendix => [...appendix.classes].includes('pa-opened'));
                    const reading = appendices.find(appendix => [...appendix.classes].includes('pa-open'));
                    return (
                        <span key={index} className="pd-tab-group">
                            <Word><Reference>{chapter.mention?.identifier}</Reference><span className={chapter === open && reading === undefined ? 'pd-tab pa-active' : 'pd-tab'}>{chapter.title?.name}</span></Word>
                            {chapter === book.cover ? null : <Word><Close chapter={chapter} />×</Word>}
                            {appendices.map((appendix, at) => (
                                <span key={at} className="pd-tab-group">
                                    <Word><Reference>{appendix.mention?.identifier}</Reference><span className={appendix === reading ? 'pd-tab pd-appendix-tab pa-active' : 'pd-tab pd-appendix-tab'}>{$Appendix.named(appendix)}</span></Word>
                                    <Word><Close chapter={chapter} appendix={appendix} />×</Word>
                                </span>
                            ))}
                        </span>
                    );
                })}
            </>
        );
    }
}

export const Close = $($Close);
const close = Close;
export const Tabs = $($Tabs);
