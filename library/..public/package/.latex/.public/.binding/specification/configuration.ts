export type Specification = {
    mode: 'development' | 'production';
    batch: number;
};

export const specification = {
    fields: ['mode', 'batch'] as (keyof Specification & string)[],
    // A PROCESS READS A BATCH OF BOOKS AND KEEPS EVERY CHEMICAL IT MAKES — chemistry files each one
    // in a map that only a destroy clears, and nothing destroys here — so a large library is read a
    // batch at a time rather than all at once. Bigger amortises the three seconds a process costs
    // before it reads anything; smaller bounds what one process holds.
    defaults: { mode: 'development', batch: 16 } as Specification,
    check(value: Specification): string | undefined {
        if (value.mode !== 'development' && value.mode !== 'production') return 'mode must be "development" or "production"';
        if (!Number.isInteger(value.batch) || value.batch < 1) return 'batch must be how many books one process reads, at least one';
        return undefined;
    },
};
