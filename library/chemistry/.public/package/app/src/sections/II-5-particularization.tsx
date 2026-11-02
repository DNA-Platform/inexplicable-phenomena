import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './II-5/case-1';
import Case2Demo from './II-5/case-2';
import Case3Demo from './II-5/case-3';
import Case4Demo from './II-5/case-4';

import case1Source from './II-5/case-1.tsx?raw';
import case2Source from './II-5/case-2.tsx?raw';
import case3Source from './II-5/case-3.tsx?raw';
import case4Source from './II-5/case-4.tsx?raw';

export function ParticularizationCases() {
    return (
        <>
            <CaseShell
                caseId="native-objects / 1"
                subject="Wrapping a native Error — it gains a view while remaining an Error"
                pass="the error message renders and the wrapper is recognized as a particle"
                fail="nothing renders, the wrapper throws, or identification fails"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="native-objects / 2"
                subject="The wrapped Error still passes native type checks"
                pass="both the native type check and the particle check report true"
                fail="the native check fails, or the message is lost"
                source={case2Source}
             demo={<Case2Demo />} />

            <CaseShell
                caseId="native-objects / 3"
                subject="Wrapping doesn't modify the original object"
                pass="the original's prototype is intact and it remains a plain Error"
                fail="the original's prototype changed, or particle identity leaks back to it"
                source={case3Source}
             demo={<Case3Demo />} />

            <CaseShell
                caseId="native-objects / 4"
                subject="Wrapping an already-wrapped object is a no-op"
                pass="the second wrap returns the exact same object — no double wrapping"
                fail="a new wrapper was created where none was needed"
                source={case4Source}
             demo={<Case4Demo />} />
        </>
    );
}

export const sectionData = {
    id: 'native-objects',
    cases: 4,
    Component: ParticularizationCases,
};
