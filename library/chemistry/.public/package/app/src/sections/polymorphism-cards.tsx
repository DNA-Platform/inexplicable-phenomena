import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './polymorphism/case-1';
import case1Source from './polymorphism/case-1.tsx?raw';

export function PolymorphismCardsCases() {
    return (
        <CaseShell
            caseId="poly / 1"
            subject="Polymorphic rendering — a dashboard renders different card types without knowing which is which"
            pass="all three cards are visible with distinct layouts"
            fail="cards are missing, wrong types are accepted, or every card looks the same"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'polymorphism',
    cases: 1,
    Component: PolymorphismCardsCases,
};
