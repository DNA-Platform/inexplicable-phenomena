import styled from 'styled-components';

export const CrossFrame = styled.div`
    display: flex;
    gap: 16px;
    align-items: stretch;
    flex-wrap: wrap;
`;

export const ChemicalBox = styled.div`
    flex: 1;
    min-width: 180px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const BoxLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const ValueDisplay = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    width: 80px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;

export const Arrow = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    color: ${(p) => p.theme.color.themeText};
    flex-shrink: 0;
`;

export const ActionRow = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 8px;
`;

/* ── Volume Control (case-1) ── */

export const VolumeFrame = styled.div`
    display: flex;
    gap: 16px;
    align-items: stretch;
    flex-wrap: wrap;
`;

export const SliderBox = styled.div`
    flex: 1;
    min-width: 220px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SliderLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const RangeInput = styled.input`
    width: 100%;
    accent-color: ${(p) => p.theme.color.theme};
    cursor: pointer;
`;

export const LevelReadout = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    color: ${(p) => p.theme.color.muted};
    font-variant-numeric: tabular-nums;
`;

export const SpeakerBox = styled.div`
    min-width: 100px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
`;

export const SpeakerIcon = styled.div`
    font-size: 32px;
    line-height: 1;
`;

export const SpeakerLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

/* ── Dashboard Widgets (case-2) ── */

export const DashboardRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

export const MetricFrame = styled.div`
    flex: 1;
    min-width: 180px;
    padding: 18px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const MetricLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const MetricValue = styled.div<{ $flash?: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 32px;
    font-weight: 700;
    color: ${(p) => (p.$flash ? p.theme.color.themeText : p.theme.color.ink)};
    font-variant-numeric: tabular-nums;
    transition: color 300ms;
`;

export const RefreshButton = styled.button`
    align-self: flex-start;
    padding: 6px 14px;
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
