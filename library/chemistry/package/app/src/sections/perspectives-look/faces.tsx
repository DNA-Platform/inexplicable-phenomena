import styled from 'styled-components';

// Styling only. Kept out of the class for brevity (Doug's allowance) — otherwise
// these would be overridable properties on the chemical. The data and the views
// live in the class (see case-1.tsx).
//
// The thread through every tier is $tint — the element's GROUP color. It carries
// from the bare symbol tile up through the full cell unchanged, so walking the
// instance up and down its ancestry reads as one object breathing in and out,
// never as data appearing and disappearing.

// ── Chrome ──
export const Frame = styled.div`
    display: flex; flex-direction: column; gap: 18px; padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;
export const Toolbar = styled.div`
    display: flex; align-items: center; gap: 14px; align-self: stretch;
`;
export const StepButton = styled.button<{ disabled?: boolean }>`
    width: 38px; height: 38px; flex: none;
    display: flex; align-items: center; justify-content: center;
    border-radius: 9px; font-size: 14px;
    background: ${p => p.theme.color.paperRaised};
    border: 1.5px solid ${p => (p.disabled ? p.theme.color.rule : p.theme.color.themeText)};
    color: ${p => (p.disabled ? p.theme.color.mutedFaint : p.theme.color.themeText)};
    cursor: ${p => (p.disabled ? 'default' : 'pointer')};
    transition: border-color 130ms ease, color 130ms ease, transform 130ms ease, box-shadow 130ms ease;
    &:hover { transform: ${p => (p.disabled ? 'none' : 'translateY(-2px)')};
        box-shadow: ${p => (p.disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.10)')}; }
`;
export const Breadcrumb = styled.div`
    display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
    font-family: ${p => p.theme.font.mono}; font-size: 12px;
`;
export const Crumb = styled.span<{ $active?: boolean }>`
    padding: 4px 10px; border-radius: 999px; white-space: nowrap;
    font-weight: ${p => (p.$active ? 700 : 500)};
    color: ${p => (p.$active ? p.theme.color.themeText : p.theme.color.muted)};
    background: ${p => (p.$active ? p.theme.color.themeSoft : 'transparent')};
    border: 1px solid ${p => (p.$active ? p.theme.color.themeText : 'transparent')};
    transition: color 130ms ease, background 130ms ease, border-color 130ms ease;
`;
export const CrumbSep = styled.span`color: ${p => p.theme.color.mutedFaint}; font-size: 11px;`;
export const Stage = styled.div`
    display: flex; align-items: center; justify-content: center;
    height: 300px; padding: 28px; box-sizing: border-box; overflow: hidden;
    background: ${p => p.theme.color.paperRaised};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 10px;
`;

// ── Tier 1 + 2: the symbol tile (bare, then named) ──
// One tile shell, tinted by the group color. The bare form holds a single
// centered symbol; the named form fills in number / name / mass around it. The
// grid keeps the symbol fixed at center so adding the surrounding text reads as
// the tile filling in, not as the layout jumping.
export const Tile = styled.div<{ $tint: string }>`
    display: grid;
    grid-template-rows: 22px 1fr 22px;
    align-items: center; justify-items: center;
    width: 168px; height: 168px; padding: 16px; box-sizing: border-box;
    border-radius: 16px;
    background: ${p => p.$tint};
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.10), 0 8px 22px rgba(0,0,0,0.14);
    color: rgba(28,22,4,0.92);
`;
export const Symbol = styled.div`
    grid-row: 2; font-family: ${p => p.theme.font.sans};
    font-size: 56px; font-weight: 800; line-height: 1; letter-spacing: -0.02em;
`;
export const Number = styled.div`
    grid-row: 1; justify-self: start; align-self: start;
    font-family: ${p => p.theme.font.mono}; font-size: 14px; font-weight: 700;
    opacity: 0.82; font-variant-numeric: tabular-nums;
`;
export const Name = styled.div`
    grid-row: 3; font-family: ${p => p.theme.font.sans}; font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em;
`;

// ── Tier 3: the full periodic cell ──
export const Cell = styled.div<{ $tint: string }>`
    position: relative;
    display: grid;
    grid-template-rows: 26px 1fr 24px 18px;
    justify-items: center; align-items: center;
    width: 184px; height: 200px; padding: 14px 16px; box-sizing: border-box;
    border-radius: 14px;
    background: ${p => p.$tint};
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.16);
    color: rgba(28,22,4,0.92);
`;
export const CellCorner = styled.div`
    grid-row: 1; justify-self: start;
    font-family: ${p => p.theme.font.mono}; font-size: 15px; font-weight: 700;
    opacity: 0.85; font-variant-numeric: tabular-nums;
`;
export const CellSymbol = styled.div`
    grid-row: 2; font-family: ${p => p.theme.font.sans};
    font-size: 60px; font-weight: 800; line-height: 1; letter-spacing: -0.02em;
`;
export const CellName = styled.div`
    grid-row: 3; font-family: ${p => p.theme.font.sans}; font-size: 16px; font-weight: 600;
    letter-spacing: 0.02em;
`;
export const CellMass = styled.div`
    grid-row: 4; font-family: ${p => p.theme.font.mono}; font-size: 12px; opacity: 0.78;
    font-variant-numeric: tabular-nums;
`;
