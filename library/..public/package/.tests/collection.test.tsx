import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection, Compilation, ChemicalCollection } from '@dna-platform/public';

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
const marks = (...chemicals: $Mark[]) => {
    const collection = new ChemicalCollection<$Mark>();
    for (const chemical of chemicals) collection.add(chemical);
    return collection;
};

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

describe('a compilation is one value compiled from what its authors set, and it answers the first author\'s', () => {
    it('answers nothing until an author sets a value, and then the first author\'s', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        expect([...compilation]).toEqual([]);
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        expect([...compilation]).toEqual(['the-first-shelf']);
    });

    it('changes an author\'s own value where it stands when that author sets again', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        compilation.set(editor, 'the-third-shelf');
        expect([...compilation]).toEqual(['the-third-shelf']);
        compilation.set(reviewer, 'the-fourth-shelf');
        expect([...compilation]).toEqual(['the-third-shelf']);
    });

    it('says the value it answers and nothing of the authors behind it', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        expect(String(compilation)).toBe('');
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        expect(String(compilation)).toBe('the-first-shelf');
        compilation.set(reviewer, 'the-third-shelf');
        expect(String(compilation)).toBe('the-first-shelf');
    });

    it('takes an author\'s value back when that author is reverted, and answers the next author\'s', () => {
        const editor = new Editor(), reviewer = new Reviewer();
        const compilation = new Compilation<string>();
        compilation.set(editor, 'the-first-shelf');
        compilation.set(reviewer, 'the-second-shelf');
        compilation.revert(editor);
        expect([...compilation]).toEqual(['the-second-shelf']);
        compilation.revert(reviewer);
        expect([...compilation]).toEqual([]);
    });
});

describe('a chemical collection is an ordered list', () => {
    it('keeps the order it was given, and answers length, at, iteration, every and map over it', () => {
        const first = mark(), second = stamp(), third = mark();
        const collection = marks(first, second, third);
        expect(collection.length).toBe(3);
        expect(collection.at(0)).toBe(first);
        expect(collection.at(-1)).toBe(third);
        expect([...collection]).toEqual([first, second, third]);
        expect(collection.every(chemical => chemical instanceof $Mark)).toBe(true);
        expect(collection.every(chemical => chemical instanceof $Stamp)).toBe(false);
        expect(collection.map((chemical, index) => index)).toEqual([0, 1, 2]);
    });

    it('add goes to the end and prepend to the front, several at once in their order, each answering what it made', () => {
        const collection = marks(mark());
        const [added, last] = collection.add(mark(), stamp());
        const [prepended, second] = collection.prepend(stamp(), mark());
        expect([...collection]).toEqual([prepended, second, collection.at(2), added, last]);
        expect(collection.find($Stamp)).toEqual([prepended, last]);
        expect(collection.length).toBe(5);
    });
});

describe('a chemical collection is handed a given in any form the framework can build', () => {
    it('takes a chemical as it is, and makes one from a class, a component, or an element', () => {
        const collection = new ChemicalCollection<$Mark>();
        const chemical = mark();
        expect(collection.add(chemical)[0]).toBe(chemical);
        expect(collection.add($Stamp)[0]).toBeInstanceOf($Stamp);
        expect(collection.add(Mark)[0]).toBeInstanceOf($Mark);
        expect(collection.add(<Stamp />)[0]).toBeInstanceOf($Stamp);
        expect(collection.length).toBe(4);
    });

    it('parents what it makes to the chemical it was made for, and leaves a parentless collection alone', () => {
        const holder = $(<Holder />) as unknown as $Holder;
        const owned = new ChemicalCollection<$Mark>(holder);
        expect(owned.add($Mark)[0].parent).toBe(holder);
        expect(owned.add(<Stamp />)[0].parent).toBe(holder);
        const chemical = mark();
        owned.add(chemical);
        expect(chemical.parent).toBe(holder);
        const loose = new ChemicalCollection<$Mark>();
        const [made] = loose.add($Mark);
        expect(made.parent).not.toBe(holder);
    });
});

