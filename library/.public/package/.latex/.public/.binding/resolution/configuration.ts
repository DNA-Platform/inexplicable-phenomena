export type Resolution = {
    base: string;
};

export const resolution = {
    fields: ['base'] as (keyof Resolution & string)[],
    defaults: { base: '/' } as Resolution,
    check(value: Resolution): string | undefined {
        if (typeof value.base !== 'string' || !value.base.startsWith('/') || !value.base.endsWith('/')) return 'base must begin and end with a slash';
        return undefined;
    },
};
