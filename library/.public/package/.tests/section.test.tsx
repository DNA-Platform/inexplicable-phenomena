import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $SelfReference } from '@dna-platform/public';
import { $Section, Section, $Heading, Heading, $Paragraph, Paragraph, Sentence, Permissive, Closed, SectionSpecification, HeadingSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

describe('a section is a composition at 5, permissive and closed, whose canonical is its heading', () => {
    it('stands its level and pair, and its canonical is its heading wherever it stands', () => {
        const section = built<$Section>(<Section><Paragraph>first</Paragraph><Heading>the heading</Heading></Section>);
        expect(section.level).toBe(5);
        expect(section.is(Permissive)).toBe(true);
        expect(section.is(Closed)).toBe(true);
        expect(section.canonical).toBeInstanceOf($Heading);
        expect(section.canonical).toBe(section.parts[1]);
        expect(section.specification).toBeInstanceOf(SectionSpecification);
        expect(section.specify()).toEqual([]);
    });

    it('a section without a heading is a void, reported when asked', () => {
        const section = built<$Section>(<Section><Paragraph>only</Paragraph></Section>);
        expect(section.canonical).toBeUndefined();
        expect(section.specify()).toEqual(['Section: a section has a heading as its canonical, and this one has none']);
    });

    it('its parts across its subsections are their paragraphs and headings, and its canonical is its own heading only', () => {
        const section = built<$Section>(
            <Section>
                <Heading>outer</Heading>
                <Section><Heading>inner</Heading><Paragraph>a</Paragraph></Section>
                <Paragraph>b</Paragraph>
            </Section>
        );
        expect(section.parts.length).toBe(4);
        expect(section.parts.filter(part => part instanceof $Paragraph).length).toBe(2);
        expect(String([...section.text.find($Heading)[0].text][0])).toContain('$Chemistry');
        expect(section.canonical).toBe(section.text.find($Heading)[0]);
        expect(section.text.find($Section)[0].depth).toBe(1);
        expect(section.specify()).toEqual([]);
    });
});

// Doug, 2026-09-26: "The Heading is a self-referent because it is also the piece of writing being mentioned. One
// should have a self-reference on the heading"; "Let's do like title. If no mention, the copy is slugged using
// the same utility and that is used as the mention and the id"; and E7, "Heading means its Section".
describe('a heading does as a title does: it wears the id its name slugs to, means itself, and its section mentions it', () => {
    it('written as a mention, it wears its name\'s slug, means the url the compiler gave, and is a self-reference', () => {
        const section = built<$Section>(<Section><Heading>[What is claimed](/a-paper/the-argument/#what-is-claimed)</Heading><Paragraph>a claim</Paragraph></Section>);
        const heading = section.canonical!;
        expect(heading.name).toBe('What is claimed');
        expect(String(heading.id)).toBe('what-is-claimed');
        expect(heading.means?.identifier).toBe('/a-paper/the-argument/#what-is-claimed');
        expect(heading.means).toBeInstanceOf($SelfReference);
        expect(section.mention).toBe(heading.means);
    });

    it('written plain, its copy slugged is its id and what it means, so it still links to itself', () => {
        const section = built<$Section>(<Section><Heading>What is claimed</Heading><Paragraph>a claim</Paragraph></Section>);
        const heading = section.canonical!;
        expect(heading.name).toBe('What is claimed');
        expect(String(heading.id)).toBe('what-is-claimed');
        expect(heading.means?.identifier).toBe('#what-is-claimed');
        expect(section.mention?.identifier).toBe('#what-is-claimed');
        expect(section.specify()).toEqual([]);
    });

    it('drawn, its words stand inside an anchor to what it means, its own element wearing the id, and the syntax never shows', async () => {
        const page = await drawn(built<$Section>(<Section><Heading>[What is claimed](/a-paper/the-argument/#what-is-claimed)</Heading><Paragraph>a claim</Paragraph></Section>));
        const own = page.querySelector('#what-is-claimed')!;
        expect(own).not.toBeNull();
        expect(own.textContent).toContain('What is claimed');
        expect(own.closest('a')?.getAttribute('href')).toBe('/a-paper/the-argument/#what-is-claimed');
        expect(own.classList.contains('pa-self-reference')).toBe(true);
        expect(page.textContent).not.toContain('](');
    });

    it('a section with no heading mentions nothing, and a heading with no words neither', () => {
        expect(built<$Section>(<Section><Paragraph>no heading</Paragraph></Section>).mention).toBeUndefined();
        expect(built<$Section>(<Section><Heading></Heading><Paragraph>p</Paragraph></Section>).mention).toBeUndefined();
    });
});

describe('a heading is a sentence that stands in a section', () => {
    it('is a sentence at 3, and its section is its parent', () => {
        const section = built<$Section>(<Section><Heading>h</Heading></Section>);
        const heading = section.canonical!;
        expect(heading.level).toBe(3);
        expect(heading.section).toBe(section);
        expect(heading.section?.depth).toBe(0);
        expect(heading.specification).toBeInstanceOf(HeadingSpecification);
    });

    it('outside a section it has no section, and says so when asked', () => {
        const heading = built<$Heading>(<Heading>alone</Heading>);
        expect(heading.section).toBeUndefined();
        expect(heading.specify()).toEqual(['Heading: a heading stands in a section, and this one does not']);
        const misplaced = built<$Paragraph>(<Paragraph><Heading>h</Heading></Paragraph>);
        expect(misplaced.specify()).toEqual(['Paragraph / Heading 0: a heading stands in a section, and this one does not']);
        expect(built<$Section>(<Section><Sentence>s</Sentence><Heading>h</Heading></Section>).specify()).toEqual([]);
    });
});
