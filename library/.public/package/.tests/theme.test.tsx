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
        <Chapter>
            <Cover />
            <Title>[A Paper](/a-paper/)</Title>
            <Author>[A Persona](/a-persona/)</Author>
            <Subject>[The Library](/the-library/)</Subject>
        </Chapter>
        <Chapter>
            <Synopsis />
            <Title>[Synopsis](/a-paper/)</Title>
            <Paragraph>What it argues.</Paragraph>
        </Chapter>
        <Chapter>
            <TableOfContents />
            <Title>[Where Things Are](/a-paper/where-things-are/)</Title>
        </Chapter>
        <Chapter>
            <Title>[A](/a-paper/a/)</Title>
            <Paragraph>
                the words of A <Word>deep <Inked /></Word>
            </Paragraph>
        </Chapter>
    </Book>
);

class $Inked extends $Format {
    style = selection.span`
        color: ${(props: { theme: { ink?: string } }) => props.theme.ink ?? 'unthemed'};
    `;
}
const Inked = $($Inked);

// A LIBRARY'S THEME since Sprint 97's policy — Doug, on whether the base holds values: "none — a library names its
// own"; and on how they reach a template: "Why can't you just have reactive properties and they are templated into
// the string?… Everywhere in a book has access to it." Its properties are reactive fields and nothing else; its
// style is the one component dressing the marks; chemistry's own provision hands the fields to every template beneath.
class $Inky extends $Theme {
    ink = 'black';
    font = 'serif';
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
    override style: ElementType = selection.article`
        max-width: ${(props: { theme: { measure?: string } }) => props.theme.measure ?? ''};
    `;
}
const Inky = $($Inky);
const Dark = $($Dark);
const Wide = $($Wide);

