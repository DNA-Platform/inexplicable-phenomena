import { ReactElement } from 'react';
import { $Chemical, represented } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { reflection } from './Reflection';

export type Given<T> = T | (new () => T) | Component | ReactElement;

@represented()
export class Collection<T extends $Chemical> {
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
