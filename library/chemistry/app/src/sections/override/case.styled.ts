import styled from 'styled-components';

export const ButtonRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: flex-start;
`;

export const BaseButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    background: ${(p) => p.theme.color.paperRaised};
    font-family: ${(p) => p.theme.font.sans};
    font-size: 14px;
    font-weight: 600;
    color: ${(p) => p.theme.color.ink};
    cursor: pointer;
    transition: background 100ms, transform 80ms;

    &:hover {
        background: ${(p) => p.theme.color.themeFaint};
    }

    &:active {
        transform: scale(0.97);
    }
`;

export const DangerBtn = styled(BaseButton)`
    border-color: ${(p) => p.theme.color.fail};
    color: ${(p) => p.theme.color.fail};
    background: transparent;

    &:hover {
        background: ${(p) => p.theme.color.fail}11;
    }
`;

export const IconBtn = styled(BaseButton)`
    border-color: ${(p) => p.theme.color.theme};
    color: ${(p) => p.theme.color.themeText};

    &:hover {
        background: ${(p) => p.theme.color.themeFaint};
    }
`;

export const ClickCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    color: ${(p) => p.theme.color.muted};
    min-width: 20px;
    text-align: center;
`;

export const ButtonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
`;

export const ButtonLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 600;
    color: ${(p) => p.theme.color.muted};
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;
