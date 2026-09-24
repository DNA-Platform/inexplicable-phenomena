import { describe, it, expect, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useEffect } from 'react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, $Format, $Mention, Mention, Reference } from '@dna-platform/public';
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
        for (const format of writing.annotations.find($Format))
            writing.annotations.express(format, false);
    }
}

const Counting = $($Counting);
const Mentioning = $($Mentioning);
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
        expect(mention.id).toBe('the-first-shelf');
    });
});
