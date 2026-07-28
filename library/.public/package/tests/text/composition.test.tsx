import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { text, enclose } from '@/tools/html';
import { $Word, Word } from '@/text/Word';
import { $Sentence, Sentence } from '@/text/Sentence';
import { $Paragraph, Paragraph } from '@/text/Paragraph';
import { $Section, Section } from '@/text/Section';

describe('$Composition — implemented by the ladder, born through the framework, read fresh from the block', () => {
    it('$(<Word>hello</Word>) is a live $Word whose content is a real block', () => {
        const w = $<$Word>(<Word>hello</Word>);
        expect(w).toBeInstanceOf($Word);
        expect(w.copy).toBe('hello');
        expect((w.block as any).$elements.length).toBeGreaterThan(0);
    });

    it('copy reads the block — one word, or a block enclosing many', () => {
        expect($<$Word>(<Word>hello</Word>).copy).toBe('hello');
        expect(text(enclose([$<$Word>(<Word>a</Word>), $<$Word>(<Word>b</Word>)]))).toBe('ab');
    });

    const titled = () => {
        const title = $<$Paragraph>(<Paragraph>Introduction</Paragraph>).block!;
        const B = $(enclose([title as any]) as any);
        return $<$Section>(<Section><B /></Section>);
    };

    it('the inline levels declare themselves — character through paragraph, section unmarked', () => {
        expect($<$Word>(<Word>hi</Word>).inline).toBe(true);
        expect($<$Sentence>(<Sentence>hi</Sentence>).inline).toBe(true);
        expect($<$Paragraph>(<Paragraph>hi</Paragraph>).inline).toBe(true);
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
        const s = $<$Sentence>(<Sentence>I don't know ' yet</Sentence>);
        expect(s.words.map(w => w.copy)).toEqual(['I', "don't", 'know', 'yet']);
        expect(s.copy).toBe("I don't know ' yet");
        expect(s.characters.map(c => c.copy).join('')).toBe("I don't know ' yet");
    });

    it('an authored inline run arrives as ONE live block, markup preserved through it', () => {
        const { container } = render(<Sentence>Call me <b>Ishmael</b></Sentence>);
        expect(container.textContent).toBe('Call me Ishmael');
        expect(container.querySelector('b')?.textContent).toBe('Ishmael');
    });

    it('readings are fresh, never cached — each read parses anew', () => {
        const w = $<$Word>(<Word>hi</Word>);
        expect(w.parts).not.toBe(w.parts);
        expect(w.parts.map(c => c.copy)).toEqual(['h', 'i']);
        expect($<$Sentence>(<Sentence>hello world</Sentence>).words.map(x => x.copy)).toEqual(['hello', 'world']);
    });

    it('characters tile losslessly, words are a lossy parse — the space is a character no word claims', () => {
        const s = $<$Sentence>(<Sentence>hi yo</Sentence>);
        expect(s.characters.map(c => c.copy)).toEqual(['h', 'i', ' ', 'y', 'o']);
        expect(s.characters.map(c => c.copy).join('')).toBe('hi yo');
        expect(s.words.map(w => w.copy)).toEqual(['hi', 'yo']);
        expect(s.words.map(w => w.copy).join('')).toBe('hiyo');
        expect(s.copy).toBe('hi yo');
    });

    it('canonical is the first part', () => {
        expect($<$Sentence>(<Sentence>hello world</Sentence>).canonical.copy).toBe('hello');
    });

    it('an evaluated composition is renderable — it shows its block', () => {
        const W = $($<$Word>(<Word>hello</Word>));
        const { container } = render(<W />);
        expect(container.textContent).toBe('hello');
    });

    it('an authored composition reads its content as copy', () => {
        const { container } = render(<Paragraph>Call me Ishmael</Paragraph>);
        expect(container.textContent).toBe('Call me Ishmael');
    });

    it('a paragraph renders from its sentences — enclose the parts and mount the block', () => {
        const p = $<$Paragraph>(<Paragraph>Call me Ishmael. Some years ago.</Paragraph>);
        const FromParts = $(enclose(p.parts));
        const { container } = render(<FromParts />);
        expect(container.textContent).toBe('Call me Ishmael.Some years ago.');
    });
});
