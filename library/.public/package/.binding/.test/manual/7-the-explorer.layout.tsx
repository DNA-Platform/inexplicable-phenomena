import { $, inert, selection } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Format, $Paragraph, $Section, $Writing } from '@dna-platform/public';
import { at } from './2-the-theme.code.tsx';
import { $Appendix } from './7-the-explorer.appendix.tsx';
import { $Tabbed } from './7-the-explorer.paging.tsx';
import { $Branch, Branch as branch } from './7-the-explorer.tree.tsx';

export class $Explorer extends $Format {
    @inert() protected visited?: string;
    style = selection.div`
        & > .pd-book {
            position: fixed;
            inset: 0;
            box-sizing: border-box;
            padding: calc(${at('space')} / 2) ${at('space')} 0;
            display: grid;
            grid-template-columns: 18rem minmax(0, 1fr);
            grid-template-rows: auto auto minmax(0, 1fr);
            grid-template-areas: 'head head' 'table tabs' 'table page';
            column-gap: ${at('space')};
            margin-block: 0;
        }
        & > .pd-book > .pd-running-head { grid-area: head; margin-block: 0; }
        & > .pd-book > .pd-byline { grid-area: head; justify-self: end; align-self: center; margin-block: 0; }
        & > .pd-book > nav.pd-container:has(> .pa-table-of-contents) { grid-area: table; overflow: auto; margin-block: 0; }
        & > .pd-book > .pd-tabs { grid-area: tabs; margin-block: 0; }
        & > .pd-book > header.pd-container, & > .pd-book > .pd-chapter { grid-area: page; overflow: auto; min-height: 0; margin-block: 0; }
        & > .pd-book > .pd-chapter:not(:has(> .pa-appendix.pa-open)) { max-width: ${at('measure')}; }
        & > .pd-book > .pd-chapter > .pd-section.pa-appendix:not(.pa-open) { display: none; }
        & > .pd-book > .pd-chapter:has(> .pa-appendix.pa-open) {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
            column-gap: calc(2 * ${at('space')});
            align-content: start;
        }
        & > .pd-book > .pd-chapter:not(.pa-cover) > .pd-container:has(> .pd-title),
        & > .pd-book > .pd-chapter > .pd-section.pa-appendix > .pd-container:has(> .pd-heading) {
            position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;
        }
        & > .pd-book > .pd-chapter:not(.pa-cover) { padding-block-start: ${at('space')}; }
        & > .pd-book > .pd-chapter:has(> .pa-appendix.pa-open) > .pd-section:not(.pa-appendix) { grid-column: 2; font-size: calc(0.9 * ${at('size')}); margin-block-start: 0; }
        & > .pd-book > .pd-chapter:has(> .pa-appendix.pa-open) > .pd-catchword { grid-column: 1 / -1; }
        & > .pd-book > .pd-chapter:has(> .pa-appendix.pa-open) > .pd-section.pa-appendix.pa-open { grid-column: 1; grid-row: 1 / span 99; margin-block: 0; }
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
        for (const chapter of writing.text.find($Chapter))
            for (const appendix of $Appendix.of(chapter))
                if (appendix.mention?.identifier === place && ![...appendix.classes].includes('pa-opened')) appendix.classes.add(this, 'pa-opened');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        const table = this.$book?.table;
        const Branch = $(branch);
        for (const section of table?.text.find($Section) ?? [])
            for (const entry of section.text.find($Paragraph))
                if (entry.annotations.expressed($Branch) === undefined) entry.annotations.append(this, <Branch />);
        super.$Bound();
    }
}

export const Explorer = $($Explorer);
