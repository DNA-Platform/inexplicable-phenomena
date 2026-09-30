import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Letter, Letter, $Word, Word, $Sentence, Sentence, $Paragraph, Paragraph, $Section, Section, Heading, Permissive, Open, Strict, Closed } from '@dna-platform/public';
import { $Chapter, Chapter, Title, $Book, Book } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

// Doug, 2026-09-27: "Don't we have the composition types put pd-letter, pd-word, etc... The theme should EXACTLY make
// use of all the classes in .public. It exists to comprehend them."
describe('every level marks itself and draws its own element, inline to the sentence and block from the paragraph', () => {
    it('each level wears its mark and its default element', async () => {
        for (const [writing, mark, tag] of [
            [built<$Letter>(<Letter>a</Letter>), 'pd-letter', 'SPAN'],
            [built<$Word>(<Word>word</Word>), 'pd-word', 'SPAN'],
            [built<$Sentence>(<Sentence>a sentence</Sentence>), 'pd-sentence', 'SPAN'],
            [built<$Paragraph>(<Paragraph>a paragraph</Paragraph>), 'pd-paragraph', 'DIV'],
            [built<$Section>(<Section><Heading>h</Heading></Section>), 'pd-section', 'DIV'],
            [built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title></Chapter>), 'pd-chapter', 'DIV'],
            [built<$Book>(<Book><Chapter><Title>[A](/a/)</Title></Chapter></Book>), 'pd-book', 'DIV'],
        ] as const) {
            expect([...writing.classes]).toContain(mark);
            const own = (await drawn(writing)).querySelector(`.${mark}`)!;
            expect(own, mark).not.toBeNull();
            expect(own.tagName, mark).toBe(tag);
        }
    });

    it('a title and a heading wear their own mark beside the sentence\'s, and a subclass inherits its level\'s', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title></Chapter>);
        expect([...chapter.title!.classes]).toEqual(expect.arrayContaining(['pd-sentence', 'pd-title']));
        const section = built<$Section>(<Section><Heading>h</Heading></Section>);
        expect([...section.canonical!.classes]).toEqual(expect.arrayContaining(['pd-sentence', 'pd-heading']));
        class $Aside extends $Paragraph { }
        const Aside = $($Aside);
        expect([...built<$Aside>(<Aside>an aside</Aside>).classes]).toContain('pd-paragraph');
    });
});

describe('Word, Sentence and Paragraph are the intermixed levels, 2, 3 and 4, permissive and open', () => {
    it('each stands its level and its pair in $Define', () => {
        for (const [built_, level] of [
            [built<$Word>(<Word />), 2],
            [built<$Sentence>(<Sentence />), 3],
            [built<$Paragraph>(<Paragraph />), 4],
        ] as const) {
            expect(built_.level).toBe(level);
            expect(built_.is(Permissive)).toBe(true);
            expect(built_.is(Open)).toBe(true);
            expect(built_.specify()).toEqual([]);
        }
    });

    it('a paragraph holds sentences, words, letters and prose, and its parts are the compositions at or below it', () => {
        const paragraph = built<$Paragraph>(
            <Paragraph>
                <Sentence>A <Word>word</Word> and <Letter>a letter</Letter>.</Sentence>
                prose between
                <Word>alone</Word>
            </Paragraph>
        );
        expect(paragraph.parts.length).toBe(2);
        expect(paragraph.parts[0]).toBeInstanceOf($Sentence);
        expect(paragraph.parts[1]).toBeInstanceOf($Word);
        expect(paragraph.specify()).toEqual([]);
        const sentence = paragraph.parts[0];
        expect(sentence.parts.length).toBe(2);
        expect(sentence.parts.map(part => part.level)).toEqual([2, 1]);
    });

    it('a sentence in a sentence is spliced, and one deeper', () => {
        const sentence = built<$Sentence>(<Sentence><Sentence><Word>inner</Word></Sentence><Word>outer</Word></Sentence>);
        expect(sentence.parts.length).toBe(2);
        expect(sentence.parts.every(part => part instanceof $Word)).toBe(true);
        expect(sentence.text.find($Sentence)[0].depth).toBe(1);
    });

    it('permissive refuses a part above the level, and a written Strict or Closed overrides what the class stands', () => {
        expect(built<$Word>(<Word><Sentence /></Word>).specify()).toContain('Word: a permissive composition holds parts at or below its level, and this one holds one above');
        const strict = built<$Paragraph>(<Paragraph><Word /><Strict /></Paragraph>);
        expect(strict.is(Strict)).toBe(true);
        expect(strict.specify()).toContain('Paragraph: a strict composition holds parts at its level or one below, and this one holds another');
        expect(built<$Paragraph>(<Paragraph><Sentence /><Strict /></Paragraph>).specify()).toEqual([]);
        expect(built<$Word>(<Word>prose <Closed /></Word>).specify()).toEqual(['Word: a closed composition holds only writing, and this one holds something else']);
    });

    // Doug, 2026-09-30, on four levels whose $Define stood their own annotations without calling their parent's:
    // "super.$Define being skipped might be a source of bugs." So every override of $Define in src opens by calling
    // its parent's, and this promise reads the source to say so — a default a base stands is a default every class
    // beneath it stands.
    it('every $Define override in src calls its parent\'s first', () => {
        const skipping: string[] = [];
        const walk = (folder: string): void => {
            for (const entry of readdirSync(folder, { withFileTypes: true })) {
                const at = join(folder, entry.name);
                if (entry.isDirectory()) walk(at);
                else if (at.endsWith('.tsx'))
                    for (const found of readFileSync(at, 'utf8').matchAll(/override \$Define\(\): void \{\s*\n\s*([^\n]*)/g))
                        if (!found[1].startsWith('super.$Define();')) skipping.push(`${entry.name}: ${found[1].trim()}`);
            }
        };
        walk(join(process.cwd(), 'src'));
        expect(skipping).toEqual([]);
    });
});
