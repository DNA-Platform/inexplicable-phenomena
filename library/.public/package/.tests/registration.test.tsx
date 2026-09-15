import { describe, it, expect } from 'vitest';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import { For, $Chapter, Reference,
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

class $CoverChapter extends $Chapter { print() { return <Cover><Title>Alan Turing<Reference>#0</Reference></Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>; } }
class $SynopsisChapter extends $Chapter { print() { return <Synopsis><For>Alan Turing</For>A life.</Synopsis>; } }
class $EarlyLife extends $Chapter { print() { return <Recorded><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Recorded>; } }
class $Cryptanalysis extends $Chapter { print() { return <Recorded><Section><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Section></Recorded>; } }
const CoverChapter = $($CoverChapter);
const SynopsisChapter = $($SynopsisChapter);
const EarlyLife = $($EarlyLife);
const Cryptanalysis = $($Cryptanalysis);

const made = () => built<$Book>(<Bound><CoverChapter /><SynopsisChapter /><EarlyLife /><Cryptanalysis /></Bound>);

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

        class $WatchedChapter extends $Chapter { print() { return <Watched><Section><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Section></Watched>; } }
        const WatchedChapter = $($WatchedChapter);
        const book = built<$Book>(<Noting><CoverChapter /><SynopsisChapter /><WatchedChapter /></Noting>);
        drawn(book);

        expect(order[0]).toBe('book');
        expect(order).toContain('documented');
    });
});
