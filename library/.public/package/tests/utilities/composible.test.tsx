import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Location } from '@/reference/Location';
import { Composible } from '@/utilities/Composible';

describe('Composible — contents() is enough; the rest are extension methods', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('canonical is the first content', () => {
        expect(Composible.canonical(sentence()).copy).toBe('the');
    });

    it('where filters and select projects, over anything with contents', () => {
        expect(Composible.where(sentence(), w => w.index === 2)[0].copy).toBe('frame');
        expect(Composible.select(sentence(), w => w.copy)).toEqual(['the', 'frame', 'turns']);
    });

    it('at writes a location standing at the composible', () => {
        const s = sentence();
        const r = Composible.at(s, 2);
        expect(r).toBeInstanceOf($Location);
        expect(r.of).toBe(s);
        expect((r.find() as $Word).copy).toBe('frame');
    });

    it('extend chains references through a level — paths from here to below', () => {
        const s = sentence();
        const letters = Composible.extend(s.ref.contents(), w => w.ref);
        expect(letters.map(r => r.find()!.copy).join('')).toBe('theframeturns');
    });

    it('the class methods delegate — the same answers either way', () => {
        const s = sentence();
        expect(s.where(w => w.index > 1).map(w => w.copy)).toEqual(Composible.where(s, w => w.index > 1).map(w => w.copy));
        expect(s.at(2).equals(Composible.at(s, 2))).toBe(true);
    });
});
