import styled from 'styled-components';

export const FormFrame = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const FieldLabel = styled.label`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    min-height: 72px;

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const FieldError = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.fail};
    font-weight: 600;
    min-height: 16px;
`;

export const SubmitButton = styled.button<{ $disabled: boolean }>`
    padding: 10px 20px;
    border: 1px solid ${(p) => (p.$disabled ? p.theme.color.rule : p.theme.color.theme)};
    border-radius: 4px;
    background: ${(p) => (p.$disabled ? p.theme.color.paperRecessed : p.theme.color.themeFaint)};
    color: ${(p) => (p.$disabled ? p.theme.color.muted : p.theme.color.themeText)};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
    align-self: flex-start;

    &:hover {
        background: ${(p) => (p.$disabled ? p.theme.color.paperRecessed : p.theme.color.themeSoft)};
    }
`;

export const SuccessBanner = styled.div`
    padding: 12px 18px;
    background: ${(p) => p.theme.color.okBg};
    border: 1px solid ${(p) => p.theme.color.ok};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.ok};
`;
