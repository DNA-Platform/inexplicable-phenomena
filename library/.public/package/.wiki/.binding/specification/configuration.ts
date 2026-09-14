export type Specification = {
    mode: 'development' | 'production';
};

export const specification = {
    fields: ['mode'] as (keyof Specification & string)[],
    defaults: { mode: 'development' } as Specification,
    check(value: Specification): string | undefined {
        if (value.mode !== 'development' && value.mode !== 'production') return 'mode must be "development" or "production"';
        return undefined;
    },
};
