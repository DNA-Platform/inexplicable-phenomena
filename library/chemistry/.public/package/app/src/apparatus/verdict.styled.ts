import React from 'react';
import styled from 'styled-components';

export const VerdictSection = styled.div`
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px dashed ${(p) => p.theme.color.rule};
`;

export const VerdictRow = styled.div<{ $state: 'pass' | 'fail' | 'pending' }>`
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 2px 0;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    line-height: 1.5;
    color: ${(p) =>
        p.$state === 'pass' ? p.theme.color.ok :
        p.$state === 'fail' ? p.theme.color.fail :
        p.theme.color.muted};
`;

const DotSpan = styled.span<{ $state: 'pass' | 'fail' | 'pending' }>`
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${(p) =>
        p.$state === 'pass' ? p.theme.color.ok :
        p.$state === 'fail' ? p.theme.color.fail :
        p.theme.color.mutedFaint};
`;

export function VerdictDot({ $state }: { $state: 'pass' | 'fail' | 'pending' }) {
    return React.createElement(DotSpan, { $state, 'data-verdict': $state } as any);
}
