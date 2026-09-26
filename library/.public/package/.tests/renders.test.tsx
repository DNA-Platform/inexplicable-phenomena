import { describe, it, expect, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useEffect } from 'react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, $Format, $Mention, Mention, $Means, $Reference, Reference } from '@dna-platform/public';
import { $Book, $Chapter, Chapter, Cover, $Paragraph, $Section, Heading, Table, Title, Word } from '@dna-platform/public';
import type { ReactNode } from 'react';

const counted = { drawn: 0, painted: 0, committed: 0 };

const Quotation = styled.blockquote`
    border-left: 3px solid silver;
`;
const Counted = (props: { children?: ReactNode; className?: string }) => {
    counted.painted++;
    useEffect(() => { counted.committed++; });
    return <Quotation {...props} />;
};

class $Mentioning extends $Mention {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $Meaning extends $Means {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $Counting extends $Writing {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $Quoted extends $Format {
    style = Counted;
}

class $Plain extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Format)
                writing.annotations.express(annotation, false);
    }
}

const Counting = $($Counting);
const Mentioning = $($Mentioning);
const Meaning = $($Meaning);
const Quoted = $($Quoted);
const Plain = $($Plain);

const settle = () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
const counting = (): void => { counted.drawn = 0; counted.painted = 0; counted.committed = 0; };

describe('a change costs one paint, and the draws around it are counted', () => {
    beforeEach(counting);

    it('mounting draws three times and paints once: the render, React\'s development double, and chemistry\'s diff after the commit', async () => {
        const writing = $(<Counting>a quote <Quoted /></Counting>) as unknown as $Writing;
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted.drawn).toBe(3);
        expect(counted.painted).toBe(1);
        expect(counted.committed).toBe(1);
    });

    it('taking the format out of expression and giving it back costs one paint each way, and never more draws than a mount', async () => {
        const writing = $(<Counting>a quote <Quoted /></Counting>) as unknown as $Writing;
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />).container; });
        await settle();

        counting();
        await act(async () => { writing.$is = Plain; });
        await settle();
        expect(counted.drawn).toBe(2);
        expect(counted.painted).toBe(0);

        counting();
        await act(async () => { writing.$is = []; });
        await settle();
        expect(counted.drawn).toBe(2);
        expect(counted.painted).toBe(1);
        expect(counted.committed).toBe(1);
    });

    it('a reference in front of a format draws like any writing, which is the case that looped when both wrote one container', async () => {
        const writing = $(<Counting>a quote <Quoted /><Reference>/there/</Reference></Counting>) as unknown as $Writing;
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted.drawn).toBe(3);
        expect(counted.painted).toBe(1);
        expect(counted.committed).toBe(1);
    });

    it('a cover that marks its writing with a class draws like any format: three draws, and its counted layer painted once', async () => {
        const writing = $(<Counting>a cover <Cover /><Quoted /></Counting>) as unknown as $Writing;
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect([...writing.classes]).toContain('pa-cover');
        expect(counted.drawn).toBe(3);
        expect(counted.painted).toBe(1);
        expect(counted.committed).toBe(1);
    });

    it('two formats on one writing draw like one, and each layer is painted once', async () => {
        const writing = $(<Counting>a quote <Quoted /><Quoted /></Counting>) as unknown as $Writing;
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted.drawn).toBe(3);
        expect(counted.painted).toBe(2);
        expect(counted.committed).toBe(2);
    });

    it('a writing nobody touched is not drawn again when a sibling changes', async () => {
        const quiet = $(<Counting>untouched</Counting>) as unknown as $Writing;
        const loud = $(<Counting>a quote <Quoted /></Counting>) as unknown as $Writing;
        const Quiet = $(quiet);
        const Loud = $(loud);
        await act(async () => { render(<><Quiet /><Loud /></>); });
        await settle();

        counting();
        await act(async () => { loud.$is = Plain; });
        await settle();
        expect(counted.drawn).toBe(2);
    });
});

describe('a mention that stands its own annotation costs no more than any writing', () => {
    beforeEach(counting);

    it('mounting draws three times, though the pass runs twice at its bond', async () => {
        const mention = $(<Mentioning>[The First Shelf](the-first-shelf)</Mentioning>) as unknown as $Mention;
        const Drawn = $(mention);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted.drawn).toBe(3);
        expect(String(mention.id)).toBe('the-first-shelf');
    });
});

let read: $Book | undefined;

class $Ledger extends $Book {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $Reading extends $Paragraph {
    override view(): ReactNode {
        counted.drawn++;
        read = this.$book;
        return super.view();
    }
}

class $Unreading extends $Paragraph {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $Binding extends $Paragraph {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }

