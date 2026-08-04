import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { text } from '@/utilities/html';
import { $Word, Word } from '@/writing/Word';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

describe('$Composition$ — implemented by the composition levels, born through the framework, read fresh from the block', () => {
    it('$(<Word>hello</Word>) is a live $Word whose content is a real block', () => {
        const w: $Word = $(<Word>hello</Word>);
        expect(w).toBeInstanceOf($Word);
        expect(w.copy).toBe('hello');
        expect((w.text as any).$elements.length).toBeGreaterThan(0);
    });

    it('copy reads the block — one word, or a sentence of many', () => {
        const w: $Word = $(<Word>hello</Word>);
        expect(w.copy).toBe('hello');
        const s: $Sentence = $(<Sentence>a b</Sentence>);
        expect(s.copy).toBe('a b');
    });

    const titled = (): $Section => $(<Section><Title>Introduction</Title></Section>);

    it('the inline levels declare themselves — character through paragraph, section unmarked', () => {
        expect($(<Word>hi</Word>).inline).toBe(true);
        expect($(<Sentence>hi</Sentence>).inline).toBe(true);
        expect($(<Paragraph>hi</Paragraph>).inline).toBe(true);
        expect(titled().inline).toBe(false);
    });

    it('a section requires a title — the first element of its block, itself a block', () => {
        const s = titled();
        expect(text(s.title)).toBe('Introduction');
        const c = s.canonical;
        expect(c).toBeInstanceOf($Paragraph);
        expect(c.copy).toBe('Introduction');
    });

    it("validation filters at the parse — a lone apostrophe is no word, don't is one word", () => {
        const s: $Sentence = $(<Sentence>I don't know ' yet</Sentence>);
        expect(s.words.map(w => w.copy)).toEqual(['I', "don't", 'know', 'yet']);
        expect(s.copy).toBe("I don't know ' yet");
        expect(s.letters.map(c => c.copy).join('')).toBe("I don't know ' yet");
    });

    it('an authored inline run arrives as ONE live block, markup preserved through it', () => {
        const { container } = render(<Sentence>Call me <b>Ishmael</b></Sentence>);
        expect(container.textContent).toBe('Call me Ishmael');
        expect(container.querySelector('b')?.textContent).toBe('Ishmael');
    });

    it('readings are fresh, never cached — each read parses anew', () => {
        const w: $Word = $(<Word>hi</Word>);
        expect(w.parts()).not.toBe(w.parts());
        expect(w.parts().map(c => c.copy)).toEqual(['h', 'i']);
        const fresh: $Sentence = $(<Sentence>hello world</Sentence>);
        expect(fresh.words.map(x => x.copy)).toEqual(['hello', 'world']);
    });

    it('letters tile losslessly, words are a lossy parse — the space is a letter no word claims', () => {
        const s: $Sentence = $(<Sentence>hi yo</Sentence>);
        expect(s.letters.map(c => c.copy)).toEqual(['h', 'i', ' ', 'y', 'o']);
        expect(s.letters.map(c => c.copy).join('')).toBe('hi yo');
        expect(s.words.map(w => w.copy)).toEqual(['hi', 'yo']);
        expect(s.words.map(w => w.copy).join('')).toBe('hiyo');
        expect(s.copy).toBe('hi yo');
    });

    it('canonical is the first part', () => {
        expect($(<Sentence>hello world</Sentence>).canonical.copy).toBe('hello');
    });

    it('an evaluated composition is renderable — it shows its block', () => {
        const W = $($(<Word>hello</Word>));
        const { container } = render(<W />);
        expect(container.textContent).toBe('hello');
    });

    it('an authored composition reads its content as copy', () => {
        const { container } = render(<Paragraph>Call me Ishmael</Paragraph>);
        expect(container.textContent).toBe('Call me Ishmael');
    });

    it('a sentence read from a paragraph is renderable on its own', () => {
        const p: $Paragraph = $(<Paragraph>Call me Ishmael. Some years ago.</Paragraph>);
        const S = $(p.parts()[0]) as any;
        const { container } = render(<S />);
        expect(container.textContent).toBe('Call me Ishmael.');
    });
});
