import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { render, act } from '@testing-library/react';
import { $Book, Book, $Chapter, Document, Section, Heading, Paragraph, Citation, Entry, References, Notes, Cover, Title, Author, Subject, Reference } from '@dna-platform/public';
import { Footnote } from '@dna-platform/public/article';

class $Front extends $Chapter { print() { return <Cover><Title>T<Reference>#0</Reference></Title><Author>A</Author><Subject>S</Subject></Cover>; } }
class $Body extends $Chapter {
    print() {
        return <Document><Section><Heading>Body</Heading><Paragraph>Proved by Cook<Citation>cook</Citation> and refined<Citation>hartmanis</Citation>, as noted<Footnote>aside</Footnote>.</Paragraph></Section></Document>;
    }
}
class $Bib extends $Chapter {
    print() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
                    <Entry>hartmanis: Hartmanis, J. and Hopcroft, J. E. Independence results in computer science. 1976.</Entry>
                    <Entry>cook: Cook, S. A. The complexity of theorem-proving procedures. 1971.</Entry>
                </Section>
            </References>
        );
    }
}
class $Foot extends $Chapter {
    print() {
        return (
            <Notes>
                <Section>
                    <Heading>Notes</Heading>
                    <Entry>aside: An aside the paper makes at the foot of the page.</Entry>
                </Section>
            </Notes>
        );
    }
}
const Front = $($Front);
const Body = $($Body);
const Bib = $($Bib);
const Foot = $($Foot);

const drawn = async (): Promise<HTMLElement> => {
    const book = $(<Book><Front /><Body /><Bib /><Foot /></Book>) as unknown as $Book;
    const Drawn = $(book);
    let host: HTMLElement | undefined;
    await act(async () => { host = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return host!;
};

describe('a citation names an entry by key and draws the entry\'s place, read from the book\'s scratchpad', () => {
    it('THE NUMBER IS THE ENTRY\'S PLACE — cook is second, hartmanis first', async () => {
        const host = await drawn();
        const cited = [...host.querySelectorAll('.pd-citation:not(.pd-footnote)')].map(one => one.textContent);
        expect(cited).toEqual(['2', '1']);
    });

    it('and every entry carries its key as its id, so the citation\'s anchor lands on it', async () => {
        const host = await drawn();
        expect(host.querySelector('a.pd-citation')?.getAttribute('href')).toBe('#cook');
        expect(host.querySelector('#cook')?.textContent).toContain('Cook, S. A.');
        expect(host.querySelector('#cook')?.textContent).not.toContain('cook:');
    });

    it('AND A FOOTNOTE IS A CITATION INTO THE NOTES, numbered among them', async () => {
        const host = await drawn();
        const noted = host.querySelector('a.pd-footnote');
        expect(noted?.textContent).toBe('1');
        expect(noted?.getAttribute('href')).toBe('#aside');
        expect(host.querySelector('#aside')?.textContent).toContain('An aside');
    });
});
