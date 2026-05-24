import styled from 'styled-components';

/* -- Form -- */

export const FormFrame = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 440px;
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

export const FieldInput = styled.input<{ $hasError?: boolean; $valid?: boolean }>`
    padding: 10px 12px;
    border: 1px solid ${(p) =>
        p.$hasError ? p.theme.color.fail :
        p.$valid ? p.theme.color.ok :
        p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};
    transition: border-color 200ms ease;

    &:focus {
        outline: none;
        border-color: ${(p) =>
            p.$hasError ? p.theme.color.fail :
            p.theme.color.theme};
    }
`;

export const FieldSelect = styled.select<{ $hasError?: boolean; $valid?: boolean }>`
    padding: 10px 12px;
    border: 1px solid ${(p) =>
        p.$hasError ? p.theme.color.fail :
        p.$valid ? p.theme.color.ok :
        p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};
    transition: border-color 200ms ease;

    &:focus {
        outline: none;
        border-color: ${(p) =>
            p.$hasError ? p.theme.color.fail :
            p.theme.color.theme};
    }
`;

export const CheckboxRow = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    cursor: pointer;
`;

export const Checkbox = styled.input`
    width: 16px;
    height: 16px;
    accent-color: ${(p) => p.theme.color.theme};
    cursor: pointer;
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
    transition: background 200ms ease, border-color 200ms ease, color 200ms ease;

    &:hover {
        background: ${(p) => (p.$disabled ? p.theme.color.paperRecessed : p.theme.color.themeSoft)};
    }
`;

export const SuccessBanner = styled.div<{ $visible?: boolean }>`
    padding: 12px 18px;
    background: ${(p) => p.theme.color.okBg};
    border: 1px solid ${(p) => p.theme.color.ok};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.ok};
    max-height: ${(p) => p.$visible ? '80px' : '0'};
    opacity: ${(p) => p.$visible ? 1 : 0};
    overflow: hidden;
    transition: max-height 300ms ease, opacity 300ms ease;
`;
