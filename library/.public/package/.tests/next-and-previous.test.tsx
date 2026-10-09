import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Reference, $SelfReference, $Section, Section, Heading, $Paragraph, Paragraph } from '@dna-platform/public';
import { $Book, Book, Cover, Synopsis, TableOfContents, $Chapter, Chapter, Title, $Next, Next, $Previous, Previous, NextSpecification, PreviousSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const shelf = (a: React.ReactNode = null, b: React.ReactNode = null, cover: React.ReactNode = null): $Book => built<$Book>(
    <Book>
        <Chapter>
            <Cover />
            <Title>[A Paper](/a-paper/)</Title>
            {cover}
        </Chapter>
        <Chapter>
            <Synopsis />
            <Title>[Synopsis](/a-paper/)</Title>
            <Paragraph>What it argues.</Paragraph>
        </Chapter>
        <Chapter>
            <TableOfContents />
            <Title>[Where Things Are](/a-paper/where-things-are/)</Title>
        </Chapter>
        <Chapter>
            <Title>[A](/a-paper/a/)</Title>
            {a}
        </Chapter>
        <Chapter>
            <Title>[B](/a-paper/b/)</Title>
            {b}
        </Chapter>
    </Book>
);

// Doug, 2026-09-27: "make Next and Previous loosely coupled components. They should be exemplars of how to make
// components that consume properties. It is a component for a type that represents properties, just as an
// annotation is like a component for a type that confers them."
describe('a next and a previous are words in a chapter that mean the chapter after and before it, made at their bond', () => {
    it('in a chapter, a next means the chapter after it and a previous the chapter before, each a plain reference', () => {
        const book = shelf([<Previous key="back">back</Previous>, <Next key="on">on</Next>]);
        const a = book.text.find($Chapter)[3];
        const [previous] = a.text.find($Previous);
        const [next] = a.text.find($Next);
        expect(next.chapter).toBe(a);
        expect(next.means).toBeInstanceOf($Reference);
        expect(next.means).not.toBeInstanceOf($SelfReference);
        expect(next.means?.identifier).toBe('/a-paper/b/');
        expect(previous.chapter).toBe(a);
        expect(previous.means?.identifier).toBe('/a-paper/where-things-are/');
        expect(next.specification).toBeInstanceOf(NextSpecification);
        expect(previous.specification).toBeInstanceOf(PreviousSpecification);
        expect(a.specify()).toEqual([]);
    });

    it('at the end of the book a next is a self reference to its own chapter, and at the start a previous is', () => {
        const book = shelf(null, <Next>on</Next>, <Previous>back</Previous>);
        const [cover, , , , b] = book.text.find($Chapter);
        const [next] = b.text.find($Next);
        expect(next.means).toBeInstanceOf($SelfReference);
        expect(next.means?.identifier).toBe('/a-paper/b/');
        expect([...next.classes]).toContain('pa-self-reference');
        const [previous] = cover.text.find($Previous);
        expect(previous.means).toBeInstanceOf($SelfReference);
        expect(previous.means?.identifier).toBe('/a-paper/');
        expect([...previous.classes]).toContain('pa-self-reference');
    });

    it('inside a paragraph inside a section, still stands in its chapter', () => {
        const book = shelf(
            <Section>
                <Heading>h</Heading>
                <Paragraph>
                    see <Next>on</Next>
                </Paragraph>
            </Section>
        );
        const a = book.text.find($Chapter)[3];
        const [next] = a.text.find($Section)[0].text.find($Paragraph)[0].text.find($Next);
        expect(next.chapter).toBe(a);
        expect(next.means?.identifier).toBe('/a-paper/b/');
    });

    it('drawn, its words stand inside an anchor to the neighbour, and a self reference\'s inside one to its own chapter', async () => {
        const page = await drawn(shelf(<Next>on</Next>, <Next>on again</Next>));
        const references = [...page.querySelectorAll('.pa-reference')];
        const on = references.find(element => element.textContent?.startsWith('on') && !element.classList.contains('pa-self-reference'));
        expect(on?.closest('a')?.getAttribute('href')).toBe('/a-paper/b/');
        const again = references.find(element => element.textContent?.startsWith('on again'));
        expect(again?.classList.contains('pa-self-reference')).toBe(true);
        expect(again?.closest('a')?.getAttribute('href')).toBe('/a-paper/b/');
    });

    it('built outside a chapter, or bound where the neighbour has no title, says so when asked', () => {
        const next = built<$Next>(<Next>on</Next>);
        expect(next.chapter).toBeUndefined();
        expect(next.means).toBeUndefined();
        expect(next.specify()).toContain('Next: a next stands in a chapter, and this one does not');
        expect(next.specify()).toContain('Next: a next means the chapter after its own, and this one means nothing');
        const previous = built<$Previous>(<Previous>back</Previous>);
        expect(previous.specify()).toContain('Previous: a previous stands in a chapter, and this one does not');
        expect(previous.specify()).toContain('Previous: a previous means the chapter before its own, and this one means nothing');
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                </Chapter>
                <Chapter>
                    <Title>[A](/a-paper/a/)</Title>
                    <Next>on</Next>
                </Chapter>
                <Chapter>
                    <Paragraph>untitled</Paragraph>
                </Chapter>
            </Book>
        );
        const a = book.text.find($Chapter)[1];
        expect(a.text.find($Next)[0].means).toBeUndefined();
        expect(a.specify()).toContain('Chapter / Next 1: a next means the chapter after its own, and this one means nothing');
    });
});
