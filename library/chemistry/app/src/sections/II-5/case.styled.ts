import styled from 'styled-components';

export const Caption = styled.p`
    margin-bottom: 8px;
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
`;

export const CaptionSpaced = styled.p`
    margin-bottom: 10px;
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
`;

export const RenderBox = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    padding: 8px 12px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 3px;
`;

export const AssertionGrid = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px 14px;
    padding: 12px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 3px;
`;

export const AssertionLine = styled.p`
    margin-top: 10px;
    font-size: 12px;
    color: ${(p) => p.theme.color.mutedSoft};
    font-family: ${(p) => p.theme.font.mono};
`;

export const Verdict = styled.strong<{ $pass: boolean }>`
    color: ${(p) => (p.$pass ? p.theme.color.ok : p.theme.color.fail)};
`;
