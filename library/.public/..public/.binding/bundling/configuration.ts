export type Bundling = {
    batch: number;
};

export const bundling = {
    fields: ['batch'] as (keyof Bundling & string)[],
    // THE STALE BOOKS ARE BUILT A BATCH AT A TIME, this many to one Vite build. One build of every book's
    // chunk ran the binder out of its heap at 1,019 books on 2026-10-19, where the whole-library build of
    // the day before had fit: a thousand entries whose signatures are kept weigh more than one. A batch is
    // bounded; what a book shares with the others of its batch is one chunk among them, and what it shares
    // with a book of another batch is built twice, a manual's code a few kilobytes over.
    defaults: { batch: 64 } as Bundling,
    check(value: Bundling): string | undefined {
        if (!Number.isInteger(value.batch) || value.batch < 1) return 'batch must be how many books one build bundles, at least one';
        return undefined;
    },
};
