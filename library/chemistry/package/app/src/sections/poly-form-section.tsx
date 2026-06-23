import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './poly-form/case-1';
import case1Source from './poly-form/case-1.tsx?raw';

export function PolyFormCases() {
    return (
        <CaseShell
            caseId="poly-form / 1"
            subject="Polymorphic form — text, select, and checkbox fields, each with its own validation"
            pass="the form submits successfully after filling every field correctly"
            fail="validation is skipped, wrong field types are accepted, or submit fires with invalid data"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'poly-form',
    cases: 1,
    Component: PolyFormCases,
};
