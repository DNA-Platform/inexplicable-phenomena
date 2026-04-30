import styled from 'styled-components';

export const CounterFrame = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const CounterLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
`;

export const CounterValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 32px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    min-width: 44px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const CounterButton = styled.button`
    width: 40px;
    height: 40px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: background 100ms;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }

    &:active {
        background: ${(p) => p.theme.color.theme};
        color: ${(p) => p.theme.color.paperRaised};
    }
`;

export const TwoCounters = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;
