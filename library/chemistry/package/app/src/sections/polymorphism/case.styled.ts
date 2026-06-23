import styled from 'styled-components';

/* ── Dashboard ── */

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

/* ── Base Card ── */

export const CardFrame = styled.div`
    padding: 18px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const CardTitle = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.muted};
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

/* ── MetricCard ── */

export const MetricValue = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 32px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

export const TrendArrow = styled.span<{ $up: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 13px;
    font-weight: 600;
    color: ${(p) => (p.$up ? p.theme.color.ok : p.theme.color.fail)};
`;

/* ── ChartCard ── */

export const BarRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 64px;
    padding-top: 8px;
`;

export const Bar = styled.div<{ $height: number }>`
    flex: 1;
    min-width: 16px;
    height: ${(p) => p.$height}%;
    background: ${(p) => p.theme.color.theme};
    border-radius: 3px 3px 0 0;
    transition: height 200ms ease;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;
