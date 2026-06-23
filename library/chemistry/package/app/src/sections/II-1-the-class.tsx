import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './II-1/case-1';
import Case2Demo from './II-1/case-2';

import case1Source from './II-1/case-1.tsx?raw';
import case2Source from './II-1/case-2.tsx?raw';

export function TheClassCases() {
    return (
        <>
            <CaseShell
                caseId="handlers / 1"
                subject="A like button writes to a post — two components compose by reference"
                pass="clicking the heart increments the post's like count"
                fail="nothing happens, or the reference breaks across the component boundary"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="handlers / 2"
                subject="Two star ratings from the same class — each keeps its own state"
                pass="rating one leaves the other unchanged"
                fail="both ratings change together"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'handlers',
    cases: 2,
    Component: TheClassCases,
};
