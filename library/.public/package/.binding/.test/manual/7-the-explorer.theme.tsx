import { css, RuleSet } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $LibraryTheme } from './2-the-theme.code.tsx';

export class $ManualTheme extends $LibraryTheme {
    protected override parts(): RuleSet[] {
        return [...super.parts(), this.explorer()];
    }

    protected override page(): RuleSet {
        return css`
            ${super.page()}
            max-width: none;
            .pd-book { background: ${({ theme }) => theme.paper}; }
            &, & * { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, ${({ theme }) => theme.ink} 25%, transparent) transparent; }
        `;
    }

    protected explorer(): RuleSet {
        return css`
            .pd-canonical.pd-chapter:not(.pa-framed) { border-block-start: 0; }
            .pd-canonical.pd-chapter .pd-title::before { content: none; }
            .pd-running-head { padding-block-end: calc(${({ theme }) => theme.space} / 2.5); }
            .pd-byline { display: flex; column-gap: calc(${({ theme }) => theme.space} / 2); align-items: baseline; margin-block: 0; padding: 0; background: none; border: 0; }
            .pd-tabs { display: flex; flex-wrap: wrap; align-items: baseline; border-block-end: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper}); }
            .pd-tabs > .pd-container { display: inline-block; padding: calc(${({ theme }) => theme.space} / 4) calc(${({ theme }) => theme.space} / 2); text-decoration: none; opacity: 0.65; border-inline-start: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 15%, ${({ theme }) => theme.paper}); }
            .pd-tabs > .pd-container:first-child { padding-inline-start: 0; border-inline-start: 0; }
            .pd-tabs > .pd-container:has(.pa-active) { opacity: 1; color: ${({ theme }) => theme.ink}; box-shadow: inset 0 -2px 0 ${({ theme }) => theme.link}; }
            .pd-leaf { display: block; padding-inline-start: 1.5em; font-family: ui-monospace, monospace; font-size: calc(0.8 * ${({ theme }) => theme.size}); line-height: 1.6; opacity: 0.75; text-decoration: none; color: inherit; }
            .pd-leaf::before { content: '·'; margin-inline-end: 0.5em; opacity: 0.5; }
            .pd-leaf.pa-open { opacity: 1; font-weight: bold; }
        `;
    }
}

export const ManualTheme = $($ManualTheme);
