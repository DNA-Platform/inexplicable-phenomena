import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { text } from '@/tools/html';
import { $Composition, $Word, $Sentence, $Paragraph } from '@/text/Composition';

// These assert the contract of the composition itself. Inputs avoid punctuation so
// the tokenization (still an open domain decision) never enters the truth claim —
// only the invariants do: copy is the content, text() reads a $Writing, parts split
// fresh, and a piece renders.
describe('$Composition — one immutable composition, read on demand', () => {
    it('copy is the content — minted from construction, or composed from members', () => {
        expect(new $Word('hello').copy).toBe('hello');
        expect($Composition.of(new $Word('a'), new $Word('b')).copy).toBe('ab');
    });

    it('text() operates with $Writing — a piece yields its copy', () => {
        expect(text(new $Word('hello'))).toBe('hello');
        expect(text([new $Word('a'), new $Word('b')])).toBe('ab');
    });

    it('parts split the copy fresh, on demand', () => {
        expect(new $Word('hi').characters.parts.map(c => c.copy)).toEqual(['h', 'i']);
        expect(new $Sentence('hello world').words.parts.map(w => w.copy)).toEqual(['hello', 'world']);
    });

    it('a selection reads through levels — a sentence\'s characters', () => {
        expect(new $Sentence('hi yo').characters.parts.map(c => c.copy)).toEqual(['h', 'i', 'y', 'o']);
    });

    it('a minted piece is renderable — it shows its text', () => {
        const W = $(new $Word('hello'));
        const { container } = render(<W />);
        expect(container.textContent).toBe('hello');
    });

    it('an authored composition reads its children as copy', () => {
        const Paragraph = $($Paragraph);
        const { container } = render(<Paragraph>Call me Ishmael</Paragraph>);
        expect(container.textContent).toBe('Call me Ishmael');
    });
});
