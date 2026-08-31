import { describe, it, expect } from 'vitest';
import { $Type } from '@/writing/Writing';
import { $TypeOfFile } from '@/writing/File';
import { $TypeOfDocument } from '@/writing/Document';
import { $TypeOfSection } from '@/writing/Section';
import { $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfSentence } from '@/writing/Sentence';
import { $TypeOfWord } from '@/writing/Word';
import { $TypeOfLetter } from '@/writing/Letter';
import { $TypeOfBook } from '@/book/Book';
import { $TypeOfChapter } from '@/book/Chapter';
import { $TypeOfTitle } from '@/writing/Title';
import { $TypeOfPhrase } from '@/writing/Phrase';
import { $Document } from '@/writing/Document';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $Word, Word } from '@/writing/Word';
import { Path } from '@/reference/Path';
import { Reference } from '@/reference/Reference';
import { Sentence, built, chain, drawn } from './written';

describe('every level carries a code, and the code names the LEVEL', () => {
    it('each of the seven answers its own', () => {
        expect(new $TypeOfFile().code).toBe('F');
        expect(new $TypeOfDocument().code).toBe('D');
        expect(new $TypeOfSection().code).toBe('S');
        expect(new $TypeOfParagraph().code).toBe('Pa');
        expect(new $TypeOfSentence().code).toBe('Se');
        expect(new $TypeOfWord().code).toBe('Wo');
        expect(new $TypeOfLetter().code).toBe('Le');
    });

    it('and no two collide', () => {
        const codes = [$TypeOfFile, $TypeOfDocument, $TypeOfSection, $TypeOfParagraph, $TypeOfSentence, $TypeOfWord, $TypeOfLetter]
            .map(kind => new kind().code);
        expect(new Set(codes).size).toBe(codes.length);
    });

    it('and a kind at the same level INHERITS it, because the code names a level and not a class', () => {
        expect(new $TypeOfBook().code).toBe('F');
        expect(new $TypeOfChapter().code).toBe('D');
        expect(new $TypeOfTitle().code).toBe('Pa');
        expect(new $TypeOfPhrase().code).toBe('Wo');
    });

    it('and a type that names no level carries no code', () => {
        expect(new $Type().code).toBe('');
    });
});

describe('a piece of writing answers the route TO it', () => {
    it('the route stops at the level it points to, so its depth is the grade', () => {
        const one = built<$Document>(chain.Document('deep'));
        expect(one.ref).toBe('D:0');
        expect(one.parts()[0].ref).toBe('D:0>S:0');
        expect(one.parts()[0].parts()[0].ref).toBe('D:0>S:0>Pa:0');
    });

    it('and a section route is a PREFIX of the paragraph route inside it', () => {
        const one = built<$Document>(chain.Document('deep'));
        const section = one.parts()[0];
        const paragraph = section.parts()[0];
        expect(paragraph.ref.startsWith(section.ref)).toBe(true);
    });

    it('and nothing assigns it — it is computed by walking what holds it', () => {
        const one = built<$Document>(chain.Document('deep'));
        expect(one.parts()[0].ref).toBe(one.parts()[0].ref);
    });
});

describe('a piece of writing answers a five-word slug, which is what says the thing is real', () => {
    it('five words, lowercased and joined', () => {
        const one = built<$Section>(<Section><Title>The correction the whole family rests on it</Title></Section>);
        expect(one.slug).toBe('the-correction-the-whole-family');
    });

    it('and shorter writing answers what it has', () => {
        expect(built<$Word>(<Word>hi</Word>).slug).toBe('hi');
    });

    it('and it changes when the writing changes, which is the whole point', () => {
        const one = built<$Word>(<Word>algebra</Word>);
        const other = built<$Word>(<Word>geometry</Word>);
        expect(one.slug).not.toBe(other.slug);
    });
});

describe('a reference draws the LINK, and only the reference draws it', () => {
    it('the anchor text is the identification alone, with no path inside it', () => {
        const { host } = drawn(<Reference>Algebra<Path>/books/algebra</Path></Reference>);
        const anchor = host.querySelector('a');
        expect(anchor?.getAttribute('href')).toBe('/books/algebra');
        expect(anchor?.textContent).toBe('Algebra');
    });

    it('and a sentence holding a reference draws exactly ONE anchor, around the reference', () => {
        const { host } = drawn(<Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>);
        expect(host.querySelectorAll('a').length).toBe(1);
        expect(host.querySelector('a')?.textContent).toBe('Algebra');
        expect(host.textContent).toContain('Read');
    });

    it('and ordinary prose draws no anchor at all', () => {
        expect(drawn(chain.Section('a')).host.querySelector('a')).toBeNull();
    });
});
