// WHAT THE BINDER DOES NOT BIND. One word, because it is one idea: a NAME is a folder the walk never
// enters, wherever it stands, and a PATH — anything carrying a slash — is one file the accounting
// passes over. Two lists were written here first, `excludes` and `outside`, and Doug named the fault:
// "Can you please make a tiny config have the most basic concepts have the most basic names."
export type Inventory = {
    exclude: string[];
    root?: string;
};

export const inventory = {
    fields: ['exclude', 'root'] as (keyof Inventory & string)[],
    defaults: { exclude: [] } as Inventory,
    check(value: Inventory): string | undefined {
        if (!Array.isArray(value.exclude) || value.exclude.some(one => typeof one !== 'string')) return 'exclude must be a list of folder names and paths';
        if (value.exclude.some(one => one.startsWith('/') || one.includes('\\'))) return 'a path in exclude is relative to the library and separated by /';
        if (value.root !== undefined && typeof value.root !== 'string') return 'root must name a book';
        return undefined;
    },
};
