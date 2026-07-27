import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './blocks/case-1';
// Show the whole lens — the $Chemical and the one authored <Highlighter> that makes
// the block. That IS how you work with a block, end to end.
import case1Source from './blocks/case-1.tsx?raw';

export function BlocksShowcaseCases() {
    return (
        <CaseShell
            caseId="prose highlighter"
            subject="a run of prose with inline markup becomes one $Html<'block'>; $Highlighter iterates its elements and re-renders them, lighting up every match of the live search query"
            pass="the passage renders with its bold/italics intact and never moves; typing highlights every occurrence — in text and inside tags — with an exact match count"
            fail="a match is missed, the count is wrong, highlighting reflows the passage, or the block isn't read from $elements"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'blocks',
    cases: 1,
    Component: BlocksShowcaseCases,
};
