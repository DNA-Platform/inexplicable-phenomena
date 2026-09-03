import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Letter, $TypeOfLetter } from '@/writing/Letter';
import { $Composition } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { reflection } from '@/utilities/Reflection';
import { Letter, Word, built, declares, drawn, letter, shown } from './written';

describe('$Letter is the floor', () => {
    it('composes itself, and a descent through it terminates', () => {
        const one = built<$Letter>(letter('a'));
        expect(one.parts()).toEqual([one]);
    });

    it('reads the copy it was written with', () => {
        expect(built<$Letter>(letter('a')).copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(built<$Letter>(letter('a')).type).toBeInstanceOf($TypeOfLetter);
    });

    it('arrives inside a block, and holds one', () => {
        const one = built<$Letter>(letter('a'));
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('affords the four from composition, narrowed, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Letter, member)).toBe(false);
        }
        const one = built<$Letter>(letter('a'));
        expect(one.select(part => part.copy)).toEqual(['a']);
        expect(one.single(part => part.copy === 'a')).toBe(one);
    });
});

describe('a piece of writing TOLD it is a Letter', () => {
    it('is one in the sense of the reading, and nothing is built to say so', () => {
        const { writing } = drawn('a', <Type>Letter</Type>);
        expect(writing instanceof $Letter).toBe(false);
        expect(reflection.stands(writing, 'Letter')).toBe(true);
        expect(writing.copy).toBe('a');
    });

    it('refuses writing that is not one grapheme, and says why', () => {
        const { writing } = drawn('U+0041', <Type>Letter</Type>);
        expect(() => writing.specify()).toThrow(/a letter is one grapheme/);
    });

    it('does not stand as an unrelated kind', () => {
        const { writing } = drawn('a', <Type>Letter</Type>);
        expect(reflection.stands(writing, 'Word')).toBe(false);
    });
});

describe('the reading answers by standing', () => {
    it('asks whether a writing IS a kind, and answers without binding it', () => {
        const { writing } = drawn('a', <Type>Letter</Type>);
        expect(reflection.stands(writing, 'Letter')).toBe(true);
        expect(reflection.stands(writing, 'Word')).toBe(false);
    });

    it('answers a writing carrying no type at all with false rather than a throw', () => {
        expect(reflection.stands(drawn('a').writing, 'Letter')).toBe(false);
    });
});

describe('a letter says what KIND it is, and whether it is canonical', () => {
    const one = (copy: string) => built<$Letter>(letter(copy));

    it('reads its kind off the one grapheme it carries', () => {
        expect(one('a').kind).toBe('alphabetical');
        expect(one('7').kind).toBe('numeric');
        expect(one(' ').kind).toBe('whitespace');
        expect(one(',').kind).toBe('punctuation');
        expect(one('\u{1F642}').kind).toBe('symbolic');
    });

    it('and the CANONICAL letter is the alphabetical one', () => {
        expect(one('a').canonical).toBe(true);
        expect(one('Z').canonical).toBe(true);
        expect(one('7').canonical).toBe(false);
        expect(one(' ').canonical).toBe(false);
        expect(one(',').canonical).toBe(false);
        expect(one('\u{1F642}').canonical).toBe(false);
    });

    it('an alphabetical letter answers its case, and nothing else does', () => {
        expect(one('a').case).toBe('lowercase');
        expect(one('A').case).toBe('uppercase');
        expect(one('7').case).toBe('lowercase');
        expect(one('\u{1F642}').case).toBe('lowercase');
    });

    it('and a script with no case answers none', () => {
        expect(one('中').kind).toBe('alphabetical');
        expect(one('中').canonical).toBe(true);
        expect(one('中').case).toBe('lowercase');
    });
});

describe('a grapheme is one letter however many code points it takes', () => {
    it('a joined emoji is ONE letter, and it is symbolic', () => {
        const one = built<$Letter>(letter('\u{1F468}‍\u{1F469}‍\u{1F467}'));
        expect(one.kind).toBe('symbolic');
        expect(one.canonical).toBe(false);
        expect(() => one.specify()).not.toThrow();
    });

    it('and a word divides on graphemes, not on code points', () => {
        const one = built<$Word>(<Word>{'a\u{1F468}‍\u{1F469}‍\u{1F467}b'}</Word>);
        expect(one.parts().length).toBe(3);
        expect(one.parts().map(part => (part as $Letter).kind)).toEqual(['alphabetical', 'symbolic', 'alphabetical']);
    });
});

describe('what renders the same classifies the same', () => {
    it('a combining accent reads as the letter it draws', () => {
        const composed = built<$Letter>(letter('é'));
        const decomposed = built<$Letter>(letter('é'));
        expect(composed.copy.normalize('NFC')).toBe(decomposed.copy.normalize('NFC'));
        expect(decomposed.kind).toBe(composed.kind);
        expect(decomposed.canonical).toBe(composed.canonical);
        expect(decomposed.case).toBe('lowercase');
    });
});

describe('a writing carrying the letter type keeps the letter law', () => {
    it('one grapheme specifies clean where it stands', () => {
        const { writing } = drawn('a', <Type>Letter</Type>);
        expect(writing.copy).toBe('a');
        expect(() => writing.specify()).not.toThrow();
    });
});

describe('the type specifies, where the letter would have drawn', () => {
    it('one grapheme draws, and two say why they do not', () => {
        expect(shown(<Letter>h</Letter>)).toBe('h');
        expect(() => built<$Letter>(<Letter>hi</Letter>).specify()).toThrow(/a letter is one grapheme, and this one is not/);
    });

    it('and a joined emoji is one, so it draws', () => {
        expect(shown(<Letter>{'\u{1F468}‍\u{1F469}‍\u{1F467}'}</Letter>)).toBe('\u{1F468}‍\u{1F469}‍\u{1F467}');
    });
});
