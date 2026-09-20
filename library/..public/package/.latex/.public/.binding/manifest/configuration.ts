export type Manifest = {
    origin?: string;
};

export const manifest = {
    fields: ['origin'] as (keyof Manifest & string)[],
    defaults: {} as Manifest,
    check(value: Manifest): string | undefined {
        if (value.origin !== undefined && (typeof value.origin !== 'string' || value.origin.trim() === ''))
            return 'origin must say where this .binding came from — a path to the master, the package carrying one, or github:<ref>';
        return undefined;
    },
};
