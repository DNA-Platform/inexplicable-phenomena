import { beforeEach, describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { $Composition, Composition } from '@/writing/Composition';
import { $Sentence, TypeOfSentence } from '@/writing/Sentence';
import { $Paragraph, TypeOfParagraph } from '@/writing/Paragraph';
import { $Block, $, cache, hydration } from '@dna-platform/chemistry';
import { $Writing, Type, Trait } from '@/writing/Writing';
import { $Word, $$Word, $TypeOfWord, TypeOfWord } from '@/writing/Word';
import { $Letter } from '@/writing/Letter';
import { $Document, TypeOfDocument } from '@/writing/Document';
import { $Book, $$Book, Book } from '@/book/Book';
import { $Chapter, $$Chapter, Chapter } from '@/book/Chapter';
import { $Cover, Cover } from '@/book/Cover';
import { $Synopsis, Synopsis } from '@/book/Synopsis';
import { $TableOfContents, TableOfContents } from '@/book/TableOfContents';
import { $PageFold, PageFold } from '@/book/PageFold';
import { $Bookmark, Bookmark } from '@/book/Bookmark';
import { $Highlight, Highlight } from '@/book/Highlight';
import { $Reference, Reference } from '@/reference/Reference';
import { $$ } from '@/utilities/Lib';
import { built, drawn, shown, letter, word, sentence, paragraph, section, document, title, file, Sentence, Document, Word, Writing, Paragraph, Section, File } from './written';
import { $Path, Path } from '@/reference/Path';
import { $Section } from '@/writing/Section';
import { $List, List } from '@/writing/List';
import { $Table, Table } from '@/writing/Table';
import { $ReferenceCard, ReferenceCard } from '@/reference/ReferenceCard';
import { $References, References } from '@/reference/References';
import { $Index, Index } from '@/reference/Index';

describe('a composition can be configured with a type to make the thing you need', () => {
    it('configured as a sentence, it composes the words written in it', () => {
        const composed = built<$Composition>(
            <Composition><TypeOfSentence />{word(letter('o'), letter('n'), letter('e'))} {word(letter('t'), letter('w'), letter('o'))}</Composition>);
        const parts = composed.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Word)).toBe(true);
        expect(parts.map(part => part.copy)).toEqual(['one', 'two']);
    });

    it('configured as a sentence, it stands as one', () => {
        const composed = built<$Composition>(<Composition><TypeOfSentence />{word(letter('h'), letter('i'))}</Composition>);
        expect($$(composed)($Sentence)).toBe(true);
        const stood = $$(composed, $Sentence);
        expect(stood).toBeInstanceOf($Sentence);
        expect(stood.parts()).toHaveLength(1);
    });

    it('configured as a paragraph, it composes sentences', () => {
        const composed = built<$Composition>(
            <Composition><TypeOfParagraph />{sentence(word(letter('a')))}{sentence(word(letter('b')))}</Composition>);
        expect(composed.parts()).toHaveLength(2);
        expect(composed.parts().every(part => part instanceof $Sentence)).toBe(true);
    });

    it('configured as a word, it composes letters', () => {
        const composed = built<$Composition>(<Composition><TypeOfWord />{letter('h')}{letter('i')}</Composition>);
        expect(composed.parts()).toHaveLength(2);
        expect(composed.parts().every(part => part instanceof $Letter)).toBe(true);
    });

    it('unconfigured, it composes whatever writing is written in it', () => {
        const composed = built<$Composition>(<Composition>{word(letter('x'))}{sentence(word(letter('y')))}</Composition>);
        expect(composed.parts()).toHaveLength(2);
    });

    it('affords the whole composition surface from the base', () => {
        const composed = built<$Composition>(<Composition><TypeOfSentence />{word(letter('a'))} {word(letter('b'))}</Composition>);
        expect(composed.select(part => part.copy)).toEqual(['a', 'b']);
        expect(composed.where(part => part.copy === 'a')).toHaveLength(1);
        expect(composed.single(part => part.copy === 'b').copy).toBe('b');
    });
});

