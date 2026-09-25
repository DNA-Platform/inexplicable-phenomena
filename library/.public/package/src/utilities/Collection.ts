import { ReactElement } from 'react';
import { $check, represented } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { reflection } from './Reflection';

export type Given<T> = T | (new () => T) | Component | ReactElement;
export type Author = object;

type Change<T> = { type: 'append' | 'prepend' | 'remove' | 'replace'; author: Author; values: T[] };

@represented()
export class Collection<T> {
    protected changes: Change<T>[] = [];
    protected values: T[] = [];

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

    add(author: Author, ...values: T[]): void {
        this.append(author, ...values);
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

    append(author: Author, ...values: T[]): void {
        this.change('append', author, ...values);
    }

    prepend(author: Author, ...values: T[]): void {
        this.change('prepend', author, ...values);
    }

    change(type: 'append' | 'prepend' | 'remove' | 'replace' | 'revert', author: Author, ...values: T[]): void {
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

    protected apply(values: T[], change: Change<T>): T[] {
        if (change.type === 'prepend')
            return [...change.values, ...values];
        if (change.type === 'append')
            return [...values, ...change.values];
        if (change.type === 'remove')
            return values.filter(value => !change.values.includes(value));
        const [replaced, replacement] = change.values;
        return values.map(value => value === replaced ? replacement : value);
    }
}

@represented()
export class Compilation<T> {
    protected collection = new Collection<T>();

    get value(): T | undefined {
        return this.collection.at(-1);
    }

    toString(): string {
        return this.value === undefined ? '' : `${this.value}`;
    }

    set(author: Author, value: T): void {
        this.collection.revert(author);
        this.collection.add(author, value);
    }

    revert(author: Author): void {
        this.collection.revert(author);
    }
}
