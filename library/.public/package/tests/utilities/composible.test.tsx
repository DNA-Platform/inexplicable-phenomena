import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Location } from '@/reference/Location';
import { $Referent } from '@/reference/Referent';
import { $Chemical } from '@dna-platform/chemistry';

// THE STATICS ARE GONE. Doug: "There should be nothing static in this entire
// framework that is not a member." Every one of these was a member with the
// receiver written out, so the promises below ask the receiver directly and the
// answers are unchanged.
describe('parts() is enough; the rest are members over it', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('canonical is the first part', () => {
        expect(sentence().canonical.copy).toBe('the');
    });

    it('where filters and select projects, over anything with parts', () => {
        // Parts count the syntax: 0 the, 1 space, 2 frame, 3 space, 4 turns.
        expect(sentence().at(2).read().copy).toBe('frame');
        expect(sentence().where(w => w.copy === 'frame')[0].copy).toBe('frame');
        expect(sentence().select(w => w.copy)).toEqual(['the', ' ', 'frame', ' ', 'turns']);
    });

    it('at writes a location standing at the composible', () => {
        const s = sentence();
        const r = s.at(2);
        expect(r).toBeInstanceOf($Location);
        expect(r.$of).toBe(s);
        expect((r.read() as $Word).copy).toBe('frame');
    });

    it('reading reaches on — every part read to its letters gives the writing back', () => {
        const s = sentence();
        const words = s.ref.read();
        // read() answers the sentence itself, so these ARE the words; and a
        // letter is writing that no longer answers read(), so the floor is walked
        // rather than followed.
        const letters = words.parts().flatMap(w => w.parts());
        // Mentioning propagates, so the syntax between the words keeps its
        // letters too — and the floor returns the WRITING rather than a
        // mashed-together reading of it.
        expect(letters.map(l => l.copy).join('')).toBe(s.copy);
        expect(letters.map(l => l.copy).join('')).toBe('the frame turns');
    });

    it('reading the drawer gives the thing — a catalogue reads to the composition it stands for', () => {
        const s = sentence();
        const words = s.ref.read();
        expect(words.parts().map(w => w.copy)).toEqual(['the', ' ', 'frame', ' ', 'turns']);
        expect(words.canonical.copy).toBe('the');
        expect((words.at(2).read() as $Word).copy).toBe('frame');
    });

    it('a member answers about its own parts and nothing is handed a receiver', () => {
        const s = sentence();
        expect(s.where(w => w.role === 'use').map(w => w.copy)).toEqual(s.parts().filter(w => w.role === 'use').map(w => w.copy));
        expect(s.at(2).read().copy).toBe(s.parts()[2].copy);
    });
});

// A REFERENT IS A CHEMICAL. Doug's ruling, queued since sprint 47 and unblocked
// only once every reference form became writing. The one thing it cannot cover
// is a READING — what a book's read() builds out of dereferenced entries — so the
// catalogue equation spells its reference half out rather than inheriting it.
describe('$Referent is a class, and a reading is the one thing that is not one', () => {
    const written = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('everything written is a referent, and a referent is a chemical', () => {
        const s = written();
        expect(s).toBeInstanceOf($Referent);
        expect(s).toBeInstanceOf($Chemical);
        expect(s.ref).toBeInstanceOf($Referent);
        expect(s.parts()[0]).toBeInstanceOf($Referent);
        expect(s.at(0)).toBeInstanceOf($Referent);
    });

});


describe('selectMany — the list monad member the interface was missing', () => {
    const sentence = (): $Sentence => $(<Sentence>the frame turns</Sentence>);

    it('picks a list from each part and joins them', () => {
        const s = sentence();
        expect(s.selectMany(w => [...w.copy])).toEqual([...s.copy]);
    });

    it('is select and then a join, which is what every hand-written flatMap was', () => {
        const s = sentence();
        expect(s.selectMany(w => [...w.copy])).toEqual(s.select(w => [...w.copy]).flat());
    });

    it('and a composition answers it about its own parts', () => {
        const s = sentence();
        expect(s.selectMany(w => [w.copy])).toEqual(s.select(w => w.copy));
    });
});