describe('the catalogue, consulted and comprehended', () => {
    it('a catalogue hands out references that literally represent the parts', async () => {
        const one = built<$Sentence>(sentence(word(letter('h'), letter('i')), ' ', word(letter('y'), letter('o'))));
        const consulted = one.catalogue();
        expect(consulted.parts()).toHaveLength(2);
        expect(consulted.parts().every(reference => reference instanceof $Reference)).toBe(true);
        const read = await Promise.all(consulted.parts().map(reference => reference.read()));
        expect(read.map(one => one.copy)).toEqual(['hi', 'yo']);
    });

    it('a reference holding nothing loaded refuses to read, and says why', async () => {
        const consulted = built<$Sentence>(sentence(word(letter('a')))).catalogue();
        await expect(built<$Reference>(<Reference />).read()).rejects.toThrow(/reads to what it means/);
        await expect(consulted.parts()[0].read()).resolves.toBeInstanceOf($Word);
    });

    it('a printed reference specifies clean — the handle holds its path', () => {
        const printed = built<$Sentence>(sentence(word(letter('a')))).catalogue().parts()[0];
        expect(printed).toBeInstanceOf($Reference);
        if (printed instanceof $Reference) expect(() => printed.specify()).not.toThrow();
    });

    it('a reference carrying no path is refused, naming what is missing', () => {
        expect(() => built<$Reference>(<Reference />).specify()).toThrow(/a reference carries a path/);
    });

    it("a word's letters are the composition of its parts", () => {
        const one = built<$Word>(word(letter('o'), letter('n'), letter('e')));
        expect(one.letters).toBe(one);
        expect(one.letters.parts().map(part => part.copy)).toEqual(['o', 'n', 'e']);
    });

    it("a sentence's letters comprehend through its words", () => {
        const one = built<$Sentence>(sentence(word(letter('h'), letter('i')), ' ', word(letter('y'), letter('o'))));
        expect(one.words.parts()).toHaveLength(2);
        expect(one.letters.parts().map(part => part.copy)).toEqual(['h', 'i', 'y', 'o']);
    });

    it('concatenate joins compositions of the same grade', () => {
        const one = built<$Word>(word(letter('a'), letter('b')));
        const two = built<$Word>(word(letter('c')));
        expect(one.concatenate(two).parts().map(part => part.copy)).toEqual(['a', 'b', 'c']);
    });

    it('a document goes all the way from sections to letters', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a'), letter('b'))))),
            section(paragraph(sentence(word(letter('c')))))));
        expect(one.sections.parts()).toHaveLength(2);
        expect(one.paragraphs.parts()).toHaveLength(2);
        expect(one.sentences.parts()).toHaveLength(2);
        expect(one.words.parts()).toHaveLength(2);
        expect(one.letters.parts().map(part => part.copy)).toEqual(['a', 'b', 'c']);
    });

    it('a book goes from chapters all the way down to letters', () => {
        const one = built<$Book>(
            <Book>
                <Chapter>{section(paragraph(sentence(word(letter('h'), letter('i')))))}</Chapter>
                <Chapter>{section(paragraph(sentence(word(letter('y'), letter('o')))))}</Chapter>
            </Book>);
        expect(one.chapters.parts()).toHaveLength(2);
        expect(one.sections.parts()).toHaveLength(2);
        expect(one.paragraphs.parts()).toHaveLength(2);
        expect(one.sentences.parts()).toHaveLength(2);
        expect(one.words.parts()).toHaveLength(2);
        expect(one.letters.parts().map(part => part.copy)).toEqual(['h', 'i', 'y', 'o']);
    });

    it('a catalogue prints TYPED references — the step code already knows the kind', () => {
        const one = built<$Sentence>(sentence(word(letter('a')), ' ', word(letter('b'))));
        expect(one.catalogue().parts().every(printed => printed instanceof $$Word)).toBe(true);
        const book = built<$Book>(
            <Book><Chapter>{section(paragraph(sentence(word(letter('h')))))}</Chapter></Book>);
        expect(book.catalogue().parts()[0]).toBeInstanceOf($$Chapter);
    });

    it('the source composition is untouched by cataloguing', () => {
        const one = built<$Sentence>(sentence(word(letter('h'), letter('i'))));
        const before = one.parts();
        one.catalogue().comprehend();
        expect(one.parts()).toBe(before);
        expect(one.parts().map(part => part.copy)).toEqual(['hi']);
    });
});

