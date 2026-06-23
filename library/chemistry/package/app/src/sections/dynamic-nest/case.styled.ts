import styled, { keyframes } from 'styled-components';

export const BoardFrame = styled.div`
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 10px;
    background: ${p => p.theme.color.bg};
    border: 1px solid ${p => p.theme.color.rule};
    overflow-x: auto;
`;

export const LaneFrame = styled.div`
    flex: 1;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const LaneHeader = styled.div<{ $color: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    border-radius: 6px;
    background: ${p => p.$color}18;
    border-left: 3px solid ${p => p.$color};
`;

export const LaneName = styled.span`
    font-family: ${p => p.theme.font.mono};
    font-size: 12px;
    font-weight: 600;
    color: ${p => p.theme.color.fg};
`;

export const LaneCount = styled.span`
    font-family: ${p => p.theme.font.mono};
    font-size: 11px;
    color: ${p => p.theme.color.muted};
`;

const slideIn = keyframes`
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

export const CardFrame = styled.div`
    padding: 10px;
    border-radius: 6px;
    background: ${p => p.theme.color.surface};
    border: 1px solid ${p => p.theme.color.rule};
    animation: ${slideIn} 0.2s ease-out;
`;

export const CardTitle = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: ${p => p.theme.color.fg};
    margin-bottom: 4px;
`;

export const CardMeta = styled.div`
    font-family: ${p => p.theme.font.mono};
    font-size: 10px;
    color: ${p => p.theme.color.muted};
`;

export const CardActions = styled.div`
    display: flex;
    gap: 4px;
    margin-top: 6px;
`;

export const SmallButton = styled.button`
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.color.rule};
    background: ${p => p.theme.color.bg};
    color: ${p => p.theme.color.fg};
    font-size: 10px;
    cursor: pointer;
    &:hover { background: ${p => p.theme.color.rule}; }
`;

export const AddCardButton = styled.button`
    padding: 6px;
    border-radius: 6px;
    border: 1px dashed ${p => p.theme.color.rule};
    background: transparent;
    color: ${p => p.theme.color.muted};
    font-size: 12px;
    cursor: pointer;
    &:hover { background: ${p => p.theme.color.surface}; color: ${p => p.theme.color.fg}; }
`;

export const ControlBar = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    flex-wrap: wrap;
`;

export const Stat = styled.span`
    font-family: ${p => p.theme.font.mono};
    font-size: 11px;
    color: ${p => p.theme.color.muted};
`;
