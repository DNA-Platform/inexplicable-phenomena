import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import {
    $Book, $Writing, $Theme, $TypeOfTheme, $TypeOfSection, $TypeOfParagraph,
    Book, Chapter, Cover, Title, Author, Subject, Reference, Synopsis, Section, Heading, Paragraph, Theme,
} from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const cover = () => <Cover><Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>;
const synopsis = () => <Synopsis>A life.</Synopsis>;

const life = () => <Chapter><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Chapter>;
const work = () => <Chapter><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Chapter>;

class $Dark extends $Theme {
    override ink = '#ffffff';
    override paper = '#000000';
}
const Dark = $($Dark);

class $Portal extends $Theme {
    override size = '14px';
}
const Portal = $($Portal);

class $Mine extends $Book { }
const Mine = $($Mine);
$(Mine, Theme)(Portal);

describe('a writing has a theme the way it has a meaning — read, never stored', () => {
    it('A BOOK PLACES ONE THEME, AND EVERYTHING IN IT READS THAT ONE', () => {
        const book = built<$Book>(<Book>{cover()}{synopsis()}{life()}</Book>);
        const chapter = book.chapters[0];
        const paragraph = chapter.searchFor<$Writing>($TypeOfSection)[0].searchFor<$Writing>($TypeOfParagraph)[0];

        expect(book.searchFor($TypeOfTheme).length).toBe(1);
        expect(book.theme).toBeInstanceOf($Theme);
        expect(chapter.theme).toBe(book.theme);
        expect(paragraph.theme).toBe(book.theme);
    });

    it('A THEME WRITTEN INTO A CHAPTER IS THAT CHAPTER\'S, AND NO OTHER\'S', () => {
        const book = built<$Book>(
            <Book>
                {cover()}{synopsis()}
                {life()}
                <Chapter><Dark /><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Chapter>
            </Book>);
        const [first, second] = book.chapters;

        expect(second.theme).toBeInstanceOf($Dark);
        expect(second.theme).not.toBe(book.theme);
        expect(first.theme).toBe(book.theme);
        expect(second.searchFor<$Writing>($TypeOfSection)[0].theme).toBe(second.theme);
    });

    it('A WRITING BUILT WITH NO BOOK STILL READS A THEME, AND IT IS THE ONE DEFAULT', () => {
        const alone = built<$Writing>(<Paragraph>Alone.</Paragraph>);
        const again = built<$Writing>(<Paragraph>Again.</Paragraph>);

        expect(alone.theme).toBeInstanceOf($Theme);
        expect(alone.theme).toBe(again.theme);
    });

    it('A REGISTRATION ON THE BOOK IS THE THEME THE BOOK PLACES', () => {
        const book = built<$Book>(<Mine>{cover()}{synopsis()}{life()}{work()}</Mine>);

        expect(book.theme).toBeInstanceOf($Portal);
        expect(book.chapters[1].theme.size).toBe('14px');
        expect(book.searchFor($TypeOfTheme).length).toBe(1);
    });

    it('A BOOK IS REFUSED WHEN IT IS DRAWN IN TWO THEMES', () => {
        expect(() => built<$Book>(<Book>{cover()}{synopsis()}<Dark /><Portal />{life()}</Book>).specify()).toThrow(/one theme/u);
    });
});
