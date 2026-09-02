import { describe, it, expect } from 'vitest';
import { $Type, Type, $Trait, Trait } from '@/writing/Writing';
import { $Letter } from '@/writing/Letter';
import { $Word, Word } from '@/writing/Word';
import { $Phrase, Phrase } from '@/writing/Phrase';
import { $Path, Path } from '@/reference/Path';
import { $Reference, Reference } from '@/reference/Reference';
import { $TypeOfDocument, $Document } from '@/writing/Document';
import { $Sentence } from '@/writing/Sentence';
import { Sentence, built, chain, drawn, letter, word } from './written';

describe('a phrase is a sentence that may stand inside one', () => {
    it('a phrase carries spaces where a word may not', () => {
        expect(() => built<$Phrase>(<Phrase>the semantics of books</Phrase>).specify()).not.toThrow();
    });

    it('and it is written on one line', () => {
        expect(() => built<$Phrase>(<Phrase>{'two\nlines'}</Phrase>).specify()).toThrow(/written on one line/);
    });

    it('and it takes words as input, flattening them into one stretch', () => {
        const one = built<$Phrase>(<Phrase>{word(letter('a'))} {word(letter('b'))}</Phrase>);
        expect(one.copy).toBe('a b');
        expect(() => one.specify()).not.toThrow();
    });

    it('and its parts are its words, because it is a sentence', () => {
        const one = built<$Phrase>(<Phrase>{word(letter('a'))} {word(letter('b'))}</Phrase>);
        expect(one.parts().every(part => part instanceof $Word)).toBe(true);
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b']);
    });

    it('and a phrase written as prose composes no words, because the parse above word is not built', () => {
        expect(built<$Phrase>(<Phrase>at last</Phrase>).parts()).toHaveLength(0);
    });
});

describe('a path is a phrase that reads as a url', () => {
    it('a path reads as a url', () => {
        expect(() => built<$Path>(<Path>/books/algebra</Path>).specify()).not.toThrow();
    });

    it('and one that cannot be read as a url is refused, and says so', () => {
        expect(() => built<$Path>(<Path>{'not a url'}</Path>).specify()).toThrow(/a path reads as a url/);
    });
});

describe('a reference is writing carrying a parenthetical path', () => {
    it('a reference answers its path', () => {
        const one = built<$Reference>(<Reference>Algebra<Path>/books/algebra</Path></Reference>);
        expect(one.path).toBeInstanceOf($Path);
        expect(one.path?.copy).toBe('/books/algebra');
    });

    it('and the path is parenthetical, so the two halves stay apart', () => {
        const one = built<$Reference>(<Reference>Algebra<Path>/books/algebra</Path></Reference>);
        expect(one.copy).toBe('Algebra');
        expect(one.path?.parenthetical).toBe(true);
    });

    it('and a reference with no path is refused, naming what is missing', () => {
        expect(() => built<$Reference>(<Reference>Algebra</Reference>).specify()).toThrow(/a reference carries a path/);
    });
});

describe('writing MEANS what its reference refers to', () => {
    it('a sentence carrying a reference answers what it means', () => {
        const one = built<$Sentence>(<Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>);
        expect(one.means).toBeInstanceOf($Reference);
        expect(one.means?.path?.copy).toBe('/books/algebra');
    });

    it('and ordinary prose means nothing, because meaning may be informal', () => {
        expect(built<$Sentence>(<Sentence>{word(letter('a'))}</Sentence>).means).toBeUndefined();
    });

    it('and writing that means something draws as a link to what it means', () => {
        const { host } = drawn(<Reference>Algebra<Path>/books/algebra</Path></Reference>);
        expect(host.querySelector('a')?.getAttribute('href')).toBe('/books/algebra');
    });

    it('and writing that means nothing draws no link', () => {
        expect(drawn(chain.Section('a')).host.querySelector('a')).toBeNull();
    });
});

describe('every part of a composition carries its index', () => {
    it('the one at the top is zero, and it is never assigned', () => {
        expect(built<$Document>(chain.Document('a')).index).toBe(0);
    });

    it('and the parser numbers every part it finds, in written order', () => {
        const one = built<$Document>(chain.Document('deep'));
        expect(one.parts().map(part => part.index)).toEqual([0]);
        expect(one.parts()[0].parts().map(part => part.index)).toEqual([0]);
    });
});

describe('canonical marks an ORDINARY member of a kind, and these are not', () => {
    it('a word of letters is a canonical word', () => {
        expect(built<$Word>(<Word>hi</Word>).canonical).toBe(true);
    });

    it('but a phrase is not, because it carries what a word may not', () => {
        expect(built<$Phrase>(<Phrase>at last</Phrase>).canonical).toBe(false);
    });

    it('nor is a path', () => {
        expect(built<$Path>(<Path>/books/algebra</Path>).canonical).toBe(false);
    });

    it('nor is a reference', () => {
        expect(built<$Reference>(<Reference>Algebra<Path>/books/algebra</Path></Reference>).canonical).toBe(false);
    });
});

describe('an attribute specifies but names no level', () => {
    it('an attribute is a kind of type, and the difference is how writing treats it', () => {
        expect(new $Trait()).toBeInstanceOf($Type);
    });

    it('and an attribute written BEFORE the type is not bound through', () => {
        const { writing } = drawn(chain.Section('a'), <Trait />, <Type>Document</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfDocument);
        expect(writing.traits.length).toBe(1);
    });
});
