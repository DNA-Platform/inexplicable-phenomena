import styled from 'styled-components';

export const ListFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const AddButton = styled.button`
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

export const ItemRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: ${(p) => p.theme.color.paperRecessed};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
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

export const EmptyLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    opacity: 0.6;
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
