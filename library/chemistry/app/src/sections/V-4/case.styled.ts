import styled from 'styled-components';

export const CollectionFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const CollectionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const CollectionLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 88px;
`;

export const CollectionDisplay = styled.div`
    flex: 1;
    padding: 8px 12px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 3px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    min-height: 28px;
    word-break: break-all;
`;

export const Pill = styled.span`
    display: inline-block;
    padding: 2px 8px;
    margin: 2px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
`;

export const Action = styled.button`
    padding: 6px 12px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const SizeBadge = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
`;
