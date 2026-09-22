import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section, $Heading, Heading, $Paragraph, Paragraph, Sentence, Permissive, Closed, SectionSpecification, HeadingSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('a section is a composition at 5, permissive and closed, that means through its heading', () => {
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
        expect(section.specify()).toEqual(['Section: a section means through its heading, and this one has none']);
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
        expect(section.canonical?.contents.at(0)?.toString()).toContain('$Chemistry');
        expect(section.canonical).toBe(section.contents.find($Heading)[0]);
        expect(section.contents.find($Section)[0].depth).toBe(1);
        expect(section.specify()).toEqual([]);
    });
});

describe('a heading is a sentence that means its section', () => {
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
        expect(heading.specify()).toEqual(['Heading: a heading means its section, and this one is not in one']);
        const misplaced = built<$Paragraph>(<Paragraph><Heading>h</Heading></Paragraph>);
        expect(misplaced.specify()).toEqual(['Paragraph / Heading 0: a heading means its section, and this one is not in one']);
        expect(built<$Section>(<Section><Sentence>s</Sentence><Heading>h</Heading></Section>).specify()).toEqual([]);
    });
});
