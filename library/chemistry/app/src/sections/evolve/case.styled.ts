import styled from 'styled-components';

export const ListPair = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const ListFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
`;

export const ListTitle = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
`;

export const ItemRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-family: ${(p) => p.theme.font.sans};
    font-size: 14px;
    color: ${(p) => p.theme.color.ink};

    & + & {
        border-top: 1px solid ${(p) => p.theme.color.rule}44;
    }
`;

export const CheckBox = styled.button<{ $checked: boolean }>`
    width: 20px;
    height: 20px;
    border: 2px solid ${(p) => (p.$checked ? p.theme.color.ok : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$checked ? p.theme.color.ok + '22' : 'transparent')};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${(p) => p.theme.color.ok};
    transition: all 120ms;
    flex-shrink: 0;

    &:hover {
        border-color: ${(p) => p.theme.color.ok};
    }
`;

export const ItemText = styled.span<{ $struck?: boolean }>`
    text-decoration: ${(p) => (p.$struck ? 'line-through' : 'none')};
    opacity: ${(p) => (p.$struck ? 0.5 : 1)};
    transition: opacity 150ms;
`;