describe('the step, the fragment, and the one-field index', () => {
    it("a printed reference's step lives in its path, matching its referent's place", async () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a'))))),
            section(paragraph(sentence(word(letter('b')))))));
        const consulted = one.catalogue();
        expect(consulted.parts().map(reference => reference.path?.copy)).toEqual(['Sn:0', 'Sn:1']);
        await expect(consulted.parts()[1].read()).resolves.toBe(one.parts()[1]);
    });

    it('a fragment of slash steps descends to the very object', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a'))))),
            section(paragraph(sentence(word(letter('x'), letter('y')))), paragraph(sentence(word(letter('z')))))));
        const steps = '1/1/0/0'.split('/').map(Number);
        const landed = steps.reduce((at: { parts(): { copy: string; parts(): never[] }[] }, step) => at.parts()[step], one as never);
        expect(landed.copy).toBe('z');
    });

    it('a deep part answers its typed address, and the address follows back to the very object', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a'))))),
            section(paragraph(sentence(word(letter('x'), letter('y')))), paragraph(sentence(word(letter('z')))))));
        const z = one.parts()[1].parts()[1].parts()[0].parts()[0];
        expect(one.catalogue().address(z)).toBe('Sn:1/Ph:1/Se:0/Wd:0');
        expect(one.catalogue().follow('Sn:1/Ph:1/Se:0/Wd:0')).toBe(z);
        expect(one.catalogue().follow('1/1/0/0')).toBe(z);
        expect(one.catalogue().follow(one.catalogue().address(z))).toBe(z);
    });

    it('an address into nothing throws, naming position and count', () => {
        const one = built<$Sentence>(sentence(word(letter('a')), ' ', word(letter('b'))));
        expect(() => one.catalogue().follow('9')).toThrow(/position 9 where 2 parts stand/);
        expect(() => one.catalogue().address(built<$Word>(word(letter('q'))))).toThrow(/does not reach/);
    });

    it('a step landing on the wrong kind throws, naming both codes', () => {
        const one = built<$Sentence>(sentence(word(letter('a')), ' ', word(letter('b'))));
        expect(() => one.catalogue().follow('Ph:0')).toThrow(/expected Ph and landed on Wd/);
    });

    it('a span in the terminal step answers the stretch, and an unbounded upper clamps', () => {
        const one = built<$Word>(word(letter('h'), letter('e'), letter('l'), letter('l'), letter('o')));
        expect((one.catalogue().follow('Lr:1-3') as $Composition).parts().map(part => part.copy)).toEqual(['e', 'l', 'l']);
        expect((one.catalogue().follow('Lr:1-999') as $Composition).parts().map(part => part.copy)).toEqual(['e', 'l', 'l', 'o']);
        expect(() => one.catalogue().follow('Lr:1-3/0')).toThrow(/a span stands only in the last step/);
    });

    it('the nine codes are first-and-last and none collide', () => {
        const codes = ['Lr', 'Wd', 'Se', 'Ph', 'Sn', 'Dt', 'Fe', 'Cr', 'Bk'];
        expect(new Set(codes).size).toBe(9);
        const one = built<$Document>(document(section(paragraph(sentence(word(letter('a')))))));
        expect(one.parts()[0].type.code).toBe('Sn');
        expect(one.parts()[0].parts()[0].type.code).toBe('Ph');
    });

    it('the bookmark shape: the handle HOLDS its path, and the path follows back', () => {
        const one = built<$Book>(
            <Book>
                <Chapter>{section(paragraph(sentence(word(letter('h'), letter('i')))))}</Chapter>
                <Chapter>{section(paragraph(sentence(word(letter('y'), letter('o')))))}</Chapter>
            </Book>);
        const handle = one.catalogue().parts()[1];
        expect(handle.path?.copy).toBe('Cr:1');
        expect(one.catalogue().follow(handle.path!.copy)).toBe(one.parts()[1]);
    });

    it('writing that means something wraps its own content as the link', () => {
        const { host } = drawn(<Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>);
        const anchor = host.querySelector('a');
        expect(anchor?.getAttribute('href')).toBe('/books/algebra');
        expect(anchor?.textContent).toContain('Read');
    });

    it('a stacked walk never renumbers shared parts — canonical indices belong to the canonical parent', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a')), word(letter('b'))))),
            section(paragraph(sentence(word(letter('c')))))));
        const lastSentence = one.parts()[1].parts()[0].parts()[0];
        expect(lastSentence.parts().map(part => part.index)).toEqual([0]);
        one.words.parts();
        expect(lastSentence.parts().map(part => part.index)).toEqual([0]);
    });
});

describe('the active document', () => {
    it('a deep letter under a document answers that document', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a'), letter('b')))))));
        const deep = one.parts()[0].parts()[0].parts()[0].parts()[0].parts()[0];
        expect(deep.book()).toBe(one);
    });

    it('a lone sentence answers itself', () => {
        const one = built<$Sentence>(sentence(word(letter('a'))));
        expect(one.book()).toBe(one);
    });

    it('a document written as loose prose adopts what its parse built', () => {
        const one = built<$Document>(<Document>{paragraph(sentence(word(letter('x'))))}</Document>);
        const parsed = one.parts()[0];
        expect(parsed.book()).toBe(one);
        expect(parsed.parts()[0].book()).toBe(one);
    });

    it('a bound stand-in answers the document of what it stands for', () => {
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('h'), letter('i')))))));
        const held = one.parts()[0].parts()[0].parts()[0];
        const stood = $$(held, $Sentence);
        expect(stood.book()).toBe(one);
    });

    it('created in an <X>, a child of X: the type a bond constructor makes answers the document', () => {
        const one = built<$Document>(document(section(paragraph(sentence(word(letter('a')))))));
        expect(one.type.book()).toBe(one);
        expect(one.parts()[0].type.book()).toBe(one);
    });
});

