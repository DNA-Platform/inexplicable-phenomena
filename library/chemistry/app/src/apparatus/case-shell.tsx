import React, { ReactNode, useState } from 'react';
import {
    CaseFrame, CaseHeader, CaseId, CaseSubject,
    Expected, DemoFrame, Criteria, Pass, Fail,
    SourceToggle, SourceBlock,
} from './case-card.styled';

// CaseShell — function component. The source-toggle state (showSource)
// is UI-only local state with no framework significance. Using useState
// here is correct: this is a pure-view wrapper, not a chemical. The
// chemical IS the demo inside DemoFrame — the shell is just chrome.
export function CaseShell({ caseId, subject, expected, demo, pass, fail, source }: {
    caseId: string;
    subject: string;
    expected?: ReactNode;
    demo: ReactNode;
    pass: string;
    fail: string;
    source: string;
}) {
    const [showSource, setShowSource] = useState(false);
    return (
        <CaseFrame>
            <CaseHeader>
                <CaseId>{caseId}</CaseId>
                <CaseSubject>{subject}</CaseSubject>
                <SourceToggle onClick={() => setShowSource(s => !s)}>
                    {showSource ? '✕ source' : '{ } source'}
                </SourceToggle>
            </CaseHeader>
            {expected && (
                <Expected>
                    <strong>Expected.</strong>
                    {expected}
                </Expected>
            )}
            <DemoFrame>{demo}</DemoFrame>
            <Criteria>
                <Pass>Pass if {pass}</Pass>
                <Fail>Fail if {fail}</Fail>
            </Criteria>
            {showSource && <SourceBlock>{source}</SourceBlock>}
        </CaseFrame>
    );
}
