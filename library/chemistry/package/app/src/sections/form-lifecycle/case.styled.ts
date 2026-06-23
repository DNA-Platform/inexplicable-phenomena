import styled, { keyframes } from 'styled-components';

export const AppFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 10px;
    background: ${p => p.theme.color.bg};
    border: 1px solid ${p => p.theme.color.rule};
`;

export const StockTicker = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

const pulse = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
`;

export const StockCard = styled.div<{ $loading?: boolean }>`
    flex: 1;
    min-width: 140px;
    padding: 14px;
    border-radius: 8px;
    background: ${p => p.theme.color.surface};
    border: 1px solid ${p => p.theme.color.rule};
    animation: ${p => p.$loading ? pulse : 'none'} 1.2s infinite;
`;

export const StockSymbol = styled.div`
    font-family: ${p => p.theme.font.mono};
    font-size: 11px;
    color: ${p => p.theme.color.muted};
    margin-bottom: 4px;
`;

export const StockPrice = styled.div<{ $trend?: 'up' | 'down' | 'flat' }>`
    font-family: ${p => p.theme.font.mono};
    font-size: 22px;
    font-weight: 700;
    color: ${p =>
        p.$trend === 'up' ? '#22c55e' :
        p.$trend === 'down' ? '#ef4444' :
        p.theme.color.fg};
`;

export const StockChange = styled.span<{ $positive?: boolean }>`
    font-size: 12px;
    font-weight: 500;
    margin-left: 6px;
    color: ${p => p.$positive ? '#22c55e' : '#ef4444'};
`;

export const FormBadge = styled.div<{ $ran: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-family: ${p => p.theme.font.mono};
    font-size: 11px;
    background: ${p => p.$ran ? '#22c55e18' : '#f59e0b18'};
    color: ${p => p.$ran ? '#22c55e' : '#f59e0b'};
    border: 1px solid ${p => p.$ran ? '#22c55e44' : '#f59e0b44'};
`;

export const RefreshButton = styled.button`
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid ${p => p.theme.color.rule};
    background: ${p => p.theme.color.surface};
    color: ${p => p.theme.color.fg};
    font-size: 12px;
    cursor: pointer;
    &:hover { background: ${p => p.theme.color.rule}; }
`;

export const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const CallCount = styled.span`
    font-family: ${p => p.theme.font.mono};
    font-size: 11px;
    color: ${p => p.theme.color.muted};
`;
