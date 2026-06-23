import styled from 'styled-components';

export const RecoverFrame = styled.div`
    max-width: 460px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const RecoverLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const NormalView = styled.div`
    padding: 16px;
    background: ${(p) => p.theme.color.okBg};
    border: 1px solid ${(p) => p.theme.color.ok};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.ok};
    text-align: center;
`;

export const ErrorView = styled.div`
    padding: 16px;
    background: ${(p) => p.theme.color.failBg};
    border: 1px solid ${(p) => p.theme.color.fail};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.fail};
    line-height: 1.6;
`;

export const ToggleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ToggleLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.muted};
    flex: 1;
`;

export const ToggleButton = styled.button<{ $danger: boolean }>`
    padding: 6px 16px;
    border: 1px solid ${(p) => p.$danger ? p.theme.color.fail : p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.$danger ? p.theme.color.failBg : p.theme.color.themeFaint};
    color: ${(p) => p.$danger ? p.theme.color.fail : p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.$danger ? p.theme.color.fail : p.theme.color.themeSoft};
        color: ${(p) => p.$danger ? p.theme.color.paperRaised : p.theme.color.themeText};
    }
`;

export const ResetButton = styled.button`
    padding: 6px 16px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;
