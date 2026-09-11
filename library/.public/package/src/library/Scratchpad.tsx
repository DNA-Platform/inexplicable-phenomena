export class $Scratchpad {
    protected _kept = new Map<string, unknown[]>();

    keep(key: string, it: unknown): void {
        const kept = this._kept.get(key);
        if (kept === undefined) this._kept.set(key, [it]);
        else kept.push(it);
    }

    find<T>(key: string): T | undefined {
        return this.all<T>(key)[0];
    }

    all<T>(key: string): T[] {
        return (this._kept.get(key) ?? []) as T[];
    }
}
