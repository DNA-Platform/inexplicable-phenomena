import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';
import { $$ } from '@/utilities/Lib';

const Writing = $($Writing);
const Letter = $($Letter);
const Word = $($Word);
const Sentence = $($Sentence);
const Paragraph = $($Paragraph);
const Section = $($Section);
const Document = $($Document);
const File = $($File);

// A LEAF THAT IS NOT COMPOSED — it answers copy off its own state and holds no
// block, which is the case $Writing's optional text exists for.
class $Smiley extends $Writing {
    faces = ['\u{1F642}'];
    override get copy(): string { return this.faces[0]; }
}
const Smiley = $($Smiley);

const letter = (c: string) => <Writing>{c}<Letter /></Writing>;
const word = (...cs: ReactNode[]) => <Writing>{cs}<Word /></Writing>;
const sentence = (...ws: ReactNode[]) => <Writing>{ws}<Sentence /></Writing>;
const paragraph = (...ss: ReactNode[]) => <Writing>{ss}<Paragraph /></Writing>;
const section = (...ps: ReactNode[]) => <Writing>{ps}<Section /></Writing>;
const document = (...ss: ReactNode[]) => <Writing>{ss}<Document /></Writing>;
const file = (...ds: ReactNode[]) => <Writing>{ds}<File /></Writing>;

const built = (element: ReactNode) => $(element as never) as $Writing;

describe('the ladder, written by hand', () => {
    it('a word composes its letters, in the order they were written', () => {
        const it$ = $$(built(word(letter('a'), letter('b'), letter('c'))), $Word);
        expect(it$.parts().map(l => l.copy)).toEqual(['a', 'b', 'c']);
    });

    it('reads all the way down from a file to its letters', () => {
        const whole = built(file(document(section(paragraph(sentence(word(letter('h'), letter('i'))))))));

        // parts() ANSWERS BOUND TYPES, so the ladder is walked by parts() alone.
        const asFile = $$(whole, $File);
        const asDocument = asFile.parts()[0];
        const asSection = asDocument.parts()[0];
        const asParagraph = asSection.parts()[0];
        const asSentence = asParagraph.parts()[0];
        const asWord = asSentence.parts()[0];

        expect(asFile.parts().length).toBe(1);
        expect(asDocument.parts().length).toBe(1);
        expect(asSection.parts().length).toBe(1);
        expect(asParagraph.parts().length).toBe(1);
        expect(asSentence.parts().length).toBe(1);
        expect(asWord.parts().map(l => l.copy)).toEqual(['h', 'i']);
        expect(asFile.copy).toBe('hi');
    });

    it('answers canonical as part zero at every rung', () => {
        const asWord = $$(built(word(letter('a'), letter('b'))), $Word);
        expect(asWord.canonical().copy).toBe('a');
    });
});

describe('the five that are written once', () => {
    const asWord = () => $$(built(word(letter('a'), letter('b'), letter('c'))), $Word);

    it('where filters the parts', () => {
        expect(asWord().where(l => l.copy !== 'b').map(l => l.copy)).toEqual(['a', 'c']);
    });

    it('select maps them', () => {
        expect(asWord().select(l => l.copy.toUpperCase())).toEqual(['A', 'B', 'C']);
    });

    it('selectMany flattens', () => {
        expect(asWord().selectMany(l => [l.copy, l.copy])).toEqual(['a', 'a', 'b', 'b', 'c', 'c']);
    });

    it('single takes exactly one, and refuses any other count', () => {
        expect(asWord().single(l => l.copy === 'b').copy).toBe('b');
        expect(() => asWord().single(l => l.copy !== 'b')).toThrow();
    });

    it('and NO level declares any of them', () => {
        for (const level of [$Letter, $Word, $Sentence, $Paragraph, $Section, $Document, $File]) {
            for (const member of ['where', 'select', 'selectMany', 'single', 'canonical']) {
                expect(Object.getOwnPropertyNames(level.prototype)).not.toContain(member);
            }
        }
    });
});

describe('a word whose letters are a MIX', () => {
    it('stands the exotic letter among the plain ones, in order — the walk names what it COMPOSES, never what it FINDS', () => {
        const mixed = built(word(
            letter('h'),
            <Writing><Smiley /><Letter /></Writing>,
            letter('i')
        ));
        const asWord = $$(mixed, $Word);

        expect(asWord.parts().length).toBe(3);
        expect(asWord.parts().map(l => l.copy)).toEqual(['h', '\u{1F642}', 'i']);
        expect(asWord.copy).toBe('h\u{1F642}i');
    });

    it('and each part is a BOUND proxy for its own writing, not a shared one', () => {
        const asWord = $$(built(word(letter('a'), letter('b'))), $Word);
        const [first, second] = asWord.parts();
        expect(first).not.toBe(second);
        expect(first.instance).not.toBe(second.instance);
    });
});
