import styled, { css } from 'styled-components';

// TestCard — the three-panel test container. Left-border signals state:
// green = all pass, red = any fail, gray = pending interaction.
export const TestCard = styled.article<{ $state: 'pass' | 'fail' | 'pending' }>`
    border: 1px solid ${(p) => p.theme.color.rule};
    border-left: 4px solid ${(p) =>
        p.$state === 'pass' ? p.theme.color.ok :
        p.$state === 'fail' ? p.theme.color.fail :
        p.theme.color.mutedFaint};
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 24px;
    transition: border-color 200ms;
`;

// TestTitle — one-line subject above the code panel.
export const TestTitle = styled.h3`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.body};
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    padding: 14px 18px 0;
    margin: 0;
    background: #1E1E2E;
    color: #CDD6F4;
    letter-spacing: -0.01em;
`;

// CodePanel — dark background, syntax-highlighted code. Always visible.
export const CodePanel = styled.div`
    background: #1E1E2E;
    padding: 12px 18px 14px;
    overflow-x: auto;

    pre {
        margin: 0;
        font-family: ${(p) => p.theme.font.mono};
        font-size: 13px;
        line-height: 1.6;
        tab-size: 4;
    }

    .line-number {
        display: inline-block;
        width: 28px;
        text-align: right;
        padding-right: 12px;
        color: #585B70;
        user-select: none;
    }
`;

// LivePanel — neutral stage for the interactive demo.
export const LivePanel = styled.div`
    background: ${(p) => p.theme.color.paperRecessed};
    padding: 20px;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
`;

// VerdictPanel — checklist of assertions.
export const VerdictPanel = styled.div`
    background: ${(p) => p.theme.color.paperRaised};
    padding: 12px 18px;
`;

export const VerdictRow = styled.div<{ $state: 'pass' | 'fail' | 'pending' }>`
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 4px 0;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    line-height: 1.5;
    color: ${(p) =>
        p.$state === 'pass' ? p.theme.color.ok :
        p.$state === 'fail' ? p.theme.color.fail :
        p.theme.color.muted};
`;

export const VerdictDot = styled.span<{ $state: 'pass' | 'fail' | 'pending' }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${(p) =>
        p.$state === 'pass' ? p.theme.color.ok :
        p.$state === 'fail' ? p.theme.color.fail :
        p.theme.color.mutedFaint};
`;

export const VerdictLabel = styled.span`
    flex: 1;
`;

export const VerdictValue = styled.span`
    font-weight: 600;
`;

// TestRef — link to the backing framework test.
export const TestRef = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.mutedSoft};
    padding-top: 6px;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    margin-top: 8px;
`;
