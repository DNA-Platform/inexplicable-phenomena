import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection, Compilation } from '@dna-platform/public';

class $Mark extends $Chemical { }
class $Stamp extends $Mark { }
class $Seal extends $Stamp { }
class $Holder extends $Chemical { }
const Mark = $($Mark);
const Stamp = $($Stamp);
const Seal = $($Seal);
const Holder = $($Holder);

const mark = () => $(<Mark />) as unknown as $Mark;
const stamp = () => $(<Stamp />) as unknown as $Stamp;
const seal = () => $(<Seal />) as unknown as $Seal;

class Editor { }
class Reviewer { }
class Proofreader { }

let draws = 0;
class $Shelf extends $Chemical {
    labels!: Collection<string>;

    $Shelf() {
        this.labels = new Collection<string>();
    }

    view(): React.ReactNode {
        draws++;
        return <span>{String(this.labels)}</span>;
    }

    label(text: string): void {
        this.labels.add(this, text);
    }

    relabel(text: string): void {
        this.labels.add(this, text);
        this.labels.remove(this, text);
    }
}
const Shelf = $($Shelf);

const settle = () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });

class Watched extends Collection<string> {
    types: string[] = [];

    override change(...parameters: Parameters<Collection<string>['change']>): void {
        this.types.push(parameters[0]);
        super.change(...parameters);
    }
}

describe('a collection is changed by authors, and every change is cited to the author who made it', () => {
    it('iterates its values in the order the changes put them: add puts a value on the right, or on the left when told', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.add(reviewer, 'blockquote', 'left');
        collection.add(reviewer, 'em');
        expect([...collection]).toEqual(['blockquote', 'span', 'em']);
    });

    it('makes every change through change, so a subclass sees add, remove, replace and revert in one place', () => {
        const editor = new Editor();
        const collection = new Watched();
        collection.add(editor, 'span');
        collection.add(editor, 'div', 'left');
        collection.remove(editor, 'span');
        collection.replace(editor, 'div', 'section');
        collection.revert(editor);
        expect(collection.types).toEqual(['right', 'left', 'remove', 'replace', 'revert']);
        expect([...collection]).toEqual([]);
    });

    it('takes a value away wherever it stands when it is removed, and puts another where it stood when it is replaced', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'pa-quoted');
        collection.add(reviewer, 'pa-quoted');
        collection.add(editor, 'pa-referent');
        collection.remove(reviewer, 'pa-quoted');
        expect([...collection]).toEqual(['pa-referent']);
        collection.replace(reviewer, 'pa-referent', 'pa-reference');
        expect([...collection]).toEqual(['pa-reference']);
    });

    it('takes back everything one author did and nothing anyone else did when that author is reverted: what it added goes, and what it removed or replaced comes back', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.add(reviewer, 'div', 'left');
        collection.remove(reviewer, 'span');
        collection.add(reviewer, 'em');
        collection.add(editor, 'strong');
        expect([...collection]).toEqual(['div', 'em', 'strong']);
        collection.revert(reviewer);
        expect([...collection]).toEqual(['span', 'strong']);
        collection.replace(reviewer, 'span', 'section');
        expect([...collection]).toEqual(['section', 'strong']);
        collection.revert(reviewer);
        expect([...collection]).toEqual(['span', 'strong']);
    });

    it('keeps a value gone when what added it is reverted, though another author removed it afterwards, because its values are its changes applied in order', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.remove(reviewer, 'span');
        collection.revert(editor);
        expect([...collection]).toEqual([]);
    });

    it('brings a value back when the author that removed it is reverted', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.remove(reviewer, 'span');
        collection.revert(reviewer);
        expect([...collection]).toEqual(['span']);
    });

    it('takes away a replacement when what it replaced is reverted, since it stood only in that value\'s place', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.replace(reviewer, 'span', 'section');
        collection.revert(editor);
        expect([...collection]).toEqual([]);
    });

    it('puts an author that changes again after reverting behind every author that did not, which is why a definition reverts every author before any acts again', () => {
        const editor = new Editor(), reviewer = new Reviewer(), proofreader = new Proofreader();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.add(reviewer, 'div', 'left');
        collection.add(proofreader, 'article', 'left');
        expect([...collection]).toEqual(['article', 'div', 'span']);
        collection.revert(reviewer);
        collection.add(reviewer, 'div', 'left');
        expect([...collection]).toEqual(['div', 'article', 'span']);
    });

    it('goes by instance: a value is removed by identity, and any instance can be an author', () => {
        const holder = $(<Holder />) as unknown as $Holder;
        const kept = stamp(), removed = stamp();
        const collection = new Collection<$Mark>();
        collection.add(holder, kept);
        collection.add(holder, removed);
        collection.remove(new Editor(), removed);
        expect([...collection]).toEqual([kept]);
    });

    it('says its values in order and nothing of how they got there, so two collections read the same exactly when their values are the same', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const direct = new Collection<string>();
        direct.add(editor, 'span');
        const roundabout = new Collection<string>();
        roundabout.add(reviewer, 'div');
        roundabout.add(editor, 'span');
        roundabout.remove(reviewer, 'div');
        expect(String(direct)).toBe('span,');
        expect(String(roundabout)).toBe(String(direct));
        roundabout.revert(editor);
        expect(String(roundabout)).toBe('');
    });

    it('is represented by what it says, so chemistry redraws when a method changes its values and not when a method leaves them as they were', async () => {
        const shelf = $(<Shelf />) as unknown as $Shelf;
        const Drawn = $(shelf);
        await act(async () => { render(<Drawn />); });
        await settle();
        draws = 0;
        await act(async () => { shelf.relabel('pa-quoted'); });
        await settle();
        expect(draws).toBe(0);
        await act(async () => { shelf.label('pa-quoted'); });
        await settle();
        expect(draws).toBe(2);
    });

    it('answers what stands after a value, in order, and throws for a value it does not hold', () => {
        const editor = new Editor();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.add(editor, 'div');
        collection.add(editor, 'em');
        expect(collection.after('span')).toEqual(['div', 'em']);
        expect(collection.after('em')).toEqual([]);
        expect(() => collection.after('section')).toThrow('after is asked of a value the collection holds, and this one it does not');
    });

    it('changes nothing for an author that changed nothing, or for a value that is not there', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const collection = new Collection<string>();
        collection.add(editor, 'span');
        collection.revert(reviewer);
        collection.remove(reviewer, 'div');
        collection.replace(reviewer, 'div', 'section');
        expect([...collection]).toEqual(['span']);
    });
});

