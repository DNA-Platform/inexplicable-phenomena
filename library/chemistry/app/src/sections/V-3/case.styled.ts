import styled from 'styled-components';

export const CrossFrame = styled.div`
    display: flex;
    gap: 16px;
    align-items: stretch;
    flex-wrap: wrap;
`;

export const ChemicalBox = styled.div`
    flex: 1;
    min-width: 180px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const BoxLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ValueDisplay = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const Arrow = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    color: ${(p) => p.theme.color.themeText};
    flex-shrink: 0;
`;
