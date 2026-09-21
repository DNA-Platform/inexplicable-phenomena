import { isValidElement, ReactElement } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';

export type Given<T> = T | (new () => T) | Component<T> | ReactElement;

export class Collection<T extends object> {
    private chemicals: T[] = [];
    private classes = new Map<Function, T[]>();

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

    add(given: Given<T>): T {
        const chemical = this.made(given);
        this.chemicals.push(chemical);
        for (const Class of this.chain(chemical))
            this.file(Class, chemical);
        return chemical;
    }

    replace(given: Given<T>): T | undefined {
        const chemical = this.made(given);
        const replaced = this.find(chemical.constructor as new () => T)[0];
        if (replaced === undefined) return undefined;
        this.swap(replaced, chemical);
        return chemical;
    }

    ensure(given: Given<T>): T {
        if (typeof given === 'function' && this.contains(given as new () => T))
            return this.find(given as new () => T)[0];
        const chemical = this.made(given);
        const present = this.find(chemical.constructor as new () => T)[0];
        if (present !== undefined) return present;
        for (const Class of this.chain(chemical)) {
            const replaced = this.classes.get(Class)?.find(other => other.constructor === Class);
            if (replaced === undefined) continue;
            this.swap(replaced, chemical);
            return chemical;
        }
        return this.add(chemical);
    }

    remove<U extends T>(Class: new () => U): void {
        const removed = new Set<T>(this.classes.get(Class) ?? []);
        if (removed.size === 0) return;
        this.chemicals = this.chemicals.filter(chemical => !removed.has(chemical));
        for (const chemical of removed)
            for (const Class of this.chain(chemical))
                this.forget(Class, chemical);
    }

    drop(chemical: T): void {
        const index = this.chemicals.indexOf(chemical);
        if (index < 0) return;
        this.chemicals.splice(index, 1);
        for (const Class of this.chain(chemical))
            this.forget(Class, chemical);
    }

    find<U extends T>(Class: new () => U): ReadonlyArray<U> {
        return (this.classes.get(Class) ?? []) as U[];
    }

    contains<U extends T>(Class: new () => U): boolean {
        return this.classes.has(Class);
    }

    containsOne<U extends T>(Class: new () => U): boolean {
        return this.classes.get(Class)?.length === 1;
    }

    // ask: a class or a component goes through the framework's find-or-make, an element through its eval form, a chemical stands; is this the whole of what a prop may hand in?
    private made(given: Given<T>): T {
        if (typeof given === 'function') return $check(given as new () => T, '!');
        if (isValidElement(given)) return $(given) as T;
        return given as T;
    }

    private swap(replaced: T, chemical: T): void {
        this.chemicals[this.chemicals.indexOf(replaced)] = chemical;
        const joined = new Set(this.chain(chemical));
        for (const Class of this.chain(replaced)) {
            if (!joined.has(Class)) {
                this.forget(Class, replaced);
                continue;
            }
            const chemicals = this.classes.get(Class) ?? [];
            chemicals[chemicals.indexOf(replaced)] = chemical;
            joined.delete(Class);
        }
        for (const Class of joined)
            this.file(Class, chemical);
    }

    private file(Class: Function, chemical: T): void {
        const chemicals = this.classes.get(Class);
        if (chemicals === undefined)
            this.classes.set(Class, [chemical]);
        else
            chemicals.push(chemical);
    }

    private forget(Class: Function, chemical: T): void {
        const chemicals = this.classes.get(Class);
        if (chemicals === undefined) return;
        chemicals.splice(chemicals.indexOf(chemical), 1);
        if (chemicals.length === 0)
            this.classes.delete(Class);
    }

    private chain(chemical: T): Function[] {
        const classes: Function[] = [];
        for (let Class = chemical.constructor; Class !== Object && typeof Class === 'function'; Class = Object.getPrototypeOf(Class))
            classes.push(Class);
        return classes;
    }
}