describe("the book's anatomy — roles by position, no flags", () => {
    const page = (copy: string) => section(paragraph(sentence(word(...copy.split('').map(letter)))));

    it('the four kinds arrive by the standard type pattern and stand as chapters', () => {
        const kind = built<$Cover>(<Cover>{page('hi')}</Cover>);
        expect(kind).toBeInstanceOf($Chapter);
        expect($$(kind)($Chapter)).toBe(true);
        expect(() => kind.specify()).not.toThrow();
    });

    it('the cover is first by position; the rest are found by kind, in any order', () => {
        const one = built<$Book>(
            <Book>
                <Cover>{page('a')}</Cover>
                <Chapter>{page('d')}</Chapter>
                <TableOfContents>{page('c')}</TableOfContents>
                <Synopsis>{page('b')}</Synopsis>
            </Book>);
        expect(one.parts()).toHaveLength(4);
        expect(one.cover).toBe(one.parts()[0]);
        expect(one.cover).toBeInstanceOf($Cover);
        expect(one.synopsis).toBe(one.parts()[3]);
        expect(one.tableOfContents).toBe(one.parts()[2]);
    });

    it('a plain book has a cover, because something is first — and nothing else', () => {
        const one = built<$Book>(
            <Book>
                <Chapter>{page('x')}</Chapter>
                <Chapter>{page('y')}</Chapter>
            </Book>);
        expect(one.cover).toBe(one.parts()[0]);
        expect(one.synopsis).toBeUndefined();
        expect(one.tableOfContents).toBeUndefined();
    });

    it("a chapter kind deep in a book answers the book as its document", () => {
        const one = built<$Book>(<Book><Cover>{page('a')}</Cover></Book>);
        expect(one.cover.book()).toBe(one);
        expect(one.cover.parts()[0].book()).toBe(one);
    });
});

describe('a page fold — the folded corner, a reference to a chapter, modeling the view', () => {
    it('a fold is a reference whose path lands on a chapter, and its location models the view', () => {
        const one = built<$PageFold>(<PageFold>two<Path>Cr:1</Path></PageFold>);
        expect(one).toBeInstanceOf($Reference);
        expect(one.path?.copy).toBe('Cr:1');
        expect(one.location).toBe(0);
        one.location = 2;
        expect(one.location).toBe(2);
        expect(() => one.specify()).not.toThrow();
    });

    it('a fold follows its path to the very chapter', () => {
        const book = built<$Book>(
            <Book>
                <Chapter>{section(paragraph(sentence(word(letter('h'), letter('i')))))}</Chapter>
                <Chapter>{section(paragraph(sentence(word(letter('y'), letter('o')))))}</Chapter>
            </Book>);
        const fold = built<$PageFold>(<PageFold>two<Path>Cr:1</Path></PageFold>);
        expect(book.catalogue().follow(fold.path!.copy)).toBe(book.parts()[1]);
    });
});

describe('the book specifies — written as chapters', () => {
    it('a book of chapters specifies clean', () => {
        const one = built<$Book>(
            <Book><Chapter>{section(paragraph(sentence(word(letter('a')))))}</Chapter></Book>);
        expect(() => one.specify()).not.toThrow();
    });

    it('a book written as something else is refused in its own words', () => {
        const one = built<$Book>(<Book>{word(letter('x'))}</Book>);
        expect(() => one.specify()).toThrow(/a book is written as chapters/);
    });
});

