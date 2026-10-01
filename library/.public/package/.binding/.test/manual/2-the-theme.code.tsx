import { ElementType } from 'react';
import { css, RuleSet } from 'styled-components';
import { $, selection } from '@dna-platform/chemistry';
import { $Theme } from '@dna-platform/public';

declare module 'styled-components' {
    export interface DefaultTheme extends $LibraryTheme {}
}

export class $LibraryTheme extends $Theme {
    font = "Georgia, 'Times New Roman', serif";
    size = '1rem';
    leading = '1.7';
    measure = '42rem';
    space = '1.25rem';
    ink = '#23262a';
    paper = '#faf8f4';
    link = '#5b2f2a';
    style: ElementType = selection.div`${this.parts()}`;

    protected parts(): RuleSet[] {
        return [this.page(), this.levels(), this.labels(), this.links(), this.apparatus(), this.figures()];
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
            @media (min-width: 64rem) { max-width: 52rem; }
        `;
    }

    protected levels(): RuleSet {
        return css`
            .pd-book { margin-block: ${({ theme }) => theme.space}; counter-reset: chapter equation; }
            .pd-canonical.pd-chapter { margin-block: calc(2 * ${({ theme }) => theme.space}); scroll-margin-block-start: calc(0.5 * ${({ theme }) => theme.space}); }
            .pd-section { margin-block: ${({ theme }) => theme.space}; }
            .pd-paragraph { margin-block: ${({ theme }) => theme.space}; }
            .pa-item { margin-block: calc(${({ theme }) => theme.space} / 4); }
            .pd-title { font-size: calc(1.5 * ${({ theme }) => theme.size}); font-weight: bold; margin-block-end: ${({ theme }) => theme.space}; }
            .pd-heading { font-weight: bold; margin-block: ${({ theme }) => theme.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-canonical.pd-chapter:not(.pa-framed) {
                border-block-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
                padding-block-start: ${({ theme }) => theme.space};
            }
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
                opacity: 0.65;
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
                padding: calc(${({ theme }) => theme.space} / 2) ${({ theme }) => theme.space};
                background: color-mix(in srgb, ${({ theme }) => theme.ink} 3%, ${({ theme }) => theme.paper});
                border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
                border-block-start: 3px solid ${({ theme }) => theme.link};
            }
            .pd-catchword {
                font-size: calc(0.85 * ${({ theme }) => theme.size});
                text-align: end;
                margin-block-end: 0;
                padding-block-start: calc(${({ theme }) => theme.space} / 2);
                border-block-start: 1px solid ${({ theme }) => theme.ink};
            }
            .pd-previous::before { content: '\\2039\\00a0'; }
            .pd-next::after { content: '\\00a0\\203a'; }
        `;
    }

    protected figures(): RuleSet {
        return css`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.9 * ${({ theme }) => theme.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({ theme }) => theme.space};
                padding: calc(0.75 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space};
                background: color-mix(in srgb, ${({ theme }) => theme.ink} 4%, ${({ theme }) => theme.paper});
                border-inline-start: 2px solid color-mix(in srgb, ${({ theme }) => theme.ink} 25%, ${({ theme }) => theme.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .hljs-keyword, .hljs-built_in, .hljs-type, .hljs-number, .hljs-literal, .hljs-tag { color: ${({ theme }) => theme.link}; }
            .hljs-string, .hljs-regexp, .hljs-attr, .hljs-name { color: color-mix(in srgb, ${({ theme }) => theme.ink} 70%, ${({ theme }) => theme.paper}); }
            .hljs-comment, .hljs-meta, .hljs-doctag { color: color-mix(in srgb, ${({ theme }) => theme.ink} 55%, ${({ theme }) => theme.paper}); font-style: italic; }
            .hljs-title, .hljs-title.class_, .hljs-title.function_ { font-weight: bold; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({ theme }) => theme.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `;
    }
}

export const LibraryTheme = $($LibraryTheme);
