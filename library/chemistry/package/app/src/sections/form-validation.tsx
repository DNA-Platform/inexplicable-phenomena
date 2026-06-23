import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './form/case-1';
import case1Source from './form/case-1.tsx?raw';

export function FormValidationCases() {
    return (
        <CaseShell
            caseId="form / 1"
            subject="Contact form — live validation with a conditional submit button"
            pass="fill every field correctly, click Send, and a success banner appears"
            fail="submit fires with invalid data, or error messages linger after correcting the input"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'form',
    cases: 1,
    Component: FormValidationCases,
};
