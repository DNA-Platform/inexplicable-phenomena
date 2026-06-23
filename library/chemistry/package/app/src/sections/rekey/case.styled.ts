import styled from 'styled-components';

export const ReorderFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const ShuffleButton = styled.button`
    align-self: flex-start;
    padding: 8px 16px;
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

export const ItemRow = styled.div<{ $color?: string }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: ${(p) => p.$color ? `${p.$color}18` : p.theme.color.paperRecessed};
    border: 1px solid ${(p) => p.$color || p.theme.color.rule};
    border-radius: 4px;
    transition: transform 150ms;
`;

export const ItemIndex = styled.span<{ $color?: string }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.$color || p.theme.color.themeText};
    background: ${(p) => p.$color ? `${p.$color}30` : p.theme.color.themeFaint};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const ItemLabel = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.ink};
    flex: 1;
`;

export const ItemCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 18px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    width: 40px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const ItemButton = styled.button`
    padding: 6px 12px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const ShuffleCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
`;

export const ErrorBox = styled.div`
    padding: 12px 14px;
    background: ${(p) => p.theme.color.failBg};
    border: 1px solid ${(p) => p.theme.color.fail};
    border-radius: 4px;
    color: ${(p) => p.theme.color.fail};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    line-height: 1.6;
    white-space: pre-wrap;
`;
