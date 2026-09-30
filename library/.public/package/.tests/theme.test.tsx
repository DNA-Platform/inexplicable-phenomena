import { describe, it, expect, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { $, selection } from '@dna-platform/chemistry';
import { $Writing, $Format, $Section, Section, Heading, Paragraph, Word, $Word } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Author, Subject, Synopsis, TableOfContents, Title, $Theme, Theme, ThemeSpecification } from '@dna-platform/public';
import type { ReactNode } from 'react';

Element.prototype.scrollIntoView = () => {};

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const stylesInDocument = (): string => [...document.styleSheets]
    .map(sheet => { try { return [...sheet.cssRules].map(rule => rule.cssText).join(''); } catch { return ''; } })
    .concat([...document.querySelectorAll('style')].map(style => style.textContent ?? ''))
    .join('');
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const served = (writing: $Writing): { html: string; css: string } => {
    const Drawn = $(writing);
    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(<Drawn />));
    return { html, css: sheet.getStyleTags() };
};
const shelf = (theme: React.ReactNode): $Book => built<$Book>(
    <Book>
        {theme}
        <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
        <Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title><Paragraph>What it argues.</Paragraph></Chapter>
        <Chapter><TableOfContents /><Title>[Where Things Are](/a-paper/where-things-are/)</Title></Chapter>
        <Chapter><Title>[A](/a-paper/a/)</Title><Paragraph>the words of A <Word>deep <Inked /></Word></Paragraph></Chapter>
    </Book>
);

const counted = { painted: 0 };
class $Inked extends $Format {
    style = selection.span`
        color: ${(props: { theme: { ink?: string } }) => props.theme.ink ?? 'unthemed'};
    `;
}
const Inked = $($Inked);

class $Dark extends $Theme {
    ink = 'white';
    paper = 'black';
}
class $Wide extends $Theme {
    measure = '60rem';
    style = selection.article`
        max-width: ${(props: { theme: { measure?: string } }) => props.theme.measure ?? ''};
    `;
}
const Dark = $($Dark);
const Wide = $($Wide);

