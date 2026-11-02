import styled from 'styled-components';

export const SwapFrame = styled.div`
    max-width: 480px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    overflow: hidden;
`;

export const ModeBar = styled.div`
    display: flex;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
`;

export const ModeTab = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 10px 16px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: ${(p) => p.$active ? p.theme.color.themeText : p.theme.color.muted};
    background: ${(p) => p.$active ? p.theme.color.themeFaint : 'transparent'};
    border-bottom: 2px solid ${(p) => p.$active ? p.theme.color.theme : 'transparent'};
    cursor: pointer;
    transition: all 150ms;

    &:hover {
        background: ${(p) => p.theme.color.paperRecessed};
    }
`;

export const PanelBody = styled.div`
    padding: 20px 24px;
`;

export const EditorArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: 12px 14px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    background: ${(p) => p.theme.color.paperRecessed};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    line-height: 1.6;
    resize: vertical;

    &:focus {
        outline: 2px solid ${(p) => p.theme.color.theme};
        outline-offset: -1px;
    }
`;

export const EditorLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
    margin-bottom: 8px;
`;

export const ViewerLabel = styled(EditorLabel)``;

export const ViewerText = styled.div<{ $fontSize: number }>`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.$fontSize}px;
    color: ${(p) => p.theme.color.ink};
    line-height: 1.65;
    padding: 12px 0;
    min-height: 60px;
    transition: font-size 150ms;
`;

export const SliderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
`;

export const SliderLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    white-space: nowrap;
`;

export const RangeInput = styled.input`
    flex: 1;
    accent-color: ${(p) => p.theme.color.theme};
    cursor: pointer;
`;

export const SizeReadout = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    width: 36px;
    text-align: right;
`;
