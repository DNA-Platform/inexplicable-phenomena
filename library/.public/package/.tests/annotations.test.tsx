import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Annotation, $Paragraph, Paragraph, Word, $Word, Section, Heading, $Section, Chapter, $Chapter, Title, Book, $Book, Cover, html } from '@dna-platform/public';
import { Note, $Note, Comment, $Comment, Thought, $Thought, Reaction, $Reaction, Description, $Description } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const served = (writing: $Writing): string => {
    const Drawn = $(writing);
    const sheet = new ServerStyleSheet();
    renderToString(sheet.collectStyles(<Drawn />));
    return sheet.getStyleTags().replace(/\s+/g, '');
};
const words = (writing: $Writing): string => html.copy(writing.text).trim();

const sorts = [
    { Sort: Note, $Sort: $Note, mark: 'pa-note', holds: 'a note holds what was noted of its writing' },
    { Sort: Comment, $Sort: $Comment, mark: 'pa-comment', holds: 'a comment holds what was said about its writing' },
    { Sort: Thought, $Sort: $Thought, mark: 'pa-thought', holds: 'a thought holds what its writing prompted' },
    { Sort: Reaction, $Sort: $Reaction, mark: 'pa-reaction', holds: 'a reaction holds how its writing struck its reader' },
    { Sort: Description, $Sort: $Description, mark: 'pa-description', holds: 'a description holds what its writing is' },
];

// Doug, 2026-11-06: "Annotations are parentheticals within a chapter that don't affect the page. Perhaps they should
// be available in the model so they can be shown by other views, but not in a standard way … A note, a comment, a
// thought, a reaction, a description, and annotation as the base … annotations can be things that actually go in the
// annotations of the writing they annotate so its in the object model."
describe('a sort of annotation goes into the annotations of the writing it annotates, holds its words, and draws nothing', () => {
    it('the package enters the annotations before the writing, so the base is built on a writing that exists', () => {
        expect(Object.getPrototypeOf($Annotation)).toBe($Writing);
        for (const { $Sort } of sorts) expect(Object.getPrototypeOf($Sort)).toBe($Annotation);
    });

    it('the five sorts are words of the package, each an annotation of the base', () => {
        for (const { Sort, $Sort } of sorts) {
            const one = built<$Annotation>(<Sort>what it holds</Sort>);
            expect(one).toBeInstanceOf($Sort);
            expect(one).toBeInstanceOf($Annotation);
            expect(one).toBeInstanceOf($Writing);
        }
    });

    it('a sort stands among a writing\'s children, goes into its annotations and not its text, and holds its words as its own', () => {
        const paragraph = built<$Paragraph>(
            <Paragraph>
                <Note>where the subject turns to the excluded middle</Note>
                Consistency is what logic is about.
            </Paragraph>
        );
        expect(paragraph.is(Note)).toBe(true);
        const note = paragraph.annotations.expressed($Note)!;
        expect(note).toBeInstanceOf($Note);
        expect(words(note)).toBe('where the subject turns to the excluded middle');
        expect(words(paragraph)).toBe('Consistency is what logic is about.');
        expect(paragraph.annotations.find($Note)).toHaveLength(1);
        expect(paragraph.specify()).toEqual([]);
    });

    it('a sort draws nothing: the page carries the writing\'s words alone, the note answers null, and the base writes no rule for its mark', async () => {
        const paragraph = built<$Paragraph>(
            <Paragraph>
                <Thought>the first idea that mattered</Thought>
                the words on the page
            </Paragraph>
        );
        expect(paragraph.annotations.expressed($Thought)!.note()).toBeNull();
        const page = await drawn(paragraph);
        expect(page.textContent!.replace(/\s+/g, ' ').trim()).toBe('the words on the page');
        expect(page.querySelector('.pa-thought')).not.toBeNull();
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                    <Paragraph>
                        <Thought>the first idea that mattered</Thought>
                        the words on the page
                    </Paragraph>
                </Chapter>
            </Book>
        );
        expect(served(book)).not.toContain('.pa-thought');
    });

    it('each sort marks its class on the writing it annotates, and the mark goes when the sort is erased', () => {
        for (const { Sort, $Sort, mark } of sorts) {
            const word = built<$Word>(
                <Word>
                    Gödel
                    <Sort>the name that matters</Sort>
                </Word>
            );
            expect([...word.classes]).toContain(mark);
            const sort = word.annotations.expressed($Sort as typeof $Annotation)!;
            sort.erase(word);
            expect([...word.classes]).not.toContain(mark);
        }
    });

    it('a sort goes anywhere a writing is: a word, a section, a chapter, and inside another annotation', () => {
        const word = built<$Word>(<Word>Gödel<Comment>said of a word</Comment></Word>);
        expect(words(word.annotations.expressed($Comment)!)).toBe('said of a word');
        expect(words(word)).toBe('Gödel');
        const section = built<$Section>(
            <Section>
                <Reaction>said of a section</Reaction>
                <Heading>A heading</Heading>
                <Paragraph>a paragraph</Paragraph>
            </Section>
        );
        expect(words(section.annotations.expressed($Reaction)!)).toBe('said of a section');
        const chapter = built<$Chapter>(
            <Chapter>
                <Description>said of a chapter</Description>
                <Title>[A Title](/a-title/)</Title>
                <Paragraph>a paragraph</Paragraph>
            </Chapter>
        );
        expect(words(chapter.annotations.expressed($Description)!)).toBe('said of a chapter');
        const outer = built<$Note>(
            <Note>
                <Thought>said of a note</Thought>
                the note's own words
            </Note>
        );
        expect(words(outer)).toBe('the note\'s own words');
        expect(words(outer.annotations.expressed($Thought)!)).toBe('said of a note');
    });

    it('two sorts on one writing are both held, each found by its own type', () => {
        const paragraph = built<$Paragraph>(
            <Paragraph>
                <Note>noted</Note>
                <Thought>prompted</Thought>
                the words
            </Paragraph>
        );
        expect(paragraph.annotations.find($Note)).toHaveLength(1);
        expect(paragraph.annotations.find($Thought)).toHaveLength(1);
        expect(words(paragraph.annotations.expressed($Note)!)).toBe('noted');
        expect(words(paragraph.annotations.expressed($Thought)!)).toBe('prompted');
    });

    it('a sort holds words, and an empty one is refused by the sentence that says what it holds', () => {
        for (const { Sort, holds } of sorts) {
            const full = built<$Paragraph>(
                <Paragraph>
                    <Sort>something</Sort>
                    the words
                </Paragraph>
            );
            expect(full.specify()).toEqual([]);
            const empty = built<$Paragraph>(
                <Paragraph>
                    <Sort />
                    the words
                </Paragraph>
            );
            expect(empty.specify().join('\n')).toContain(`${holds}, and this one holds nothing`);
        }
    });
});
