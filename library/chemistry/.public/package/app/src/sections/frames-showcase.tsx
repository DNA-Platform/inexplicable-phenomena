import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './frames/case-1';
import case1Source from './frames/case-1.tsx?raw';

export function FramesShowcaseCases() {
    return (
        <CaseShell
            caseId="frames / 1"
            subject="frame() wraps view() — one picture, four frames, each a subclass that overrides frame()"
            pass="all four pictures render, each in a different frame; clicking any picture flips ♡ → ♥"
            fail="a frame doesn't wrap its picture, a picture is missing, or a click doesn't update"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'frames',
    cases: 1,
    Component: FramesShowcaseCases,
};
