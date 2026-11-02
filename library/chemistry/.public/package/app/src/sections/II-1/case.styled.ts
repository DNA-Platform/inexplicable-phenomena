import styled from 'styled-components';

export const CounterFrame = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-width: 200px;
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
    width: 64px;
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

/* ── Like Button (case-1) ── */

export const PostCard = styled.div`
    padding: 18px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 380px;
`;

export const PostTitle = styled.h3`
    margin: 0 0 6px;
    font-family: ${(p) => p.theme.font.heading};
    font-size: ${(p) => p.theme.type.h3};
    color: ${(p) => p.theme.color.ink};
`;

export const PostBody = styled.p`
    margin: 0 0 14px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    line-height: 1.5;
`;

export const LikeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const HeartButton = styled.button<{ $liked: boolean }>`
    border: none;
    background: none;
    font-size: 22px;
    cursor: pointer;
    color: ${(p) => (p.$liked ? p.theme.color.fail : p.theme.color.muted)};
    transition: transform 120ms;
    padding: 2px 4px;

    &:hover {
        transform: scale(1.2);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const LikeCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    font-weight: 600;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

/* ── Star Rating (case-2) ── */

export const RatingFrame = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-width: 180px;
`;

export const RatingLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const StarRow = styled.div`
    display: flex;
    gap: 4px;
`;

export const Star = styled.button<{ $filled: boolean }>`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${(p) => (p.$filled ? '#e5a300' : p.theme.color.mutedFaint)};
    padding: 0 2px;
    transition: transform 80ms;
    line-height: 1;

    &:hover {
        transform: scale(1.15);
    }
`;

export const RatingValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.muted};
`;

export const TwoRatings = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;
