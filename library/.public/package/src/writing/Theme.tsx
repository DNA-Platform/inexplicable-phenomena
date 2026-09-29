import { ElementType, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { $, $check, $Chemical, children, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';
import { $Book } from '@/libraries/Book';

export type Values = Record<'font' | 'size' | 'leading' | 'measure' | 'space' | 'ink' | 'paper' | 'link', string>;

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
        font-family: ${this.provided('font')};
        font-size: ${this.provided('size')};
        line-height: ${this.provided('leading')};
        color: ${this.provided('ink')};
        background: ${this.provided('paper')};
        max-width: ${this.provided('measure')};
        margin-inline: auto;
        padding: ${this.provided('space')};
        .pd-container { box-sizing: border-box; color: inherit; }
        .pd-annotation { display: none; }
        .pa-append { white-space: pre; }
        .pd-figure { max-width: 100%; }
        .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9 * ${this.provided('size')}); white-space: pre; overflow-x: auto; }
        .pd-image { max-width: 100%; height: auto; }
        .pd-svg { max-width: 100%; }
        .pd-book { margin-block: ${this.provided('space')}; }
        .pd-chapter { margin-block: calc(2 * ${this.provided('space')}); }
        .pd-section { margin-block: ${this.provided('space')}; }
        .pd-paragraph { margin-block: ${this.provided('space')}; }
        .pd-sentence { hyphens: manual; }
        .pd-word { overflow-wrap: break-word; }
        .pd-letter { font-kerning: normal; }
        .pd-title { font-size: calc(1.5 * ${this.provided('size')}); font-weight: bold; margin-block-end: ${this.provided('space')}; color: inherit; }
        .pd-container:has(> .pd-title) { text-decoration: none; }
        .pd-heading { font-weight: bold; margin-block: ${this.provided('space')} 0; }
        .pd-line { white-space: pre-wrap; }
        .pd-space { white-space: pre; }
        .pd-break { clear: both; }
        .pd-previous::before { content: '\\2039\\00a0'; }
        .pd-next::after { content: '\\00a0\\203a'; }
        .pa-reference { color: ${this.provided('link')}; }
        .pd-container:has(> .pa-reference) { text-decoration-color: ${this.provided('link')}; text-underline-offset: 0.15em; }
        .pa-self-reference, .pd-title.pa-reference { color: inherit; }
        .pa-referent { scroll-margin-block-start: ${this.provided('space')}; }
        .pa-content { color: ${this.provided('link')}; }
        .pa-table { column-gap: ${this.provided('space')}; row-gap: calc(${this.provided('space')} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-row:first-child .pa-col { font-weight: bold; border-block-end: 1px solid ${this.provided('ink')}; }
        .pa-col { padding-block: calc(${this.provided('space')} / 4); }
        .pa-cover { margin-block-end: calc(2 * ${this.provided('space')}); }
        .pa-cover .pd-title { font-size: calc(2 * ${this.provided('size')}); }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-table-of-contents { margin-block: ${this.provided('space')}; }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${this.provided('space')} / 4); }
        .pa-biography .pd-title { font-variant: small-caps; }
        .pa-autobiography .pd-title { font-style: italic; }
        .pa-paginated { min-height: 50vh; }
        .pa-page { margin-block: ${this.provided('space')}; }
        .pa-open { margin-block-start: 0; }
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

    protected provided(property: keyof Values): (props: { theme: Partial<Values> }) => string {
        return ({ theme }) => theme[property] ?? '';
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