describe('the five operations of E65 go by type', () => {
    it('find answers every instance of a class, subclasses included, in the list\'s order', () => {
        const sealed = seal();
        const collection = marks(sealed, mark(), stamp());
        expect(collection.find($Mark).length).toBe(3);
        expect(collection.find($Stamp)).toEqual([sealed, collection.at(2)]);
        expect(collection.find($Seal)).toEqual([sealed]);
        expect(collection.find($Chemical).length).toBe(3);
        expect(collection.find($Holder as never).length).toBe(0);
    });

    it('replace swaps the first instance of the given\'s own class in place, and does nothing when there is none', () => {
        const first = stamp(), second = mark(), third = stamp();
        const collection = marks(first, second, third);
        const replacement = stamp();
        expect(collection.replace(replacement)).toBe(replacement);
        expect([...collection]).toEqual([replacement, second, third]);
        expect(collection.find($Mark)).toEqual([replacement, second, third]);
        expect(collection.find($Stamp)).toEqual([replacement, third]);
        expect(marks(mark()).replace(stamp())).toBeUndefined();
    });

    it('ensure answers what is there, replaces an instance whose own class is an ancestor, and otherwise adds', () => {
        const collection = new ChemicalCollection<$Mark>();
        const added = collection.ensure($Mark);
        expect(collection.ensure($Mark)).toBe(added);
        expect(collection.ensure(mark())).toBe(added);
        const stamped = stamp();
        expect(collection.ensure(stamped)).toBe(stamped);
        expect([...collection]).toEqual([stamped]);
        expect(collection.ensure($Mark)).toBe(stamped);
        const sealed = collection.ensure($Seal);
        expect([...collection]).toEqual([sealed]);
        const other = collection.ensure($Holder as never);
        expect(collection.length).toBe(2);
        expect(collection.at(1)).toBe(other);
    });

    it('remove takes every instance of a class, subclasses included, and forgets them everywhere', () => {
        const collection = marks(stamp(), mark(), seal());
        collection.remove($Stamp);
        expect(collection.length).toBe(1);
        expect(collection.find($Stamp).length).toBe(0);
        expect(collection.find($Seal).length).toBe(0);
        expect(collection.find($Mark).length).toBe(1);
        collection.remove($Stamp);
        expect(collection.length).toBe(1);
    });

    it('drop takes one chemical by identity, and does nothing for one it does not hold', () => {
        const dropped = stamp();
        const collection = marks(mark(), dropped, stamp());
        collection.drop(dropped);
        expect(collection.length).toBe(2);
        expect(collection.find($Stamp).length).toBe(1);
        collection.drop(dropped);
        expect(collection.length).toBe(2);
    });
});

describe('the two questions a specification asks', () => {
    it('contains asks whether an instance of the class is there, subclasses included', () => {
        const collection = new ChemicalCollection<$Mark>();
        expect(collection.contains($Mark)).toBe(false);
        collection.add(stamp());
        expect(collection.contains($Mark)).toBe(true);
        expect(collection.contains($Stamp)).toBe(true);
        expect(collection.contains($Seal)).toBe(false);
    });

    it('containsOne asks that exactly one instance of the class be there', () => {
        const collection = marks(stamp());
        expect(collection.containsOne($Mark)).toBe(true);
        expect(collection.containsOne($Stamp)).toBe(true);
        collection.add(mark());
        expect(collection.containsOne($Mark)).toBe(false);
        expect(collection.containsOne($Stamp)).toBe(true);
        expect(collection.containsOne($Seal)).toBe(false);
    });

    it('says what it holds: its members\' symbols in order, so two readings are the same exactly when the members are', () => {
        const first = mark(), second = stamp();
        const collection = marks(first, second);
        expect(String(collection)).toBe(`${first},${second},`);
        expect(String(collection)).toMatch(/^\$Chemistry\.\$Mark\[\d+\],\$Chemistry\.\$Stamp\[\d+\],$/);
        const before = String(collection);
        collection.drop(second);
        expect(String(collection)).toBe(`${first},`);
        collection.add(second);
        expect(String(collection)).toBe(before);
        expect(String(new ChemicalCollection<$Mark>())).toBe('');
    });
});
