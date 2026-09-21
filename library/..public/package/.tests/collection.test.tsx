import { describe, it, expect } from 'vitest';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@dna-platform/public';

class $Mark extends $Chemical { }
class $Stamp extends $Mark { }
class $Seal extends $Stamp { }
class $Switch extends $Chemical { enforced = true; }
class $Holder extends $Chemical { }
const Mark = $($Mark);
const Stamp = $($Stamp);
const Seal = $($Seal);
const Switch = $($Switch);
const Holder = $($Holder);

const mark = () => $(<Mark />) as unknown as $Mark;
const stamp = () => $(<Stamp />) as unknown as $Stamp;
const seal = () => $(<Seal />) as unknown as $Seal;
const flip = () => $(<Switch />) as unknown as $Switch;
const marks = (...chemicals: $Mark[]) => {
    const collection = new Collection<$Mark>();
    for (const chemical of chemicals) collection.add(chemical);
    return collection;
};

describe('a collection is an ordered list', () => {
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

    it('add goes to the end and prepend to the front, each answering what it made', () => {
        const collection = marks(mark());
        const added = collection.add(mark());
        const prepended = collection.prepend(stamp());
        expect(collection.at(0)).toBe(prepended);
        expect(collection.at(-1)).toBe(added);
        expect(collection.length).toBe(3);
    });
});

describe('a collection is handed a given in any form the framework can build', () => {
    it('takes a chemical as it is, and makes one from a class, a component, or an element', () => {
        const collection = new Collection<$Mark>();
        const chemical = mark();
        expect(collection.add(chemical)).toBe(chemical);
        expect(collection.add($Stamp)).toBeInstanceOf($Stamp);
        expect(collection.add(Mark)).toBeInstanceOf($Mark);
        expect(collection.add(<Stamp />)).toBeInstanceOf($Stamp);
        expect(collection.length).toBe(4);
    });

    it('parents what it makes to the chemical it was made for, and leaves a parentless collection alone', () => {
        const holder = $(<Holder />) as unknown as $Holder;
        const owned = new Collection<$Mark>(holder);
        expect(owned.add($Mark).parent).toBe(holder);
        expect(owned.add(<Stamp />).parent).toBe(holder);
        const chemical = mark();
        owned.add(chemical);
        expect(chemical.parent).toBe(holder);
        const loose = new Collection<$Mark>();
        const made = loose.add($Mark);
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
        expect(collection.find($Switch as never).length).toBe(0);
    });

    it('replace swaps the first instance of the given\'s own class in place, everywhere it is filed, and does nothing when there is none', () => {
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
        const collection = new Collection<$Mark>();
        const added = collection.ensure($Mark);
        expect(collection.ensure($Mark)).toBe(added);
        expect(collection.ensure(mark())).toBe(added);
        const stamped = stamp();
        expect(collection.ensure(stamped)).toBe(stamped);
        expect([...collection]).toEqual([stamped]);
        expect(collection.ensure($Mark)).toBe(stamped);
        const sealed = collection.ensure($Seal);
        expect([...collection]).toEqual([sealed]);
        const other = collection.ensure($Switch as never);
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

describe('the two questions a specification asks count only what is enforced', () => {
    it('contains asks whether an enforced instance of the class is there', () => {
        const collection = new Collection<$Switch>();
        expect(collection.contains($Switch)).toBe(false);
        const first = collection.add($Switch);
        expect(collection.contains($Switch)).toBe(true);
        first.enforced = false;
        expect(collection.contains($Switch)).toBe(false);
        expect(collection.find($Switch).length).toBe(1);
    });

    it('containsOne asks that exactly one enforced instance be there', () => {
        const collection = new Collection<$Switch>();
        const first = collection.add(flip());
        expect(collection.containsOne($Switch)).toBe(true);
        const second = collection.add(flip());
        expect(collection.containsOne($Switch)).toBe(false);
        second.enforced = false;
        expect(collection.containsOne($Switch)).toBe(true);
        first.enforced = false;
        expect(collection.containsOne($Switch)).toBe(false);
    });

    it('a chemical without the word counts as enforced', () => {
        const collection = marks(mark());
        expect(collection.contains($Mark)).toBe(true);
        expect(collection.containsOne($Mark)).toBe(true);
    });
});