describe('the bookmark — inserted somewhere, it finds its chapter', () => {
    const marked = () => {
        const book = built<$Book>(
            <Book>
                <Chapter>{section(paragraph(sentence(word(letter('h'), letter('i')))))}</Chapter>
                <Chapter>{section(paragraph(sentence(word(letter('y'), letter('o')), <Bookmark>here</Bookmark>)))}</Chapter>
            </Book>);
        const within = book.parts()[1].parts()[0].parts()[0].parts()[0];
        const mark = within.annotations.find((one): one is $Bookmark => one instanceof $Bookmark)!;
        return { book, mark };
    };

    it('a bookmark inserted deep in a chapter grabs its parent and finds that chapter', async () => {
        const { book, mark } = marked();
        expect(mark).toBeInstanceOf($$Chapter);
        expect(mark.chapter).toBe(book.parts()[1]);
        const found: $Chapter = await mark.read();
        expect(found).toBe(book.parts()[1]);
    });

    it('the persistence round trip: its printed fragment through a drawer, followed back', () => {
        const { book, mark } = marked();
        const drawer = new Map<string, string>();
        drawer.set('bookmark', book.catalogue().address(mark.chapter!));
        const recalled = drawer.get('bookmark')!;
        expect(recalled).toBe('Cr:1');
        expect(book.catalogue().follow(recalled)).toBe(book.parts()[1]);
    });

    it('a bookmark perhaps has a page fold, and perhaps has none', () => {
        const { mark } = marked();
        expect(mark.pageFold).toBeUndefined();
        mark.pageFold = built<$PageFold>(<PageFold>two<Path>Cr:1</Path></PageFold>);
        expect(mark.pageFold.location).toBe(0);
    });

    it('the writing is untouched by its bookmark', () => {
        const { book } = marked();
        expect(book.parts()[1].letters.parts().map(part => part.copy)).toEqual(['y', 'o']);
    });

    it('a bookmark holds a piece of content, and specifies clean where it stands', () => {
        const { mark } = marked();
        expect(mark.copy).toBe('here');
        expect(() => mark.specify()).not.toThrow();
    });
});

describe('the highlight — a dynamically typed pair of references of the same kind', () => {
    it('the pair re-follows to exactly its stretch', async () => {
        const one = built<$Word>(
            <Word>{letter('h')}{letter('e')}{letter('l')}{letter('l')}{letter('o')}<Highlight><Reference>from<Path>Lr:1</Path></Reference><Reference>to<Path>Lr:3</Path></Reference></Highlight></Word>);
        const marked = one.annotations.find((it): it is $Highlight => it instanceof $Highlight)!;
        expect(marked.pair).toHaveLength(2);
        expect(marked.beginning?.copy).toBe('from');
        expect(marked.ending?.copy).toBe('to');
        expect(() => marked.specify()).not.toThrow();
        const landed = await marked.read() as $Composition;
        expect(landed.parts().map(part => part.copy)).toEqual(['e', 'l', 'l']);
    });

    it('a pair of two kinds is refused, in its own words', () => {
        const one = built<$Word>(
            <Word>{letter('h')}{letter('i')}<Highlight><Reference>from<Path>Lr:0</Path></Reference><Reference>to<Path>Wd:0</Path></Reference></Highlight></Word>);
        const marked = one.annotations.find((it): it is $Highlight => it instanceof $Highlight)!;
        expect(() => marked.specify()).toThrow(/a pair of references of the same kind/);
    });

    it('the word is untouched by its highlight', () => {
        const one = built<$Word>(
            <Word>{letter('h')}{letter('i')}<Highlight><Reference>from<Path>Lr:0</Path></Reference><Reference>to<Path>Lr:1</Path></Reference></Highlight></Word>);
        expect(one.copy).toBe('hi');
        expect(one.parts()).toHaveLength(2);
    });
});

describe('specifically is called in the constructor of writing', () => {
    it('the type acts at birth on writing of its own kind', () => {
        let acted = 0;
        class $Acting extends $Word {
            $Acting(block: $Block) {
                super.$Word(block);
                this._type = $(<TypeOfActing />);
            }
        }
        class $TypeOfActing extends $TypeOfWord {
            override get canonicalForm(): typeof $Writing { return $Acting; }

            override specifically(writing: $Writing): void {
                acted++;
                super.specifically(writing);
            }

            constructor() {
                super();
                this[cache]('Acting');
            }
        }
        const Acting = $($Acting);
        const TypeOfActing = $($TypeOfActing);
        const one = built<$Acting>(<Acting>{letter('h')}{letter('i')}</Acting>);
        expect(acted).toBe(1);
        one.specify();
        expect(acted).toBe(2);
    });
});

describe('the typed references — $$Letter through $$Book, and they are fun', () => {
    it('writing carrying <Type>$Book</Type> stands as a reference to a book', () => {
        const { writing } = drawn('algebra', <Type>$Book</Type>, <Path>Bk:0</Path>);
        expect($$(writing)($$Book)).toBe(true);
        expect($$(writing, $$Book)).toBeInstanceOf($$Book);
    });

    it('its specification refuses a path landing on something else, in its own words', () => {
        const Book = $($$Book);
        const one = built<$$Book>(<Book>algebra<Path>Cr:0</Path></Book>);
        expect(() => one.specify()).toThrow(/a reference to a book lands on one/);
    });

    it('a right-landing reference specifies clean', () => {
        const Chapter = $($$Chapter);
        const one = built<$$Chapter>(<Chapter>two<Path>Cr:1</Path></Chapter>);
        expect(() => one.specify()).not.toThrow();
    });

    it('read is typed: a reference to a word reads to the very word', async () => {
        const Word = $($$Word);
        const held = built<$Word>(word(letter('h'), letter('i')));
        const one = $<$$Word>(<Word />, held, $<$Path>(<Path>Wd:0</Path>));
        const found: $Word = await one.read();
        expect(found).toBe(held);
        expect(found.letters.parts().map(part => part.copy)).toEqual(['h', 'i']);
    });

    it('a page fold IS a reference to a chapter now, and inherits its law', () => {
        const fold = built<$PageFold>(<PageFold>two<Path>Bk:0</Path></PageFold>);
        expect(fold).toBeInstanceOf($$Chapter);
        expect(() => fold.specify()).toThrow(/a reference to a chapter lands on one/);
    });
});

