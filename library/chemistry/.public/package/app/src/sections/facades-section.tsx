import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import CaseOneDemo from './facades/case-1';
import caseOneSource from './facades/case-1.tsx?raw';
import CaseTwoDemo from './facades/case-2';
import caseTwoSource from './facades/case-2.tsx?raw';

export function FacesCases() {
    return (
        <>
            <CaseShell
                caseId="two family trees"
                subject="Two hierarchies with no ancestor in common each say `facade = Card` ONCE at their root — every descendant is drawn through a facade that has never heard of them, and neither tree spends its one parent slot on how it looks"
                pass="picking any node draws its specimens through the same $Card; the deeper the class, the more rows its card carries, because each level adds its own through super.figures; card · tile · button redraw everything and nothing inside either tree changes, and pressing a button opens that specimen full screen"
                fail="a node draws nothing, a deeper class shows no more than its parent, or either tree has to know about $Card"
                source={caseOneSource}
                demo={<CaseOneDemo />}
            />
            <CaseShell
                caseId="one line"
                subject="Two classes, the same members and the same drawing — one declares a facade and one does not"
                pass="the declared one is drawn as a card, the other draws itself bare, and nothing outside either class was configured"
                fail="both draw the same, or the bare one is dressed"
                source={caseTwoSource}
                demo={<CaseTwoDemo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'facades',
    cases: 2,
    Component: FacesCases,
};
