export type Rendering = {
    title: string;
    stylesheets: string[];
    fonts: string[];
    icon?: string;
};

export const rendering = {
    fields: ['title', 'stylesheets', 'fonts', 'icon'] as (keyof Rendering & string)[],
    defaults: { title: 'A Library', stylesheets: [], fonts: [] } as Rendering,
    check(value: Rendering): string | undefined {
        if (typeof value.title !== 'string' || value.title.trim() === '') return 'title must be a non-empty string';
        if (!Array.isArray(value.stylesheets) || value.stylesheets.some(one => typeof one !== 'string')) return 'stylesheets must be a list of specifiers';
        if (!Array.isArray(value.fonts) || value.fonts.some(one => typeof one !== 'string')) return 'fonts must be a list of stylesheet URLs';
        if (value.icon !== undefined && typeof value.icon !== 'string') return 'icon must be a URL';
        return undefined;
    },
};
