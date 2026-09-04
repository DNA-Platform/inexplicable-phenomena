import { describe, expect, it } from 'vitest';
import { ComponentType, ReactNode, act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Section } from '@/writing/Section';
import { $Ref, Ref } from '@/reference/Ref';
import { Path } from '@/reference/Path';
import { $ } from '@dna-platform/chemistry';
import { $Reference, Reference } from '@/reference/Reference';
import { Type } from '@/writing/Writing';
import { built, drawn, letter, mounted, word, sentence, paragraph, title, Sentence, Section, Writing } from './written';

const routed = (node: ReactNode, at = '/'): HTMLElement => mounted(<MemoryRouter initialEntries={[at]}>{node}</MemoryRouter>);

describe('a ref assembles its own reference and knows where it points', () => {
    it('the snappy form — markdown in, an external anchor out', () => {
        const { host } = drawn(<Ref>{'[wiki](https://en.wikipedia.org/wiki/Gauge_theory)'}</Ref>);
        const anchor = host.querySelector('a[href]')!;
        expect(anchor).not.toBeNull();
        expect(anchor.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Gauge_theory');
        expect(anchor.textContent).toBe('wiki');
    });

    it('the prop form — a typed path prop and the written words', () => {
        const { host } = drawn(<Ref path="https://en.wikipedia.org/wiki/Gauge_theory">gauge theory</Ref>);
        const anchor = host.querySelector('a[href]')!;
        expect(anchor.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Gauge_theory');
        expect(anchor.textContent).toBe('gauge theory');
    });

    it('the element form — writing beside a held path', () => {
        const { host } = drawn(<Ref>gauge theory<Path>/physics/gauge</Path></Ref>);
        const anchor = host.querySelector('a[href]')!;
        expect(anchor.getAttribute('href')).toBe('/physics/gauge');
        expect(anchor.textContent).toBe('gauge theory');
    });

    it('an internal target without a router still draws a plain anchor', () => {
        const { host } = drawn(<Ref>{'[go](/physics/gauge)'}</Ref>);
        expect(host.querySelector('a')!.getAttribute('href')).toBe('/physics/gauge');
    });

    it('nobody tells it which side it is on — the form decides', () => {
        const outside = built<$Ref>(<Ref>{'[w](https://en.wikipedia.org/wiki/X)'}</Ref>);
        const inside = built<$Ref>(<Ref>{'[g](/physics/gauge)'}</Ref>);
        expect(outside.url).toBe('https://en.wikipedia.org/wiki/X');
        expect(inside.url).toBe('/physics/gauge');
    });

    it('a ref contributes the words of its text to the sentence holding it', () => {
        const outer = built<$Sentence>(
            <Sentence>
                {word(letter('s'), letter('e'), letter('e'))}
                {' '}
                <Ref>{'[gauge theory](/physics/gauge)'}</Ref>
            </Sentence>);
        expect(outer.parts().map(part => part.copy)).toEqual(['see', 'gauge', 'theory']);
        expect(outer.parts().every(part => part instanceof $Word)).toBe(true);
    });
});

describe('an internal reference travels by the router', () => {
    it('a ref inside a routed app navigates without a page load', () => {
        const host = routed(
            <Routes>
                <Route path="/" element={<div>the opening page <Ref>{'[go](/physics/gauge)'}</Ref></div>} />
                <Route path="/physics/gauge" element={<div>the gauge principle page</div>} />
            </Routes>);
        expect(host.textContent).toContain('the opening page');
        const link = host.querySelector('a')!;
        expect(link.getAttribute('href')).toBe('/physics/gauge');
        act(() => { link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })); });
        expect(host.textContent).toContain('the gauge principle page');
        expect(host.textContent).not.toContain('the opening page');
    });

    it('an external url inside a routed app stays a plain anchor', () => {
        const host = routed(
            <Routes>
                <Route path="/" element={<div><Ref>{'[wiki](https://en.wikipedia.org/wiki/X)'}</Ref></div>} />
            </Routes>);
        expect(host.querySelector('a')!.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/X');
    });
});

describe('writing that carries a reference reads as an anchor', () => {
    // Specify is where the library accepts writing: a url-bearing reference gains
    // its minted path there, and only then does the writing read as an anchor.
    it('a reference beside the words wraps the writing in its target', () => {
        const { host, writing } = drawn(<Writing>Whatever<Type>Word</Type><Reference>https://example.org/x</Reference></Writing>);
        expect(host.querySelector('a[href]')).toBeNull();
        const inner = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.annotation)!;
        const reference = (inner.block?.$elements ?? []).find((one): one is $Reference => one instanceof $Reference)!;
        act(() => reference.specify());
        expect(reference.path?.copy).toBe('https://example.org/x');
        const Inner = $(inner as never) as ComponentType;
        const accepted = mounted(<Inner />);
        const anchor = accepted.querySelector('a[href]')!;
        expect(anchor).not.toBeNull();
        expect(anchor.getAttribute('href')).toBe('https://example.org/x');
        expect(anchor.textContent).toContain('Whatever');
    });
});

describe('a reference reads to what it means', () => {
    it('read() follows an address through the catalogue of its own book', async () => {
        const outer = built<$Section>(
            <Section>
                {title(sentence(word(letter('t'))))}
                {paragraph(sentence(word(letter('f'), letter('i'), letter('r'), letter('s'), letter('t'))))}
                {paragraph(sentence(word(letter('s'), letter('e'), letter('c'), letter('o'), letter('n'), letter('d'))), <Ref>{'[back](#Ph:1)'}</Ref>)}
            </Section>);
        const paragraphs = outer.parts();
        const sentences = (paragraphs[2] as $Paragraph).parts();
        const ref = ((sentences[0] as $Composition).parts() as $Writing[]).length >= 0
            ? (paragraphs[2].block?.$elements ?? []).flatMap(one => one instanceof $Writing ? [one] : []).find((one): one is $Ref => one instanceof $Ref)
            : undefined;
        expect(ref).toBeDefined();
        const found = await ref!.read();
        expect(found.copy).toContain('first');
    });
});
