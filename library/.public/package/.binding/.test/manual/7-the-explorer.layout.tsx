import { $, inert, selection } from '@dna-platform/chemistry';
import { $Book, $Format, $Paragraph, $Section, $Writing } from '@dna-platform/public';
import { $Tabbed } from './7-the-explorer.paging.tsx';
import { $Branch, Branch as branch } from './7-the-explorer.tree.tsx';

export class $Explorer extends $Format {
    @inert() protected visited?: string;
    style = selection.div`
        & > .pd-book {
            position: fixed;
            inset: 0;
            box-sizing: border-box;
            padding: calc(${({ theme }) => theme.space} / 2) ${({ theme }) => theme.space} 0;
            display: grid;
            grid-template-columns: 18rem minmax(0, 1fr);
            grid-template-rows: auto auto auto minmax(0, 1fr);
            grid-template-areas: 'head head' 'table tabs' 'table front' 'table page';
            column-gap: ${({ theme }) => theme.space};
            margin-block: 0;
        }
        & > .pd-book > .pd-running-head { grid-area: head; margin-block: 0; }
        & > .pd-book > .pd-byline { grid-area: head; justify-self: end; align-self: center; margin-block: 0; }
        & > .pd-book > .pd-container { display: contents; }
        & > .pd-book .pa-table-of-contents { grid-area: table; overflow: auto; margin-block: 0; }
        & > .pd-book > .pd-tabs { grid-area: tabs; margin-block: 0; }
        & > .pd-book .pa-cover { grid-area: front; padding-block-start: ${({ theme }) => theme.space}; margin-block: 0; }
        & > .pd-book .pd-canonical.pd-chapter, & > .pd-book .pa-synopsis { grid-area: page; overflow: auto; min-height: 0; margin-block: 0; }
        & > .pd-book .pa-synopsis:not(.pa-open) { display: none; }
        & > .pd-book .pd-canonical.pd-chapter:not(:has(> .pa-appendix.pa-open)), & > .pd-book .pa-synopsis { max-width: ${({ theme }) => theme.measure}; }
        & > .pd-book .pd-chapter > .pd-section.pa-appendix:not(.pa-open) { display: none; }
        & > .pd-book .pd-chapter:has(> .pa-appendix.pa-open) {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
            column-gap: calc(2 * ${({ theme }) => theme.space});
            align-content: start;
        }
        & > .pd-book .pd-chapter:not(.pa-cover) > .pd-container:has(> .pd-title),
        & > .pd-book .pd-chapter > .pd-section.pa-appendix > .pd-container:has(> .pd-heading) {
            position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;
        }
        & > .pd-book .pd-canonical.pd-chapter { padding-block-start: ${({ theme }) => theme.space}; }
        & > .pd-book .pd-chapter:has(> .pa-appendix.pa-open) > .pd-section:not(.pa-appendix) { grid-column: 2; font-size: calc(0.9 * ${({ theme }) => theme.size}); margin-block-start: 0; }
        & > .pd-book .pd-chapter:has(> .pa-appendix.pa-open) > .pd-catchword { grid-column: 1 / -1; }
        & > .pd-book .pd-chapter > .pd-section.pa-appendix.pa-open { display: contents; }
        & > .pd-book .pd-chapter > .pa-appendix.pa-open > .pd-paragraph:has(.pd-code) { grid-column: 1; grid-row: 1 / span 99; margin-block: 0; }
        & > .pd-book .pd-chapter > .pa-appendix.pa-open > .pd-paragraph:not(:has(.pd-code)) { grid-column: 2; order: -1; font-size: calc(0.9 * ${({ theme }) => theme.size}); margin-block: 0 ${({ theme }) => theme.space}; }

        .pa-page .pd-heading { font-size: calc(1.1 * ${({ theme }) => theme.size}); }
        .pa-appendix .pd-code { margin-block: 0; padding: 0; background: none; border: 0; font-size: calc(0.8 * ${({ theme }) => theme.size}); line-height: 1.6; white-space: normal; overflow: visible; }
        .pa-appendix .pd-code :is(pre, code) { white-space: normal; }
        .pa-appendix .pd-code-line { display: block; white-space: pre-wrap; overflow-wrap: anywhere; padding-inline-start: 4.5ch; text-indent: -4.5ch; }
        .pa-appendix .pd-code-line::before { text-indent: 0; }
        .pa-appendix .pd-paragraph { margin-block: 0; }
    `;

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-explorer');
        if (!(writing instanceof $Book)) return;
        const cover = writing.cover;
        if (cover !== undefined && ![...cover.classes].includes('pa-opened')) cover.classes.add(this, 'pa-opened');
        const place = writing.$bookmark;
        if (place === this.visited) return;
        this.visited = place;
        const open = writing.annotations.expressed($Tabbed)?.open;
        if (open !== undefined && ![...open.classes].includes('pa-opened')) open.classes.add(this, 'pa-opened');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        const table = this.book?.table;
        const Branch = $(branch);
        for (const section of table?.text.find($Section) ?? [])
            for (const entry of section.text.find($Paragraph))
                if (entry.annotations.expressed($Branch) === undefined) entry.annotations.append(this, <Branch />);
        super.$Bound();
    }
}

export const Explorer = $($Explorer);
