import styled from 'styled-components';

export const ToggleFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const ToggleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ToggleLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    font-weight: 600;
`;

export const ToggleSwitch = styled.button<{ $on: boolean }>`
    padding: 8px 20px;
    border: 1px solid ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$on ? p.theme.color.okBg : p.theme.color.paperRecessed)};
    color: ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.muted)};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: pointer;
    min-width: 80px;
`;

export const ChildFrame = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: ${(p) => p.theme.color.themeFaint};
    border: 1px solid ${(p) => p.theme.color.theme};
    border-left: 3px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
`;

export const ChildLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 80px;
`;

export const ChildCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 22px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    width: 60px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const ChildButton = styled.button`
    padding: 6px 14px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const Placeholder = styled.div`
    padding: 14px 18px;
    background: ${(p) => p.theme.color.paperRecessed};
    border: 1px dashed ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.muted};
    text-align: center;
`;
