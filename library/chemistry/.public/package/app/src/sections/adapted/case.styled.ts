import styled from 'styled-components';

export const DemoFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 480px;
`;

export const ControlRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
`;

export const ToggleButton = styled.button<{ $on: boolean }>`
    padding: 6px 14px;
    border: 1px solid ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$on ? p.theme.color.okBg : p.theme.color.paperRecessed)};
    color: ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.muted)};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: pointer;
    min-width: 56px;
`;

export const Label = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 70px;
`;

export const PreviewBox = styled.div`
    padding: 14px 18px;
    border: 2px dashed ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .highlight {
        padding: 8px 16px;
        background: ${(p) => p.theme.color.themeFaint};
        border: 1px solid ${(p) => p.theme.color.theme};
        border-radius: 4px;
        color: ${(p) => p.theme.color.themeText};
        font-weight: 600;
    }

    .dim {
        padding: 8px 16px;
        background: ${(p) => p.theme.color.paperRecessed};
        border: 1px solid ${(p) => p.theme.color.rule};
        border-radius: 4px;
        color: ${(p) => p.theme.color.muted};
    }
`;

export const BadgeSpan = styled.span<{ $variant: 'info' | 'danger' }>`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    background: ${(p) => p.$variant === 'danger' ? p.theme.color.failBg : p.theme.color.themeFaint};
    color: ${(p) => p.$variant === 'danger' ? p.theme.color.fail : p.theme.color.themeText};
    border: 1px solid ${(p) => p.$variant === 'danger' ? p.theme.color.fail : p.theme.color.theme};
`;

export const MixedGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TypeTag = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    color: ${(p) => p.theme.color.muted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-right: 8px;
`;

export const VisibilitySlot = styled.div<{ $visible: boolean }>`
    padding: 10px 16px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    background: ${(p) => p.$visible ? p.theme.color.paperRaised : p.theme.color.paperRecessed};
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.$visible ? p.theme.color.ink : p.theme.color.muted};
    opacity: ${(p) => p.$visible ? 1 : 0.5};
`;
