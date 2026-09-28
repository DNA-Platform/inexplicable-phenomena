import { ElementType, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $check, $Chemical, children, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';
import { $Book } from '@/libraries/Book';

export type Values = Record<'font' | 'size' | 'leading' | 'measure' | 'space' | 'ink' | 'paper' | 'link', string>;

const value = (property: keyof Values) => ({ theme }: { theme: Partial<Values> }) => theme[property] ?? '';

export class $Theme extends $Format {
    specification = new ThemeSpecification();
    theme = true;
    font = 'serif';
    size = '1rem';
    leading = '1.5';
    measure = '40rem';
    space = '1rem';
    ink = 'black';
    paper = 'white';
    link = 'blue';
    style: ElementType = selection.div`
        font-family: ${value('font')};
        font-size: ${value('size')};
        line-height: ${value('leading')};
        color: ${value('ink')};
        background: ${value('paper')};
        max-width: ${value('measure')};
        margin-inline: auto;
        padding: ${value('space')};
        .pd-container { box-sizing: border-box; color: inherit; }
        .pd-annotation { display: none; }
        .pa-append { white-space: pre; }
        .pd-figure { max-width: 100%; }
        .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9 * ${value('size')}); white-space: pre; overflow-x: auto; }
        .pd-code .pd-line { display: block; }
        .pd-code .pd-line-number { display: inline-block; min-width: 3ch; margin-right: 1.5ch; text-align: right; color: color-mix(in srgb, ${value('ink')} 40%, ${value('paper')}); user-select: none; }
        .pa-highlighted .tok-keyword, .pa-highlighted .tok-tagName { color: ${value('link')}; }
        .pa-highlighted .tok-string, .pa-highlighted .tok-string2, .pa-highlighted .tok-literal { color: color-mix(in srgb, ${value('link')} 45%, ${value('ink')}); }
        .pa-highlighted .tok-comment { color: color-mix(in srgb, ${value('ink')} 55%, ${value('paper')}); font-style: italic; }
        .pa-highlighted .tok-typeName, .pa-highlighted .tok-className { color: ${value('ink')}; font-weight: 600; }
        .pa-highlighted .tok-number, .pa-highlighted .tok-bool, .pa-highlighted .tok-atom { color: color-mix(in srgb, ${value('link')} 70%, ${value('ink')}); }
        .pa-highlighted .tok-punctuation, .pa-highlighted .tok-operator { color: color-mix(in srgb, ${value('ink')} 70%, ${value('paper')}); }
        .pa-numbered { tab-size: 4; }
        .pd-image { max-width: 100%; height: auto; }
        .pd-svg { max-width: 100%; }
        .pd-book { margin-block: ${value('space')}; }
        .pd-chapter { margin-block: calc(2 * ${value('space')}); }
        .pd-section { margin-block: ${value('space')}; }
        .pd-paragraph { margin-block: ${value('space')}; }
        .pd-sentence { hyphens: manual; }
        .pd-word { overflow-wrap: break-word; }
        .pd-letter { font-kerning: normal; }
        .pd-title { font-size: calc(1.5 * ${value('size')}); font-weight: bold; margin-block-end: ${value('space')}; color: inherit; }
        .pd-container:has(> .pd-title) { text-decoration: none; }
        .pd-heading { font-weight: bold; margin-block: ${value('space')} 0; }
        .pd-line { white-space: pre-wrap; }
        .pd-space { white-space: pre; }
        .pd-break { clear: both; }
        .pa-parenthetical { opacity: 0.6; }
        .pd-previous::before { content: '\\2039\\00a0'; }
        .pd-next::after { content: '\\00a0\\203a'; }
        .pa-reference { color: ${value('link')}; }
        .pd-container:has(> .pa-reference) { text-decoration-color: ${value('link')}; text-underline-offset: 0.15em; }
        .pa-self-reference, .pd-title.pa-reference { color: inherit; }
        .pa-referent { scroll-margin-block-start: ${value('space')}; }
        .pa-content { color: ${value('link')}; }
        .pa-table { column-gap: ${value('space')}; row-gap: calc(${value('space')} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table > .pd-container { grid-column: 1 / -1; }
        .pa-row > .pd-container { display: contents; }
        .pa-row:first-child .pa-col { font-weight: bold; border-block-end: 1px solid ${value('ink')}; }
        .pa-col { padding-block: calc(${value('space')} / 4); }
        .pa-cover { margin-block-end: calc(2 * ${value('space')}); }
        .pa-cover .pd-title { font-size: calc(2 * ${value('size')}); }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-table-of-contents { margin-block: ${value('space')}; }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${value('space')} / 4); }
        .pa-biography .pd-title { font-variant: small-caps; }
        .pa-autobiography .pd-title { font-style: italic; }
        .pa-paginated { min-height: 50vh; }
        .pa-page { margin-block: ${value('space')}; }
        .pa-open { margin-block-start: 0; }
        .pa-blank { visibility: hidden; }
        .pa-emphasis { font-style: italic; }
        .pa-bold { font-weight: bold; }
        .pa-underline { text-decoration: underline; }
    `;
    protected _provider!: ElementType;
    get values(): Values {
        return { font: this.font, size: this.size, leading: this.leading, measure: this.measure, space: this.space, ink: this.ink, paper: this.paper, link: this.link };
    }

    $Theme(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        const Provider = $(provider);
        this._provider = $(reflection.chemical<$Provider>(<Provider theme={this} />, this));
    }

    protected override provide(style: ElementType): ElementType { return style; }

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Theme)
                writing.annotations.express(annotation, false);
        writing.containers.add(this, this._provider);
    }
}

export class $Provider extends $Chemical {
    $theme!: $Theme;
    $className?: string;

    view(): ReactNode {
        const Sheet = this.$theme.style ?? 'div';
        return (
            <ThemeProvider theme={this.$theme.values}>
                <Sheet className={this.$className}>{this[children]}</Sheet>
            </ThemeProvider>
        );
    }
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing instanceof $Book, 'a theme is said of a book, and this is not one');
    }
}

export const Theme = $($Theme);
const provider = $($Provider);
