import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import RepresentativeDemo from './representative/case-1';
import representativeSource from './representative/case-1.tsx?raw';
import ThemeRegistrationDemo from './representative/case-2';
import themeSource from './representative/case-2.tsx?raw';

export function RepresentativeCases() {
    return (
        <>
            <CaseShell
                caseId="three houses"
                subject="One class, three scopes — $Note asks $ for the parts it draws with; three sheets derived from one sheet each register what stands in, and the notes are never told which house they are in"
                pass="the same <Note/> draws three ways; typing moves all three at once; the travelling note changes appearance by moving rather than by being edited; no note takes a component as a prop and $Note is never subclassed"
                fail="the houses look alike, a note needs a prop to change, or moving a note leaves it unchanged"
                source={representativeSource}
                demo={<RepresentativeDemo />}
            />
            <CaseShell
                caseId="the theme, live"
                subject="A theme as a CHEMICAL, re-registered from a handler — $Leaf resolves the theme and then asks what stands behind it, so a value-bearing abstraction travels through a container whose currency is components"
                pass="picking a theme repaints both leaves; no leaf is subclassed, told, or passed anything; registering without moving state repaints nothing until nudged, which is the registry being deliberately not reactive"
                fail="a leaf needs a prop or a subclass to change theme, or configuring from a handler throws"
                source={themeSource}
                demo={<ThemeRegistrationDemo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'representative',
    cases: 2,
    Component: RepresentativeCases,
};
