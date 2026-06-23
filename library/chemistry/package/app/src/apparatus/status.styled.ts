import styled, { css } from 'styled-components';

const tagBase = css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.size.pillText};
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 3px 8px 3px 7px;
    border-radius: 3px;
    line-height: 1.4;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
`;

const dotBase = css`
    width: 7px;
    height: 7px;
    border-radius: 1px;
    display: inline-block;
`;

export const PlannedTag = styled.span`
    ${tagBase}
    color: ${(p) => p.theme.color.planned};
    background: ${(p) => p.theme.color.plannedBg};
    border: 1px solid ${(p) => p.theme.color.planned}33;
`;
export const PlannedDot = styled.span`${dotBase} background: ${(p) => p.theme.color.planned};`;

export const PendingTag = styled.span`
    ${tagBase}
    color: ${(p) => p.theme.color.pending};
    background: ${(p) => p.theme.color.pendingBg};
    border: 1px solid ${(p) => p.theme.color.pending}33;
`;
export const PendingDot = styled.span`${dotBase} background: ${(p) => p.theme.color.pending};`;

export const PassTag = styled.span`
    ${tagBase}
    color: ${(p) => p.theme.color.ok};
    background: ${(p) => p.theme.color.okBg};
    border: 1px solid ${(p) => p.theme.color.ok}33;
`;
export const PassDot = styled.span`${dotBase} background: ${(p) => p.theme.color.ok};`;

export const FailTag = styled.span`
    ${tagBase}
    color: ${(p) => p.theme.color.fail};
    background: ${(p) => p.theme.color.failBg};
    border: 1px solid ${(p) => p.theme.color.fail}33;
`;
export const FailDot = styled.span`${dotBase} background: ${(p) => p.theme.color.fail};`;

export const BrokenTag = styled.span`
    ${tagBase}
    color: ${(p) => p.theme.color.broken};
    background: ${(p) => p.theme.color.brokenBg};
    border: 1px solid ${(p) => p.theme.color.broken}33;
`;
export const BrokenDot = styled.span`${dotBase} background: ${(p) => p.theme.color.broken};`;