describe('newlines are optional separators, and a newline-stopped sentence is not canonical', () => {
    it('a paragraph of lines parses each line as a sentence', () => {
        const one = built<$Paragraph>(<Paragraph>{'First sentence\nSecond sentence\nThird sentence'}</Paragraph>);
        expect(one.parts()).toHaveLength(3);
        expect(one.parts().map(part => part.canonical)).toEqual([false, false, true]);
    });

    it('a section of blank-line chunks parses each as a paragraph', () => {
        const one = built<$Section>(<Section>{'one two\n\nthree four'}</Section>);
        expect(one.parts()).toHaveLength(2);
    });
});

describe('the list and the table — a paragraph of bullets, a section of rows', () => {
    it('a list behaves exactly like a paragraph and draws its sentences as bullets', () => {
        const one = built<$List>(<List>{'alpha\nbeta\ngamma'}</List>);
        expect(one).toBeInstanceOf($Paragraph);
        expect(one.parts()).toHaveLength(3);
        const { host } = drawn(<List>{'alpha\nbeta\ngamma'}</List>);
        expect(host.querySelectorAll('li')).toHaveLength(3);
        expect(host.textContent).toContain('beta');
    });

    it('a table is a section whose paragraphs are its rows', () => {
        const one = built<$Table>(<Table>{'first row\n\nsecond row'}</Table>);
        expect(one).toBeInstanceOf($Section);
        expect(one.parts()).toHaveLength(2);
        const { host } = drawn(<Table>{'first row\n\nsecond row'}</Table>);
        expect(host.querySelectorAll('tr')).toHaveLength(2);
    });
});

describe('the reference card — decorates its first, exposes the rest', () => {
    it('a card is a list of references whose first is the canonical', async () => {
        const one = built<$ReferenceCard>(
            <ReferenceCard><Reference>{word(letter('a'))}<Path>Wd:0</Path></Reference><Reference>beta<Path>Se:1</Path></Reference><Reference>gamma<Path>Lr:2</Path></Reference></ReferenceCard>);
        expect(one).toBeInstanceOf($Reference);
        expect(one.references).toHaveLength(3);
        expect(one.rest).toHaveLength(2);
        expect(one.path?.copy).toBe('Wd:0');
        expect(() => one.specify()).not.toThrow();
        await expect(one.read()).resolves.toBeInstanceOf($Word);
    });

    it('a card holding something that is not a reference is refused', () => {
        const one = built<$ReferenceCard>(<ReferenceCard>{word(letter('x'))}<Reference>beta<Path>Se:1</Path></Reference></ReferenceCard>);
        expect(() => one.specify()).toThrow(/a reference card is a list of references/);
    });

    it('a reference wearing <Trait>Card</Trait> stands as a card', () => {
        const { writing } = drawn(
            <Reference><Trait>Card</Trait><Reference>{word(letter('a'))}<Path>Wd:0</Path></Reference><Reference>beta<Path>Se:1</Path></Reference></Reference>);
        const wearer = writing.annotations.find((one): one is $Reference => one instanceof $Reference)!;
        expect(wearer.traits).toHaveLength(1);
        expect($$(wearer)($ReferenceCard)).toBe(true);
        const stood = $$(wearer, $ReferenceCard);
        expect(stood).toBeInstanceOf($ReferenceCard);
        expect(stood.first?.path?.copy).toBe('Wd:0');
        expect(stood.rest).toHaveLength(1);
    });
});

