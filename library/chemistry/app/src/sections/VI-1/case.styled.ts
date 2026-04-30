import styled from 'styled-components';

export const DerivativesRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

export const DerivativeCard = styled.div`
    flex: 1;
    min-width: 160px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const MountLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;
