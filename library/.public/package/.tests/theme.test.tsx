import { describe, it, expect } from 'vitest';
import { act, render } from '@testing-library/react';
import { $, $Block, $check, styled } from '@dna-platform/chemistry';
import { For, $Chapter,
    $Book, $Writing, $Theme, $Section, $Format,
    Book, Document, Cover, Title, Author, Subject, Reference, Synopsis, Heading, Paragraph,
} from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const cover = () => <Cover><Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>;
const synopsis = () => <Synopsis><For>Alan Turing</For>A life.</Synopsis>;

// A THEME IS READ WHERE IT IS DRAWN. A format's getter runs inside the draw, so it is where a promise
// reads the theme a page is really drawn in; the reads are kept, in order, for the promise to look at.
let seen: $Theme[] = [];
class $ReadingFormat extends $Format {
    override selector: any = styled.div;
    get color() { seen.push(this.theme); return 'inherit'; }
}
const ReadingFormat = $($ReadingFormat);
class $Reading extends $Section {
    $Reading(block: $Block) { super.$Section($check(block, $Block, '!').concat($check(ReadingFormat, '!'))); }
}
const Reading = $($Reading);
const life = () => <Document><Reading><Heading>Early life</Heading><Paragraph>Born in Maida Vale.</Paragraph></Reading></Document>;
const work = () => <Document><Reading><Heading>Cryptanalysis</Heading><Paragraph>Bletchley Park.</Paragraph></Reading></Document>;
class $CoverChapter extends $Chapter { print() { return cover(); } }
class $SynopsisChapter extends $Chapter { print() { return synopsis(); } }
class $LifeChapter extends $Chapter { print() { return life(); } }
class $WorkChapter extends $Chapter { print() { return work(); } }
const CoverChapter = $($CoverChapter);
const SynopsisChapter = $($SynopsisChapter);
const LifeChapter = $($LifeChapter);
const WorkChapter = $($WorkChapter);
const drawn = async (book: $Book) => { seen = []; const Drawn = $(book); await act(async () => { render(<Drawn />); }); };

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

describe('a book draws its theme at its root, and everything drawn beneath reaches that one', () => {
    it('A BOOK DRAWS ONE THEME, AND EVERY FORMAT BENEATH READS THAT ONE', async () => {
        await drawn(built<$Book>(<Book><CoverChapter /><SynopsisChapter /><LifeChapter /><WorkChapter /></Book>));

        expect(seen.length).toBeGreaterThanOrEqual(2);
        expect(seen[0]).toBeInstanceOf($Theme);
        expect(seen.every(one => one === seen[0])).toBe(true);
    });

    it('A WRITING BUILT WITH NO BOOK STILL READS A THEME, AND IT IS THE ONE DEFAULT', () => {
        const alone = built<$Writing>(<Paragraph>Alone.</Paragraph>);
        const again = built<$Writing>(<Paragraph>Again.</Paragraph>);

        expect(alone.theme).toBeInstanceOf($Theme);
        expect(alone.theme).toBe(again.theme);
    });

    it('A THEME REGISTERED FOR A BOOK IS THE ONE THE BOOK DRAWS, ONE INSTANCE THROUGHOUT', async () => {
        await drawn(built<$Book>(<Mine><CoverChapter /><SynopsisChapter /><LifeChapter /><WorkChapter /></Mine>));

        expect(seen[0]).toBeInstanceOf($Portal);
        expect(seen[0].size).toBe('14px');
        expect(seen.every(one => one === seen[0])).toBe(true);
    });

    it('A BOOK IS RE-THEMED BY REGISTRATION, AND REDRAWS IN THE NEW ONE', async () => {
        class $Pocket extends $Book { }
        const Pocket = $($Pocket);
        $Portal.$register(Pocket);
        await drawn(built<$Book>(<Pocket><CoverChapter /><SynopsisChapter /><LifeChapter /></Pocket>));
        expect(seen[0]).toBeInstanceOf($Portal);

        seen = [];
        await act(async () => { $Dark.$register(Pocket); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });

        expect(seen.length).toBeGreaterThan(0);
        expect(seen[seen.length - 1]).toBeInstanceOf($Dark);
    });
});
