import { ReactElement } from 'react';
import { $check, represented } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { reflection } from './Reflection';

export type Given<T> = T | (new () => T) | Component | ReactElement;
export type Author = object;
export type Side = 'left' | 'right';

type Change<T> = { type: Side | 'remove' | 'replace'; author: Author; values: T[] };
type Citation<T> = { author: Author; value: T };

@represented()
export class Collection<T> {
    private changes: Change<T>[] = [];
    private values: T[] = [];

    [Symbol.iterator](): IterableIterator<T> {
        return this.values[Symbol.iterator]();
    }

    toString(): string {
        let text = '';
        for (const value of this.values)
            text += `${value},`;
        return text;
    }

    at(index: number): T | undefined {
        return [...this].at(index);
    }

    after(value: T): T[] {
        const values = [...this];
        const index = values.indexOf(value);
        $check(index >= 0, 'after is asked of a value the collection holds, and this one it does not');
        return values.slice(index + 1);
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
        return [...this].filter((value): value is U => value instanceof Class);
    }

    contains<U extends T & object>(given: Given<U>): boolean {
        const Class = reflection.classOf(given);
        return [...this].some(value => value instanceof Class);
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

@represented()
export class Compilation<T> {
    private collection = new Collection<Citation<T>>();

    [Symbol.iterator](): IterableIterator<T> {
        const citation = [...this.collection].at(-1);
        return (citation === undefined ? [] : [citation.value])[Symbol.iterator]();
    }

    toString(): string {
        const [value] = this;
        return value === undefined ? '' : `${value}`;
    }

    set(author: Author, value: T): void {
        this.collection.revert(author);
        this.collection.add(author, { author, value });
    }

    revert(author: Author): void {
        this.collection.revert(author);
    }
}