describe('the basic view — the encyclopedia look', () => {
    it('a chapter is an article: heading ruled, prose in paragraphs', () => {
        const { host } = drawn(
            <Chapter>{section(title(sentence(word(letter('H'), letter('i')))), paragraph(sentence(word(letter('y'), letter('o')))))}</Chapter>);
        window.document.body.appendChild(host);
        expect(host.querySelector('article')).not.toBeNull();
        const heading = host.querySelector('h2');
        expect(heading?.textContent).toContain('Hi');
        expect(getComputedStyle(heading!).borderBottomColor).toBe('#a2a9b1');
        expect(host.querySelector('p')?.textContent).toContain('yo');
    });

    it('a book opens as the reading column', () => {
        const { host } = drawn(
            <Book><Chapter>{section(title(sentence(word(letter('a')))), paragraph(sentence(word(letter('b')))))}</Chapter></Book>);
        window.document.body.appendChild(host);
        const column = host.querySelector('main');
        expect(column).not.toBeNull();
        expect(getComputedStyle(column!).maxWidth).toBe('960px');
        expect(host.querySelector('article')).not.toBeNull();
    });

    it('a file is the index page — entries ruled into columns', () => {
        const { host } = drawn(
            <File>{document(section(title(sentence(word(letter('c')))), paragraph(sentence(word(letter('d'))))))}</File>);
        window.document.body.appendChild(host);
        const columns = host.querySelector('div');
        expect(columns).not.toBeNull();
        expect(getComputedStyle(columns!).columnCount).toBe('3');
        expect(host.querySelector('main')).toBeNull();
    });

    it('a reference draws as the blue anchor', () => {
        const { host } = drawn(<Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>);
        window.document.body.appendChild(host);
        const anchor = host.querySelector('a')!;
        expect(getComputedStyle(anchor).color).toBe('#3366cc');
    });
});

describe('a document keeps its references — the section at its end', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('the type augments to enforce: a document gets its references section', () => {
        const one = built<$Document>(document(section(paragraph(sentence(word(letter('a')))))));
        expect(one.references).toBeInstanceOf($References);
        expect(() => one.specify()).not.toThrow();
        expect(one.parts()).toHaveLength(1);
        expect(one.copy).toBe('a');
    });

    it('writing told it is a document is augmented the same way at specify', () => {
        const { writing } = drawn(section(paragraph(sentence(word(letter('a'))))), <Type>Document</Type>);
        expect(() => writing.specify()).not.toThrow();
        expect((writing.block?.$elements ?? []).some(one => one instanceof $References)).toBe(true);
    });

    it('a references section authored out of place is refused', () => {
        const one = built<$Document>(<Document><References />{section(paragraph(sentence(word(letter('a')))))}</Document>);
        expect(() => one.specify()).toThrow(/ends with its references/);
    });

    it('printed, the section wears the encyclopedia look — silent in the margin until then', () => {
        const one = built<$References>(<References><Reference>alpha<Path>Se:0</Path></Reference></References>);
        expect(shown(createElement($(one) as never))).toBe('');
        one.$print = true;
        const printed = shown(createElement($(one) as never));
        expect(printed).toContain('References');
        expect(printed).toContain('Se:0');
    });

    it('$print flips the margin', () => {
        const refs = built<$Document>(document(section(paragraph(sentence(word(letter('a'))))))).references;
        expect(refs.$print).toBe(false);
        refs.$print = true;
        expect(refs.parenthetical).toBe(false);
        expect(refs.$print).toBe(true);
    });
});

