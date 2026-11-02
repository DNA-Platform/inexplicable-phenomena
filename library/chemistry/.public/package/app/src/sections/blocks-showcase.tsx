import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './blocks/case-1';
// Show the whole lens — the $Chemical and the one authored <Highlighter> that makes
// the block. That IS how you work with a block, end to end.
import case1Source from './blocks/case-1.tsx?raw';

export function BlocksShowcaseCases() {
    return (
        <CaseShell
            caseId="every reading of a block is a block"
            subject="a run of prose with inline markup becomes one $Block; $Reader iterates it and derives three more blocks from it with where and select — and the framework DRAWS each derived block, because a reading of a block is a block"
            pass="the passage renders with its bold/italics intact and never moves; typing highlights every occurrence and the matched panel redraws itself as a block; the written-elements panel shows only what was written as an element; the shouted panel upper-cases the prose and leaves the elements alone"
            fail="a derived panel is empty or hand-assembled, a match is missed, the counts disagree with the panels, or highlighting reflows the passage"
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
