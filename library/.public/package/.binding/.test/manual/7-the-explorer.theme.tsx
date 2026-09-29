import { ComponentType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $LibraryValues, at } from './2-the-theme.code.tsx';

export class $ManualTheme extends $LibraryValues {
    protected override $Define(): void {
        super.$Define();
        this.style = selection(this.style as ComponentType<{ className?: string }>)`
            max-width: none;
            &, & * { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, ${at('ink')} 25%, transparent) transparent; }
            .pd-book { background: ${at('paper')}; }
            .pa-page .pd-heading { font-size: calc(1.1 * ${at('size')}); }
            .pd-byline { display: flex; column-gap: calc(${at('space')} / 2); align-items: baseline; }
            .pd-tabs { display: flex; flex-wrap: wrap; align-items: baseline; border-block-end: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')}); }
            .pd-tabs > .pd-container { display: inline-block; padding: calc(${at('space')} / 4) calc(${at('space')} / 2); text-decoration: none; opacity: 0.65; border-inline-start: 1px solid color-mix(in srgb, ${at('ink')} 15%, ${at('paper')}); }
            .pd-tabs > .pd-container:first-child { padding-inline-start: 0; border-inline-start: 0; }
            .pd-tabs > .pd-container:has(.pa-active) { opacity: 1; color: ${at('ink')}; box-shadow: inset 0 -2px 0 ${at('link')}; }
            nav.pd-container:has(> .pa-table-of-contents) { counter-reset: entry; font-size: calc(0.9 * ${at('size')}); }
            .pa-table-of-contents .pd-catchword { display: none; }
            .pa-table-of-contents .pd-heading { font-size: calc(0.7 * ${at('size')}); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; margin-block: 0 calc(${at('space')} / 2); }
            .pa-table-of-contents .pd-paragraph { margin-block: calc(${at('space')} / 3); }
            .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical) { counter-increment: entry; }
            .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical)::before { content: counter(entry); display: inline-block; width: 1.5em; font-size: calc(0.7 * ${at('size')}); opacity: 0.65; }
            .pa-table-of-contents .pa-branch.pa-open { font-weight: bold; }
            .pd-leaf { display: block; padding-inline-start: 1.5em; font-family: ui-monospace, monospace; font-size: calc(0.8 * ${at('size')}); line-height: 1.6; opacity: 0.75; text-decoration: none; color: inherit; }
            .pd-leaf::before { content: '·'; margin-inline-end: 0.5em; opacity: 0.5; }
            .pd-leaf.pa-open { opacity: 1; font-weight: bold; }
            .pa-appendix .pd-code { margin-block: 0; padding: 0; background: none; border: 0; font-size: calc(0.8 * ${at('size')}); line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; overflow: visible; }
            .pa-appendix .pd-paragraph { margin-block: 0; }
        `;
    }
}

export const ManualTheme = $($ManualTheme);
