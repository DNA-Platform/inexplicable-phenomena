import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Word, Word, $Paragraph, Paragraph, $Sentence, Blank, $Space, Space, $Break, Break, $Line, Line, Inline, Block } from '@dna-platform/public';
import { $Book, Book, Chapter, Cover, Title } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const served = (writing: $Writing): string => {
    const Drawn = $(writing);
    const sheet = new ServerStyleSheet();
    renderToString(sheet.collectStyles(<Drawn />));
    return sheet.getStyleTags().replace(/\s+/g, '');
};

// Doug, 2026-09-27: "a type of annotation called Blank… a configurable Space that can add whitespace, and a Break that
// can add a linebreak, and Line… possibly driven by an annotation that allows something to maintain its spatial extent
// but as a blank element. That's a fine genetic trait, like being albino :)"
describe('blank keeps a writing\'s extent and shows nothing; space, break and line stand it and their pairs', () => {
    // A MARK AND NOTHING ELSE since Sprint 97's S3: what stands Blank — a Space of non-breaking spaces, an empty Break —
    // has no ink to hide, so the base writes no rule; a library that blanks something else dresses pa-blank by mark.
    it('a blank word wears pa-blank, its box kept, and the base writes no rule for it', async () => {
        const word = built<$Word>(
            <Word>
                unseen
                <Blank />
            </Word>
        );
        expect([...word.classes]).toContain('pa-blank');
        expect(word.is(Blank)).toBe(true);
        expect(word.annotations.find(Blank)[0].note()).toBeNull();
        const page = await drawn(word);
        expect(page.querySelector('.pa-blank')!.textContent).toContain('unseen');
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                    <Paragraph>
                        <Word>
                            unseen
                            <Blank />
                        </Word>
                    </Paragraph>
                </Chapter>
            </Book>
        );
        expect(served(book)).not.toContain('.pa-blank');
    });

    it('a space is a blank inline letter whose length is a count, one by default, drawn as non-breaking spaces', async () => {
        const three = built<$Space>(<Space length={3} />);
        expect(three.$length).toBe(3);
        expect(three.is(Blank)).toBe(true);
        expect(three.is(Inline)).toBe(true);
        expect([...three.classes]).toEqual(expect.arrayContaining(['pd-letter', 'pd-space', 'pa-blank']));
        const page = await drawn(three);
        const own = page.querySelector('.pd-space')!;
        expect(own.tagName).toBe('SPAN');
        expect(own.firstChild?.textContent).toBe('   ');
        expect((await drawn(built<$Space>(<Space />))).querySelector('.pd-space')!.firstChild?.textContent).toBe(' ');
    });

    it('a break is a blank block letter that draws nothing, so what follows starts a new line', async () => {
        const one = built<$Break>(<Break />);
        expect(one.is(Blank)).toBe(true);
        expect(one.is(Block)).toBe(true);
        expect([...one.classes]).toEqual(expect.arrayContaining(['pd-letter', 'pd-break', 'pa-blank']));
        const page = await drawn(one);
        const own = page.querySelector('.pd-break')!;
        expect(own.tagName).toBe('DIV');
        // NOTHING OF ITS OWN: no text and no child, since an annotation's writing is not drawn.
        expect(own.childNodes.length).toBe(0);
    });

    it('a line is a block sentence, a part of its paragraph, drawn as a div wearing the sentence\'s mark and its own', async () => {
        const poem = built<$Paragraph>(
            <Paragraph>
                <Line>the first line</Line>
                <Line>and the second</Line>
            </Paragraph>
        );
        const [first, second] = poem.parts;
        expect(first).toBeInstanceOf($Line);
        expect(first).toBeInstanceOf($Sentence);
        expect(first.level).toBe(3);
        expect(second.is(Block)).toBe(true);
        expect([...first.classes]).toEqual(expect.arrayContaining(['pd-sentence', 'pd-line']));
        const page = await drawn(poem);
        expect([...page.querySelectorAll('.pd-line')].map(line => line.tagName)).toEqual(['DIV', 'DIV']);
        expect(poem.specify()).toEqual([]);
    });
});
