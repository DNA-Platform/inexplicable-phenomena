import { ComponentType, CSSProperties, ElementType, ReactNode } from 'react';
import { ThemeProvider, createTheme } from 'styled-components';
import { $, $check, $Chemical, children, inert, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';

export type Values = Record<'font' | 'size' | 'leading' | 'measure' | 'space' | 'ink' | 'paper' | 'link', string>;

declare module 'styled-components' {
    export interface DefaultTheme extends Values {}
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
    style: ComponentType<{ className?: string; style?: CSSProperties; children?: ReactNode }> = selection.div`
        @layer pd.invariants, pd.theme;
        font-family: ${({ theme }) => theme.font};
        font-size: ${({ theme }) => theme.size};
        line-height: ${({ theme }) => theme.leading};
        color: ${({ theme }) => theme.ink};
        background: ${({ theme }) => theme.paper};
        max-width: ${({ theme }) => theme.measure};
        margin-inline: auto;
        padding: ${({ theme }) => theme.space};
        @layer pd.invariants {
            .pa-parenthetical,
            .pd-container:has(> .pa-parenthetical),
            .pd-container:has(> .pd-container > .pa-parenthetical),
            .pd-container:has(> .pd-container > .pd-container > .pa-parenthetical),
            .pd-container:has(> .pd-container > .pd-container > .pd-container > .pa-parenthetical) {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                margin: -1px !important;
                padding: 0 !important;
                overflow: hidden !important;
                clip-path: inset(50%) !important;
                white-space: nowrap !important;
                border: 0 !important;
            }
            .pa-blank { visibility: hidden !important; }
            .pa-self-reference { text-decoration: none !important; }
            .pa-paginated .pa-page:not(.pa-open) { display: none !important; }
        }
        @layer pd.theme {
            .pd-container { box-sizing: border-box; color: inherit; }
            .pd-annotation { display: none; }
            .pa-append { white-space: pre; }
            .pd-figure { max-width: 100%; }
            .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9 * ${({ theme }) => theme.size}); white-space: pre; overflow-x: auto; counter-reset: line; }
            .pd-code-line { counter-increment: line; }
            .pd-code-line::before { content: counter(line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .hljs-keyword, .hljs-built_in, .hljs-type, .hljs-number, .hljs-literal, .hljs-tag { color: ${({ theme }) => theme.link}; }
            .hljs-string, .hljs-regexp, .hljs-attr, .hljs-name { color: color-mix(in srgb, ${({ theme }) => theme.ink} 70%, ${({ theme }) => theme.paper}); }
            .hljs-comment, .hljs-meta, .hljs-doctag { color: color-mix(in srgb, ${({ theme }) => theme.ink} 55%, ${({ theme }) => theme.paper}); font-style: italic; }
            .hljs-title, .hljs-title.class_, .hljs-title.function_ { font-weight: bold; }
            .pd-image { max-width: 100%; height: auto; }
            .pd-svg { max-width: 100%; }
            .pd-book { margin-block: ${({ theme }) => theme.space}; counter-reset: equation; }
            .pd-chapter { margin-block: calc(2 * ${({ theme }) => theme.space}); }
            .pd-section { margin-block: ${({ theme }) => theme.space}; }
            .pd-paragraph { margin-block: ${({ theme }) => theme.space}; }
            .pd-sentence { hyphens: manual; }
            .pd-word { overflow-wrap: break-word; }
            .pd-letter { font-kerning: normal; }
            .pd-title { font-size: calc(1.5 * ${({ theme }) => theme.size}); font-weight: bold; margin-block-end: ${({ theme }) => theme.space}; color: inherit; }
            .pd-heading { font-weight: bold; margin-block: ${({ theme }) => theme.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-space { white-space: pre; }
            .pd-break { clear: both; }
            .pd-previous::before { content: '\\2039\\00a0'; }
            .pd-next::after { content: '\\00a0\\203a'; }
            .pa-referent { scroll-margin-block-start: ${({ theme }) => theme.space}; }
            .pd-math { white-space: nowrap; }
            .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        }
    `;
    protected _provider!: ElementType;
    @inert() protected _contract!: ReturnType<typeof createTheme<Values>>;
    get values(): Values {
        return { font: this.font, size: this.size, leading: this.leading, measure: this.measure, space: this.space, ink: this.ink, paper: this.paper, link: this.link };
    }
    get contract(): Values { return this._contract; }
    get vars(): Values { return this._contract.vars; }
    get declarations(): CSSProperties {
        const values = this.values;
        return Object.fromEntries((Object.keys(values) as (keyof Values)[]).map(key => [this.vars[key], values[key]])) as CSSProperties;
    }

    $Theme(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this._contract = createTheme(this.values, { prefix: 'pd' });
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
        const Style = this.$theme.style;
        return (
            <ThemeProvider theme={this.$theme.contract}>
                <Style className={this.$className} style={this.$theme.declarations}>{this[children]}</Style>
            </ThemeProvider>
        );
    }
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing.book === writing, 'a theme is said of a book, and this is not one');
    }
}

export const Theme = $($Theme);
const provider = $($Provider);
