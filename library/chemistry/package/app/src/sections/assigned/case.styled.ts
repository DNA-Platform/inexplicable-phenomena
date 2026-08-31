import styled from 'styled-components';

// Nothing here moves on its own. Every transition is caused by a hand, because
// a demo about ownership has to make the cause of a motion legible.

export const Frame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 22px;
    background: ${(p) => p.theme.color.paper};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 12px;
`;

export const Written = styled.code`
    align-self: center;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.themeText};
    opacity: 0.75;
`;

// ── The rig: two owners flanking one stage ─────────────────────────────────

export const Rig = styled.div`
    display: grid;
    grid-template-columns: 132px 44px 1fr 44px 132px;
    align-items: center;
`;

export const Owner = styled.div<{ $right?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: ${(p) => (p.$right ? 'flex-start' : 'flex-end')};
`;

export const Who = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.mutedSoft};
`;

// The tie from an owner to the stage. Live, or cut.
export const Tie = styled.div<{ $live: boolean }>`
    position: relative;
    height: 2px;
    margin: 0 -4px;
    background: ${(p) => (p.$live
        ? `linear-gradient(90deg, ${p.theme.color.theme}, ${p.theme.color.theme})`
        : `repeating-linear-gradient(90deg, ${p.theme.color.mutedFaint} 0 4px, transparent 4px 9px)`)};
    opacity: ${(p) => (p.$live ? 1 : 0.7)};
    transition: opacity 200ms;
`;

export const Stage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 244px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 10px;
`;

// ── The sample: form from one owner, charge from the other ─────────────────

const facets = (sides: number) => {
    const points: string[] = [];
    for (let at = 0; at < sides; at++) {
        const angle = (Math.PI * 2 * at) / sides - Math.PI / 2;
        points.push(`${(50 + 50 * Math.cos(angle)).toFixed(2)}% ${(50 + 50 * Math.sin(angle)).toFixed(2)}%`);
    }
    return points.join(', ');
};

export const Sample = styled.div<{ $sides: number; $charge: number; $tint: number; $turn: number }>`
    width: 156px;
    height: 156px;
    cursor: pointer;
    clip-path: polygon(${(p) => facets(p.$sides)});
    transform: rotate(${(p) => p.$turn}deg);
    background: radial-gradient(
        circle at 42% 34%,
        hsl(${(p) => p.$tint}, 96%, ${(p) => 76 - p.$charge * 0.16}%) 0%,
        hsl(${(p) => p.$tint}, 88%, ${(p) => 60 - p.$charge * 0.2}%) 62%,
        hsl(${(p) => p.$tint + 26}, 84%, ${(p) => 46 - p.$charge * 0.18}%) 100%
    );
    filter: drop-shadow(0 0 ${(p) => 2 + p.$charge * 0.24}px hsla(${(p) => p.$tint}, 100%, 56%, 0.55));
    transition: clip-path 260ms cubic-bezier(.3,.9,.3,1.2), transform 320ms cubic-bezier(.3,.9,.3,1.2),
        background 260ms, filter 260ms;
`;

export const Gone = styled.div`
    width: 156px;
    height: 156px;
    border-radius: 50%;
    border: 1px dashed ${(p) => p.theme.color.mutedFaint};
`;

// ── The catalyst's own body, so it is visibly alive when unbound ───────────

export const Rotor = styled.div<{ $angle: number; $live: boolean }>`
    width: 74px;
    height: 74px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${(p) => (p.$live ? p.theme.color.theme : p.theme.color.mutedFaint)};
    background: conic-gradient(
        from ${(p) => p.$angle}deg,
        ${(p) => (p.$live ? p.theme.color.themeSoft : 'transparent')} 0turn 0.2turn,
        transparent 0.2turn 1turn
    );
    transform: rotate(${(p) => p.$angle}deg);
    transition: transform 300ms cubic-bezier(.3,.9,.3,1.4), border-color 220ms, background 220ms;
`;

// ── Controls ────────────────────────────────────────────────────────────────

export const Keys = styled.div`
    display: flex;
    gap: 6px;
`;

export const Key = styled.button<{ $on?: boolean }>`
    padding: 5px 10px;
    border-radius: 6px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => (p.$on ? p.theme.color.themeText : p.theme.color.muted)};
    background: ${(p) => (p.$on ? p.theme.color.themeSoft : p.theme.color.paperRecessed)};
    border: 1px solid ${(p) => (p.$on ? p.theme.color.theme : p.theme.color.rule)};
    &:hover { border-color: ${(p) => p.theme.color.theme}; }
    &:disabled { opacity: 0.4; cursor: default; border-color: ${(p) => p.theme.color.rule}; }
`;

export const Reading = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    color: ${(p) => p.theme.color.mutedSoft};
    font-variant-numeric: tabular-nums;
`;
