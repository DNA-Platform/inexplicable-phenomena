import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './persistence/case-1';
import Case2Demo from './persistence/case-2';
import case1Source from './persistence/case-1.tsx?raw';
import case2Source from './persistence/case-2.tsx?raw';

export function PersistenceCases() {
    return (
        <>
            <CaseShell
                caseId="persistence / 1"
                subject="PERSISTENCE — one reading, three representations: the open book, the library card, the spine wear one persisted truth, and a refresh resumes the desk mid-chapter"
                pass="turn pages, place the ribbon, note the margin — all three faces follow each act; REFRESH — the desk stands exactly where you left it; return the book and a refresh opens fresh"
                fail="the faces disagree, the desk resets on refresh while kept, or the record survives returning the book"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="persistence / 2"
                subject="THE BARE FLAG — no base class: a manuscript and two notes are plain chemicals; the kept note differs from the loose one by a pid and persist = true, and nothing else"
                pass="stamp both notes and both tally; revise the draft; REFRESH — the manuscript and the kept note stand, the loose note forgets"
                fail="the notes disagree with their buttons, the kept note forgets, or the loose note remembers"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'persistence',
    cases: 2,
    Component: PersistenceCases,
};