    protected override $Bound(): void {
        read = this.$book;
        super.$Bound();
    }
}

const Ledger = $($Ledger);
class $CountedSection extends $Section {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

class $CountedParagraph extends $Paragraph {
    override view(): ReactNode {
        counted.drawn++;
        return super.view();
    }
}

const Reading = $($Reading);
const Unreading = $($Unreading);
const Binding = $($Binding);
const CountedSection = $($CountedSection);
const CountedParagraph = $($CountedParagraph);

// Doug, 2026-09-26: "Paints count most, but draws count too as they will affect time to first paint". A Table
// marking its rows in defines was measured at two draws a marked child before paint, since chemistry's third
// pass re-runs the section's define after the rows have drawn — half a millisecond a child, a fifty-row
// catalogue doubling its time to first paint. So a Table marks its rows and cells once, in $Bound, when
// nothing has drawn: "Mark at bound is great."
describe('a table that marks a composition\'s rows and cells costs nothing more', () => {
    beforeEach(counting);

    it('a book whose section wears a Table draws and paints exactly as one whose section does not, its rows counted with it', async () => {
        const tabled = (table: ReactNode): $Book => $(
            <Ledger>
                <Quoted />
                <Chapter>
                    <Title>[A Folio](/a-folio/)</Title>
                    <CountedSection>
                        {table}
                        <Heading>h</Heading>
                        <CountedParagraph><Word>a</Word><Word>b</Word></CountedParagraph>
                        <CountedParagraph><Word>c</Word><Word>d</Word></CountedParagraph>
                    </CountedSection>
                </Chapter>
            </Ledger>
        ) as unknown as $Book;
        const Control = $(tabled(null));
        await act(async () => { render(<Control />); });
        await settle();
        const expected = { ...counted };
        expect(expected).toEqual({ drawn: 12, painted: 1, committed: 1 });

        counting();
        const book = tabled(<Table />);
        const Drawn = $(book);
        await act(async () => { render(<Drawn />); });
        await settle();
        const section = book.text.find($Chapter)[0].text.find($Section)[0];
        expect([...section.classes]).toContain('pa-table');
        expect([...section.parts[1].classes]).toContain('pa-row');
        expect(counted).toEqual(expected);
    });
});

describe('a writing that reads its book while it draws costs nothing more', () => {
    beforeEach(counting);

    it('a book whose paragraph reads $book while it draws draws and paints exactly as one whose paragraph does not', async () => {
        const control = $(
            <Ledger>
                <Quoted />
                <Chapter><Title>[A Paper](/a-paper/)</Title><Unreading>a line</Unreading></Chapter>
            </Ledger>
        ) as unknown as $Book;
        const Control = $(control);
        await act(async () => { render(<Control />); });
        await settle();
        const expected = { ...counted };
        expect(expected).toEqual({ drawn: 6, painted: 1, committed: 1 });

        counting();
        const book = $(
            <Ledger>
                <Quoted />
                <Chapter><Title>[A Paper](/a-paper/)</Title><Reading>a line</Reading></Chapter>
            </Ledger>
        ) as unknown as $Book;
        const Drawn = $(book);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(read).toBe(book);
        expect(counted).toEqual(expected);
    });

    it('a book whose paragraph binds, reading its book in $Bound, draws and paints exactly as one whose paragraph does not', async () => {
        const control = $(
            <Ledger>
                <Quoted />
                <Chapter><Title>[A Paper](/a-paper/)</Title><Unreading>a line</Unreading></Chapter>
            </Ledger>
        ) as unknown as $Book;
        const Control = $(control);
        await act(async () => { render(<Control />); });
        await settle();
        const expected = { ...counted };
        expect(expected).toEqual({ drawn: 6, painted: 1, committed: 1 });

        counting();
        read = undefined;
        const book = $(
            <Ledger>
                <Quoted />
                <Chapter><Title>[A Paper](/a-paper/)</Title><Binding>a line</Binding></Chapter>
            </Ledger>
        ) as unknown as $Book;
        expect(read).toBe(book);
        const Drawn = $(book);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted).toEqual(expected);
    });
});

describe('a means that stands its own reference costs no more than any writing', () => {
    beforeEach(counting);

    it('mounting draws three times, though the pass runs twice at its bond', async () => {
        const means = $(<Meaning>[Alan Turing](/complicated-url)</Meaning>) as unknown as $Means;
        const Drawn = $(means);
        await act(async () => { render(<Drawn />); });
        await settle();
        expect(counted.drawn).toBe(3);
        expect(means.annotations.find($Reference)[0].identifier).toBe('/complicated-url');
    });
});
