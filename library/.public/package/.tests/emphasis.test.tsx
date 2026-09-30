import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Format, $Word, Word, $Sentence, Sentence, $Emphasis, Emphasis, $Bold, Bold, $Underline, Underline } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

// Doug, 2026-09-27: "think about what might be useful in terms of the basics - emphasis, underline, bold."
describe('emphasis, bold and underline are formats whose element is the semantic one, each wearing its class', () => {
    it('each is a format that draws its element as a layer around the word, the element wearing its class and the word none', async () => {
        for (const [word, kind, tag, mark] of [
            [built<$Word>(<Word><Emphasis />really</Word>), $Emphasis, 'EM', 'pa-emphasis'],
            [built<$Word>(<Word><Bold />really</Word>), $Bold, 'B', 'pa-bold'],
            [built<$Word>(<Word><Underline />really</Word>), $Underline, 'U', 'pa-underline'],
        ] as const) {
            expect(word.annotations.expressed(kind)).toBeInstanceOf($Format);
            expect([...word.classes]).toContain('pd-word');
            expect([...word.classes]).not.toContain(mark);
            const own = (await drawn(word)).querySelector('.pd-word')!;
            expect(own.tagName).toBe('SPAN');
            expect(own.parentElement!.tagName).toBe(tag);
            expect(own.parentElement!.classList.contains('pd-container')).toBe(true);
            expect(own.parentElement!.classList.contains(mark)).toBe(true);
            expect(own.textContent).toContain('really');
        }
    });

    it('two on one word nest, the one written last innermost, each tag wearing its own class', async () => {
        const word = built<$Word>(<Word><Emphasis /><Bold />strongly</Word>);
        const own = (await drawn(word)).querySelector('.pd-word')!;
        expect(own.parentElement!.tagName).toBe('B');
        expect(own.parentElement!.classList.contains('pa-bold')).toBe(true);
        expect(own.parentElement!.parentElement!.tagName).toBe('EM');
        expect(own.parentElement!.parentElement!.classList.contains('pa-emphasis')).toBe(true);
    });

    it('is said of any writing, a sentence as well as a word', async () => {
        const sentence = built<$Sentence>(<Sentence><Underline />a whole sentence</Sentence>);
        expect(sentence.specify()).toEqual([]);
        const own = (await drawn(sentence)).querySelector('.pd-sentence')!;
        expect(own.parentElement!.tagName).toBe('U');
    });
});