describe('links persist on active — surviving different pages', () => {
    const settled = async () => { await Promise.resolve(); await Promise.resolve(); };

    it('an activated link is remembered, and its reprint appears active', async () => {
        hydration.forget();
        localStorage.clear();
        const first = built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/x</Path></Reference>));
        const link = first.annotations.find((one): one is $Reference => one instanceof $Reference)!;
        expect(link.$active).toBe(false);
        link.focus();
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('/books/x');
        const again = built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/x</Path></Reference>));
        const reborn = again.annotations.find((one): one is $Reference => one instanceof $Reference)!;
        expect(reborn).not.toBe(link);
        expect(reborn.$active).toBe(true);
        expect(reborn.atomic).toBe(true);
    });

    it('the recall does not echo — a reprint writes nothing back to the store', async () => {
        hydration.forget();
        localStorage.clear();
        const first = built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/z</Path></Reference>));
        first.annotations.find((one): one is $Reference => one instanceof $Reference)!.focus();
        await settled();
        const before = localStorage.getItem('$Chemistry.hydration');
        built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/z</Path></Reference>));
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toBe(before);
    });

    it('the true click persists — the anchor is the trigger', async () => {
        hydration.forget();
        localStorage.clear();
        const { host } = drawn(<Sentence>read <Reference>alpha<Path>/books/w</Path></Reference></Sentence>);
        window.document.body.appendChild(host);
        const { act } = await import('react');
        await act(async () => {
            [...host.querySelectorAll('a')].pop()!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration') ?? '').toContain('/books/w');
    });

    it('focus stacks the link in its references section, and the whole section persists', async () => {
        hydration.forget();
        localStorage.clear();
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a')), <Reference>alpha<Path>/books/p</Path></Reference>))),
            section(paragraph(sentence(word(letter('b')), <Reference>beta<Path>/books/q</Path></Reference>)))));
        const links = one.paragraphs.parts()
            .flatMap(paragraph => paragraph.parts())
            .flatMap(line => line.annotations)
            .filter((mark): mark is $Reference => mark instanceof $Reference);
        links[0].focus();
        links[1].focus();
        expect(one.references.stack).toEqual(['/books/p', '/books/q']);
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('/books/p');

        const reloaded = built<$Document>(document(section(paragraph(sentence(word(letter('c')))))));
        expect(reloaded.references.stack).toContain('/books/p');
        expect(reloaded.references.stack).toContain('/books/q');
    });

    it('unfocus removes from the stack and forgets the link, without moving its neighbors', async () => {
        hydration.forget();
        localStorage.clear();
        const one = built<$Document>(document(
            section(paragraph(sentence(word(letter('a')), <Reference>alpha<Path>/books/p</Path></Reference>))),
            section(paragraph(sentence(word(letter('b')), <Reference>beta<Path>/books/q</Path></Reference>)))));
        const links = one.paragraphs.parts()
            .flatMap(paragraph => paragraph.parts())
            .flatMap(line => line.annotations)
            .filter((mark): mark is $Reference => mark instanceof $Reference);
        links[0].focus();
        links[1].focus();
        links[0].unfocus();
        expect(one.references.stack).toEqual(['/books/q']);
        expect(links[0].$active).toBe(false);
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration') ?? '{}').not.toContain('/books/p"');
    });

    it('atomic withdrawn forgets the link, and its reprint is ordinary', async () => {
        hydration.forget();
        localStorage.clear();
        const first = built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/y</Path></Reference>));
        const link = first.annotations.find((one): one is $Reference => one instanceof $Reference)!;
        link.focus();
        await settled();
        link.atomic = false;
        expect(localStorage.getItem('$Chemistry.hydration') ?? '{}').not.toContain('/books/y');
        const again = built<$Sentence>(sentence(word(letter('a')), <Reference>alpha<Path>/books/y</Path></Reference>));
        const reborn = again.annotations.find((one): one is $Reference => one instanceof $Reference)!;
        expect(reborn.$active).toBe(false);
    });
});

describe('an X nests in an X — up to section, and the outer collects its parts', () => {
    it('a paragraph in a paragraph flattens to sentences', () => {
        const one = built<$Paragraph>(
            <Paragraph>{sentence(word(letter('a')))}{sentence(word(letter('b')))}<Paragraph>{sentence(word(letter('c')))}</Paragraph></Paragraph>);
        expect(one.parts()).toHaveLength(3);
        expect(one.parts().every(part => part instanceof $Sentence)).toBe(true);
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b', 'c']);
    });

    it('a word in a word flattens to letters', () => {
        const one = built<$Word>(<Word>{letter('h')}<Word>{letter('i')}</Word></Word>);
        expect(one.parts()).toHaveLength(2);
        expect(one.copy).toBe('hi');
    });

    it('a section in a section flattens to paragraphs, and the law allows it', () => {
        const one = built<$Section>(
            <Section>{title(sentence(word(letter('T'))))}{paragraph(sentence(word(letter('a'))))}<Section>{title(sentence(word(letter('U'))))}{paragraph(sentence(word(letter('b'))))}</Section></Section>);
        expect(one.parts()).toHaveLength(4);
        expect(() => one.specify()).not.toThrow();
    });

    it('a document does not nest — its type never learned to', () => {
        expect(($(<TypeOfParagraph />) as { nests: boolean }).nests).toBe(true);
        expect(($(<TypeOfDocument />) as { nests: boolean }).nests).toBe(false);
    });
});

describe('the index — a type of References with a strong type', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('an index is a references section under its own aid, and it persists the same way', async () => {
        const one = built<$Index>(<Index><Reference>alpha<Path>/books/i</Path></Reference></Index>);
        expect(one).toBeInstanceOf($References);
        expect(one.$aid).toBe('Index');
        const link = built<$Reference>(<Reference>beta<Path>/books/j</Path></Reference>);
        one.append(link);
        expect(one.stack).toEqual(['/books/j']);
        const settled = async () => { await Promise.resolve(); await Promise.resolve(); };
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"Index"');
    });
});

describe('the margin', () => {
    it('a reference is in the margin — the place where the writing is not', () => {
        const one = built<$Sentence>(<Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>);
        expect(one.copy).toBe('Read ');
        expect(one.means?.path?.copy).toBe('/books/algebra');
        expect(one.annotations.some(mark => mark instanceof $Reference)).toBe(true);
    });
});
