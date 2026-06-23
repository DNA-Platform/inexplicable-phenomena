import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './adapted/case-1';
import Case2Demo from './adapted/case-2';
import Case3Demo from './adapted/case-3';
import Case4Demo from './adapted/case-4';

import case1Source from './adapted/case-1.tsx?raw';
import case2Source from './adapted/case-2.tsx?raw';
import case3Source from './adapted/case-3.tsx?raw';
import case4Source from './adapted/case-4.tsx?raw';

export function AdaptedComponentsCases() {
    return (
        <>
            <CaseShell
                caseId="adapted / 1"
                subject="Toast notification — a parent controls the style of a native element by writing to it directly"
                pass="toggling severity swaps the toast between success and error styles"
                fail="the toast style stays frozen after the toggle"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="adapted / 2"
                subject="Latency metric — a parent controls a child component's props by writing to it directly"
                pass="toggling latency changes the number and flips the trend arrow color"
                fail="the metric stays frozen after the toggle"
                source={case2Source}
                demo={<Case2Demo />}
            />
            <CaseShell
                caseId="adapted / 3"
                subject="Collapsible panels — a parent shows and hides its children by writing to them directly"
                pass="toggling hides the panel; toggling back restores it"
                fail="the panel stays visible after hiding, or doesn't reappear after showing"
                source={case3Source}
                demo={<Case3Demo />}
            />
            <CaseShell
                caseId="adapted / 4"
                subject="Mixed dashboard — three kinds of children all react when the parent writes to them directly"
                pass="one toggle changes the title, divider, and status light across all three children"
                fail="any of the three children fail to react after the toggle"
                source={case4Source}
                demo={<Case4Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'adapted',
    cases: 4,
    Component: AdaptedComponentsCases,
};
