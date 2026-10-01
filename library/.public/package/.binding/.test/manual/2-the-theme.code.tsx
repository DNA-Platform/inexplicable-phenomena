import { $, selection } from '@dna-platform/chemistry';
import { $Theme } from '@dna-platform/public';

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
    override style = selection(this.style)`
        @layer pd.theme {
            @media (min-width: 64rem) { max-width: 52rem; }
            .pd-book { counter-reset: chapter; }
            .pd-chapter { scroll-margin-block-start: calc(0.5 * ${({ theme }) => theme.space}); }

            .pd-running-head {
                font-size: calc(0.75 * ${({ theme }) => theme.size});
                letter-spacing: 0.12em;
                text-transform: uppercase;
                padding-block-end: calc(${({ theme }) => theme.space} / 2);
                border-block-end: 1px solid ${({ theme }) => theme.ink};
            }
            .pd-byline {
                display: grid;
                grid-template-columns: max-content 1fr;
                column-gap: ${({ theme }) => theme.space};
                row-gap: calc(${({ theme }) => theme.space} / 4);
                align-items: baseline;
                margin-block: ${({ theme }) => theme.space} 0;
                padding: calc(${({ theme }) => theme.space} / 2) ${({ theme }) => theme.space};
                background: color-mix(in srgb, ${({ theme }) => theme.ink} 3%, ${({ theme }) => theme.paper});
                border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
                border-block-start: 3px solid ${({ theme }) => theme.link};
            }
            .pd-label {
                font-size: calc(0.7 * ${({ theme }) => theme.size});
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
            .pd-catchword {
                font-size: calc(0.85 * ${({ theme }) => theme.size});
                text-align: end;
                margin-block-end: 0;
                padding-block-start: calc(${({ theme }) => theme.space} / 2);
                border-block-start: 1px solid ${({ theme }) => theme.ink};
            }

            .pd-chapter .pd-title::before,
            .pd-title.pa-parenthetical {
                font-size: calc(0.7 * ${({ theme }) => theme.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
            .pd-chapter .pd-title::before {
                display: block;
                margin-block-end: calc(${({ theme }) => theme.space} / 4);
                content: 'Chapter ' counter(chapter);
            }
            .pd-title.pa-parenthetical::before { content: none; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-canonical.pd-chapter:not(.pa-framed) {
                border-block-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
                padding-block-start: ${({ theme }) => theme.space};
            }

            .pd-code {
                margin-block: ${({ theme }) => theme.space};
                padding: calc(0.75 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space};
                background: color-mix(in srgb, ${({ theme }) => theme.ink} 4%, ${({ theme }) => theme.paper});
                border-inline-start: 2px solid color-mix(in srgb, ${({ theme }) => theme.ink} 25%, ${({ theme }) => theme.paper});
                line-height: 1.5;
            }
            .pd-code pre { margin: 0; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({ theme }) => theme.space}; }
        }
    `;
}

export const LibraryValues = $($LibraryValues);
export const LibraryTheme = $($LibraryTheme);
