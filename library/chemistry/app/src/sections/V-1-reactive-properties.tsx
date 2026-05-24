import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-1/case-1';
import Case2Demo from './V-1/case-2';
import Case3Demo from './V-1/case-3';

import case1Source from './V-1/case-1.tsx?raw';
import case2Source from './V-1/case-2.tsx?raw';
import case3Source from './V-1/case-3.tsx?raw';

export function ReactivePropertiesCases() {
    return (
        <>
            <CaseShell
                caseId="properties / 1"
                subject="Counter — click a button, the number changes"
                pass="+/−/reset each update the displayed number"
                fail="number doesn't change or stays stale"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="properties / 2"
                subject="Live greeting — type a name, see it appear instantly"
                pass="greeting updates as you type"
                fail="greeting stays blank or only updates on blur"
                source={case2Source}
                demo={<Case2Demo />}
            />
            <CaseShell
                caseId="properties / 3"
                subject="Accordion FAQ — click a question, the answer expands"
                pass="clicking a question reveals its answer; clicking again hides it"
                fail="answers don't appear or all open at once"
                source={case3Source}
                demo={<Case3Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'properties',
    cases: 3,
    Component: ReactivePropertiesCases,
};