// Doug, 2026-09-27: "one puts their theme in the book. It just occupies the Theme class in the writing folder and should
// be designed to be extended and made to be dynamic"; and 2026-10-02: "a theme [is] a place to have properties, those
// properties can be grabbed and used by other components in the application. It can, optionally, use those to create a
// theme stylesheet associated with the theme. And that's it. Doesn't theme have only-one annotation semantics? It should."
describe('a theme is a format said of a book: a place for properties every component beneath reads, an optional stylesheet, and only one', () => {
    // A BOOK ALWAYS HAS A THEME since Sprint 94 — "If the framework can't assume a theme, it has no place to draw
    // values from" — and since Sprint 97 the framework's is bare: no properties, no style, a div carrying nothing.
    it('a book with no theme written draws under the framework\'s bare theme: a div, no property, no rule of the base\'s', () => {
        const book = shelf(null);
        expect(book.theme).toBeInstanceOf($Theme);
        expect('ink' in book.theme).toBe(false);
        expect(book.theme.style).toBeUndefined();
        const { html, css } = served(book);
        expect(html).toMatch(/^<div class="pd-container">/u);
        expect(css).not.toMatch(/\.pd-(?:book|paragraph|title|annotation)\b/u);
        expect(css).toContain('unthemed');
    });

    it('a library\'s theme hands its fields to every styled element beneath it, templated into the string as the values themselves', () => {
        const book = shelf(<Inky />);
        expect(book.is($Theme)).toBe(true);
        expect((book.theme as $Inky).ink).toBe('black');
        const { html, css } = served(book);
        expect(html).toMatch(/^<div class="[^"]*\bpd-container\b[^"]*">/u);
        expect(html).not.toContain(' style="');
        expect(css).toContain('color:black');
        expect(css).toContain('font-family:serif');
        expect(css).not.toContain('unthemed');
    });

    it('is singular: two themes on a book stand one provider, the front\'s, and $is switches it at one paint', async () => {
        const book = shelf([<Inky key="inky" />, <Dark key="dark" />]);
        expect(book.annotations.expressed($Dark)).toBeDefined();
        expect(book.annotations.find($Theme)).toHaveLength(3);   // the class's own beneath the two written
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Dark);
        expect([...book.containers].filter(layer => typeof layer !== 'string')).toHaveLength(1);
        expect(served(book).css).toContain('color:white');
        const container = await drawn(book);
        expect(container.querySelector('.pd-book')).not.toBeNull();
        await act(async () => { book.$is = Wide; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(book.annotations.expressed($Theme)).toBeInstanceOf($Wide);
        expect(container.querySelector('article')).not.toBeNull();
        expect(stylesInDocument()).toContain('max-width:60rem');
    });

    // R7 — "live reactive properties that can be dynamically set": the provider is chemistry's, a live face over the
    // theme remade when a field changes, so a value written on the theme reaches every template that reads it — as a
    // regenerated class, which is styled-components' own way on a theme switch.
    it('a property set on a drawn theme reaches the styled element beneath, which regenerates its class with the new value', async () => {
        const book = shelf(<Inky />);
        const theme = book.theme as $Inky;
        const container = await drawn(book);
        const inked = container.querySelector('.pd-word')!.parentElement!;
        expect(inked.className).toContain('pd-container');
        const before = inked.className;
        expect(stylesInDocument()).toContain('color:black');
        await act(async () => { theme.ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(theme.ink).toBe('red');
        const after = container.querySelector('.pd-word')!.parentElement!.className;
        expect(after).not.toBe(before);
        const rule = stylesInDocument().match(new RegExp(`\\.${after.split(' ').find(name => !name.startsWith('pd-') && !name.startsWith('sc-'))}\\s*\\{[^}]*\\}`, 'u'))?.[0] ?? '';
        expect(rule).toMatch(/color: ?red/u);
    });

    // R2 — MEASURED 2026-09-29 and pinned as the cost it is, re-measured 2026-10-02 under chemistry's provision: every
    // writing beneath the book redraws once on a theme write — chemistry's diffusion, pitched — and no more than that.
    it('a theme write redraws each writing beneath the book once — chemistry\'s diffusion, pinned', async () => {
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
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                    <Author>[A Persona](/a-persona/)</Author>
                    <Subject>[The Library](/the-library/)</Subject>
                </Chapter>
                <Chapter>
                    <Title>[Words](/a-paper/words/)</Title>
                    <Paragraph>
                        {six.map(i => (
                            <Counted key={i}>
                                <Reads />
                                {`inked ${i}`}
                            </Counted>
                        ))}
                    </Paragraph>
                    <Paragraph>
                        {six.map(i => (
                            <Counted key={i}>
                                <Bolds />
                                {`bold ${i}`}
                            </Counted>
                        ))}
                    </Paragraph>
                </Chapter>
            </Book>
        );
        await drawn(book);
        counted.views = 0;
        await act(async () => { (book.theme as $Inky).ink = 'red'; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(stylesInDocument()).toContain('color:red');
        expect(counted.views).toBeLessThanOrEqual(24);
    });

    // THE PROVIDER IS CHEMISTRY'S since Sprint 97: the layer answers chemistry's theme symbol with its Format's theme,
    // and chemistry's providing() does the rest; Theme overrides no bond, and chemistry's chain rule has nothing to
    // report — the defect Dressing a Library had pitched, "$Theme did not call $Format".
    it('a themed book draws with nothing on the console; the provider answers chemistry\'s theme and imports nothing of styled-components', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        served(shelf(<Inky />));
        const said = [...error.mock.calls, ...warn.mock.calls].map(call => call.map(String).join(' '));
        error.mockRestore();
        warn.mockRestore();
        expect(said.filter(line => /did not call/u.test(line))).toEqual([]);
        const format = readFileSync(join(process.cwd(), 'src/writing/Format.tsx'), 'utf8');
        expect(format).toContain('class $Provider');
        expect(format).toContain('override get [theme]()');
        expect(format).not.toContain('styled-components');
    });

    // E2 — A CLEAN $Theme: the class, themeProvider, theme answering itself, defines with the singular rule, the
    // specification, the export, and nothing else. Doug: "I want $Theme stripped bare."
    it('Theme.tsx is bare: no field, no style, no values, no bond, no augmentation, under thirty lines', () => {
        const theme = readFileSync(join(process.cwd(), 'src/writing/Theme.tsx'), 'utf8');
        expect(theme.split('\n').length).toBeLessThan(30);
        expect(theme).not.toMatch(/\bstyle\b|values|contract|declarations|createTheme|\$Theme\(/u);
        expect(theme).not.toMatch(/^\s+(?:font|size|leading|measure|space|ink|paper|link) = /mu);
        expect(theme).not.toContain('declare module');
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
        const section = built<$Section>(
            <Section>
                <Theme />
                <Heading>h</Heading>
            </Section>
        );
        expect(section.annotations.expressed($Theme)?.specification).toBeInstanceOf(ThemeSpecification);
        expect(section.specify()).toContain('Section: a theme is said of a book, and this is not one');
    });
});
