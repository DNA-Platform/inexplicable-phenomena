import { describe, it, expect } from 'vitest';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import {
    $Book, $Document, $Writing, Book, Cover, Synopsis, Title, Author, Subject,
    Section, Heading, Paragraph, TableOfContents,
} from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = (book: $Book) => { const Drawn = $(book); return render(<Drawn />).container; };

const bonded: string[] = [];
const knew: Record<string, boolean> = {};

class $Recorded extends $Document {
    $Recorded(block: $Block) {
        super.$Document($check(block, $Block));
        const named = `documented ${bonded.filter(one => one.startsWith('documented')).length + 1}`;
        knew[named] = this.parent !== (this as unknown as $Writing);
        bonded.push(named);
    }
}

class $Bound extends $Book {
    $Bound(block: $Block) {
        super.$Book($check(block, $Block));
        bonded.push('book');
    }
}

const Recorded = $($Recorded);
const Bound = $($Bound);

const made = () => built<$Book>(
    <Bound>
        <Cover><Title>Alan Turing</Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>
        <Synopsis>A life.</Synopsis>
        <Recorded><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Recorded>
        <Recorded><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Recorded>
    </Bound>);

describe('a documented is built before its book, and it already knows the book', () => {
    it('EVERY CHAPTER IS BONDED BEFORE THE BOOK IS', () => {
        bonded.length = 0;
        made();
        expect(bonded).toEqual(['documented 1', 'documented 2', 'book']);
    });

    it('AND EACH ONE REACHES ITS BOOK FROM INSIDE ITS OWN BOND CONSTRUCTOR', () => {
        bonded.length = 0;
        made();
        expect(knew['documented 1']).toBe(true);
        expect(knew['documented 2']).toBe(true);
    });

    it('so the book is the LAST thing bonded, and what a documented said is already said', () => {
        bonded.length = 0;
        made();

        expect(bonded.indexOf('book')).toBe(bonded.length - 1);
    });
});

describe('the table of contents is drawn BEFORE the documents it catalogues', () => {
    it('THE TABLE DRAWS FIRST, so nothing a documented learns at draw time can reach it', () => {
        const order: string[] = [];

        class $Watched extends $Document {
            $Watched(block: $Block) { super.$Document($check(block, $Block)); }
            override view(): React.ReactNode {
                order.push('documented');

                return super.view();
            }
        }
        const Watched = $($Watched);

        class $Noting extends $Book {
            $Noting(block: $Block) { super.$Book($check(block, $Block)); }
            override view(): React.ReactNode {
                order.push('book');

                return super.view();
            }
        }
        const Noting = $($Noting);

        const book = built<$Book>(
            <Noting>
                <Cover><Title>Alan Turing</Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>
                <Synopsis>A life.</Synopsis>
                <Watched><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Watched>
            </Noting>);
        drawn(book);

        expect(order[0]).toBe('book');
        expect(order).toContain('documented');
    });
});
