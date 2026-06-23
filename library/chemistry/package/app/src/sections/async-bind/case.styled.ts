import styled from 'styled-components';

export const AsyncCard = styled.div`
    max-width: 420px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const AsyncLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const StatusDisplay = styled.div<{ $active: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.$active ? p.theme.color.ink : p.theme.color.muted};
    text-align: center;
    padding: 18px 16px;
    border-radius: 4px;
    background: ${(p) => p.$active ? p.theme.color.okBg : p.theme.color.paperRecessed};
    transition: background 200ms, color 200ms;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button`
    flex: 1;
    min-width: 110px;
    padding: 8px 14px;
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

    &:active {
        background: ${(p) => p.theme.color.theme};
        color: ${(p) => p.theme.color.paperRaised};
    }
`;

export const ResetButton = styled(ActionButton)`
    border-color: ${(p) => p.theme.color.mutedFaint};
    background: transparent;
    color: ${(p) => p.theme.color.muted};

    &:hover {
        background: ${(p) => p.theme.color.paperRecessed};
    }

    &:active {
        background: ${(p) => p.theme.color.mutedFaint};
    }
`;
