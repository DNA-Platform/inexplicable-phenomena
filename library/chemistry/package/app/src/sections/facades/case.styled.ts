import styled from 'styled-components';

export const Frame = styled.div`
    display: flex;
    gap: 22px;
    align-items: flex-start;
    flex-wrap: wrap;
`;

export const Trees = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 186px;
`;

export const Tree = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const Node = styled.button<{ $depth: number; $on: boolean; $hue: number }>`
    display: flex;
    align-items: center;
    gap: 7px;
    text-align: left;
    cursor: pointer;
    border: none;
    background: ${(p) => (p.$on ? `hsl(${p.$hue} 70% 94%)` : 'transparent')};
    border-left: 3px solid ${(p) => (p.$on ? `hsl(${p.$hue} 68% 52%)` : 'transparent')};
    padding: 5px 9px 5px ${(p) => 9 + p.$depth * 15}px;
    border-radius: 0 7px 7px 0;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11.5px;
    font-weight: ${(p) => (p.$on ? 800 : 500)};
    color: ${(p) => (p.$on ? `hsl(${p.$hue} 62% 30%)` : p.theme.color.muted)};
    transition: background 110ms ease, color 110ms ease;

    &:hover { color: ${(p) => `hsl(${p.$hue} 62% 34%)`}; }
`;

export const Wears = styled.span`
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${(p) => p.theme.color.themeSoft};
    color: ${(p) => p.theme.color.themeText};
`;

export const Right = styled.div`
    flex: 1 1 520px;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const Looks = styled.div`
    display: inline-flex;
    padding: 3px;
    border-radius: 10px;
    background: ${(p) => p.theme.color.paperSunken};
    border: 1px solid ${(p) => p.theme.color.rule};
    align-self: flex-start;
`;

