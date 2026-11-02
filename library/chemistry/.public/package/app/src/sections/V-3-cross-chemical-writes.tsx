import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-3/case-1';
import Case2Demo from './V-3/case-2';

import case1Source from './V-3/case-1.tsx?raw';
import case2Source from './V-3/case-2.tsx?raw';

export function CrossChemicalWritesCases() {
    return (
        <>
            <CaseShell
                caseId="parent-child / 1"
                subject="A slider controls two speakers — one input writes to two sibling components"
                pass="dragging the slider updates both speakers simultaneously"
                fail="one or both speakers stay silent"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="parent-child / 2"
                subject="Two dashboard cards — refreshing one leaves the other unchanged"
                pass="refreshing one card leaves the other at 0"
                fail="both cards change together or one resets the other"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'parent-child',
    cases: 2,
    Component: CrossChemicalWritesCases,
};
