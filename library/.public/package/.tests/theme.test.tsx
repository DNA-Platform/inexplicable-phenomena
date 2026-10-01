import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { $, selection } from '@dna-platform/chemistry';
import { $Writing, $Format, $Section, Section, Heading, Paragraph, Word, $Word } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Author, Subject, Synopsis, TableOfContents, Title, $Theme, Theme, ThemeSpecification } from '@dna-platform/public';
import type { ElementType, ReactNode } from 'react';

Element.prototype.scrollIntoView = () => {};

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
// A LIBRARY'S VALUES ARE DECLARED INLINE ON ITS THEME'S ELEMENT, custom properties in its style attribute, so the
// sheet is the class's own and a book's pages share one file; a declaration is read off the element.
const declared = (container: HTMLElement, name: string): string => (container.querySelector('[style*="--pd-"]') as HTMLElement).style.getPropertyValue(name);
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
const sources = (): { file: string; text: string }[] => {
    const found: { file: string; text: string }[] = [];
    const walk = (folder: string): void => {
        for (const entry of readdirSync(folder, { withFileTypes: true })) {
            const at = join(folder, entry.name);
            if (entry.isDirectory()) walk(at);
            else if (at.endsWith('.tsx') || at.endsWith('.ts')) found.push({ file: entry.name, text: readFileSync(at, 'utf8') });
        }
    };
    walk(join(process.cwd(), 'src'));
    return found;
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

class $Inked extends $Format {
    style = selection.span`
        color: ${(props: { theme: { ink?: string } }) => props.theme.ink ?? 'unthemed'};
    `;
}
const Inked = $($Inked);

// A LIBRARY'S THEME since Sprint 97's policy — Doug, on whether the base holds values: "none — a library names its own."
// Its tokens are reactive fields, named in `values`, and its style is the one component dressing the marks.
class $Inky extends $Theme {
    ink = 'black';
    font = 'serif';
    override get values(): Record<string, string> { return { ink: this.ink, font: this.font }; }
    style: ElementType = selection.div`
        font-family: ${({ theme }: { theme: { font?: string } }) => theme.font ?? ''};
        color: ${({ theme }: { theme: { ink?: string } }) => theme.ink ?? ''};
    `;
}
class $Dark extends $Inky {
    ink = 'white';
}
class $Wide extends $Inky {
    measure = '60rem';
    override get values(): Record<string, string> { return { ...super.values, measure: this.measure }; }
    override style: ElementType = selection.article`
        max-width: ${(props: { theme: { measure?: string } }) => props.theme.measure ?? ''};
    `;
}
const Inky = $($Inky);
const Dark = $($Dark);
const Wide = $($Wide);

// Doug, 2026-09-27: "one puts their theme in the book. It just occupies the Theme class in the writing folder and should
// be designed to be extended and made to be dynamic"; and 2026-10-01: "I want $Theme stripped bare… It is a simple base
// meant to have shared style state and maybe a small theme styled component that can be overridden."
describe('a theme is a format said of a book that provides its values to everything the book draws, and the base holds none', () => {
    // A BOOK ALWAYS HAS A THEME since Sprint 94 — "If the framework can't assume a theme, it has no place to draw
    // values from" — and since Sprint 97 the framework's is bare: no values, no style, a div carrying nothing.
    it('a book with no theme written draws under the framework\'s bare theme: a div, no declaration, no rule of the base\'s', () => {
        const book = shelf(null);
        expect(book.theme).toBeInstanceOf($Theme);
        expect(book.theme.values).toEqual({});
        expect(book.theme.style).toBeUndefined();
        const { html, css } = served(book);
        expect(html).toMatch(/^<div class="pd-container">/u);
        expect(html).not.toContain('--pd-');
        expect(css).not.toMatch(/\.pd-(?:book|paragraph|title|annotation)\b/u);
        expect(css).toContain('unthemed');
    });

    it('a library\'s theme declares the values it names inline on its element, and a styled element beneath reads them as variables', () => {
        const book = shelf(<Inky />);
        expect(book.is($Theme)).toBe(true);
        expect(book.theme.values).toEqual({ ink: 'black', font: 'serif' });
        const { html, css } = served(book);
        expect(html).toMatch(/^<div class="[^"]*\bpd-container\b[^"]*" style="--pd-ink:black;--pd-font:serif">/u);
        expect(css).toContain('color:var(--pd-ink)');
        expect(css).toContain('font-family:var(--pd-font)');
        expect(css).not.toContain('--pd-ink:');
        expect(css).not.toContain('unthemed');
    });

    it('is singular: two themes on a book stand one provider, the front\'s, and $is switches it at one paint', async () => {
        const book = shelf([<Inky key="inky" />, <Dark key="dark" />]);
        expect(book.annotations.expressed($Dark)).toBeDefined();
        expect(book.annotations.find($Theme)).toHaveLength(3);   // the class's own beneath the two written
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Dark);
        expect([...book.containers].filter(layer => typeof layer !== 'string')).toHaveLength(1);
        expect(served(book).html).toContain('--pd-ink:white');
        const container = await drawn(book);
        expect(container.querySelector('.pd-book')).not.toBeNull();
        await act(async () => { book.$is = Wide; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Wide);
        expect(container.querySelector('article')).not.toBeNull();
        expect(declared(container, '--pd-measure')).toBe('60rem');
    });

    // R7 — "live reactive properties that can be dynamically set": the provider is a chemical of Format's own, so a
    // value set on the theme is news to the provider; the write moves one declaration and no consumer's class.
    it('a value set on a drawn theme moves its declaration, and the styled element beneath keeps its class and reads the new value through it', async () => {
        const book = shelf(<Inky />);
        const theme = book.theme as $Inky;
        const container = await drawn(book);
        const inked = container.querySelector('.pd-word')!.parentElement!;
        expect(inked.className).toContain('pd-container');
        const before = inked.className;
        expect(declared(container, '--pd-ink')).toBe('black');
        await act(async () => { theme.ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(theme.values.ink).toBe('red');
        expect(container.querySelector('.pd-word')!.parentElement!.className).toBe(before);
        expect(declared(container, '--pd-ink')).toBe('red');
        expect(stylesInDocument()).not.toContain('--pd-ink:');
    });

    // R2 — MEASURED 2026-09-29 and pinned as the cost it is: no class regenerates on a write, since every rule reads a
    // variable, and every writing beneath the book still draws once more — chemistry's diffusion, pitched.
    it('a theme write regenerates no class, and redraws each writing beneath the book once — chemistry\'s diffusion, pinned', async () => {
        const counted = { views: 0 };
        class $Counted extends $Word { override view(): ReactNode { counted.views++; return super.view(); } }
        class $Reads extends $Format { style = selection.span`color: ${({ theme }: { theme: { ink?: string } }) => theme.ink ?? ''};`; }
        class $Bolds extends $Format { style = selection.span`font-weight: bold;`; }
        const Counted = $($Counted);
        const Reads = $($Reads);
        const Bolds = $($Bolds);
        const six = [0, 1, 2, 3, 4, 5];
        const book = built<$Book>(
            <Book>
                <Inky />
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
        counted.views = 0;
        await act(async () => { (book.theme as $Inky).ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(declared(container, '--pd-ink')).toBe('red');
        expect([...container.querySelectorAll('.pd-word')].map(word => word.parentElement!.className)).toEqual(classesBefore);
        expect(counted.views).toBe(24);
    });

    // THE PROVIDER IS FORMAT'S since Sprint 97's policy, so Theme overrides no bond and chemistry's chain rule has
    // nothing to report — the defect Dressing a Library had pitched, "$Theme did not call $Format".
    it('a themed book draws with nothing on the console: Theme calls Format\'s bond, and the provider is Format\'s', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        served(shelf(<Inky />));
        const said = [...error.mock.calls, ...warn.mock.calls].map(call => call.map(String).join(' '));
        error.mockRestore();
        warn.mockRestore();
        expect(said.filter(line => /did not call/u.test(line))).toEqual([]);
        const theme = readFileSync(join(process.cwd(), 'src/writing/Theme.tsx'), 'utf8');
        expect(theme).not.toContain('class $Provider');
        expect(theme).not.toMatch(/\$Theme\(/u);   // no bond of its own: Format's is the chain
        expect(readFileSync(join(process.cwd(), 'src/writing/Format.tsx'), 'utf8')).toContain('class $Provider');
    });

    // E2 — A CLEAN $Theme: the class, themeProvider, the values hook, defines with the singular rule, the specification,
    // the export, and nothing else. Doug: "I want $Theme stripped bare."
    it('Theme.tsx is bare: no field, no style, no values, no augmentation, under thirty lines', () => {
        const theme = readFileSync(join(process.cwd(), 'src/writing/Theme.tsx'), 'utf8');
        expect(theme.split('\n').length).toBeLessThan(30);
        expect(theme).not.toMatch(/contract|declarations|createTheme/u);
        expect(theme).not.toMatch(/\bstyle\b/u);
        expect(theme).not.toMatch(/^\s+(?:font|size|leading|measure|space|ink|paper|link) = /mu);
        expect(theme).not.toContain('declare module');
        expect(theme).toContain("get values(): Record<string, string> { return {}; }");
    });

    // E1 — A CLEAN .public: no template in src declares a look, and the machinery that ordered a base sheet against
    // components is gone with the sheet. Doug: "I expect to see a CLEAN .public."
    it('no template in src declares a look — a size, colour, weight, margin, padding, border, background or glyph — and src carries no layer, no !important, no :has, no global style, no augmentation', () => {
        const looks: string[] = [];
        for (const { file, text } of sources()) {
            for (const template of text.matchAll(/selection(?:\.[a-z]+|\([^)]*\))(?:\.attrs\([^)]*\))?(?:<[^`]*>)?`([^`]*)`/gu))
                for (const found of template[1].matchAll(/\b(?:font(?:-[a-z]+)?|color|margin(?:-[a-z]+)?|padding(?:-[a-z]+)?|border(?:-[a-z]+)?|background(?:-[a-z]+)?|line-height|letter-spacing|text-transform|text-decoration(?:-[a-z]+)?|opacity|box-shadow|(?:column-|row-)?gap|max-width|min-height|min-width|max-height|width|height|content|white-space|overflow(?:-[a-z]+)?)\s*:/gu))
                    looks.push(`${file}: ${found[0]}`);
            for (const forbidden of ['@layer', '!important', ':has(', 'createGlobalStyle', 'declare module'])
                if (text.includes(forbidden)) looks.push(`${file}: ${forbidden}`);
        }
        expect(looks).toEqual([]);
    });

    it('said of a section, says so when asked', () => {
        const section = built<$Section>(<Section><Theme /><Heading>h</Heading></Section>);
        expect(section.annotations.expressed($Theme)?.specification).toBeInstanceOf(ThemeSpecification);
        expect(section.specify()).toContain('Section: a theme is said of a book, and this is not one');
    });
});
