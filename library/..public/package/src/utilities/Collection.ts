import { isValidElement, ReactElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';

export type Given<T> = T | (new () => T) | Component | ReactElement;

// ask: the collection reads two optional words of what it holds, enforced and opposite, so that contents and annotations stay one class; is that the utility's contract, or writing's word on a utility?
export class Collection<T extends $Chemical & { enforced?: boolean; opposite?: Function }> {
    private chemicals: T[] = [];
    private classes = new Map<Function, T[]>();

    constructor(private parent?: $Chemical) { }

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
        for (const Class of this.filed(chemical))
            this.file(Class, chemical);
        return chemical;
    }

    prepend(given: Given<T>): T {
        const chemical = this.made(given);
        this.chemicals.unshift(chemical);
        for (const Class of this.filed(chemical))
            this.file(Class, chemical, true);
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
        if (typeof given === 'function') {
            const present = this.find(given as new () => T)[0];
            if (present !== undefined) return present;
        }
        const chemical = this.made(given);
        const present = this.find(chemical.constructor as new () => T)[0];
        if (present !== undefined) return present;
        for (const Class of this.chain(chemical)) {
            const replaced = this.classes.get(Class)?.find(chemical => chemical.constructor === Class);
            if (replaced === undefined) continue;
            this.swap(replaced, chemical);
            return chemical;
        }
        return this.add(chemical);
    }

    // ask: the toggle from a prop — the front entry of the class's bucket is enforced when it is the right kind and made transparent when it is the other; a new one stands only when nothing behind reads right. Is that the pair's toggling?
    enforce<U extends T>(Class: new () => U): void {
        const key = (Class.prototype.opposite as Function | undefined) ?? Class;
        const chemicals = this.classes.get(key) ?? [];
        const front = chemicals[0];
        if (front instanceof Class)
            front.enforced = true;
        else if (front !== undefined)
            front.enforced = false;
        if (this.contains(key as new () => T) === (key === Class)) return;
        this.prepend(Class);
    }

    remove<U extends T>(Class: new () => U): void {
        const removed = new Set<T>(this.find(Class));
        if (removed.size === 0) return;
        this.chemicals = this.chemicals.filter(chemical => !removed.has(chemical));
        for (const chemical of removed)
            for (const Class of this.filed(chemical))
                this.forget(Class, chemical);
    }

    drop(chemical: T): void {
        const index = this.chemicals.indexOf(chemical);
        if (index < 0) return;
        this.chemicals.splice(index, 1);
        for (const Class of this.filed(chemical))
            this.forget(Class, chemical);
    }

    find<U extends T>(Class: new () => U): ReadonlyArray<U> {
        return (this.classes.get(Class) ?? []).filter((chemical): chemical is U => chemical instanceof Class);
    }

    // ask: the reading rule — an entry that is not enforced is transparent, the first enforced entry decides, and an opposite standing there reads as absence. Is "treat it as if it was not there" this transparency?
    contains<U extends T>(Class: new () => U): boolean {
        for (const chemical of this.classes.get(Class) ?? [])
            if (chemical.enforced !== false)
                return chemical instanceof Class;
        return false;
    }

    containsOne<U extends T>(Class: new () => U): boolean {
        return this.contains(Class) && this.find(Class).filter(chemical => chemical.enforced !== false).length === 1;
    }

    private made(given: Given<T>): T {
        const chemical = typeof given === 'function' ? $check(given as new () => T, '!')
            : isValidElement(given) ? $(given) as T
            : given as T;
        if (this.parent !== undefined && chemical.parent !== this.parent)
            chemical.parent = this.parent;
        return chemical;
    }

    private swap(replaced: T, chemical: T): void {
        this.chemicals[this.chemicals.indexOf(replaced)] = chemical;
        const joined = new Set(this.filed(chemical));
        for (const Class of this.filed(replaced)) {
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

    private file(Class: Function, chemical: T, first = false): void {
        const chemicals = this.classes.get(Class);
        if (chemicals === undefined)
            this.classes.set(Class, [chemical]);
        else if (first)
            chemicals.unshift(chemical);
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

    private filed(chemical: T): Function[] {
        const classes = this.chain(chemical);
        if (chemical.opposite !== undefined)
            classes.push(chemical.opposite);
        return classes;
    }

    private chain(chemical: T): Function[] {
        const classes: Function[] = [];
        for (let Class = chemical.constructor; Class !== Object && typeof Class === 'function'; Class = Object.getPrototypeOf(Class))
            classes.push(Class);
        return classes;
    }
}
