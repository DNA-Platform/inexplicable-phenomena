import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Chapter, Chapter, Cover, Title, Author, Subject, $Paragraph, Paragraph, Emphasis, Append, $Figure, Figure, FigureSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const served = (writing: $Book | $Chapter): string => { const Drawn = $(writing); return renderToString(<Drawn />); };

// A FIGURE IS THE LETTER THAT INTERFACES AN APPEND — Sprint 89, Doug, 2026-09-28: "a view-like component like Next…
// specify an input to the resource system, or you can give it contents or both, and it puts the resource content at the
// end of its text"; "Letters can still have annotations right? So we still have a lot of power, and we want annotations
// to work in Symbols too"; "whatever base class interacts with a resource throws if it's not found."
const shelf = (paragraph: React.ReactNode): $Book => built<$Book>(
    <Book>
        <Chapter>
            <Cover />
            <Title>[A Paper](/a-paper/)</Title>
            <Author>[A Persona](/a-persona/)</Author>
            <Subject>[The Library](/the-library/)</Subject>
        </Chapter>
        <Chapter>
            <Title>[The Plate](/a-paper/the-plate/)</Title>
            {paragraph}
            <Append
                identifier="version1"
                type=".tsx"
            >
                {'export const wheel = 1;'}
            </Append>
            <Append type=".ts">{'export const field = 2;'}</Append>
        </Chapter>
    </Book>
);

describe('a figure', () => {
    it('named by identifier, draws that append\'s contents in a letter wearing pd-figure, and nothing of its annotations', () => {
        // AN ANNOTATION'S WRITING IS NOT DRAWN since Sprint 97's S1: the letter's element holds the text and closes.
        const html = served(shelf(
            <Paragraph>
                The wheel: <Figure identifier="version1" />
            </Paragraph>
        ));
        expect(html).toMatch(/<span class="pd-letter pd-figure">export const wheel = 1;<\/span>/u);
    });

    it('named by type alone, finds the append whose identifier is empty', () => {
        const html = served(shelf(
            <Paragraph>
                <Figure type=".ts" />
            </Paragraph>
        ));
        expect(html).toContain('export const field = 2;');
        expect(html).not.toContain('pd-figure">export const wheel');
    });

    it('given contents of its own draws those, and given both draws its own first and the append\'s after', () => {
        const own = served(shelf(
            <Paragraph>
                <Figure>{'const x = 1;'}</Figure>
            </Paragraph>
        ));
        expect(own).toContain('pd-figure">const x = 1;</span>');
        // TWO TEXT NODES SERVED SIDE BY SIDE carry React's own comment between them.
        const both = served(shelf(
            <Paragraph>
                <Figure type=".ts">{'// the field: '}</Figure>
            </Paragraph>
        ));
        expect(both).toMatch(/pd-figure">\/\/ the field: (<!-- -->)?export const field = 2;<\/span>/u);
    });

    it('takes annotations as any letter does: a Format in front dresses it', () => {
        const html = served(shelf(
            <Paragraph>
                <Figure identifier="version1">
                    <Emphasis />
                </Figure>
            </Paragraph>
        ));
        expect(html).toMatch(/<em class="[^"]*pa-emphasis pd-container"><span class="pd-letter pd-figure">export const wheel = 1;<\/span>/u);
    });

    it('names an append its chapter holds, and says so when it does not', () => {
        const book = shelf(
            <Paragraph>
                <Figure identifier="nowhere" />
            </Paragraph>
        );
        expect(book.specify().join('\n')).toContain('a figure names an append its chapter holds, and this one names "nowhere" of type "", which the chapter does not hold');
        // THE FIXTURE BOOK HAS NO SYNOPSIS AND NO TABLE, and says so; only the figure's own sentence is read here.
        const found = shelf(
            <Paragraph>
                <Figure identifier="version1" />
            </Paragraph>
        );
        expect(found.specify().filter(said => said.includes('figure'))).toEqual([]);
        expect(new FigureSpecification()).toBeDefined();
    });

    it('exposes the append it interfaces and its contents', () => {
        const book = shelf(
            <Paragraph>
                <Figure identifier="version1" />
            </Paragraph>
        );
        const figure = (book.parts[1] as $Chapter).text.find($Paragraph)[0].text.find($Figure)[0];
        expect(figure.append?.$identifier).toBe('version1');
        expect(figure.contents).toBe('export const wheel = 1;');
    });
});
