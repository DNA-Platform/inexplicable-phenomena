import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-1/case-1';
import Case2Demo from './V-1/case-2';
import Case3Demo from './V-1/case-3';

import case1Source from './V-1/case-1.tsx?raw';
import case2Source from './V-1/case-2.tsx?raw';
import case3Source from './V-1/case-3.tsx?raw';

export function ReactivePropertiesCases() {
    return (
        <>
            <CaseShell
                caseId="V.1 / 1"
                subject="$count = 0 — write the property, view re-renders"
                expected="A chemical declares $count = 0. The view reads this.$count. Methods inc(), dec(), reset() write the property. Each click calls the method; the framework detects the write and re-renders. No setState, no useState, no manual subscription."
                pass="clicking + / − / reset changes the displayed number; the value matches the last operation"
                fail="number doesn't change, throws, or stays stale after a write"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="V.1 / 2"
                subject="$text — strings are reactive too"
                expected="A chemical declares $text = 'hello' and reads it in view(). Typing in the input calls setText() which writes this.$text. The displayed value updates as you type — the view subscribes to $text via the read inside view()."
                pass="typing in the input updates the displayed text live, character by character"
                fail="display is stuck on 'hello' regardless of input, or only updates on blur"
                source={case2Source}
             demo={<Case2Demo />} />

            <CaseShell
                caseId="V.1 / 3"
                subject="Single-letter $v is reactive (sprint-24 fix)"
                expected="A chemical declares $v = false (single-letter prop name after the $). The toggle button writes this.$v = !this.$v. Pre-sprint-24, isSpecial() required length > 2 — single-letter $-props were silently inert. Now: length >= 2 means $v is reactive."
                pass="clicking the button toggles between 'true' and 'false'; the button color reflects the state"
                fail="button click does nothing visible, or value resets after each click"
                source={case3Source}
             demo={<Case3Demo />} />
        </>
    );
}

export const sectionData = {
    id: 'V.1',
    cases: 3,
    Component: ReactivePropertiesCases,
};
