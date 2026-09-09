import { describe, it, expect } from 'vitest';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import {
    $Book, $Cover, $Document, $Writing, $Section, $TypeOfSection,
    Book, Cover, Document, Synopsis, Title, Author, Subject, Reference,
    Section, Heading, Paragraph,
} from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = (book: $Book) => { const Drawn = $(book); return render(<Drawn />).container; };

// THE SHAPE UNDER TEST — a documented is a SUBCLASS with its stuff written in it,
// and nothing is written at the call site.
class $Masthead extends $Cover {
    $Masthead(block: $Block) {
        super.$Cover($check(block, $Block)
            .concat(built<$Writing>(<Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title>))
            .concat(built<$Writing>(<Author>Wikipedians</Author>))
            .concat(built<$Writing>(<Subject>Biography</Subject>)));
    }
}

class $EarlyLife extends $Document {
    $EarlyLife(block: $Block) {
        super.$Document($check(block, $Block).concat(built<$Writing>(
            <Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section>)));
    }
}

const Masthead = $($Masthead);
const EarlyLife = $($EarlyLife);

const made = () => built<$Book>(
    <Book>
        <Masthead />
        <Synopsis>A life.</Synopsis>
        <EarlyLife />
    </Book>);

describe('a documented written as a subclass, with nothing at the call site', () => {
    it('IT IS BUILT AND IT HOLDS WHAT THE CLASS WROTE', () => {
        const book = made();
        const cover = book.cover as $Cover;

        expect(cover).toBeInstanceOf($Masthead);
        expect(cover.title()).toBeDefined();
        expect(cover.author()).toBeDefined();
        expect(cover.subject()).toBeDefined();
    });

    it('AND THE BOOK REACHES ITS SECTIONS — the stuff the contents are made of', () => {
        const book = made();
        const documented = book.documents.find(one => one instanceof $EarlyLife);

        expect(documented).toBeDefined();
        expect(documented!.searchFor<$Section>($TypeOfSection).length).toBe(1);
    });

    it('AND THE TABLE OF CONTENTS CATALOGUES IT', () => {
        const container = drawn(made());

        expect(container.textContent).toContain('Early life');
        expect(container.querySelectorAll('.pd-table-of-contents a').length).toBeGreaterThan(0);
    });

    it('AND IT DRAWS WHAT THE CLASS WROTE', () => {
        const container = drawn(made());

        expect(container.textContent).toContain('Alan Turing');
        expect(container.textContent).toContain('Born in Maida Vale.');
    });
});

// THE OTHER SPELLING — content authored in view() instead. Drawn, but the model
// never sees it, which is the whole question.
class $Written extends $Document {
    $Written(block: $Block) { super.$Document($check(block, $Block)); }
    override view(): React.ReactNode {
        const Whole = $(Section);

        return <><Whole><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Whole></>;
    }
}
const WrittenDocument = $($Written);

describe('the same documented written in view() instead', () => {
    it('IS REFUSED AT CONSTRUCTION — it never gets as far as being invisible', () => {
        const book = built<$Book>(
            <Book>
                <Masthead />
                <Synopsis>A life.</Synopsis>
                <WrittenDocument />
            </Book>);
        const documented = book.documents.find(one => one instanceof $Written);
        const container = drawn(book);

        expect(documented!.searchFor<$Section>($TypeOfSection).length).toBe(0);
        expect(container.textContent).toContain('a piece of writing says something');
        expect(container.textContent).not.toContain('Bletchley Park.');
    });
});
