import { describe, it, expect } from 'vitest';
import { $, look, styled } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import {
    $Book, $Writing, $Theme, $Format, $TypeOfTheme, $TypeOfSection, $TypeOfParagraph,
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

describe('the theme is the sheet, worn once at the book', () => {
    const drawn = (book: $Book) => { const Drawn = $(book); return render(<Drawn />).container; };

    it('THE BOOK WEARS ONE MAIN, THE THEME DRAWS NOTHING WHERE IT STANDS, AND A CHAPTER IS AN ARTICLE', () => {
        const container = drawn(built<$Book>(<Book>{cover()}{synopsis()}{life()}</Book>));
        const mains = container.querySelectorAll('main');

        expect(mains.length).toBe(1);
        expect(mains[0].className).not.toBe('');
        expect(container.querySelector('.pd-theme')).toBeNull();
        expect(container.querySelector('article.pd-chapter')).not.toBeNull();
        expect(container.textContent).toContain('Born in Maida Vale.');
    });

    it('A CHAPTER WEARING ITS OWN THEME WEARS A SECOND SHEET INSIDE THE FIRST', () => {
        const container = drawn(built<$Book>(
            <Book>
                {cover()}{synopsis()}
                {life()}
                <Chapter><Dark /><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Chapter>
            </Book>));
        const mains = container.querySelectorAll('main');

        expect(mains.length).toBe(2);
        expect(mains[0].contains(mains[1])).toBe(true);
        expect(mains[1].textContent).toContain('Bletchley Park.');
        expect(mains[1].textContent).not.toContain('Born in Maida Vale.');
    });
});

describe('a format is written into the writing it formats', () => {
    class $Boxed extends $Format {
        $tone = 'plain';
        override selector = styled.aside;
        get borderLeft() { return `4px solid ${this.$tone}`; }
    }
    const Boxed = $($Boxed);
    const drawn = (book: $Book) => { const Drawn = $(book); return render(<Drawn />).container; };

    it('A FORMAT WRITTEN INTO A CHAPTER WEARS THAT CHAPTER IN ITS ELEMENT, AND KEEPS ITS PROP', () => {
        const container = drawn(built<$Book>(
            <Book>
                {cover()}{synopsis()}
                {life()}
                <Chapter><Boxed tone="red" /><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Chapter>
            </Book>));
        const asides = container.querySelectorAll('aside');

        expect(asides.length).toBe(1);
        expect(asides[0].textContent).toContain('Bletchley Park.');
        expect(asides[0].textContent).not.toContain('Born in Maida Vale.');
        expect(asides[0].className).not.toBe('');
        expect(container.querySelector('.pd-format')).toBeNull();
    });
});
