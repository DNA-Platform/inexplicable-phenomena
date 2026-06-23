import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './todo/case-1';
import case1Source from './todo/case-1.tsx?raw';

export function TodoAppCases() {
    return (
        <CaseShell
            caseId="todo / 1"
            subject="Todo list — each item is a $TodoItem chemical with independent state, composed via bond constructor"
            pass="items render via $(item), toggle state is per-chemical, $TodoApp reads cross-chemical done counts"
            fail="items don't render as chemicals, toggle state leaks between items, or cross-chemical reads fail"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'todo',
    cases: 1,
    Component: TodoAppCases,
};
