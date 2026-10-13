export type Rendering = {
    title: string;
    stylesheets: string[];
    fonts: string[];
    icon?: string;
    budget: number;
};

export const rendering = {
    fields: ['title', 'stylesheets', 'fonts', 'icon', 'budget'] as (keyof Rendering & string)[],
    // A CHILD DRAWS A BATCH OF PAGES AND KEEPS EVERY CHEMICAL IT MAKES, as a child that specifies does
    // — measured 2026-10-14 on one project of twenty conversations: the heap after each page, collected
    // first, climbed from 224 MB to 6.3 GB and never fell, half a gigabyte retained for every megabyte of
    // chapter source. So a child draws pages whose books together hold at most this many megabytes of
    // source, and a book larger than that draws alone. Smaller bounds what one process holds; bigger
    // amortises the seconds a process costs before it draws anything.
    defaults: { title: 'A Library', stylesheets: [], fonts: [], budget: 8 } as Rendering,
    check(value: Rendering): string | undefined {
        if (typeof value.title !== 'string' || value.title.trim() === '') return 'title must be a non-empty string';
        if (!Array.isArray(value.stylesheets) || value.stylesheets.some(one => typeof one !== 'string')) return 'stylesheets must be a list of specifiers';
        if (!Array.isArray(value.fonts) || value.fonts.some(one => typeof one !== 'string')) return 'fonts must be a list of stylesheet URLs';
        if (value.icon !== undefined && typeof value.icon !== 'string') return 'icon must be a URL';
        if (typeof value.budget !== 'number' || !(value.budget > 0)) return 'budget must be how many megabytes of source one process draws, above zero';
        return undefined;
    },
};
