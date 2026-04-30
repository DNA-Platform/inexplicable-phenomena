import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './V-4/case-1';
import Case2Demo from './V-4/case-2';
import Case3Demo from './V-4/case-3';

import case1Source from './V-4/case-1.tsx?raw';
import case2Source from './V-4/case-2.tsx?raw';
import case3Source from './V-4/case-3.tsx?raw';

export function CollectionMutationCases() {
    return (
        <>
            <CaseShell
                caseId="V.4 / 1"
                subject="$items.push() — Array mutation re-renders without replacing the reference"
                expected="A chemical declares $items: string[] = []. .push() appends to the same array — no new reference. The reactive system detects the in-place mutation via $symbolize and re-renders the view. No spread, no [...arr, x], no new identity."
                pass="clicking .push() adds a pill; .pop() removes one; .clear() empties the row; the length badge tracks live"
                fail="pills don't appear, length doesn't update, or only updates when you click somewhere else"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="V.4 / 2"
                subject="$tags.set() — Map mutation re-renders"
                expected="A chemical declares $tags: Map<string, number> = new Map(). Map.set() mutates the same Map. The framework's $symbolize representation captures the entries and detects the change. Same instance, new content."
                pass="clicking .set() adds a key=value pill; .delete() removes the first; .clear() empties; size tracks"
                fail="pills don't appear or size badge stays at 0 after .set()"
                source={case2Source}
             demo={<Case2Demo />} />

            <CaseShell
                caseId="V.4 / 3"
                subject="$tags.add() — Set mutation re-renders"
                expected="A chemical declares $tags: Set<string> = new Set(). Set.add() mutates in place. Adding a unique value grows the set; adding a duplicate is a no-op for Set semantics but the write still fires (the framework can't tell ahead of time)."
                pass="clicking .add(unique) adds a tag pill; .add('shared') is a visible no-op after the first time; .clear() empties"
                fail="set never grows, or .add(unique) somehow produces duplicates"
                source={case3Source}
             demo={<Case3Demo />} />
        </>
    );
}

export const sectionData = {
    id: 'V.4',
    cases: 3,
    Component: CollectionMutationCases,
};
