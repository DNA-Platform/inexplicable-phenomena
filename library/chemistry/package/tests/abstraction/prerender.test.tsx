import { describe, it, expect, afterEach } from 'vitest';
import React, { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { act, cleanup } from '@testing-library/react';
import { $, $Chemical, $Theme, children, styled, theme } from '@/index';

afterEach(cleanup);

// ─── prerender — a page drawn to a string in one process is hydrated in another ──
// The markup is React's own server markup; the client re-derives every chemical
// from the same classes, matches it byte for byte, and attaches its handlers.
// Nothing crosses the wire but the markup and the sheet.

class $Card extends $Chemical {
    selector = styled.article;
    get background() { return this[theme]?.paper ?? 'rgb(1, 1, 1)'; }
    view(): ReactNode { return <article>{this[children]}</article>; }
}
const Card = $($Card);

class $Page extends $Chemical {
    n = 0;
    view(): ReactNode {
        return <div><Card>card {this.n}</Card><button onClick={() => { this.n++; }}>more</button></div>;
    }
}

class $Palette extends $Theme { paper = 'rgb(10, 10, 10)'; }
const Palette = $($Palette);
const Theme = $($Theme);

class $Book extends $Chemical {
    view(): ReactNode {
        const Worn = $(Theme);
        return <main><Worn><Card>card</Card></Worn></main>;
    }
}

class $Nest extends $Chemical {
    held: $Chemical[] = [];
    $Nest(...held: $Chemical[]) { this.held = held; }
    view(): ReactNode { return <ul>{this.held.map((h, i) => { const One = $(h); return <li key={i}><One /></li>; })}</ul>; }
}

async function hydrated(markup: string, element: React.ReactElement) {
    const client = document.createElement('div');
    client.innerHTML = markup;
    document.body.appendChild(client);
    const said: string[] = [];
    const error = console.error, warn = console.warn;
    console.error = (...a: any[]) => { said.push(a.map(String).join(' ')); };
    console.warn = (...a: any[]) => { said.push(a.map(String).join(' ')); };
    let root: any;
    try { await act(async () => { root = hydrateRoot(client, element); }); }
    finally { console.error = error; console.warn = warn; }
    return { client, said: said.map(s => s.slice(0, 200)), root };
}

const sheet = () => Array.from(document.head.querySelectorAll('style')).map(one => one.textContent).join('\n');

describe('prerender — drawn to a string, hydrated without a word, handlers attached', () => {
    it('a styled chemical renders to a string with its class, hydrates clean, and a click lands', async () => {
        const Page = $($Page);
        const markup = renderToString(<Page />);
        expect(markup).toContain('<article class="');
        const { client, said, root } = await hydrated(markup, <Page />);
        expect(said).toEqual([]);
        expect(client.innerHTML).toBe(markup);
        await act(async () => { (client.querySelector('button') as HTMLButtonElement).click(); });
        expect(client.textContent).toContain('card 1');
        await act(async () => { root.unmount(); });
    });

    it('a theme registered on the book and asked in its view is drawn on the server, and the sheet carries its value', async () => {
        const Book = $($Book);
        $(Book, Theme)(Palette);
        const markup = renderToString(<Book />);
        expect(markup).toContain('<article class="');
        expect(sheet()).toContain('rgb(10, 10, 10)');
        const { said, root } = await hydrated(markup, <Book />);
        expect(said).toEqual([]);
        await act(async () => { root.unmount(); });
    });

    it("the same, registered 'single'", async () => {
        class $Shelf extends $Book { }
        const Shelf = $($Shelf);
        $(Shelf, Theme)(Palette, 'single');
        const markup = renderToString(<Shelf />);
        expect(markup).toContain('<article class="');
        const { said, root } = await hydrated(markup, <Shelf />);
        expect(said).toEqual([]);
        await act(async () => { root.unmount(); });
    });

    it('bond-constructor children render to a string and hydrate clean', async () => {
        const Nest = $($Nest);
        const element = <Nest><Card>a</Card><Card>b</Card></Nest>;
        const markup = renderToString(element);
        expect(markup).toContain('<li>');
        expect(markup.match(/<article/g)?.length).toBe(2);
        const { client, said, root } = await hydrated(markup, element);
        expect(said).toEqual([]);
        expect(client.innerHTML).toBe(markup);
        await act(async () => { root.unmount(); });
    });
});

// ─── what a prerender needs of the compile and of persistence ────────────────
import { $Atom, style } from '@/index';
import { hydration } from '@/implementation/hydration';
import { render } from '@testing-library/react';

describe('prerender — the compile and persistence agree on both sides', () => {
    it("a styled class's component id is its class and its text, never its compile order", () => {
        class $Wide extends $Card { maxWidth = '10px'; }
        const card = (new $Card() as any)[style]?.styledComponentId ?? (new $Card() as any)[style]?.styledComponentId;
        const wide = (new $Wide() as any)[style]?.styledComponentId;
        expect(card).toMatch(/(^|-)Card-[0-9a-z]+$/);
        expect(card).not.toMatch(/^sc-/);
        expect(wide).toMatch(/(^|-)Card-Wide-[0-9a-z]+$/);
    });

    it("a field named by a CSS property the environment's style object lacks still compiles", () => {
        class $Balanced extends $Chemical {
            selector = styled.p;
            textWrap = 'balance';
            inset = '0';
            view(): ReactNode { return <p>balanced</p>; }
        }
        const Balanced = $($Balanced);
        render(<Balanced />);
        expect(sheet()).toContain('text-wrap:balance');
        expect(sheet()).toContain('inset:0');
    });

    it('a persistent chemical hydrating a prerender draws the defaults the server drew, then remembers', async () => {
        localStorage.setItem('$Chemistry.hydration', JSON.stringify({ '$Note': { word: 'kept' } }));
        hydration.load();
        class $Note extends $Atom {
            word = 'default';
            view(): ReactNode { return <p>{this.word}</p>; }
        }
        const Note = $(new $Note());
        expect(render(<Note />).container.textContent).toBe('kept');
        cleanup();
        const markup = renderToString(<Note />);
        expect(markup).toContain('default');
        const { client, said, root } = await hydrated(markup, <Note />);
        expect(said).toEqual([]);
        expect(client.textContent).toBe('kept');
        await act(async () => { root.unmount(); });
        localStorage.removeItem('$Chemistry.hydration');
        hydration.load();
    });
});
