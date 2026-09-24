import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $check, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, Word, Sentence, $Annotation, Parenthetical, binder, html } from '@dna-platform/public';
import { $Sentence, $Mention, Mention, $Referent, Referent, $Reference, Reference } from '@dna-platform/public';
import { $Format } from '@dna-platform/public';

class $Unmentioned extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Referent || annotation instanceof $Reference)
                writing.annotations.express(annotation, false);
    }
}
const Unmentioned = $($Unmentioned);

class $Quoted extends $Format {
    style = styled.blockquote`border-left: 3px solid silver;`;
}
const Quoted = $($Quoted);

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

describe('the copy of a writing is what was written in it', () => {
    it('answers a string it was written with', () => {
        const writing = built<$Writing>(<Writing>the first shelf</Writing>);
        expect(html.copy(writing.contents)).toBe('the first shelf');
    });

    it('answers the prose around a nested writing and not what is inside it, since copy is one level deep', () => {
        const writing = built<$Writing>(<Writing>shelf <Word>number</Word> 3</Writing>);
        expect(html.copy(writing.contents)).toBe('shelf  3');
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

describe('the binder writes [text](identifier) and any component reads both halves through it', () => {
    it('reads an identifier the compiler allocated, which is an id', () => {
        expect(binder.reference('[The First Shelf](the-first-shelf)')).toEqual({ text: 'The First Shelf', identifier: 'the-first-shelf' });
    });

    it('reads an identifier the compiler resolved, which is a url', () => {
        expect(binder.reference('[The Library](/the-library/)')).toEqual({ text: 'The Library', identifier: '/the-library/' });
    });

    it('reads an empty identifier, which is the page it stands on', () => {
        expect(binder.reference('[The Library]()')).toEqual({ text: 'The Library', identifier: '' });
    });

    it('reads a string a component found for itself, wherever it found it', () => {
        const writing = built<$Writing>(<Writing>[The First Shelf](the-first-shelf)</Writing>);
        expect(binder.reference(html.copy(writing.contents))).toEqual({ text: 'The First Shelf', identifier: 'the-first-shelf' });
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

describe('a referent is the id its writing answers to', () => {
    it('holds the identifier it was given', () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent></Writing>);
        expect(writing.annotations.find($Referent)[0].identifier).toBe('the-first-shelf');
    });

    it('gives its writing the id and its class', () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent></Writing>);
        expect(String(writing.id)).toBe('the-first-shelf');
        expect([...writing.classes]).toContain('pa-referent');
    });

    it('drawn, the id is on the element a reference comes to', async () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent></Writing>);
        const page = await drawn(writing);
        expect(page.querySelector('#the-first-shelf')).not.toBeNull();
        expect(page.querySelector('#the-first-shelf')!.className).toContain('pa-referent');
    });

    it('takes the id and the class back when a family member says it does not apply', () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent><Unmentioned /></Writing>);
        expect(String(writing.id)).toBe('');
        expect([...writing.classes]).not.toContain('pa-referent');
    });

    it('is expressed again the moment what repressed it is gone, since expression is computed', () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent><Unmentioned /></Writing>);
        expect(String(writing.id)).toBe('');
        writing.annotations.remove(writing, writing.annotations.find($Unmentioned)[0]);
        writing.annotations.define();
        expect(String(writing.id)).toBe('the-first-shelf');
    });

    it('answers the last id set, which is the referent standing furthest back, and the one before it when that one goes', () => {
        const writing = built<$Writing>(<Writing>a shelf <Referent>the-first-shelf</Referent><Referent>the-second-shelf</Referent></Writing>);
        expect(String(writing.id)).toBe('the-first-shelf');
        const [, behind] = [...writing.annotations];
        writing.annotations.remove(writing, behind);
        writing.annotations.define();
        expect(String(writing.id)).toBe('the-second-shelf');
    });

    it('refuses a writing that is mentioned twice, and one that names nothing', () => {
        const twice = built<$Writing>(<Writing>a shelf <Referent>one</Referent><Referent>two</Referent></Writing>);
        expect(twice.specify()).toContain('Writing: a writing is mentioned once, and this one is mentioned more than once');
        const empty = built<$Writing>(<Writing>a shelf <Referent /></Writing>);
        expect(empty.specify()).toContain('Writing: a referent is the id its writing answers to, and this one holds none');
    });
});

