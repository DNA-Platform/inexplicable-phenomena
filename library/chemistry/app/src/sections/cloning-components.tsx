import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './cloning/case-1';
import Case2Demo from './cloning/case-2';

import case1Source from './cloning/case-1.tsx?raw';
import case2Source from './cloning/case-2.tsx?raw';

export function CloningCases() {
    return (
        <>
            <CaseShell
                caseId="cloning / 1"
                subject="Shape canvas — add shapes, clone them with $new(), each clone is independent"
                pass="cloning offsets the new shape; changing a clone's color leaves the original alone"
                fail="clone overlaps the original, or changing one affects others"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="cloning / 2"
                subject="Button presets — clone a base button into themed variants, customize each"
                pass="each preset starts from the base config but can be independently recolored"
                fail="presets share state with the base or with each other"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'cloning',
    cases: 2,
    Component: CloningCases,
};
