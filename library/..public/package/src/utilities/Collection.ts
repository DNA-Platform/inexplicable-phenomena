// ask: does the framework's collection tracking see a change inside this, or must it be an Array for that?
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

    add(chemical: T): void {
        this.chemicals.push(chemical);
        for (const Class of this.chain(chemical))
            this.file(Class, chemical);
    }

    replace(chemical: T): void {
        const replaced = this.find(chemical.constructor as new () => T)[0];
        if (replaced === undefined) return;
        this.swap(replaced, chemical);
    }

    ensure(chemical: T): void {
        if (this.find(chemical.constructor as new () => T).length > 0) return;
        for (const Class of this.chain(chemical)) {
            const replaced = this.classes.get(Class)?.[0];
            if (replaced === undefined) continue;
            return this.swap(replaced, chemical);
        }
        this.add(chemical);
    }

    remove<U extends T>(Class: new () => U): void {
        const removed = new Set<T>(this.classes.get(Class) ?? []);
        if (removed.size === 0) return;
        this.chemicals = this.chemicals.filter(chemical => !removed.has(chemical));
        for (const chemical of removed)
            for (const Class of this.chain(chemical))
                this.forget(Class, chemical);
    }

    find<U extends T>(Class: new () => U): ReadonlyArray<U> {
        return (this.classes.get(Class) ?? []) as U[];
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
