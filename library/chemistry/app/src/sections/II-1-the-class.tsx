import React from 'react';

import Case1Demo from './II-1/case-1';
import Case2Demo from './II-1/case-2';

export function TheClassCases() {
    return (
        <>
            <h3>onClick works without bind</h3>
            <Case1Demo />
            <h3>Two mounts hold independent state</h3>
            <Case2Demo />
        </>
    );
}

export const sectionData = {
    id: 'II.1',
    cases: 2,
    Component: TheClassCases,
};
