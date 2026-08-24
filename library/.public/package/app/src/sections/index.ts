import { lazy, type ComponentType } from 'react';

// A SECTION IS NAMED HERE AND LOADED WHEN IT IS ASKED FOR.
//
// This file used to import all three sections at module scope, and a section
// imports its books, so EVERY ROUTE LOADED EVERY BOOK. Measured on the title
// page — four headings and 69 DOM nodes — 169 modules arrived, 55 of them the
// demonstration's books, and the same 169 arrived on every other route too.
//
// The catalogue is the part that has to be eager, because the header counts the
// cases and the sidebar filters by id before anything is chosen. That is two
// numbers and a flag. The COMPONENT is the heavy half and nothing needs it
// until a route asks, so it arrives by dynamic import — which is the shape the
// compiler already emits for the library's own books, one door per book.

export type SectionModule = {
    id: string;
    cases: number;
    fullPage?: boolean;
    Component: ComponentType;
};

const modules: SectionModule[] = [
    { id: 'page', cases: 1, fullPage: true, Component: lazy(() => import('./the-page').then(m => ({ default: m.ThePageDemo }))) },
    { id: 'books', cases: 1, fullPage: true, Component: lazy(() => import('./the-books').then(m => ({ default: m.TheBooksDemo }))) },
    { id: 'title', cases: 1, fullPage: false, Component: lazy(() => import('./the-title').then(m => ({ default: m.TheTitleDemo }))) },
];

export const sectionModules: Record<string, SectionModule> = Object.fromEntries(modules.map(m => [m.id, m]));
