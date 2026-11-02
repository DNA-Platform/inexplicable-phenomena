import styled from 'styled-components';

export const BookCard = styled.div`
    max-width: 480px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    padding: 16px 20px;
`;

export const BookTitle = styled.h3`
    font-family: ${(p) => p.theme.font.heading};
    font-size: 18px;
    color: ${(p) => p.theme.color.ink};
    margin-bottom: 12px;
`;

export const ChapterSection = styled.div`
    margin-bottom: 10px;
    padding: 10px 14px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 4px;
`;

export const ChapterTitle = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const PageItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: 12px;
    color: ${(p) => p.theme.color.inkSoft};
    padding: 3px 0 3px 12px;
    border-left: 2px solid ${(p) => p.theme.color.rule};
`;

export const PageTitle = styled.span`
    flex: 1;
`;

export const LikeButton = styled.button<{ $liked?: boolean }>`
    font-size: 12px;
    color: ${(p) => p.$liked ? p.theme.color.fail : p.theme.color.muted};
    transition: color 100ms;

    &:hover { color: ${(p) => p.theme.color.fail}; }
`;

export const LikeCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 20px;
    text-align: right;
    font-variant-numeric: tabular-nums;
`;
