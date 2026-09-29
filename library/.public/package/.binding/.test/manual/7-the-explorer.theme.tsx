import { ComponentType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $LibraryTheme, at } from './2-the-theme.code.tsx';

export class $ManualTheme extends $LibraryTheme {
    protected override $Define(): void {
        super.$Define();
        this.style = selection(this.style as ComponentType<{ className?: string }>)`
            @media (min-width: 64rem) { max-width: none; }
            .pd-tabs { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 ${at('space')}; border-block-end: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')}); }
            .pd-tab-group { display: inline-flex; align-items: baseline; gap: calc(${at('space')} / 4); }
            .pd-tab { display: inline-block; padding: calc(${at('space')} / 4) 0; opacity: 0.65; }
            .pd-tab.pa-active { opacity: 1; border-block-end: 2px solid ${at('link')}; }
            .pd-appendix-tab, .pd-leaf { font-family: ui-monospace, monospace; font-size: calc(0.8 * ${at('size')}); }
            .pa-close { text-decoration: none; opacity: 0.5; }
            nav.pd-container:has(> .pa-table-of-contents) { border: 0; margin-block: 0; counter-reset: entry; }
            .pa-table-of-contents .pd-catchword { display: none; }
            .pa-table-of-contents .pd-paragraph { margin-block: calc(${at('space')} / 3); }
            .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical) { counter-increment: entry; }
            .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical)::before { content: counter(entry); display: inline-block; width: 1.5em; font-size: calc(0.7 * ${at('size')}); opacity: 0.65; }
            .pa-table-of-contents .pa-branch.pa-open { font-weight: bold; }
            .pd-byline { margin: 0; padding: 0; background: none; border: 0; display: flex; column-gap: calc(${at('space')} / 2); align-items: baseline; }
            .pd-leaf { display: block; padding-inline-start: 1.5em; opacity: 0.75; text-decoration: none; color: inherit; }
            .pd-leaf.pa-open { opacity: 1; font-weight: bold; }
            .pd-chapter:not(.pa-cover):not(.pa-synopsis):not(.pa-table-of-contents) .pd-title::before { content: 'Chapter'; }
        `;
    }
}

export const ManualTheme = $($ManualTheme);