// Doug, 2026-09-27: "one puts their theme in the book. It just occupies the Theme class in the writing folder and should
// be designed to be extended and made to be dynamic"; "Maybe theme can have singular semantics, so we can use the
// dynamic annotation system to change themes. That is cool."
describe('a theme is a format said of a book that provides eight live properties to everything the book draws', () => {
    beforeEach(() => { counted.painted = 0; });

    // EVERYTHING IN REACH — Doug, 2026-09-27, asked whether .public should export the sheet's value helper: "The idiom
    // is that the theme is on the book's annotations right? We have the book then the annotations and we can access the
    // theme by type. That should be simple. If it's not, we have to ask why it's hard to get an annotation from the book,
    // because I thought everything would be in reach and it should be." A format is a writing whose book is its parent's.
    // And the one thing that is not: a style is compiled once per class, from a first specimen, so a closure over `this`
    // in a style reads that specimen and never the drawn instance — a style reads the theme through the provider's
    // props, which is what the provider is for.
    it('a format on a book, and one on a chapter, reach the book\'s theme by type; a style reads it through the provider\'s props, never through a closure', () => {
        class $Reaching extends $Format {
            style = selection.div`
                color: ${({ theme }: { theme: { ink?: string } }) => theme.ink ?? 'unprovided'};
                outline-color: ${() => this.book?.annotations.expressed($Theme)?.ink ?? 'unreached'};
            `;
        }
        const Reaching = $($Reaching);
        const book = built<$Book>(
            <Book>
                <Theme />
                <Reaching />
                <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
                <Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title><Paragraph>What it argues.</Paragraph></Chapter>
                <Chapter><TableOfContents /><Title>[Where Things Are](/a-paper/where-things-are/)</Title></Chapter>
                <Chapter><Reaching /><Title>[A](/a-paper/a/)</Title><Paragraph>the words of A</Paragraph></Chapter>
            </Book>
        );
        const onBook = book.annotations.expressed($Reaching);
        const onChapter = (book.parts[3] as $Chapter).annotations.expressed($Reaching);
        expect(onBook?.book?.annotations.expressed($Theme)?.ink).toBe('black');
        expect(onChapter?.book?.annotations.expressed($Theme)?.ink).toBe('black');
        const { css } = served(book);
        expect(css).toContain('color:var(--pd-ink, black)');
        expect(css).not.toContain('unprovided');
        expect(css).toContain('outline-color:unreached');
    });

    // A BOOK ALWAYS HAS A THEME since Sprint 94 — Doug, 2026-09-29: "If the framework can't assume a theme, it has
    // no place to draw values from, right?" The class stands the framework's, so a book with none written draws
    // under the default sheet and a styled element beneath it reads the framework's ink.
    it('a book with no theme written draws under the framework\'s theme, and a styled element beneath it reads its ink', () => {
        const book = shelf(null);
        expect(book.theme).toBeInstanceOf($Theme);
        const { css } = served(book);
        expect(css).toContain('--pd-ink:black');
        expect(css).not.toContain('unthemed');
        expect(css).toContain('--pd-font:serif');
    });

    it('stood in a book, provides to a styled element three levels down, and its default sheet is in the page', () => {
        const book = shelf(<Theme />);
        expect(book.is($Theme)).toBe(true);
        const { css } = served(book);
        expect(css).toContain('--pd-ink:black');
        expect(css).toContain('--pd-font:serif');
        expect(css).toContain('.pd-annotation{display:none;}');
        // THREE LAYERS since Sprint 94: the sheet's first rule is the order statement, its marks' rules sit in
        // pd.theme, its own element's declarations stand unlayered above them, and a Format's output is unlayered.
        expect(css).toContain('@layer pd.invariants,pd.theme;');
        expect(css).toMatch(/@layer pd\.theme\{[\s\S]*\.pd-annotation\{display:none;\}/u);
        expect(css).toMatch(/\{[^{}]*font-family:var\(--pd-font, serif\)/u);
    });

    it('is singular: two themes on a book stand one provider, the front\'s, and $is switches it at one paint', async () => {
        const book = shelf([<Theme key="plain" />, <Dark key="dark" />]);
        expect(book.annotations.expressed($Dark)).toBeDefined();
        expect(book.annotations.find($Theme)).toHaveLength(3);   // the class's own beneath the two written, since Sprint 94
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Dark);
        expect([...book.containers].filter(layer => typeof layer !== 'string')).toHaveLength(1);
        expect(served(book).css).toContain('--pd-ink:white');
        const container = await drawn(book);
        expect(container.querySelector('.pd-book')).not.toBeNull();
        await act(async () => { book.$is = Wide; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Wide);
        expect(container.querySelector('article')).not.toBeNull();
    });

    // R7 — "live reactive properties that can be dynamically set": the provider is the theme's own chemical, so a
    // property set on the theme is news to the provider alone. Since Sprint 94 the eight are CSS custom properties
    // declared on the sheet's element and every rule beneath reads a var(), so the write moves one declaration and
    // no consumer's class — Doug: "Does it factor in having dynamic properties on the theme that can be consumed in
    // the app?"
    it('a property set on a drawn theme moves the sheet\'s declaration, and the styled element beneath keeps its class and reads the new value through it', async () => {
        const book = shelf(<Theme />);
        const theme = book.theme;
        const container = await drawn(book);
        const inked = container.querySelector('.pd-word')!.parentElement!;
        expect(inked.className).toContain('pd-container');
        const before = inked.className;
        expect(stylesInDocument()).toContain('--pd-ink:black');
        await act(async () => { theme.ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(theme.values.ink).toBe('red');
        expect(container.querySelector('.pd-word')!.parentElement!.className).toBe(before);
        expect(stylesInDocument()).toContain('--pd-ink:red');
    });

    // R2 — MEASURED 2026-09-29, and pinned as the cost it is. Before the contract, one write of ink re-rendered
    // twelve of twelve styled elements because the provider's value changed. With the contract the theme's context
    // is one object across the write (probed inside the readers) and no consumer's class regenerates — and every
    // word beneath the book still draws once more, the render and its development double, twenty-four views for
    // twelve words: chemistry's diffusion, a write to an annotation's field walking up to the writing it annotates,
    // the book redrawing all beneath it. That is chemistry's to change and is pitched, never bent around here.
    it('a theme write keeps the contract one object and every class the same, and redraws each writing beneath the book once — chemistry\'s diffusion, pinned', async () => {
        const counted = { views: 0 };
        class $Counted extends $Word { override view(): ReactNode { counted.views++; return super.view(); } }
        class $Reads extends $Format { style = selection.span`color: ${({ theme }) => theme.ink};`; }
        class $Bolds extends $Format { style = selection.span`font-weight: bold;`; }
        const Counted = $($Counted);
        const Reads = $($Reads);
        const Bolds = $($Bolds);
        const six = [0, 1, 2, 3, 4, 5];
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
                <Chapter>
                    <Title>[Words](/a-paper/words/)</Title>
                    <Paragraph>{six.map(i => <Counted key={i}><Reads />{`inked ${i}`}</Counted>)}</Paragraph>
                    <Paragraph>{six.map(i => <Counted key={i}><Bolds />{`bold ${i}`}</Counted>)}</Paragraph>
                </Chapter>
            </Book>
        );
        const container = await drawn(book);
        const classesBefore = [...container.querySelectorAll('.pd-word')].map(word => word.parentElement!.className);
        const contract = book.theme.contract;
        counted.views = 0;
        await act(async () => { book.theme.ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(stylesInDocument()).toContain('--pd-ink:red');
        expect(book.theme.contract).toBe(contract);
        expect([...container.querySelectorAll('.pd-word')].map(word => word.parentElement!.className)).toEqual(classesBefore);
        expect(counted.views).toBe(24);
    });

    // WHERE A LOOK LIVES, since Sprint 94: a mark is ruled by the theme's sheet (skin), by the styled component of
    // the Format that is its element (layout), or by an annotation's own note (meaning) — and by nothing else, so a
    // mark ruled nowhere is the finding this promise makes.
    it('comprehends every class the source puts on an element: the classes in src, less the numbered families, are each ruled by its sheet, a Format\'s own component, or an annotation\'s note', () => {
        const sources: string[] = [];
        const walk = (folder: string): void => {
            for (const entry of readdirSync(folder, { withFileTypes: true })) {
                const at = join(folder, entry.name);
                if (entry.isDirectory()) walk(at);
                else if (at.endsWith('.tsx') || at.endsWith('.ts')) sources.push(readFileSync(at, 'utf8'));
            }
        };
        walk(join(process.cwd(), 'src'));
        const marks = new Set<string>();
        for (const source of sources)
            for (const found of source.matchAll(/\bp[ad]-[a-z][a-z-]*[a-z]\b(?!\$\{)/g))
                if (!found[0].endsWith('-')) marks.add(found[0]);
        const noted = new Set<string>();
        for (const source of sources)
            for (const found of source.matchAll(/\.(p[ad]-[a-z][a-z-]*[a-z])\b/g))
                noted.add(found[1]);
        const { css } = served(shelf(<Theme />));
        const addressed = new Set([...css.matchAll(/\.(p[ad]-[a-z][a-z-]*[a-z])\b/g)].map(found => found[1]));
        const missing = [...marks].filter(mark => !addressed.has(mark) && !noted.has(mark) && !/-(start|span|cols)$/.test(mark)).sort();
        expect(marks.size).toBeGreaterThan(20);
        expect(missing).toEqual([]);
    });

    // THE ONE LAW — Sprint 94: no property on one element is written by two authors. The theme's sheet writes skin
    // by mark in its layer; the Format that is an element writes that element's layout unlayered. For every mark
    // both address, the properties they write must not meet.
    it('writes no property for one mark from both its sheet and a Format\'s own component: one author per property', () => {
        const { css } = served(shelf(<Theme />));
        const written = new Map<string, Map<string, Set<'sheet' | 'format'>>>();
        const layered = css.match(/@layer pd\.theme\{([\s\S]*?)\}\s*\/\*!sc\*\//u)?.[1] ?? '';
        const unlayered = css.replace(/@layer pd\.[a-z]+\{[\s\S]*?\}\s*\/\*!sc\*\//gu, '');
        const record = (block: string, author: 'sheet' | 'format'): void => {
            for (const rule of block.matchAll(/([^{}]+)\{([^{}]*)\}/gu)) {
                const mark = rule[1].match(/\.(p[ad]-[a-z][a-z-]*[a-z])\b(?![^{]*\.p[ad]-)/u)?.[1];
                if (mark === undefined) continue;
                for (const property of rule[2].split(';').map(declaration => declaration.split(':')[0].trim()).filter(name => name !== '')) {
                    const authors = written.get(mark) ?? new Map<string, Set<'sheet' | 'format'>>();
                    const by = authors.get(property) ?? new Set<'sheet' | 'format'>();
                    by.add(author);
                    authors.set(property, by);
                    written.set(mark, authors);
                }
            }
        };
        record(layered, 'sheet');
        record(unlayered, 'format');
        const twice = [...written].flatMap(([mark, authors]) => [...authors].filter(([, by]) => by.size > 1).map(([property]) => `${mark} ${property}`));
        expect(written.size).toBeGreaterThan(10);
        expect(twice).toEqual([]);
    });

    // A FORMAT'S TEMPLATE CARRIES NO THEME LITERAL — a colour or a length that is not a variable or a structural
    // constant is the theme's to give; the theme's own sheet is the one template allowed its constants.
    it('no Format in src but the Theme writes a colour or a length literal in its styled template', () => {
        const sources: { file: string; text: string }[] = [];
        const walk = (folder: string): void => {
            for (const entry of readdirSync(folder, { withFileTypes: true })) {
                const at = join(folder, entry.name);
                if (entry.isDirectory()) walk(at);
                else if ((at.endsWith('.tsx') || at.endsWith('.ts')) && !at.endsWith('Theme.tsx')) sources.push({ file: entry.name, text: readFileSync(at, 'utf8') });
            }
        };
        walk(join(process.cwd(), 'src'));
        const literals: string[] = [];
        for (const { file, text } of sources) {
            if (!/extends \$Format\b/u.test(text)) continue;
            for (const template of text.matchAll(/selection(?:\.[a-z]+|\([^)]*\))(?:<[^`]*>)?`([^`]*)`/gu))
                for (const found of template[1].matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(|\b(?:red|blue|black|white|gr[ae]y|silver|navy|ivory|teal|green)\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw)\b/gu))
                    literals.push(`${file}: ${found[0]}`);
        }
        expect(literals).toEqual([]);
    });

    it('a subclass overriding its sheet and a property is still a theme where one is asked for, and draws its own sheet', () => {
        const book = shelf(<Wide />);
        expect(book.is($Theme)).toBe(true);
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Wide);
        const { html, css } = served(book);
        expect(html).toContain('<article');
        expect(css).toContain('--pd-measure:60rem');
    });

    it('said of a section, says so when asked', () => {
        const section = built<$Section>(<Section><Theme /><Heading>h</Heading></Section>);
        expect(section.annotations.expressed($Theme)?.specification).toBeInstanceOf(ThemeSpecification);
        expect(section.specify()).toContain('Section: a theme is said of a book, and this is not one');
    });
});
