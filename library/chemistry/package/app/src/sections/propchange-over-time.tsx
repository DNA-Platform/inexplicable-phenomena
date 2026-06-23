import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './propchange/case-1';

import case1Source from './propchange/case-1.tsx?raw';

export function PropChangeCases() {
    return (
        <CaseShell
            caseId="propchange / 1"
            subject="Props changing over time — does the component respond to external updates?"
            pass="moving the slider changes the swatch color in real time"
            fail="the swatch stays stuck at its initial color"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'propchange',
    cases: 1,
    Component: PropChangeCases,
};
