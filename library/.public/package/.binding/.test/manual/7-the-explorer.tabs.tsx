import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Chapter, $Format, $Paragraph, $Section, $Writing, Reference as reference, Word as word } from '@dna-platform/public';
import { $Appendix } from './7-the-explorer.appendix.tsx';
import { $Tabbed } from './7-the-explorer.paging.tsx';
import { $Explorer } from './7-the-explorer.layout.tsx';

export class $Close extends $Format {
    $chapter?: $Chapter;
    $appendix?: $Section;
    get opened(): $Chapter[] { return this.$book?.text.find($Chapter).filter(chapter => [...chapter.classes].includes('pa-opened')) ?? []; }
    get reading(): $Section | undefined { return this.$chapter === undefined ? undefined : $Appendix.of(this.$chapter).find(appendix => [...appendix.classes].includes('pa-open')); }
    get active(): boolean {
        const open = this.$book?.annotations.expressed($Tabbed)?.open;
        return this.$appendix === undefined ? open !== undefined && open === this.$chapter : this.reading === this.$appendix;
    }
    get neighbour(): string | undefined {
        const opened = this.opened;
        const index = this.$chapter === undefined ? -1 : opened.indexOf(this.$chapter);
        return (opened[index - 1] ?? opened[index + 1] ?? this.$book?.cover)?.mention?.identifier;
    }
    get to(): string | undefined {
        if (!this.active) return this.$book?.$bookmark;
        return this.$appendix === undefined ? this.neighbour : this.$chapter?.mention?.identifier;
    }

    $Close(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this.style = (props: { className?: string; children?: ReactNode }) => (
            <a {...props} className={this.active ? `${props.className ?? ''} pa-active` : props.className} href={this.to} onClick={event => { const active = this.active; this.close(); if (!active) event.preventDefault(); }} />
        );
    }

    close(): void {
        const book = this.$book;
        const explorer = book?.annotations.expressed($Explorer);
        const tabbed = book?.annotations.expressed($Tabbed);
        const chapter = this.$chapter;
        if (explorer === undefined || tabbed === undefined || chapter === undefined) return;
        const closing = (appendix: $Section): void => { appendix.classes.revert(explorer); appendix.classes.revert(tabbed); };
        if (this.$appendix !== undefined) { closing(this.$appendix); return; }
        chapter.classes.revert(explorer);
        $Appendix.of(chapter).forEach(closing);
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
                {opened.map(chapter => {
                    const appendices = $Appendix.of(chapter).filter(appendix => [...appendix.classes].includes('pa-opened'));
                    const reading = appendices.find(appendix => [...appendix.classes].includes('pa-open'));
                    return (
                        <span key={chapter.mention?.identifier} className="pd-tab-group">
                            <Word><Reference>{chapter.mention?.identifier}</Reference><span className={chapter === open && reading === undefined ? 'pd-tab pa-active' : 'pd-tab'}>{chapter.title?.name}</span></Word>
                            {chapter === book.cover ? null : <Word><Close chapter={chapter} />×</Word>}
                            {appendices.map(appendix => (
                                <span key={appendix.mention?.identifier} className="pd-tab-group">
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
