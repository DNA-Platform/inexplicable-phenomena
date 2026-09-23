import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Writing, Word, $Annotation, Parenthetical, binder, html } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('the copy of a writing is what was written in it', () => {
    it('answers a string it was written with', () => {
        const writing = built<$Writing>(<Writing>the first shelf</Writing>);
        expect(html.copy(writing.contents)).toBe('the first shelf');
    });

    it('answers what is beneath it, in order, across nested writing and numbers', () => {
        const writing = built<$Writing>(<Writing>shelf <Word>number</Word> 3</Writing>);
        expect(html.copy(writing.contents)).toBe('shelf number 3');
    });

    it('answers nothing for a writing with nothing written in it', () => {
        const writing = built<$Writing>(<Writing />);
        expect(html.copy(writing.contents)).toBe('');
    });

    it('never meets an annotation, because the bond sorts them out of the contents', () => {
        const writing = built<$Writing>(<Writing>an aside <Parenthetical>because it was late</Parenthetical></Writing>);
        expect(writing.contents.find($Annotation)).toEqual([]);
        expect(html.copy(writing.contents)).toBe('an aside ');
    });
});

describe('the binder writes [text](identifier) and the framework reads both halves', () => {
    it('reads an identifier the compiler allocated, which is an id', () => {
        expect(binder.reference('[The First Shelf](the-first-shelf)')).toEqual({ text: 'The First Shelf', identifier: 'the-first-shelf' });
    });

    it('reads an identifier the compiler resolved, which is a url', () => {
        expect(binder.reference('[The Library](/the-library/)')).toEqual({ text: 'The Library', identifier: '/the-library/' });
    });

    it('reads an empty identifier, which is the page it stands on', () => {
        expect(binder.reference('[The Library]()')).toEqual({ text: 'The Library', identifier: '' });
    });

    it('reads it out of the copy of a writing, which is how a class receives it', () => {
        const writing = built<$Writing>(<Writing>[The First Shelf](the-first-shelf)</Writing>);
        expect(binder.reference(html.copy(writing.contents))?.identifier).toBe('the-first-shelf');
    });

    it('answers nothing for copy that is not a reference', () => {
        expect(binder.reference('The First Shelf')).toBeUndefined();
        expect(binder.reference('[The First Shelf]')).toBeUndefined();
        expect(binder.reference('(the-first-shelf)')).toBeUndefined();
    });

    it('is anchored, so a reference with prose either side of it is not one', () => {
        expect(binder.reference('see [The First Shelf](the-first-shelf)')).toBeUndefined();
        expect(binder.reference('[The First Shelf](the-first-shelf) is where they are')).toBeUndefined();
    });
});
