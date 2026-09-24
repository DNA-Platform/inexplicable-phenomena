import { ReactElement } from 'react';
import { $Chemical, represented } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { reflection } from './Reflection';

export type Given<T> = T | (new () => T) | Component | ReactElement;
export type Author = object;
export type Side = 'left' | 'right';

type Change<T> = { type: Side | 'remove' | 'replace'; author: Author; values: T[] };
type Citation<T> = { author: Author; value: T };

export class Collection<T> {
    private changes: Change<T>[] = [];
    private values: T[] = [];

    [Symbol.iterator](): IterableIterator<T> {
        return this.values[Symbol.iterator]();
    }

    add(author: Author, value: T, side: Side = 'right'): void {
        this.change(side, author, value);
    }

    remove(author: Author, value: T): void {
        this.change('remove', author, value);
    }

    replace(author: Author, value: T, replacement: T): void {
        this.change('replace', author, value, replacement);
    }

    revert(author: Author): void {
        this.change('revert', author);
    }

    change(type: Side | 'remove' | 'replace' | 'revert', author: Author, ...values: T[]): void {
        if (type === 'revert') {
            this.changes = this.changes.filter(change => change.author !== author);
            this.values = [];
            for (const change of this.changes)
                this.values = this.apply(this.values, change);
            return;
        }
        const change = { type, author, values };
        this.changes.push(change);
        this.values = this.apply(this.values, change);
    }

    find<U extends T & object>(given: Given<U>): U[] {
        const Class = reflection.classOf(given);
        return this.values.filter((value): value is U => value instanceof Class);
    }

    contains<U extends T & object>(given: Given<U>): boolean {
        const Class = reflection.classOf(given);
        return this.values.some(value => value instanceof Class);
    }

    containsOne<U extends T & object>(given: Given<U>): boolean {
        return this.find(given).length === 1;
    }

    private apply(values: T[], change: Change<T>): T[] {
        if (change.type === 'left')
            return [...change.values, ...values];
        if (change.type === 'right')
            return [...values, ...change.values];
        if (change.type === 'remove')
            return values.filter(value => !change.values.includes(value));
        const [replaced, replacement] = change.values;
        return values.map(value => value === replaced ? replacement : value);
    }
}

export class Compilation<T> {
    private collection = new Collection<Citation<T>>();

    [Symbol.iterator](): IterableIterator<T> {
        const [citation] = this.collection;
        return (citation === undefined ? [] : [citation.value])[Symbol.iterator]();
    }

    set(author: Author, value: T): void {
        for (const citation of this.collection)
            if (citation.author === author)
                return this.collection.replace(author, citation, { author, value });
        this.collection.add(author, { author, value });
    }

    revert(author: Author): void {
        this.collection.revert(author);
    }
}

@represented()
export class ChemicalCollection<T extends $Chemical> {
    private chemicals: T[] = [];

    constructor(protected parent?: $Chemical) { }

    get length(): number { return this.chemicals.length; }

    [Symbol.iterator](): IterableIterator<T> {
        return this.chemicals[Symbol.iterator]();
    }

    at(index: number): T | undefined {
        return this.chemicals.at(index);
    }

    every(holds: (chemical: T) => boolean): boolean {
        return this.chemicals.every(holds);
    }

    map<U>(pick: (chemical: T, index: number) => U): U[] {
        return this.chemicals.map(pick);
    }

    toString(): string {
        let text = '';
        for (const chemical of this.chemicals) text += `${chemical},`;
        return text;
    }

    add(...givens: Given<T>[]): T[] {
        const chemicals = givens.map(given => reflection.chemical(given, this.parent));
        this.chemicals.push(...chemicals);
        return chemicals;
    }

    prepend(...givens: Given<T>[]): T[] {
        const chemicals = givens.map(given => reflection.chemical(given, this.parent));
        this.chemicals.unshift(...chemicals);
        return chemicals;
    }

    replace(given: Given<T>): T | undefined {
        const index = this.chemicals.findIndex(chemical => chemical instanceof reflection.classOf(given));
        if (index < 0) return undefined;
        return this.chemicals[index] = reflection.chemical(given, this.parent);
    }

    ensure(given: Given<T>): T {
        const present = this.find(given)[0];
        if (present !== undefined) return present;
        const chemical = reflection.chemical(given, this.parent);
        const index = this.chemicals.findIndex(ancestor => chemical instanceof ancestor.constructor);
        if (index < 0) return this.add(chemical)[0];
        return this.chemicals[index] = chemical;
    }

    remove<U extends T>(given: Given<U>): void {
        const Class = reflection.classOf(given);
        this.chemicals = this.chemicals.filter(chemical => !(chemical instanceof Class));
    }

    drop(chemical: T): void {
        const index = this.chemicals.indexOf(chemical);
        if (index < 0) return;
        this.chemicals.splice(index, 1);
    }

    find<U extends T>(given: Given<U>): U[] {
        const Class = reflection.classOf(given);
        return this.chemicals.filter(chemical => chemical instanceof Class) as U[];
    }

    contains<U extends T>(given: Given<U>): boolean {
        return this.find(given).length > 0;
    }

    containsOne<U extends T>(given: Given<U>): boolean {
        return this.find(given).length === 1;
    }
}
