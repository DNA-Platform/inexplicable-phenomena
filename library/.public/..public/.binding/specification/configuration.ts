export type Specification = {
    mode: 'development' | 'production';
    batch: number;
    parallel: number;
};

export const specification = {
    fields: ['mode', 'batch', 'parallel'] as (keyof Specification & string)[],
    // A PROCESS READS A BATCH OF BOOKS AND KEEPS EVERY CHEMICAL IT MAKES — chemistry files each one
    // in a map that only a destroy clears, and nothing destroys here — so a large library is read a
    // batch at a time rather than all at once. Bigger amortises the three seconds a process costs
    // before it reads anything; smaller bounds what one process holds.
    //
    // AND HOW MANY PROCESSES READ AT ONCE. One unless the library says more; the specify line says the
    // most a process held, which is the number to set this by — 2026-10-16.
    defaults: { mode: 'development', batch: 16, parallel: 1 } as Specification,
    check(value: Specification): string | undefined {
        if (value.mode !== 'development' && value.mode !== 'production') return 'mode must be "development" or "production"';
        if (!Number.isInteger(value.batch) || value.batch < 1) return 'batch must be how many books one process reads, at least one';
        if (!Number.isInteger(value.parallel) || value.parallel < 1) return 'parallel must be how many processes read at once, at least one';
        return undefined;
    },
};
