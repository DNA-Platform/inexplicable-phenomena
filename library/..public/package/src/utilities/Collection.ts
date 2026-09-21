// ask: the name — a collection of chemicals by class, carrying E65's five operations; and does the framework's collection tracking see a change inside it, or must it be an Array for that?
export class Collection<T extends object> {
    private chemicals: T[] = [];

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
    }

    replace(chemical: T): void {
        const index = this.chemicals.findIndex(other => other instanceof (chemical.constructor as new () => T));
        if (index < 0) return;
        this.chemicals[index] = chemical;
    }

    ensure(chemical: T): void {
        if (this.find(chemical.constructor as new () => T).length > 0) return;
        const index = this.chemicals.findIndex(other => chemical instanceof (other.constructor as new () => T));
        if (index < 0) return this.add(chemical);
        this.chemicals[index] = chemical;
    }

    remove<U extends T>(Class: new () => U): void {
        this.chemicals = this.chemicals.filter(chemical => !(chemical instanceof Class));
    }

    // ask: by instanceof, walked each time, since a subclass answers to its parent's class — or an index by constructor, with the chain walked once?
    find<U extends T>(Class: new () => U): U[] {
        return this.chemicals.filter((chemical): chemical is U => chemical instanceof Class);
    }
}
