import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './styled/case-1';
import Case2Demo from './styled/case-2';
import Case3Demo from './styled/case-3';
import Case4Demo from './styled/case-4';

import case1Source from './styled/case-1.tsx?raw';
import case2Source from './styled/case-2.tsx?raw';
import case3Source from './styled/case-3.tsx?raw';
import case4Source from './styled/case-4.tsx?raw';

// Styled chemicals — styled-components integrated directly into $Chemistry.
// A class says what it is styled as; its CSS fields are the stylesheet.
export function StyledCases() {
    return (
        <>
            <CaseShell
                caseId="styled / 1"
                subject="A chemical is styled by declaring what it is styled as"
                pass="both are styled; the subclass keeps what it never declares"
                fail="the sections are bare"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="styled / 2"
                subject="Three spellings: $color a prop, background reactive, _borderLeft inert"
                pass="the first two restyle; the inert one moves nothing"
                fail="the inert write repaints"
                source={case2Source}
                demo={<Case2Demo />}
            />
            <CaseShell
                caseId="styled / 3"
                subject="A subclass promotes a baked property and it becomes live"
                pass="the bar is fixed; the meter moves"
                fail="both move, or neither"
                source={case3Source}
                demo={<Case3Demo />}
            />
            <CaseShell
                caseId="styled / 4"
                subject="A theme is a chemical, fetched in the bond constructor and swappable per scope"
                pass="switching repaints the styles; the second room is dark from a scope registration"
                fail="the switch does nothing, or both rooms look alike"
                source={case4Source}
                demo={<Case4Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'styled',
    cases: 4,
    Component: StyledCases,
};
