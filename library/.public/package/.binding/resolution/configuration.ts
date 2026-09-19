export type Resolution = {
    base: string;
};

// WHERE THIS LIBRARY LIVES, WRITTEN FROM THE DOMAIN FORWARD. Doug, 2026-09-18: "can you express
// urls from domain forward". So `/` is the whole of a library published at the top of its domain,
// and `/inexplicable-phenomena/` is one published beneath a path.
//
// It ends with a slash because a book stands beneath it.
export const resolution = {
    fields: ['base'] as (keyof Resolution & string)[],
    defaults: { base: '/' } as Resolution,
    check(value: Resolution): string | undefined {
        return /^\/(?:[^\s]*\/)?$/u.test(value.base) ? undefined : `base is this library's address from the domain forward, beginning and ending with a slash — ${JSON.stringify(value.base)} is not`;
    },
};
