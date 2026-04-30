import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-3/case-1';
import Case2Demo from './V-3/case-2';

import case1Source from './V-3/case-1.tsx?raw';
import case2Source from './V-3/case-2.tsx?raw';

export function CrossChemicalWritesCases() {
    return (
        <>
            <CaseShell
                caseId="V.3 / 1"
                subject="Outer handler writes inner.$value — inner re-renders"
                expected="$Outer holds a reference to an $Inner instance. The button in $Outer's view writes this.inner.$value++. The framework's fan-out propagates the write to Inner's mounted derivative — Inner's displayed number goes up without Inner having a button of its own."
                pass="clicking 'write inner.$value++' increments the Inner box's number; 'reset to 0' zeros it"
                fail="Inner's number doesn't change, or the whole page re-renders instead of just Inner"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="V.3 / 2"
                subject="Sibling derivatives — writing one does not affect the other"
                expected="$Parent holds two $Sibling instances (left and right). Each button writes to one sibling's $count. The ownership gate ensures the write fans out only to the target sibling's derivative — the other stays unchanged."
                pass="clicking 'write left.$count++' increments only the left number; right stays unchanged (and vice versa)"
                fail="both numbers increment together, or writing to one resets the other"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'V.3',
    cases: 2,
    Component: CrossChemicalWritesCases,
};
