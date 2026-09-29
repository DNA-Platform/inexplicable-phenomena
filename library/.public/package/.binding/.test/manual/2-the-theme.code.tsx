import { ComponentType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Theme } from '@dna-platform/public';

export const at = (property: string, fallback = '') =>
    ({ theme }: { theme: Record<string, string | undefined> }): string => theme[property] ?? fallback;

export class $LibraryValues extends $Theme {
    font = "Georgia, 'Times New Roman', serif";
    leading = '1.7';
    measure = '42rem';
    space = '1.25rem';
    ink = '#23262a';
    paper = '#faf8f4';
    link = '#5b2f2a';
}

export class $LibraryTheme extends $LibraryValues {
    protected override $Define(): void {
        super.$Define();
        this.style = selection(this.style as ComponentType<{ className?: string }>)`
            @media (min-width: 64rem) { max-width: 52rem; }
            .pd-book { counter-reset: chapter; }
            .pd-book > .pd-chapter { scroll-margin-block-start: calc(0.5 * ${at('space')}); }
            :where(header, nav) > .pd-chapter { scroll-margin-block-start: calc(2.5 * ${at('space')}); }

            .pd-byline {
                margin-block: ${at('space')} 0;
                padding: calc(${at('space')} / 2) ${at('space')};
                background: color-mix(in srgb, ${at('ink')} 3%, ${at('paper')});
                border: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')});
                border-block-start: 3px solid ${at('link')};
            }
            header.pd-container:has(> .pa-cover) {
                display: block;
                margin-block: 0 calc(1.5 * ${at('space')});
                padding: calc(0.75 * ${at('space')}) ${at('space')};
                background: color-mix(in srgb, ${at('ink')} 3%, ${at('paper')});
                border: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')});
                border-block-start: 0;
            }
            :where(header, nav).pd-container:has(> .pa-page:not(.pa-open)) { display: none; }
            .pa-cover { margin-block: 0; }
            .pa-cover .pd-title { margin-block: 0 calc(${at('space')} / 2); }

            .pd-chapter .pd-title::before,
            .pd-title.pa-parenthetical,
            .pa-table-of-contents .pd-heading,
            .pa-row:first-child .pa-col {
                font-size: calc(0.7 * ${at('size')});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
            .pd-chapter .pd-title::before {
                display: block;
                margin-block-end: calc(${at('space')} / 4);
                content: 'Chapter ' counter(chapter);
            }
            .pa-cover .pd-title::before { content: 'Cover'; }
            .pa-biography .pd-title::before { content: 'Biography'; }
            .pa-autobiography .pd-title::before { content: 'Autobiography'; }
            .pa-synopsis .pd-title::before { content: 'Synopsis'; }
            .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
            .pd-title.pa-parenthetical::before { content: none; }
            .pd-chapter:not(.pa-cover):not(.pa-synopsis):not(.pa-table-of-contents) { counter-increment: chapter; }
            .pd-book > .pd-chapter:not(.pa-cover):not(.pa-synopsis):not(.pa-table-of-contents) {
                border-block-start: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')});
                padding-block-start: ${at('space')};
            }

            .pa-synopsis {
                margin-block: calc(1.5 * ${at('space')});
                padding-inline-start: ${at('space')};
                border-inline-start: 2px solid ${at('link')};
            }

            nav.pd-container:has(> .pa-table-of-contents) {
                display: block;
                margin-block: calc(1.5 * ${at('space')});
                padding: calc(0.75 * ${at('space')}) ${at('space')};
                border: 1px solid color-mix(in srgb, ${at('ink')} 10%, ${at('paper')});
            }
            .pa-table-of-contents { margin-block: 0; }
            .pa-col {
                padding-block: calc(${at('space')} / 3);
                border-block-end: 1px solid color-mix(in srgb, ${at('ink')} 7%, ${at('paper')});
            }
            .pa-row:first-child .pa-col { border-block-end: 1px solid ${at('ink')}; }

            .pd-code {
                margin-block: ${at('space')};
                padding: calc(0.75 * ${at('space')}) ${at('space')};
                background: color-mix(in srgb, ${at('ink')} 4%, ${at('paper')});
                border-inline-start: 2px solid color-mix(in srgb, ${at('ink')} 25%, ${at('paper')});
                line-height: 1.5;
            }
            .pd-code pre { margin: 0; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${at('space')}; }
        `;
    }
}

export const LibraryValues = $($LibraryValues);
export const LibraryTheme = $($LibraryTheme);
