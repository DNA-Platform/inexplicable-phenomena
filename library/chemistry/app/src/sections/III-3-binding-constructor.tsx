import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './III-3/case-1';
import Case2Demo from './III-3/case-2';

import case1Source from './III-3/case-1.tsx?raw';
import case2Source from './III-3/case-2.tsx?raw';

export function BindingConstructorCases() {
    return (
        <>
            <CaseShell
                caseId="III.3 / 1"
                subject="Method named after the class — typed JSX children become args"
                expected={
                    <>
                        $Book has a method named <code>$Book(...chapters: $Chapter[])</code>.
                        That's the binding constructor — discovered at runtime by the framework
                        as the method whose name matches the class. JSX children of <code>{'<Book>'}</code> are
                        parsed into typed args. No <code>React.Children.toArray()</code>, no opaque ReactNode blob.
                    </>
                }
                pass="the book renders with title 'The Selfish Gene' and a numbered list of 4 chapters"
                fail="children don't render, the title is missing, or the chapter count is wrong"
                source={case1Source}
             demo={<Case1Demo />} />

            <CaseShell
                caseId="III.3 / 2"
                subject="$check throws a formatted error when a child has the wrong type"
                expected={
                    <>
                        Inside the binding constructor, <code>$check(c, $Chapter)</code> validates that each child
                        is a $Chapter instance. When a $Page sneaks in, $check throws a formatted error naming
                        the violation. Click the button to inject the wrong child type and watch the error surface.
                    </>
                }
                pass="clicking the button replaces the success box with a red error box that names $Chapter as the expected type"
                fail="invalid child renders silently, the page crashes, or the error message is unreadable"
                source={case2Source}
             demo={<Case2Demo />} />
        </>
    );
}

export const sectionData = {
    id: 'III.3',
    cases: 2,
    Component: BindingConstructorCases,
};
