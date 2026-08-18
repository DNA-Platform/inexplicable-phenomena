import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Location } from '@/reference/Location';
import { $Composible$ } from '@/writing/Composition';
import { $Referent } from '@/reference/Referent';
import { $Chemical } from '@dna-platform/chemistry';

describe('$Composible$ — parts() is enough; the rest are extension methods', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('canonical is the first part', () => {
        expect($Composible$.canonical(sentence()).copy).toBe('the');
    });

    it('where filters and select projects, over anything with parts', () => {
        // Parts count the syntax: 0 the, 1 space, 2 frame, 3 space, 4 turns.
        expect($Composible$.at(sentence(), 2).read().copy).toBe('frame');
        expect($Composible$.where(sentence(), w => w.copy === 'frame')[0].copy).toBe('frame');
        expect($Composible$.select(sentence(), w => w.copy)).toEqual(['the', ' ', 'frame', ' ', 'turns']);
    });

    it('at writes a location standing at the composible', () => {
        const s = sentence();
        const r = $Composible$.at(s, 2);
        expect(r).toBeInstanceOf($Location);
        expect(r.$of).toBe(s);
        expect((r.read() as $Word).copy).toBe('frame');
    });

    it('follow reaches on — every part followed to its letters gives the writing back', () => {
        const s = sentence();
        const words = s.ref.follow();
        // follow() already dereferenced the entries, so these ARE the words; and a
        // letter is writing that no longer answers read(), so the floor is walked
        // rather than followed.
        const letters = words.parts().flatMap(w => w.parts());
        // Mentioning propagates, so the syntax between the words keeps its
        // letters too — and the floor returns the WRITING rather than a
        // mashed-together reading of it.
        expect(letters.map(l => l.copy).join('')).toBe(s.copy);
        expect(letters.map(l => l.copy).join('')).toBe('the frame turns');
    });

    it('follow dereferences the drawer — the catalogue becomes the composition of what its entries find', () => {
        const s = sentence();
        const words = s.ref.follow();
        expect(words.parts().map(w => w.copy)).toEqual(['the', ' ', 'frame', ' ', 'turns']);
        expect(words.canonical.copy).toBe('the');
        expect((words.at(2).read() as $Word).copy).toBe('frame');
    });

    it('the class methods delegate — the same answers either way', () => {
        const s = sentence();
        expect(s.where(w => w.role === 'use').map(w => w.copy)).toEqual($Composible$.where(s, w => w.role === 'use').map(w => w.copy));
        expect(s.at(2).read().copy).toBe($Composible$.at(s, 2).read().copy);
    });
});

// A REFERENT IS A CHEMICAL. Doug's ruling, queued since sprint 47 and unblocked
// only once every reference form became writing. The one thing it cannot cover
// is a READING — what follow() builds out of dereferenced entries — so the
// catalogue equation spells its reference half out rather than inheriting it.
describe('$Referent is a class, and a reading is the one thing that is not one', () => {
    const written = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('everything written is a referent, and a referent is a chemical', () => {
        const s = written();
        expect(s).toBeInstanceOf($Referent);
        expect(s).toBeInstanceOf($Chemical);
        expect(s.ref).toBeInstanceOf($Referent);
        expect(s.parts()[0]).toBeInstanceOf($Referent);
        expect($Composible$.at(s, 0)).toBeInstanceOf($Referent);
    });

});


describe('selectMany — the list monad member the interface was missing', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('picks a list from each part and joins them', () => {
        const of = { parts: () => [[1, 2], [3], []] };
        expect($Composible$.selectMany(of, p => p)).toEqual([1, 2, 3]);
    });

    it('is select and then a join, which is what every hand-written flatMap was', () => {
        const of = { parts: () => ['ab', 'c'] };
        expect($Composible$.selectMany(of, w => [...w])).toEqual(['a', 'b', 'c']);
        expect($Composible$.select(of, w => [...w])).toEqual([['a', 'b'], ['c']]);
    });

    it('and a composition answers it about its own parts', () => {
        const s = sentence();
        expect(s.selectMany(w => [w.copy])).toEqual(s.select(w => w.copy));
    });
});
