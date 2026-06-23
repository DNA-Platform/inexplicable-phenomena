import styled from 'styled-components';

export const NestFrame = styled.div`
    max-width: 520px;
`;

export const LevelCard = styled.div<{ $depth: number }>`
    padding: 14px 16px;
    margin-left: ${(p) => p.$depth * 20}px;
    background: ${(p) => p.$depth === 0
        ? p.theme.color.paperRaised
        : p.$depth === 3
            ? p.theme.color.paperRecessed
            : 'transparent'};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const LevelLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
    margin-bottom: 6px;
`;

export const LevelContent = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LikesDisplay = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

export const TotalDisplay = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 22px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

export const HeartButton = styled.button`
    padding: 4px 12px;
    border: 1px solid ${(p) => p.theme.color.fail};
    border-radius: 4px;
    background: ${(p) => p.theme.color.failBg};
    color: ${(p) => p.theme.color.fail};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.fail};
        color: ${(p) => p.theme.color.paperRaised};
    }
`;
