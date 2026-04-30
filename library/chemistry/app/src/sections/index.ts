import type { ComponentType } from 'react';
import { sectionData as iI1 } from './II-1-the-class';
import { sectionData as iI4 } from './II-4-the-lifecycle';
import { sectionData as iI5 } from './II-5-particularization';
import { sectionData as iII3 } from './III-3-binding-constructor';
import { sectionData as v1 } from './V-1-reactive-properties';
import { sectionData as v3 } from './V-3-cross-chemical-writes';
import { sectionData as v4 } from './V-4-collection-mutation';
import { sectionData as vi1 } from './VI-1-per-mount-derivatives';

export type SectionModule = {
    id: string;
    cases: number;
    Component: ComponentType;
};

const modules: SectionModule[] = [
    iI1,
    iI4,
    iI5,
    iII3,
    v1,
    v3,
    v4,
    vi1,
];

export const sectionModules: Record<string, SectionModule> = Object.fromEntries(
    modules.map(m => [m.id, m]),
);
