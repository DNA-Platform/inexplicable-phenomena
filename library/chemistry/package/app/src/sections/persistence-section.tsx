import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './persistence/case-1';
import case1Source from './persistence/case-1.tsx?raw';

export function PersistenceCases() {
    return (
        <CaseShell
            caseId="persistence / 1"
            subject="PERSISTENCE — one reading, three representations: the open book, the library card, the spine wear one persisted truth, and a refresh resumes the desk mid-chapter"
            pass="turn pages, place the ribbon, note the margin — all three faces follow each act; REFRESH — the desk stands exactly where you left it; return the book and a refresh opens fresh"
            fail="the faces disagree, the desk resets on refresh while kept, or the record survives returning the book"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'persistence',
    cases: 1,
    Component: PersistenceCases,
};
