import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-4/case-1';
import Case2Demo from './V-4/case-2';
import Case3Demo from './V-4/case-3';

import case1Source from './V-4/case-1.tsx?raw';
import case2Source from './V-4/case-2.tsx?raw';
import case3Source from './V-4/case-3.tsx?raw';

export function CollectionMutationCases() {
    return (
        <>
            <CaseShell
                caseId="collections / 1"
                subject="Tag input — type a tag, press Enter, remove with x"
                pass="Enter adds tag pill, x removes it"
                fail="tag doesn't appear or x doesn't remove"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="collections / 2"
                subject="Settings editor — a key-value config panel backed by a Map"
                pass="at least one key-value pair appears in the panel"
                fail="the pair doesn't appear after adding, or delete doesn't remove it"
                source={case2Source}
                demo={<Case2Demo />}
            />

            <CaseShell
                caseId="collections / 3"
                subject="Feature flags — toggle switches backed by a Set"
                pass="at least one flag has been enabled"
                fail="toggling doesn't change state, or flags duplicate"
                source={case3Source}
                demo={<Case3Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'collections',
    cases: 3,
    Component: CollectionMutationCases,
};
