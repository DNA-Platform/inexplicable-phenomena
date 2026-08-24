import type { ComponentType } from 'react';
import { sectionData as page } from './the-page';
import { sectionData as books } from './the-books';
import { sectionData as title } from './the-title';

type SectionModule = { id: string; cases: number; Component: ComponentType; fullPage?: boolean };

const modules: SectionModule[] = [page, books, title];

export const sectionModules: Record<string, SectionModule> = Object.fromEntries(modules.map(m => [m.id, m]));
