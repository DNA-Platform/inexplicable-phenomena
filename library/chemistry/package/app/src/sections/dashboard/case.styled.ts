import styled, { keyframes } from 'styled-components';

/* ── Dashboard grid ── */

export const DashGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

/* ── Shared card frame ── */

export const CardFrame = styled.div`
    padding: 18px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 120px;
`;

export const CardTitle = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.muted};
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

/* ── Loading state ── */

const pulse = keyframes`
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
`;

export const LoadingText = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const SkeletonBlock = styled.div`
    height: 32px;
    width: 70%;
    border-radius: 4px;
    background: ${(p) => p.theme.color.rule};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const SkeletonBar = styled.div`
    height: 10px;
    width: 50%;
    border-radius: 3px;
    margin-top: 4px;
    background: ${(p) => p.theme.color.rule};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

/* ── MetricCard ── */

export const MetricValue = styled.div<{ $fresh?: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 32px;
    font-weight: 700;
    color: ${(p) => p.$fresh ? p.theme.color.theme : p.theme.color.ink};
    font-variant-numeric: tabular-nums;
    transition: color 400ms ease;
`;

export const MetricLabel = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
`;

/* ── ChartCard ── */

export const BarRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 64px;
    padding-top: 8px;
`;

export const Bar = styled.div<{ $height: number; $color: string; $animated?: boolean }>`
    flex: 1;
    min-width: 16px;
    height: ${(p) => p.$animated ? p.$height : 0}%;
    background: ${(p) => p.$color};
    border-radius: 3px 3px 0 0;
    transition: height 400ms ease-out;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;

/* ── StatusCard ── */

const pop = keyframes`
    0%   { transform: scale(1); }
    40%  { transform: scale(1.1); }
    100% { transform: scale(1); }
`;

export const StatusBadge = styled.span<{ $status: 'green' | 'yellow' | 'red'; $pop?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 12px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 13px;
    font-weight: 600;
    background: ${(p) =>
        p.$status === 'green'  ? p.theme.color.okFaint ?? '#d4f5d4' :
        p.$status === 'yellow' ? p.theme.color.warnFaint ?? '#fff3cd' :
        p.theme.color.failFaint ?? '#f5d4d4'};
    color: ${(p) =>
        p.$status === 'green'  ? p.theme.color.ok :
        p.$status === 'yellow' ? p.theme.color.warn ?? '#856404' :
        p.theme.color.fail};
    animation: ${(p) => p.$pop ? pop : 'none'} 300ms ease;
`;

export const StatusDot = styled.span<{ $status: 'green' | 'yellow' | 'red' }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) =>
        p.$status === 'green'  ? p.theme.color.ok :
        p.$status === 'yellow' ? p.theme.color.warn ?? '#856404' :
        p.theme.color.fail};
`;
