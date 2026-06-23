import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './evolve/case-1';
import case1Source from './evolve/case-1.tsx?raw';

export function EvolveComponentCases() {
    return (
        <CaseShell
            caseId="evolve / 1"
            subject="Evolving a component — a subclass adds behavior without changing the parent"
            pass="a checkable item has been toggled on or off"
            fail="the list rejects the new subclass, toggles don't respond, or plain items sprout checkboxes"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'evolve',
    cases: 1,
    Component: EvolveComponentCases,
};
