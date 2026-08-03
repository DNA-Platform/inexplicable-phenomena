import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Location } from '@/reference/Location';
import { Composible } from '@/utilities/Composible';

describe('Composible — parts() is enough; the rest are extension methods', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('canonical is the first part', () => {
        expect(Composible.canonical(sentence()).copy).toBe('the');
    });

    it('where filters and select projects, over anything with parts', () => {
        expect(Composible.where(sentence(), w => w.index === 2)[0].copy).toBe('frame');
        expect(Composible.select(sentence(), w => w.copy)).toEqual(['the', 'frame', 'turns']);
    });

    it('at writes a location standing at the composible', () => {
        const s = sentence();
        const r = Composible.at(s, 2);
        expect(r).toBeInstanceOf($Location);
        expect(r.of).toBe(s);
        expect((r.read() as $Word).copy).toBe('frame');
    });

    it('follow reaches on — the followed words, followed again through their own drawers, are the letters', () => {
        const s = sentence();
        const words = s.ref.follow();
        const letters = Composible.follow({ parts: () => words.parts().flatMap(w => w.ref.parts()) });
        expect(letters.parts().map(l => l.copy).join('')).toBe('theframeturns');
    });

    it('follow dereferences the drawer — the catalogue becomes the composition of what its entries find', () => {
        const s = sentence();
        const words = s.ref.follow();
        expect(words.parts().map(w => w.copy)).toEqual(['the', 'frame', 'turns']);
        expect(words.canonical.copy).toBe('the');
        expect((words.at(2).read() as $Word).copy).toBe('frame');
    });

    it('the class methods delegate — the same answers either way', () => {
        const s = sentence();
        expect(s.where(w => w.index > 1).map(w => w.copy)).toEqual(Composible.where(s, w => w.index > 1).map(w => w.copy));
        expect(s.at(2).read().copy).toBe(Composible.at(s, 2).read().copy);
    });
});
