import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import { $Chapter, $Book, Book, Document, Cover, Synopsis, TableOfContents, Title, Author, Subject, Reference, Section, Heading, Paragraph } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = (book: $Book) => { const Drawn = $(book); return render(<Drawn />).container; };

class $CoverChapter extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title>
                <Author>Wikipedians</Author>
                <Subject>Biography</Subject>
            </Cover>
        );
    }
}
class $SynopsisChapter extends $Chapter { print() { return <Synopsis>A life.</Synopsis>; } }
class $TableChapter extends $Chapter { print() { return <TableOfContents>Early life</TableOfContents>; } }
const CoverChapter = $($CoverChapter);
const SynopsisChapter = $($SynopsisChapter);
const TableChapter = $($TableChapter);
const book = (written: React.ReactNode) => {
    class $LifeChapter extends $Chapter {
        print() { return <Document><Section><Heading>Early life</Heading>{written}<Paragraph>Born in Maida Vale.</Paragraph></Section></Document>; }
    }
    const LifeChapter = $($LifeChapter);
    return built<$Book>(<Book><CoverChapter /><SynopsisChapter /><TableChapter /><LifeChapter /></Book>);
};

// The cover carries the title anyway, so "the page contains it" is true either way.
// What only the trick can do is say it a SECOND time, where the empty one stands.
const saying = (container: Element, said: string) => (container.textContent?.split(said).length ?? 1) - 1;

describe('a title says what it titles, and an empty one is refused', () => {
    it('AN EMPTY TITLE IS REFUSED — validation, not a feature', () => {
        expect(() => $(<Title /> as never).specify()).toThrow(/names what it titles/u);
    });

    it('and without one the cover says it once', () => {
        expect(saying(drawn(book(<Paragraph>Born in Maida Vale.</Paragraph>)), 'Alan Turing')).toBe(1);
    });

    it('AND A TITLE THAT WAS WRITTEN IS LEFT ALONE', () => {
        const container = drawn(book(<Title>Something else<Reference>#1</Reference></Title>));
        expect(container.textContent).toContain('Something else');
        expect(saying(container, 'Alan Turing')).toBe(1);
    });
});