export const Look = styled.button<{ $on: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 7px 17px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: ${(p) => (p.$on ? p.theme.color.paperRaised : 'transparent')};
    color: ${(p) => (p.$on ? p.theme.color.themeText : p.theme.color.mutedSoft)};
    box-shadow: ${(p) => (p.$on ? '0 1px 2px rgba(16,18,29,0.10), 0 0 0 1px rgba(16,18,29,0.05)' : 'none')};
`;

export const Stage = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    min-height: 250px;
    padding: 24px;
    border-radius: 18px;
    background:
        radial-gradient(900px 220px at 50% -30%, rgba(0, 194, 230, 0.10), transparent 70%),
        ${(p) => p.theme.color.paperSunken};
    border: 1px solid ${(p) => p.theme.color.rule};
`;

const face = `
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    overflow: hidden;
`;

export const Card = styled.div<{ $hue: number }>`
    ${face}
    width: 196px;
    padding: 18px 18px 14px;
    gap: 12px;
    color: ${(p) => `hsl(${p.$hue} 64% 26%)`};
    background: ${(p) => `linear-gradient(160deg, hsl(${p.$hue} 88% 97%) 0%, hsl(${p.$hue} 70% 90%) 100%)`};
    border: 1px solid ${(p) => `hsl(${p.$hue} 48% 78%)`};
    box-shadow: ${(p) => `0 20px 38px -26px hsl(${p.$hue} 70% 34% / 0.9)`};
`;

export const Tile = styled.div<{ $hue: number }>`
    ${face}
    width: 116px;
    height: 116px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: #fff;
    background: ${(p) => `linear-gradient(150deg, hsl(${p.$hue} 76% 58%) 0%, hsl(${p.$hue} 68% 40%) 100%)`};
    box-shadow: ${(p) => `0 18px 32px -22px hsl(${p.$hue} 70% 34%)`};
`;

// A BUTTON IS THE SAME SQUARE AS THE TILE — 116 by 116, the same corner, the same
// footprint — because it stands beside it in a row of choices and a row of
// choices is a row of one shape. What makes it a BUTTON is not its outline but
// its affordance: it is raised, it presses down, and it says what it opens.
export const Button = styled.button<{ $hue: number }>`
    ${face}
    width: 116px;
    height: 116px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    color: ${(p) => `hsl(${p.$hue} 62% 28%)`};
    background: ${(p) => `linear-gradient(160deg, hsl(${p.$hue} 78% 97%) 0%, hsl(${p.$hue} 62% 90%) 100%)`};
    border: 1px solid ${(p) => `hsl(${p.$hue} 50% 76%)`};
    box-shadow: ${(p) => `0 4px 0 0 hsl(${p.$hue} 48% 78%), 0 18px 30px -22px hsl(${p.$hue} 70% 34%)`};
    transition: transform 110ms, box-shadow 110ms, background 110ms;

    &:hover { background: ${(p) => `linear-gradient(160deg, hsl(${p.$hue} 82% 98%) 0%, hsl(${p.$hue} 68% 92%) 100%)`}; }
    &:active {
        transform: translateY(4px);
        box-shadow: ${(p) => `0 0 0 0 hsl(${p.$hue} 48% 78%), 0 8px 18px -16px hsl(${p.$hue} 70% 34%)`};
    }
`;

export const Pressed = styled.span<{ $hue: number }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: ${(p) => `hsl(${p.$hue} 68% 40%)`};
`;

export const Pressing = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
`;

export const Hint = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.45;
`;

// FULL SCREEN, the way tapping an image opens it. The backdrop closes it, and
// the card inside is the SAME drawing — nothing is redrawn for the occasion.
export const Blowup = styled.div`
    position: fixed;
    inset: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    background: rgba(12, 20, 26, 0.62);
    backdrop-filter: blur(3px);
    animation: fade 160ms ease-out;

    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
`;

export const Blown = styled.div`
    transform: scale(1.7);
    transform-origin: center;
    animation: rise 180ms cubic-bezier(.2,.9,.2,1.1);

    @keyframes rise { from { transform: scale(1.2); opacity: 0.4; } to { transform: scale(1.7); opacity: 1; } }
`;

export const Glyph = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 42px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
`;

export const Small = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 22px;
    font-weight: 800;
    line-height: 1;
`;

export const Title = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

export const Kind = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.6;
`;

export const Figures = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3px 12px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
`;

export const Key = styled.div`
    opacity: 0.62;
`;

export const Value = styled.div`
    font-weight: 700;
`;

export const Track = styled.div<{ $hue: number }>`
    height: 8px;
    width: 100%;
    flex: none;
    border-radius: 999px;
    background: ${(p) => `hsl(${p.$hue} 40% 88%)`};
    overflow: hidden;
`;

export const Fill = styled.div<{ $hue: number; $pct: number }>`
    height: 100%;
    width: ${(p) => p.$pct}%;
    border-radius: 999px;
    background: ${(p) => `linear-gradient(90deg, hsl(${p.$hue} 76% 62%), hsl(${p.$hue} 70% 44%))`};
`;

export const Empty = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.mutedSoft};
    align-self: center;
    margin: auto;
`;

export const Written = styled.code`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.themeText};
    background: ${(p) => p.theme.color.themeFaint};
    border: 1px solid ${(p) => p.theme.color.themeSoft};
    border-radius: 6px;
    padding: 5px 10px;
    align-self: flex-start;
`;

export const Cell = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

export const PreviewRow = styled.div`
    display: flex;
    gap: 10px;
`;

// A DIV, NOT A BUTTON — one of the faces it previews IS a button, and a button
// inside a button is neither valid nor clickable the way either of them means.
export const PreviewTile = styled.div<{ $on: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    width: 128px;
    padding: 12px 10px 9px;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid ${(p) => (p.$on ? p.theme.color.theme : p.theme.color.rule)};
    background: ${(p) => (p.$on ? p.theme.color.themeFaint : p.theme.color.paperRaised)};
    box-shadow: ${(p) => (p.$on ? '0 3px 14px -6px rgba(0,161,194,0.55)' : 'none')};
`;

// ONE BOX, AND NOW IT FITS. All three faces are compact — a card, a tile and a
// button — so the preview is uniform again, which is what a row of choices should
// look like. It was the BAR that never belonged in one, not the box.
export const PreviewScale = styled.div<{ $scale: number }>`
    width: 104px;
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    // A PREVIEW IS LOOKED AT, NOT USED. Whatever it holds is inert, so a click
    // always means "choose this look" and never what the face itself would mean.
    > * {
        transform: scale(${(p) => p.$scale});
        transform-origin: center;
        flex: none;
        pointer-events: none;
    }
`;

export const PreviewName = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.muted};
`;
