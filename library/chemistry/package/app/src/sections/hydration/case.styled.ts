import styled from 'styled-components';

export const Bench = styled.div`
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    padding: 8px 0 16px;
`;

export const Jar = styled.div<{ $hue: number; $dim?: boolean }>`
    width: 220px;
    border-radius: 14px;
    padding: 16px;
    background: ${({ $hue, $dim }) => $dim
        ? 'hsl(0 0% 14%)'
        : `linear-gradient(160deg, hsl(${$hue} 45% 16%), hsl(${$hue} 60% 9%))`};
    border: 1px solid ${({ $hue, $dim }) => $dim ? 'hsl(0 0% 30%)' : `hsl(${$hue} 70% 45%)`};
    box-shadow: ${({ $hue, $dim }) => $dim ? 'none' : `0 0 24px hsl(${$hue} 80% 50% / 0.25) inset`};
    color: hsl(0 0% 92%);
    font-family: monospace;
`;

export const Nucleus = styled.div<{ $hue: number; $charge: number }>`
    width: ${({ $charge }) => 46 + Math.min(Math.abs($charge) * 4, 40)}px;
    height: ${({ $charge }) => 46 + Math.min(Math.abs($charge) * 4, 40)}px;
    margin: 10px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, hsl(${({ $hue }) => $hue} 90% 70%), hsl(${({ $hue }) => $hue} 80% 40%));
    transition: width 0.2s, height 0.2s, background 0.3s;
`;

export const Name = styled.div`
    text-align: center;
    font-size: 18px;
    letter-spacing: 0.08em;
`;

export const Readout = styled.div`
    text-align: center;
    opacity: 0.8;
    font-size: 12px;
    margin: 6px 0 10px;
`;

export const Controls = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;

    button {
        background: hsl(0 0% 20%);
        color: inherit;
        border: 1px solid hsl(0 0% 35%);
        border-radius: 6px;
        padding: 4px 10px;
        font-family: inherit;
        cursor: pointer;
    }

    button:hover {
        border-color: hsl(0 0% 60%);
    }
`;

export const Plaque = styled.div<{ $on: boolean }>`
    margin-top: 10px;
    text-align: center;
    font-size: 11px;
    padding: 3px 0;
    border-radius: 6px;
    border: 1px dashed ${({ $on }) => $on ? 'hsl(140 60% 45%)' : 'hsl(0 0% 35%)'};
    color: ${({ $on }) => $on ? 'hsl(140 60% 65%)' : 'hsl(0 0% 55%)'};
`;
