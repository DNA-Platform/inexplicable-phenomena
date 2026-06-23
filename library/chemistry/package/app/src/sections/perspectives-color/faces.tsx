import styled from 'styled-components';

// Styling only. Kept out of the class for brevity (Doug's allowance) — otherwise
// these would be overridable properties on the chemical. Everything else — the
// data, the math, the views — lives in the class (see case-1.tsx).

// ── Chrome: the preview menu, the live hue slider, the stage ──
export const Frame = styled.div`
    display: flex; flex-direction: column; gap: 16px; padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;
export const PreviewRow = styled.div`display: flex; gap: 12px; flex-wrap: wrap; align-self: flex-start;`;
export const PreviewTile = styled.button<{ $active?: boolean }>`
    display: flex; flex-direction: column; align-items: stretch; gap: 8px; width: 116px; padding: 10px;
    border-radius: 11px; background: ${p => p.theme.color.paper};
    border: 2px solid ${p => (p.$active ? p.theme.color.themeText : p.theme.color.rule)};
    box-shadow: ${p => (p.$active ? '0 4px 14px rgba(0,0,0,0.10)' : 'none')};
    cursor: pointer; transition: border-color 130ms ease, box-shadow 130ms ease, transform 130ms ease;
    &:hover { transform: translateY(-2px); border-color: ${p => p.theme.color.themeText}; }
`;
export const PreviewScale = styled.div`
    height: 84px; border-radius: 7px; background: ${p => p.theme.color.paperRecessed};
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    > * { flex: none; transform: scale(0.34); transform-origin: center; } /* flex:none keeps true aspect before scaling */
`;
export const PreviewName = styled.span`
    font-family: ${p => p.theme.font.sans}; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em; text-align: center; color: ${p => p.theme.color.muted};
`;
export const Stage = styled.div`
    display: flex; align-items: center; justify-content: center;
    height: 220px; padding: 28px; box-sizing: border-box; overflow: hidden;
    background: ${p => p.theme.color.paperRaised};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 10px;
`;
export const HueRow = styled.div`display: flex; align-items: center; gap: 14px; align-self: stretch;`;
export const HueLabel = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; color: ${p => p.theme.color.muted};
    min-width: 76px; font-variant-numeric: tabular-nums;
`;
export const HueInput = styled.input`
    flex: 1; appearance: none; height: 8px; border-radius: 4px;
    background: linear-gradient(to right,
        hsl(0,75%,55%), hsl(60,75%,55%), hsl(120,75%,55%),
        hsl(180,75%,55%), hsl(240,75%,55%), hsl(300,75%,55%), hsl(360,75%,55%));
    cursor: pointer;
    &::-webkit-slider-thumb {
        appearance: none; width: 18px; height: 18px; border-radius: 50%;
        background: ${p => p.theme.color.paperRaised}; border: 2px solid ${p => p.theme.color.themeText};
        box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
`;

// ── Lens pieces ──
export const SwatchBox = styled.div`display: flex; flex-direction: column; align-items: center; gap: 14px;`;
export const SwatchTile = styled.div<{ $color: string }>`
    width: 168px; height: 120px; border-radius: 10px; background: ${p => p.$color};
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.10);
`;
export const SwatchValue = styled.div`
    font-family: ${p => p.theme.font.mono}; font-size: 13px; color: ${p => p.theme.color.muted}; font-variant-numeric: tabular-nums;
`;
export const BigReadout = styled.div`
    display: flex; align-items: center; gap: 18px;
    font-family: ${p => p.theme.font.mono}; font-size: 40px; font-weight: 600;
    color: ${p => p.theme.color.ink}; font-variant-numeric: tabular-nums;
`;
export const ReadoutChip = styled.span<{ $color: string }>`
    width: 46px; height: 46px; border-radius: 9px; background: ${p => p.$color}; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
`;
export const Channels = styled.div`display: flex; flex-direction: column; gap: 13px; width: 300px;`;
export const Channel = styled.div`display: grid; grid-template-columns: 26px 1fr 56px; align-items: center; gap: 12px;`;
export const ChannelLabel = styled.span`font-family: ${p => p.theme.font.mono}; font-size: 12px; font-weight: 600; color: ${p => p.theme.color.muted};`;
export const ChannelTrack = styled.div`height: 10px; border-radius: 5px; background: ${p => p.theme.color.paperRecessed}; overflow: hidden;`;
export const ChannelFill = styled.div<{ $pct: number; $color: string }>`height: 100%; width: ${p => p.$pct}%; background: ${p => p.$color}; border-radius: 5px;`;
export const ChannelValue = styled.span`font-family: ${p => p.theme.font.mono}; font-size: 12px; text-align: right; color: ${p => p.theme.color.inkSoft}; font-variant-numeric: tabular-nums;`;
