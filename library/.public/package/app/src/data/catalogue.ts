export type Section = {
    id: string;
    title: string;
    symbol: string;
    planned: string[];
};

export type Group = {
    roman: string;
    title: string;
    sections: Section[];
};

export const catalogue: Group[] = [
    {
        roman: '·',
        title: 'Demonstrations',
        sections: [
            { id: 'page', title: 'The Page', symbol: 'Pg', planned: [] },
        ],
    },
];

export const defaultSectionId = 'page';

export function findSection(id: string): { group: Group; section: Section } | undefined {
    for (const group of catalogue) {
        const section = group.sections.find(s => s.id === id);
        if (section) return { group, section };
    }
    return undefined;
}
