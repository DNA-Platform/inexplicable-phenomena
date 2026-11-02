import styled from 'styled-components';

// CaseRow — neutral chrome. The status pill carries the status color;
// the row stays neutral so the visual signal isn't duplicated and
// theme tokens flow only through theme, not through props.
export const CaseRow = styled.div`
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-left: 3px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    padding: 10px 14px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 100ms;

    &:hover {
        border-color: ${(p) => p.theme.color.ruleStrong};
        border-left-color: ${(p) => p.theme.color.muted};
    }
`;

export const CaseName = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 500;
    color: ${(p) => p.theme.color.inkSoft};
    letter-spacing: -0.005em;
`;

export const CaseDescription = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    margin-left: auto;
`;
