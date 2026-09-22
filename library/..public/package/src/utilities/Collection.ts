import { isValidElement, ReactElement } from 'react';
import { $, $check, $Chemical, represented } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';

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
        const chemicals = givens.map(given => this.made(given));
        this.chemicals.push(...chemicals);
        return chemicals;
    }

    prepend(...givens: Given<T>[]): T[] {
        const chemicals = givens.map(given => this.made(given));
        this.chemicals.unshift(...chemicals);
        return chemicals;
    }

    replace(given: Given<T>): T | undefined {
        const chemical = this.made(given);
        const index = this.chemicals.findIndex(present => present instanceof chemical.constructor);
        if (index < 0) return undefined;
        this.chemicals[index] = chemical;
        return chemical;
    }

    ensure(given: Given<T>): T {
        const Class = classOf(given);
        const present = this.chemicals.find(chemical => chemical instanceof Class);
        if (present !== undefined) return present;
        const chemical = this.made(given);
        const index = this.chemicals.findIndex(ancestor => chemical instanceof ancestor.constructor);
        if (index < 0) return this.add(chemical)[0];
        this.chemicals[index] = chemical;
        return chemical;
    }

    remove<U extends T>(given: Given<U>): void {
        const Class = classOf(given);
        this.chemicals = this.chemicals.filter(chemical => !(chemical instanceof Class));
    }

    drop(chemical: T): void {
        const index = this.chemicals.indexOf(chemical);
        if (index < 0) return;
        this.chemicals.splice(index, 1);
    }

    find<U extends T>(given: Given<U>): U[] {
        const Class = classOf(given);
        return this.chemicals.filter(chemical => chemical instanceof Class) as U[];
    }

    contains<U extends T>(given: Given<U>): boolean {
        return this.find(given).length > 0;
    }

    containsOne<U extends T>(given: Given<U>): boolean {
        return this.find(given).length === 1;
    }

    private made(given: Given<T>): T {
        const chemical = typeof given === 'function' ? $check(given as new () => T, '!')
            : isValidElement(given) ? $(given) as T
            : given as T;
        if (this.parent !== undefined && chemical.parent !== this.parent)
            chemical.parent = this.parent;
        return chemical;
    }
}

export function classOf<T extends object>(given: Given<T>): new () => T {
    if (typeof given === 'function') {
        const chemical = (given as { $chemical?: $Chemical }).$chemical;
        return chemical === undefined ? given as new () => T : chemical.constructor as new () => T;
    }
    if (isValidElement(given)) return classOf<T>(given.type as Given<T>);
    return (given as object).constructor as new () => T;
}
