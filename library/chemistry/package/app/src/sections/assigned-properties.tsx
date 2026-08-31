import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import CaseOneDemo from './assigned/case-1';
import caseOneSource from './assigned/case-1.tsx?raw';

export function AssignedCases() {
    return (
        <CaseShell
            caseId="ownership"
            subject="the vessel makes both, keeps the sample and hands the same instance to the catalyst — each owns a different feature of it, and only the maker can revoke the other's hold or end it"
            pass="− and + turn the sample's form from the vessel; striking the catalyst turns its charge; unbind leaves the vessel's grip and kills the catalyst's, and the catalyst still turns; end empties both"
            fail="a control reaches what it does not own, unbind stops the vessel too, or the catalyst dies with the sample"
            source={caseOneSource}
            demo={<CaseOneDemo />}
        />
    );
}

export const sectionData = {
    id: 'assigned',
    cases: 1,
    Component: AssignedCases,
};
