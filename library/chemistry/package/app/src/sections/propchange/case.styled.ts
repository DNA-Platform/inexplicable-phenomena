import styled from 'styled-components';

export const PickerFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const SliderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const SliderLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
    min-width: 60px;
`;

export const HueSlider = styled.input`
    flex: 1;
    cursor: pointer;
    accent-color: ${(p) => p.theme.color.theme};
`;

export const HueValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    width: 48px;
    text-align: right;
    font-variant-numeric: tabular-nums;
`;

export const SwatchBox = styled.div<{ $color: string }>`
    width: 100%;
    height: 80px;
    border-radius: 6px;
    border: 1px solid ${(p) => p.theme.color.rule};
    background: ${(p) => p.$color};
    transition: background 80ms;
`;

export const SwatchLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    text-align: center;
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
