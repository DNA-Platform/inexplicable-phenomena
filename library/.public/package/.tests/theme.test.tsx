import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import {
    $Book, $Writing, $Theme, $TypeOfSection, $TypeOfParagraph, $TypeOfDocument,
    Book, Document, Cover, Title, Author, Subject, Reference, Synopsis, Section, Heading, Paragraph,
} from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const documents = (book: $Book) => book.searchFor<$Writing>($TypeOfDocument).slice(2);

const cover = () => <Cover><Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>;
const synopsis = () => <Synopsis>A life.</Synopsis>;

const life = () => <Document><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Document>;
const work = () => <Document><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Document>;

class $Dark extends $Theme {
    override ink = '#ffffff';
    override paper = '#000000';
}
const Dark = $($Dark);

class $Portal extends $Theme {
    override size = '14px';
}

class $Mine extends $Book { }
const Mine = $($Mine);
$Portal.$register(Mine);

describe('a writing has a theme the way it has a meaning — read from its parents, never stored below the document', () => {
    it('A BOOK MAKES ONE THEME, AND EVERYTHING IN IT READS THAT ONE', () => {
        const book = built<$Book>(<Book>{cover()}{synopsis()}{life()}</Book>);
        const documented = documents(book)[0];
        const paragraph = documented.searchFor<$Writing>($TypeOfSection)[0].searchFor<$Writing>($TypeOfParagraph)[0];

        expect(book.theme).toBeInstanceOf($Theme);
        expect(documented.theme).toBe(book.theme);
        expect(paragraph.theme).toBe(book.theme);
    });

    it('A THEME WRITTEN INTO A DOCUMENT DOES NOT MAKE IT THAT DOCUMENT\'S — A THEME IS THE BOOK\'S', () => {
        const book = built<$Book>(
            <Book>
                {cover()}{synopsis()}
                {life()}
                <Document><Dark /><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Document>
            </Book>);
        const [first, second] = documents(book);

        expect(second.theme).toBe(book.theme);
        expect(first.theme).toBe(book.theme);
        expect(second.searchFor<$Writing>($TypeOfSection)[0].theme).toBe(book.theme);
    });

    it('A WRITING BUILT WITH NO BOOK STILL READS A THEME, AND IT IS THE ONE DEFAULT', () => {
        const alone = built<$Writing>(<Paragraph>Alone.</Paragraph>);
        const again = built<$Writing>(<Paragraph>Again.</Paragraph>);

        expect(alone.theme).toBeInstanceOf($Theme);
        expect(alone.theme).toBe(again.theme);
    });

    it('A THEME REGISTERED FOR A BOOK IS THE ONE THE BOOK MAKES, ONE INSTANCE THROUGHOUT', () => {
        const book = built<$Book>(<Mine>{cover()}{synopsis()}{life()}{work()}</Mine>);

        expect(book.theme).toBeInstanceOf($Portal);
        expect(documents(book)[1].theme).toBe(book.theme);
        expect(documents(book)[1].theme.size).toBe('14px');
    });

    it('A BOOK HANDED A THEME PASSES IT DOWN TO ITS DOCUMENTS', () => {
        const book = built<$Book>(<Book>{cover()}{synopsis()}{life()}{work()}</Book>);
        const dark = built<$Theme>(<Dark />);
        book.theme = dark;

        expect(book.theme).toBe(dark);
        expect(documents(book).every(one => one.theme === dark)).toBe(true);
        expect(documents(book)[0].searchFor<$Writing>($TypeOfSection)[0].theme).toBe(dark);
    });
});
