import { ComponentType, ElementType, ReactNode } from 'react';
import { ThemeProvider, createTheme } from 'styled-components';
import { $, $check, $Chemical, children, inert, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';

export type Values = Record<'font' | 'size' | 'leading' | 'measure' | 'space' | 'ink' | 'paper' | 'link', string>;

declare module 'styled-components' {
    export interface DefaultTheme extends Partial<Values> {
        [property: string]: unknown;
    }
}

export class $Theme extends $Format {
    specification = new ThemeSpecification();
    themeProvider = true;
    font = 'serif';
    size = '1rem';
    leading = '1.5';
    measure = '40rem';
    space = '1rem';
    ink = 'black';
    paper = 'white';
    link = 'blue';
    style: ComponentType<{ className?: string; children?: ReactNode }> = selection.div`
        font-family: ${({ theme }) => theme.font};
        font-size: ${({ theme }) => theme.size};
        line-height: ${({ theme }) => theme.leading};
        color: ${({ theme }) => theme.ink};
        background: ${({ theme }) => theme.paper};
        max-width: ${({ theme }) => theme.measure};
        margin-inline: auto;
        padding: ${({ theme }) => theme.space};
        .pd-container { box-sizing: border-box; color: inherit; }
        .pd-annotation { display: none; }
        .pa-append { white-space: pre; }
        .pd-figure { max-width: 100%; }
        .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9 * ${({ theme }) => theme.size}); white-space: pre; overflow-x: auto; }
        .pd-image { max-width: 100%; height: auto; }
        .pd-svg { max-width: 100%; }
        .pd-book { margin-block: ${({ theme }) => theme.space}; }
        .pd-chapter { margin-block: calc(2 * ${({ theme }) => theme.space}); }
        .pd-section { margin-block: ${({ theme }) => theme.space}; }
        .pd-paragraph { margin-block: ${({ theme }) => theme.space}; }
        .pd-sentence { hyphens: manual; }
        .pd-word { overflow-wrap: break-word; }
        .pd-letter { font-kerning: normal; }
        .pd-title { font-size: calc(1.5 * ${({ theme }) => theme.size}); font-weight: bold; margin-block-end: ${({ theme }) => theme.space}; color: inherit; }
        .pd-container:has(> .pd-title) { text-decoration: none; }
        .pd-heading { font-weight: bold; margin-block: ${({ theme }) => theme.space} 0; }
        .pd-line { white-space: pre-wrap; }
        .pd-space { white-space: pre; }
        .pd-break { clear: both; }
        .pd-previous::before { content: '\\2039\\00a0'; }
        .pd-next::after { content: '\\00a0\\203a'; }
        .pa-reference { color: ${({ theme }) => theme.link}; }
        .pd-container:has(> .pa-reference) { text-decoration-color: ${({ theme }) => theme.link}; text-underline-offset: 0.15em; }
        .pa-self-reference, .pd-title.pa-reference { color: inherit; }
        .pa-referent { scroll-margin-block-start: ${({ theme }) => theme.space}; }
        .pa-content { color: ${({ theme }) => theme.link}; }
        .pa-table { column-gap: ${({ theme }) => theme.space}; row-gap: calc(${({ theme }) => theme.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-row:first-child .pa-col { font-weight: bold; border-block-end: 1px solid ${({ theme }) => theme.ink}; }
        .pa-col { padding-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-cover { margin-block-end: calc(2 * ${({ theme }) => theme.space}); }
        .pa-cover .pd-title { font-size: calc(2 * ${({ theme }) => theme.size}); }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-table-of-contents { margin-block: ${({ theme }) => theme.space}; }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-biography .pd-title { font-variant: small-caps; }
        .pa-autobiography .pd-title { font-style: italic; }
        .pa-paginated { min-height: 50vh; }
        .pa-page { margin-block: ${({ theme }) => theme.space}; }
        .pa-open { margin-block-start: 0; }
        .pa-emphasis { font-style: italic; }
        .pa-bold { font-weight: bold; }
        .pa-underline { text-decoration: underline; }
    `;
    protected _provider!: ElementType;
    @inert() protected _contract!: ReturnType<typeof createTheme<Values>>;
    protected _sheet!: ComponentType<{ className?: string; children?: ReactNode; $values: Values; $vars: Values }>;
    get values(): Values {
        return { font: this.font, size: this.size, leading: this.leading, measure: this.measure, space: this.space, ink: this.ink, paper: this.paper, link: this.link };
    }
    get contract(): Values { return this._contract; }
    get vars(): Values { return this._contract.vars; }
    get sheet(): ComponentType<{ className?: string; children?: ReactNode; $values: Values; $vars: Values }> { return this._sheet; }

    $Theme(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this._contract = createTheme(this.values, { prefix: 'pd' });
        this._sheet = selection(this.style)<{ $values: Values; $vars: Values }>`
            ${({ $values, $vars }) => (Object.keys($values) as (keyof Values)[]).map(key => `${$vars[key]}: ${$values[key]};`).join(' ')}
        `;
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
        const Sheet = this.$theme.sheet;
        return (
            <ThemeProvider theme={this.$theme.contract}>
                <Sheet className={this.$className} $values={this.$theme.values} $vars={this.$theme.vars}>{this[children]}</Sheet>
            </ThemeProvider>
        );
    }
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing.$book === writing, 'a theme is said of a book, and this is not one');
    }
}

export const Theme = $($Theme);
const provider = $($Provider);
