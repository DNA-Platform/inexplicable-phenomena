import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './dashboard/case-1';
import case1Source from './dashboard/case-1.tsx?raw';

export function DashboardWidgetsCases() {
    return (
        <CaseShell
            caseId="dashboard / 1"
            subject="Widget dashboard — polymorphic cards that each load data independently"
            pass="every card finishes loading and displays its own content"
            fail="cards stay stuck on loading, display the wrong content, or all render identically"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'dashboard',
    cases: 1,
    Component: DashboardWidgetsCases,
};
