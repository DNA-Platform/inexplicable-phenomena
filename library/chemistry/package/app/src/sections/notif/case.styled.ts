import styled from 'styled-components';

export const NotifFrame = styled.div`
    position: relative;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-height: 180px;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 8px;
`;

export const TriggerButton = styled.button<{ $variant: 'info' | 'success' | 'error' }>`
    padding: 8px 16px;
    border: 1px solid ${(p) =>
        p.$variant === 'info' ? p.theme.color.theme :
        p.$variant === 'success' ? p.theme.color.ok :
        p.theme.color.fail};
    border-radius: 4px;
    background: ${(p) =>
        p.$variant === 'info' ? p.theme.color.themeFaint :
        p.$variant === 'success' ? p.theme.color.okBg :
        p.theme.color.failBg};
    color: ${(p) =>
        p.$variant === 'info' ? p.theme.color.themeText :
        p.$variant === 'success' ? p.theme.color.ok :
        p.theme.color.fail};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover { opacity: 0.85; }
`;

export const ToastStack = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 240px;
    z-index: 1;
`;

export const Toast = styled.div<{ $type: 'info' | 'success' | 'error' }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-left: 4px solid ${(p) =>
        p.$type === 'info' ? p.theme.color.theme :
        p.$type === 'success' ? p.theme.color.ok :
        p.theme.color.fail};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: 12px;
    color: ${(p) => p.theme.color.ink};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ToastText = styled.span`
    flex: 1;
`;

export const DismissButton = styled.button`
    border: none;
    background: none;
    color: ${(p) => p.theme.color.muted};
    font-size: 16px;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;

    &:hover {
        color: ${(p) => p.theme.color.ink};
    }
`;
