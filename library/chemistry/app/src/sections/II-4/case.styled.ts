import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
`;

export const LoaderFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const LoadingText = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const DataList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const DataItem = styled.li`
    padding: 6px 0;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};

    &:last-child { border-bottom: none; }
`;

export const PhaseTag = styled.span`
    display: inline-block;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
    background: ${(p) => p.theme.color.themeFaint};
    padding: 2px 8px;
    border-radius: 10px;
    margin-right: 8px;
`;

export const TimerFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const TimerValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
    min-width: 60px;
    text-align: center;
`;
