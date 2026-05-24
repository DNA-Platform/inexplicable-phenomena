import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './III-3/case-1';
import Case2Demo from './III-3/case-2';

import case1Source from './III-3/case-1.tsx?raw';
import case2Source from './III-3/case-2.tsx?raw';

export function BindingConstructorCases() {
    return (
        <>
            <CaseShell
                caseId="typed-children / 1"
                subject="Typed children — a parent receives its children as constructor arguments"
                pass="a title and four numbered chapters render correctly"
                fail="children are missing, the title is absent, or the count is wrong"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="typed-children / 2"
                subject="Type validation — passing the wrong child type produces a clear error"
                pass="clicking the button shows a red error naming the expected type"
                fail="the wrong child is silently accepted, the page crashes, or the error is unreadable"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'typed-children',
    cases: 2,
    Component: BindingConstructorCases,
};
