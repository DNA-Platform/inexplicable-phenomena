import styled from 'styled-components';

export const FcCard = styled.div`
    max-width: 400px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FcLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const CountDisplay = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 36px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const FcButton = styled.button`
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

    &:active {
        background: ${(p) => p.theme.color.theme};
        color: ${(p) => p.theme.color.paperRaised};
    }
`;

export const FcNote = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    text-align: center;
    padding: 6px 0;
    border-top: 1px dashed ${(p) => p.theme.color.rule};
`;
