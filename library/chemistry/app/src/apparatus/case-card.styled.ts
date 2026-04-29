import styled from 'styled-components';

// CaseFrame — the full Case presentation for sprint 30+. Honours the old
// chemistry app's pattern: subject heading, "Expected:" line, the demo,
// then ✓/✗ criteria the reader can verify, plus a source toggle.
//
// Each Case communicates four things:
//   1. WHAT is being tested (subject)
//   2. WHAT to see (expected, before interaction)
//   3. THE demo itself (the running chemical)
//   4. HOW to know it works / fails (✓ pass and ✗ fail criteria)
// Plus: the actual source code, hidden until clicked.

export const CaseFrame = styled.section`
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    padding: 20px 22px;
    margin-bottom: 20px;
`;

export const CaseHeader = styled.header`
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin-bottom: 14px;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    padding-bottom: 12px;
`;

export const CaseId = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
`;

export const CaseSubject = styled.h2`
    font-family: ${(p) => p.theme.font.heading};
    font-size: ${(p) => p.theme.type.h4};
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    letter-spacing: -0.01em;
    margin: 0;
    flex: 1;
`;

export const Expected = styled.div`
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    line-height: 1.55;
    margin-bottom: 14px;

    strong {
        color: ${(p) => p.theme.color.ink};
        font-weight: 700;
        margin-right: 6px;
    }
`;

export const DemoFrame = styled.div`
    background: ${(p) => p.theme.color.paperRecessed};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    padding: 18px 20px;
    margin-bottom: 14px;
`;

export const Criteria = styled.div`
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.caption};
    line-height: 1.7;
    margin-bottom: 12px;
`;

export const Pass = styled.span`
    display: block;
    color: ${(p) => p.theme.color.ok};
    font-weight: 500;

    &::before {
        content: '✓';
        display: inline-block;
        width: 18px;
        font-weight: 800;
    }
`;

export const Fail = styled.span`
    display: block;
    color: ${(p) => p.theme.color.fail};
    font-weight: 500;

    &::before {
        content: '✗';
        display: inline-block;
        width: 18px;
        font-weight: 800;
    }
`;

export const SourceToggle = styled.button`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.muted};
    background: ${(p) => p.theme.color.paperRecessed};
    border: 1px solid ${(p) => p.theme.color.rule};
    padding: 6px 10px;
    border-radius: 3px;
    cursor: pointer;
    letter-spacing: 0;
    transition: border-color 100ms, color 100ms;

    &:hover {
        border-color: ${(p) => p.theme.color.themeText};
        color: ${(p) => p.theme.color.themeText};
    }
`;

export const SourceBlock = styled.pre`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12.5px;
    line-height: 1.6;
    color: ${(p) => p.theme.color.inkSoft};
    background: ${(p) => p.theme.color.paperRecessed};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    padding: 14px 16px;
    margin-top: 12px;
    overflow-x: auto;
    white-space: pre;
    tab-size: 4;
`;