describe('a mention is the word that reads what the compiler wrote', () => {
    it('is a word, and stands a referent holding the identifier', () => {
        const mention = built<$Mention>(<Mention>[The First Shelf](the-first-shelf)</Mention>);
        expect(mention.level).toBe(2);
        expect(mention.annotations.find($Referent)[0].identifier).toBe('the-first-shelf');
    });

    it('shows the words and never the syntax', async () => {
        const mention = built<$Mention>(<Mention>[The First Shelf](the-first-shelf)</Mention>);
        expect(mention.text).toBe('The First Shelf');
        const page = await drawn(mention);
        expect(page.textContent).toContain('The First Shelf');
        expect(page.textContent).not.toContain('](');
    });

    it('drawn, its own element carries the id', async () => {
        const mention = built<$Mention>(<Mention>[The First Shelf](the-first-shelf)</Mention>);
        const page = await drawn(mention);
        expect(page.querySelector('#the-first-shelf')).not.toBeNull();
    });

    it('is a part of the sentence that holds it, because a word is not a same-class child of one', () => {
        const sentence = built<$Sentence>(<Sentence>see <Mention>[The First Shelf](the-first-shelf)</Mention></Sentence>);
        expect(sentence.parts.filter(part => part instanceof $Mention).length).toBe(1);
    });

    it('behaves the same written by hand as compiled, since the compiler only writes source', () => {
        const compiled = built<$Mention>(<Mention>[The First Shelf](the-first-shelf)</Mention>);
        const byHand = built<$Writing>(<Writing>The First Shelf<Referent>the-first-shelf</Referent></Writing>);
        expect(String(compiled.id)).toBe(String(byHand.id));
    });

    it('says no identifier when its content is not a reference, and is refused', () => {
        const mention = built<$Mention>(<Mention>The First Shelf</Mention>);
        expect(mention.annotations.find($Referent)).toEqual([]);
        expect(mention.specify()).toContain('Mention: a mention says its words and an identifier, and this one says no identifier');
    });
});

describe('a reference is the address its writing means', () => {
    it('holds the identifier it was given and gives its writing the class', () => {
        const writing = built<$Writing>(<Writing>the library <Reference>/the-library/</Reference></Writing>);
        expect(writing.annotations.find($Reference)[0].identifier).toBe('/the-library/');
        expect([...writing.classes]).toContain('pa-reference');
    });

    it('never gives its writing an id, and takes its class back when it does not apply', () => {
        const standing = built<$Writing>(<Writing>the library <Reference>/the-library/</Reference></Writing>);
        expect(String(standing.id)).toBe('');
        const repressed = built<$Writing>(<Writing>the library <Reference>/the-library/</Reference><Unmentioned /></Writing>);
        expect([...repressed.classes]).not.toContain('pa-reference');
    });

    it('stands beside a referent without either taking the other\'s mark', () => {
        const writing = built<$Writing>(<Writing>here <Referent>here</Referent><Reference>/there/</Reference></Writing>);
        expect(String(writing.id)).toBe('here');
        expect([...writing.classes]).toContain('pa-referent');
        expect([...writing.classes]).toContain('pa-reference');
    });
});

describe('a reference makes its writing a link by adding a layer to its containers', () => {
    it('alone, its anchor is the outermost layer, wearing the classes and the id, with the writing\'s own inside it', async () => {
        const writing = built<$Writing>(<Writing>go<Referent>there</Referent><Reference>/there/</Reference></Writing>);
        const page = await drawn(writing);
        const anchor = page.firstElementChild!;
        expect(anchor.tagName).toBe('A');
        expect(anchor.getAttribute('href')).toBe('/there/');
        expect(String(anchor.id)).toBe('there');
        expect(anchor.className).toContain('pa-reference');
        expect(anchor.firstElementChild!.tagName).toBe('SPAN');
    });

    it('composes with a format in either order, and whichever acts later is drawn outside', async () => {
        const formatInFront = await drawn(built<$Writing>(<Writing>x<Reference>/r/</Reference><Quoted /></Writing>));
        expect(formatInFront.firstElementChild!.tagName).toBe('A');
        expect(formatInFront.querySelector('a > blockquote')).not.toBeNull();
        const referenceInFront = await drawn(built<$Writing>(<Writing>x<Quoted /><Reference>/r/</Reference></Writing>));
        expect(referenceInFront.firstElementChild!.tagName).toBe('BLOCKQUOTE');
        expect(referenceInFront.querySelector('blockquote > a')).not.toBeNull();
    });

    it('the writing\'s text is inside the anchor, so clicking the writing follows it', async () => {
        const page = await drawn(built<$Writing>(<Writing>Alan Turing<Reference>/alan-turing/</Reference><Quoted /></Writing>));
        const text = [...page.querySelectorAll('span')].find(span => span.textContent?.startsWith('Alan Turing'))!;
        expect(text.closest('a')?.getAttribute('href')).toBe('/alan-turing/');
    });

    it('taken out of expression, its layer goes and the format\'s stays', () => {
        const writing = built<$Writing>(<Writing>x<Reference>/r/</Reference><Quoted /><Unmentioned /></Writing>);
        const layers = [...writing.containers];
        expect(layers.length).toBe(2);
        expect(layers[1]).toBe('span');
        expect(typeof layers[0]).not.toBe('string');
    });

    it('registering is idempotent, and its anchor keeps one identity however many passes run', () => {
        const writing = built<$Writing>(<Writing>x<Reference>/r/</Reference></Writing>);
        const anchor = [...writing.containers][0];
        writing.view();
        writing.view();
        expect([...writing.containers]).toEqual([anchor, 'span']);
    });
});
