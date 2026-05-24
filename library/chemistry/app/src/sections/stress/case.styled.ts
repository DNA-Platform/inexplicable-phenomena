import styled from 'styled-components';

export const StressFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const CountDisplay = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 48px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${(p) => p.theme.color.ink};
    line-height: 1;
`;

export const TargetLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
`;

export const RunButton = styled.button`
    padding: 10px 24px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const MatchBadge = styled.span<{ $match: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    color: ${(p) => (p.$match ? p.theme.color.ok : p.theme.color.muted)};
`;