describe('a collection finds its values by type', () => {
    it('find answers every value that is an instance of a class, subclasses included, in order, from any form of the class', () => {
        const editor = new Editor();
        const sealed = seal(), marked = mark(), stamped = stamp();
        const collection = new Collection<$Mark>();
        collection.add(editor, sealed);
        collection.add(editor, marked);
        collection.add(editor, stamped);
        expect(collection.find($Stamp)).toEqual([sealed, stamped]);
        expect(collection.find(Stamp)).toEqual([sealed, stamped]);
        expect(collection.find(<Stamp />)).toEqual([sealed, stamped]);
        expect(collection.find($Mark).length).toBe(3);
        expect(collection.find($Holder as never)).toEqual([]);
    });

    it('contains asks whether one is there, and containsOne whether exactly one is', () => {
        const editor = new Editor();
        const collection = new Collection<$Mark>();
        expect(collection.contains($Mark)).toBe(false);
        collection.add(editor, stamp());
        expect(collection.contains($Mark)).toBe(true);
        expect(collection.containsOne($Stamp)).toBe(true);
        collection.add(editor, mark());
        expect(collection.containsOne($Mark)).toBe(false);
        expect(collection.contains($Seal)).toBe(false);
    });
});

describe('a compilation is one value compiled from what its authors set, and the last value set wins', () => {
    it('answers nothing until an author sets a value, and then the last value set', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        expect([...compilation]).toEqual([]);
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        expect([...compilation]).toEqual(['the-second-shelf']);
    });

    it('lets an author that sets again win, since its value is now the last set', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        compilation.set(editor, 'the-third-shelf');
        expect([...compilation]).toEqual(['the-third-shelf']);
        compilation.set(reviewer, 'the-fourth-shelf');
        expect([...compilation]).toEqual(['the-fourth-shelf']);
    });

    it('says the value it answers and nothing of the values set before it', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        expect(String(compilation)).toBe('');
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        expect(String(compilation)).toBe('the-second-shelf');
        compilation.revert(editor);
        expect(String(compilation)).toBe('the-second-shelf');
    });

    it('takes an author\'s value back when that author is reverted, and answers the value set before it', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        compilation.revert(reviewer);
        expect([...compilation]).toEqual(['the-first-shelf']);
        compilation.revert(editor);
        expect([...compilation]).toEqual([]);
    });
});
