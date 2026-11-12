import { ElementType } from 'react';
import { css, RuleSet } from 'styled-components';
import { $, selection } from '@dna-platform/chemistry';
import { $Theme } from '@dna-platform/public';

declare module 'styled-components' {
    export interface DefaultTheme extends $LibraryTheme {}
}

export class $LibraryTheme extends $Theme {
    font = "Georgia, 'Times New Roman', serif";
    size = '1.0625rem';
    leading = '1.6';
    measure = '40rem';
    space = '1.25rem';
    ink = '#1b1b1b';
    paper = '#ffffff';
    link = '#1f4e79';
    style: ElementType = selection.div`${this.parts()}`;

    protected parts(): RuleSet[] {
        return [this.page(), this.levels(), this.labels(), this.links(), this.apparatus(), this.figures(), this.front(), this.plate()];
    }

    // THE FRONT, the cover drawn as a book, Sprint 125: shown alone while the cover is the open page, the running
    // head, the byline and the cover chapter itself unseen then and back the moment another page opens; a page
    // that opens comes in with a short fade, the library's one transition. Sketch 004, form a.
    protected front(): RuleSet {
        return css`
            .pd-front { display: none; }
            .pd-book:has(.pa-cover.pa-open) .pd-front { display: flex; }
            .pd-book:has(.pa-cover.pa-open) .pd-running-head, .pd-book:has(.pa-cover.pa-open) .pd-byline, .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open { display: none; }
            .pd-front { position: relative; box-sizing: border-box; width: 22rem; max-width: 100%; flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin: 2.5rem auto 3rem; padding: 3rem 2rem 1.75rem; border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 50%, ${({ theme }) => theme.paper}); box-shadow: inset 0 0 0 6px ${({ theme }) => theme.paper}, inset 0 0 0 7px color-mix(in srgb, ${({ theme }) => theme.ink} 35%, ${({ theme }) => theme.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: ${({ theme }) => theme.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25rem; background: linear-gradient(to right, color-mix(in srgb, ${({ theme }) => theme.ink} 22%, transparent), color-mix(in srgb, ${({ theme }) => theme.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front > a, .pd-front .pd-word { display: block; }
            .pd-front .pa-reference { color: inherit; text-decoration: none; }
            .pd-front a:hover .pd-word { text-decoration: underline; text-underline-offset: 0.15em; }
            .pd-front-name { font-size: 2.4rem; line-height: 1.1; font-weight: bold; margin-block: .35rem .8rem; }
            .pd-front-name::after { content: ''; display: block; width: 3.5rem; border-top: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 50%, ${({ theme }) => theme.paper}); margin: .9rem auto 0; }
            .pd-front-author { font-size: 1.15rem; letter-spacing: .04em; }
            .pd-front-tagline { font-style: italic; opacity: .75; margin-top: 1.1rem; font-size: .95rem; }
            .pd-front > :nth-last-child(2) { margin-top: auto; }
            .pd-front-imprint { font-size: calc(0.7 * ${({ theme }) => theme.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .35rem; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
            @media (max-width: 640px) {
                .pd-front { width: min(20rem, 86vw); margin-block: 1.5rem 2rem; padding: 2.25rem 1.25rem 1.25rem; }
                .pd-front-name { font-size: 2rem; }
            }
        `;
    }

    // THE PLATE, a publication's small picture at the top left of its page with the text flowing under it, Sprint
    // 125; its opening carries no underline, the picture being the link. Sketch 002, form a.
    protected plate(): RuleSet {
        return css`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 20%, ${({ theme }) => theme.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `;
    }

    protected page(): RuleSet {
        return css`
            font-family: ${({ theme }) => theme.font};
            font-size: ${({ theme }) => theme.size};
            line-height: ${({ theme }) => theme.leading};
            color: ${({ theme }) => theme.ink};
            background: ${({ theme }) => theme.paper};
            max-width: ${({ theme }) => theme.measure};
            margin-inline: auto;
            padding: ${({ theme }) => theme.space};
        `;
    }

    protected levels(): RuleSet {
        return css`
            .pd-book { margin-block: ${({ theme }) => theme.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: calc(2 * ${({ theme }) => theme.space}); scroll-margin-block-start: ${({ theme }) => theme.space}; }
            .pd-section { margin-block: ${({ theme }) => theme.space}; }
            .pd-paragraph { margin-block: ${({ theme }) => theme.space}; }
            .pa-item { margin-block: calc(${({ theme }) => theme.space} / 4); }
            .pd-title { font-size: calc(1.5 * ${({ theme }) => theme.size}); font-weight: bold; margin-block-end: ${({ theme }) => theme.space}; }
            .pd-heading { font-weight: bold; margin-block: ${({ theme }) => theme.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({ theme }) => theme.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `;
    }

    protected labels(): RuleSet {
        return css`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({ theme }) => theme.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `;
    }

    protected links(): RuleSet {
        return css`
            .pa-reference { color: ${({ theme }) => theme.link}; text-decoration-color: ${({ theme }) => theme.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({ theme }) => theme.space}; }
            .pa-content { color: ${({ theme }) => theme.link}; }
        `;
    }

    protected apparatus(): RuleSet {
        return css`
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
            }
        `;
    }

    protected figures(): RuleSet {
        return css`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.85 * ${({ theme }) => theme.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({ theme }) => theme.space};
                padding: calc(0.75 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space};
                border-inline-start: 2px solid color-mix(in srgb, ${({ theme }) => theme.ink} 25%, ${({ theme }) => theme.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({ theme }) => theme.space}; }
            .pd-document object { display: block; width: 100%; aspect-ratio: 1 / 1.4142; margin-block: ${({ theme }) => theme.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `;
    }
}

export const LibraryTheme = $($LibraryTheme);
