import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Section, Section, Heading, $Paragraph, Paragraph, Line, Word, Letter, $List, List } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Title } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const classes = (writing: $Writing): string[] => [...writing.classes].filter(name => name.startsWith('pa-'));

// A LIST MARKS ITS ITEMS ONCE, IN $BOUND, as a Table marks its rows and cells — Doug: "Mark at bound is great."
const bound = <T extends $Writing,>(composition: React.ReactNode): T => built<$Book>(
    <Book>
        <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
        <Chapter><Title>[A List](/the-folio/a-list/)</Title>{composition}</Chapter>
    </Book>
).text.find($Chapter)[1].text.find($Section)[0] as unknown as T;

// Doug, 2026-09-30: "List and Math are fundamental. Let's add an annotative List to the next sprint." An annotation
// said of a composition whose parts are its items, ordered or not; its classes on the composition and each item, by
// the pattern he chose — pa-list, pa-item, pa-ordered, the prop ordered — and the look the sheet's.
describe('a list is a way of interpreting a composition as items, marking each by authorship', () => {
    it('interprets a section as a list: its parts the items, the heading none of them, and marks them at the bind', () => {
        const section = bound<$Section>(
            <Section>
                <List />
                <Heading>Three books</Heading>
                <Line>Libby</Line>
                <Line>Some Projects</Line>
                <Line>A Paper</Line>
            </Section>
        );
        expect(section.specify()).toEqual([]);
        expect(classes(section)).toEqual(['pa-list']);
        expect(section.is(List)).toBe(true);
        const [heading, ...items] = section.parts;
        expect(classes(heading)).not.toContain('pa-item');
        expect(items.map(item => classes(item))).toEqual([['pa-item'], ['pa-item'], ['pa-item']]);
        expect(section.annotations.expressed($List)?.items).toEqual(items);
    });

    it('a paragraph\'s sentences are its items, a paragraph having no canonical', () => {
        const paragraph = built<$Paragraph>(<Paragraph><List /><Line>one</Line><Line>two</Line></Paragraph>);
        expect(paragraph.annotations.expressed($List)?.items).toHaveLength(2);
    });

    it('ordered when it says so, marking its composition pa-ordered as well; unordered by default', () => {
        expect(classes(built<$Section>(<Section><List ordered /><Heading>h</Heading><Line>a</Line></Section>))).toEqual(['pa-list', 'pa-ordered']);
        expect(classes(built<$Section>(<Section><List /><Heading>h</Heading><Line>a</Line></Section>))).toEqual(['pa-list']);
        expect(built<$Section>(<Section><List ordered /><Heading>h</Heading></Section>).annotations.expressed($List)?.$ordered).toBe(true);
    });

    it('a section built alone is never bound: it wears pa-list, and its items no marks', () => {
        const section = built<$Section>(<Section><List /><Heading>h</Heading><Line>a</Line></Section>);
        expect(classes(section)).toEqual(['pa-list']);
        expect(classes(section.parts[1])).toEqual([]);
    });

    it('is said of a composition and not of a letter, and says so when asked', () => {
        expect(built<$Writing>(<Letter><List />a letter</Letter>).specify()).toContain('Letter: a list is said of a composition with parts, and a letter has none');
        expect(built<$Section>(<Section><List /><Heading>h</Heading><Line>a</Line></Section>).specify()).toEqual([]);
    });

    it('taken out, the next define takes the composition\'s classes back; the marks the bind gave its items stay', () => {
        const section = bound<$Section>(<Section><List ordered /><Heading>h</Heading><Line>a</Line></Section>);
        section.annotations.remove(section, section.annotations.find($List)[0]);
        section.annotations.define();
        expect(classes(section)).toEqual([]);
        expect(classes(section.parts[1])).toEqual(['pa-item']);
    });

    it('drawn in its book, its items are list items by the Theme\'s sheet, numbered when ordered, and no rule is made per list', async () => {
        const page = await drawn(built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
                <Chapter><Title>[A List](/the-folio/a-list/)</Title><Section><List ordered /><Heading>h</Heading><Line>a</Line><Line>b</Line></Section></Chapter>
            </Book>
        ));
        expect(page.querySelectorAll('.pa-list .pa-item').length).toBe(2);
        expect(page.querySelector('.pa-list')?.classList.contains('pa-ordered')).toBe(true);
        const sheet = document.head.innerHTML;
        expect(sheet).toMatch(/\.pa-item\s*\{\s*display:\s*list-item/u);
        expect(sheet).toMatch(/\.pa-ordered \.pa-item\s*\{\s*list-style-type:\s*decimal/u);
        expect(sheet).toMatch(/\.pa-list\s*\{\s*counter-reset:\s*list-item/u);
    });

    it('a word may be an item too, since a sentence is a composition whose parts are its words', () => {
        const paragraph = bound<$Section>(<Section><Heading>h</Heading><Paragraph><List /><Word>one</Word><Word>two</Word></Paragraph></Section>).parts[1];
        expect(paragraph.annotations.expressed($List)?.items.map(item => classes(item))).toEqual([['pa-item'], ['pa-item']]);
    });
});
