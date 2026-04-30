import styled from 'styled-components';

export const PropertyFrame = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    margin-bottom: 10px;
`;

export const PropertyLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 80px;
`;

export const PropertyValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 22px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    min-width: 80px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const TextValue = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 16px;
    color: ${(p) => p.theme.color.ink};
    flex: 1;
    padding: 6px 10px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 3px;
`;

export const ActionButton = styled.button`
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

export const TextInput = styled.input`
    flex: 1;
    padding: 6px 10px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 3px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRaised};

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const ToggleButton = styled.button<{ $on: boolean }>`
    padding: 6px 14px;
    border: 1px solid ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$on ? p.theme.color.okBg : p.theme.color.paperRecessed)};
    color: ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.muted)};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: pointer;
    min-width: 56px;
`;
