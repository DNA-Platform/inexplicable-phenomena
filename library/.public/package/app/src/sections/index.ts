import type { ComponentType } from 'react';
import { sectionData as page } from './the-page';

type SectionModule = { id: string; cases: number; Component: ComponentType; fullPage?: boolean };

const modules: SectionModule[] = [page];

export const sectionModules: Record<string, SectionModule> = Object.fromEntries(modules.map(m => [m.id, m]));
