import styled from 'styled-components';

export const DemoFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 520px;
`;

export const Canvas = styled.div`
    position: relative;
    width: 100%;
    height: 260px;
    background: ${(p) => p.theme.color.paperRecessed};
    border: 2px dashed ${(p) => p.theme.color.rule};
    border-radius: 6px;
    overflow: hidden;
`;

export const ShapeEl = styled.div<{ $color: string; $kind: 'circle' | 'square' | 'diamond'; $selected: boolean }>`
    position: absolute;
    width: 56px;
    height: 56px;
    background: ${(p) => p.$color};
    border: 2px solid ${(p) => p.$selected ? p.theme.color.ink : 'rgba(0,0,0,0.15)'};
    box-shadow: ${(p) => p.$selected ? `0 0 0 2px ${p.theme.color.theme}` : 'none'};
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
    border-radius: ${(p) =>
        p.$kind === 'circle' ? '50%' :
        p.$kind === 'diamond' ? '4px' :
        '4px'};
    transform: ${(p) => p.$kind === 'diamond' ? 'rotate(45deg)' : 'none'};

    &:hover {
        border-color: ${(p) => p.theme.color.ink};
    }
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    flex-wrap: wrap;
`;

export const ToolButton = styled.button<{ $active?: boolean }>`
    padding: 6px 12px;
    border: 1px solid ${(p) => p.$active ? p.theme.color.theme : p.theme.color.rule};
    border-radius: 4px;
    background: ${(p) => p.$active ? p.theme.color.themeFaint : p.theme.color.paperRecessed};
    color: ${(p) => p.$active ? p.theme.color.themeText : p.theme.color.muted};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;
`;

export const ColorSwatch = styled.button<{ $color: string; $active: boolean }>`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid ${(p) => p.$active ? p.theme.color.ink : 'transparent'};
    background: ${(p) => p.$color};
    cursor: pointer;
    padding: 0;
`;

export const Label = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
`;

export const Divider = styled.div`
    width: 1px;
    height: 20px;
    background: ${(p) => p.theme.color.rule};
`;
