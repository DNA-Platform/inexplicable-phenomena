export type Inventory = {
    excludes: string[];
    root?: string;
};

export const inventory = {
    fields: ['excludes', 'root'] as (keyof Inventory & string)[],
    defaults: { excludes: [] } as Inventory,
    check(value: Inventory): string | undefined {
        if (!Array.isArray(value.excludes) || value.excludes.some(one => typeof one !== 'string')) return 'excludes must be a list of folder names';
        if (value.root !== undefined && typeof value.root !== 'string') return 'root must name a book';
        return undefined;
    },
};
