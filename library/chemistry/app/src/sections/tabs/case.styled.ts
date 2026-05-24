import styled from 'styled-components';

/* -- Tabs -- */

export const TabsFrame = styled.div`
    max-width: 480px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    overflow: hidden;
`;

export const TabBar = styled.div`
    display: flex;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
`;

export const Tab = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 10px 16px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: ${(p) => p.$active ? p.theme.color.themeText : p.theme.color.muted};
    background: ${(p) => p.$active ? p.theme.color.themeFaint : 'transparent'};
    border: none;
    border-bottom: 2px solid ${(p) => p.$active ? p.theme.color.theme : 'transparent'};
    cursor: pointer;
    transition: all 150ms;

    &:hover {
        background: ${(p) => p.theme.color.paperRecessed};
    }
`;

export const PanelBody = styled.div<{ $entering?: boolean; $dark?: boolean }>`
    padding: 20px 24px;
    opacity: ${(p) => p.$entering ? 0 : 1};
    transition: opacity 150ms ease, background 300ms ease;
    background: ${(p) => p.$dark ? 'rgba(0, 0, 0, 0.06)' : 'transparent'};
`;

/* -- Profile -- */

export const PanelTitle = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
    margin-bottom: 12px;
    text-transform: uppercase;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
`;

export const FieldLabel = styled.label`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.muted};
`;

export const FieldInput = styled.input`
    padding: 10px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const FieldTextarea = styled.textarea`
    padding: 10px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};
    resize: vertical;
    min-height: 60px;

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

/* -- Preferences -- */

export const ToggleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
`;

export const ToggleLabel = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
`;

export const ToggleButton = styled.button<{ $on: boolean }>`
    padding: 6px 14px;
    border: 1px solid ${(p) => p.$on ? p.theme.color.theme : p.theme.color.rule};
    border-radius: 4px;
    background: ${(p) => p.$on ? p.theme.color.themeFaint : 'transparent'};
    color: ${(p) => p.$on ? p.theme.color.themeText : p.theme.color.muted};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    min-width: 64px;
`;

export const SliderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
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

/* -- Notifications -- */

export const NotifRow = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }
`;

export const NotifLabel = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
`;

export const NotifCheckbox = styled.input`
    width: 16px;
    height: 16px;
    accent-color: ${(p) => p.theme.color.theme};
    cursor: pointer;
`;

export const NotifDot = styled.span<{ $on: boolean }>`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
    background: ${(p) => p.$on ? p.theme.color.ok : p.theme.color.rule};
    transition: background 200ms ease;
    flex-shrink: 0;
`;
