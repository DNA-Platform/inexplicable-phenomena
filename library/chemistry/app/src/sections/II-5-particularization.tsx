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
                caseId="II.5 / 1"
                subject="A particularized Error renders as a particle"
                expected="An $Error instance constructed from a real Error renders the error's name and message via view(). isParticle(carrier) reports true. The carrier carries its own $Chemistry symbol."
                pass='the demo shows "Error: something went wrong" and isParticle reports true'
                fail="the demo shows nothing, throws, or isParticle reports false"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="II.5 / 2"
                subject="instanceof Error survives particularization"
                expected="The carrier returned by new $Error(realError) still passes the instanceof Error check, even though it's also a particle. Both worlds simultaneously."
                pass="instanceof Error and isParticle both report true"
                fail="instanceof Error reports false, or carrier.message is undefined"
                source={case2Source}
             demo={<Case2Demo />} />

            <CaseShell
                caseId="II.5 / 3"
                subject="The original Error is left untouched"
                expected="Particularizing an Error must not modify the original. Its prototype chain, instanceof relationships, and isParticle status remain exactly as before construction."
                pass="prototype identity preserved AND original is still just an Error (not a particle)"
                fail="the original's prototype changed, or the original now reports isParticle"
                source={case3Source}
             demo={<Case3Demo />} />

            <CaseShell
                caseId="II.5 / 4"
                subject="Particularizing an existing particle is a no-op"
                expected="When new $Particle(x) is called and x is already a particle, the framework returns x unchanged rather than wrapping it. The constructor's return semantics flow this back as the new operator's result."
                pass="b === a (the second construction returned the input unchanged)"
                fail="b !== a (a wrapper was created where none was needed)"
                source={case4Source}
             demo={<Case4Demo />} />
        </>
    );
}

export const sectionData = {
    id: 'II.5',
    cases: 4,
    Component: ParticularizationCases,
};
