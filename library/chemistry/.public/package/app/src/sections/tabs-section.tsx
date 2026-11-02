import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './tabs/case-1';
import case1Source from './tabs/case-1.tsx?raw';

export function TabsCases() {
    return (
        <CaseShell
            caseId="tabs / 1"
            subject="Tabbed interface — switching tabs preserves each panel's state"
            pass="tabs have been switched at least once and panel state survived the round trip"
            fail="state resets on switch, panels don't render, or tabs stop responding"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'tabs',
    cases: 1,
    Component: TabsCases,
};
