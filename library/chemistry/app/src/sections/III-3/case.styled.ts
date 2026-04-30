import styled from 'styled-components';

export const BookFrame = styled.article`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 480px;
`;

export const BookTitle = styled.h3`
    font-family: ${(p) => p.theme.font.heading};
    font-size: 18px;
    margin-bottom: 8px;
    color: ${(p) => p.theme.color.ink};
`;

export const ChapterList = styled.ol`
    margin: 0;
    padding-left: 24px;
    color: ${(p) => p.theme.color.inkSoft};
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.caption};
    line-height: 1.7;
`;

export const ChapterItem = styled.li`
    margin: 0;
`;

export const SummaryRow = styled.div`
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.themeText};
`;

export const ErrorBox = styled.div`
    padding: 12px 14px;
    background: ${(p) => p.theme.color.failBg};
    border: 1px solid ${(p) => p.theme.color.fail};
    border-radius: 4px;
    color: ${(p) => p.theme.color.fail};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    line-height: 1.6;
    white-space: pre-wrap;
`;

export const SuccessBox = styled.div`
    padding: 12px 14px;
    background: ${(p) => p.theme.color.okBg};
    border: 1px solid ${(p) => p.theme.color.ok};
    border-radius: 4px;
    color: ${(p) => p.theme.color.ok};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    line-height: 1.6;
`;
