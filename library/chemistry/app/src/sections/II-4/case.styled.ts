import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
`;

export const LoaderFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-height: 120px;
`;

export const LoadingText = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const DataList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const DataItem = styled.li`
    padding: 6px 0;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};

    &:last-child { border-bottom: none; }
`;

export const PhaseTag = styled.span`
    display: inline-block;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
    background: ${(p) => p.theme.color.themeFaint};
    padding: 2px 8px;
    border-radius: 10px;
    margin-right: 8px;
`;

export const TimerFrame = styled.div`
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const TimerValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
    width: 80px;
    text-align: center;
`;

/* ── Weather card (case-1) ── */

export const WeatherFrame = styled.div`
    padding: 20px 24px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    min-height: 140px;
`;

export const WeatherTitle = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.body};
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    margin-bottom: 16px;
`;

export const WeatherLoading = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const ForecastRow = styled.div`
    display: flex;
    gap: 16px;
`;

export const ForecastDay = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 8px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 6px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.muted};
`;

export const ForecastIcon = styled.span`
    font-size: 28px;
    line-height: 1;
`;

export const ForecastTemp = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 18px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

/* ── Pomodoro timer (case-2) ── */

export const PomodoroFrame = styled.div`
    padding: 20px 24px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
`;

export const PomodoroLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
    background: ${(p) => p.theme.color.themeFaint};
    padding: 2px 10px;
    border-radius: 10px;
    letter-spacing: 0.06em;
`;

export const PomodoroDisplay = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 48px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
`;

export const PomodoroBtnRow = styled.div`
    display: flex;
    gap: 10px;
`;

export const PomodoroBtn = styled.button`
    padding: 8px 18px;
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
`;

export const PomodoroBreakBtn = styled.button`
    padding: 8px 14px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    background: ${(p) => p.theme.color.paperRecessed};
    color: ${(p) => p.theme.color.muted};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeFaint};
        color: ${(p) => p.theme.color.themeText};
    }
`;
