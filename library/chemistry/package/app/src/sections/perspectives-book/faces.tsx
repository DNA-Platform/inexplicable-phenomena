import styled from 'styled-components';

// Styling only. Kept out of the class for brevity (Doug's allowance) — otherwise
// these would be overridable properties on the chemical. The data and the views
// live in the class (see case-1.tsx).

// ── Chrome ──
export const Frame = styled.div`
    display: flex; flex-direction: column; gap: 16px; padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;
export const PreviewRow = styled.div`display: flex; gap: 14px; flex-wrap: wrap; align-self: flex-start;`;
export const PreviewTile = styled.button<{ $active?: boolean }>`
    display: flex; flex-direction: column; align-items: stretch; gap: 9px; width: 130px; padding: 11px;
    border-radius: 12px; background: ${p => p.theme.color.paper};
    border: 2px solid ${p => (p.$active ? p.theme.color.themeText : p.theme.color.rule)};
    box-shadow: ${p => (p.$active ? '0 5px 16px rgba(0,0,0,0.10)' : 'none')};
    cursor: pointer; transition: border-color 130ms ease, box-shadow 130ms ease, transform 130ms ease;
    &:hover { transform: translateY(-2px); border-color: ${p => p.theme.color.themeText}; }
`;
export const PreviewScale = styled.div`
    height: 100px; border-radius: 8px; background: ${p => p.theme.color.paperRecessed};
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    > * { flex: none; transform: scale(0.26); transform-origin: center; } /* flex:none keeps the face's true aspect before scaling */
`;
export const PreviewName = styled.span`
    font-family: ${p => p.theme.font.sans}; font-size: 11px; font-weight: 600; text-align: center;
    text-transform: capitalize; color: ${p => p.theme.color.muted};
`;
export const Stage = styled.div`
    display: flex; align-items: center; justify-content: center;
    height: 360px; padding: 28px; box-sizing: border-box; overflow: hidden;
    background: ${p => p.theme.color.paperRaised};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 10px;
`;

// ── Lens: Cover ──
export const CoverCard = styled.div<{ $tint: string }>`
    width: 224px; height: 292px;
    border-radius: 4px 9px 9px 4px;
    background: ${p => p.$tint};
    border-left: 7px solid rgba(0,0,0,0.28);
    box-shadow: 0 10px 28px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.06);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 26px 22px; color: #fff;
`;
export const CoverTitle = styled.div`
    font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; line-height: 1.12;
    text-shadow: 0 1px 2px rgba(0,0,0,0.25);
`;
export const CoverAuthor = styled.div`margin-top: 10px; font-family: Georgia, serif; font-size: 14px; font-style: italic; opacity: 0.86;`;

// ── Lens: Synopsis ──
export const SynopsisText = styled.p`
    max-width: 380px; margin: 0;
    font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.64;
    color: ${p => p.theme.color.ink};
`;

// ── Lens: Reading order ──
export const ReadingList = styled.ol`list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; width: 320px;`;
export const ReadingRow = styled.li`
    display: grid; grid-template-columns: 28px 1fr; align-items: baseline; gap: 14px;
    font-family: ${p => p.theme.font.sans}; font-size: 15px; color: ${p => p.theme.color.ink};
`;
export const ReadingNum = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 12px; text-align: right;
    color: ${p => p.theme.color.themeText}; font-variant-numeric: tabular-nums;
`;

// ── Lens: Links ──
export const LinksWrap = styled.div`position: relative; width: 300px; height: 224px;`;
export const LinkEdges = styled.svg`position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible;`;
export const LinkNode = styled.div<{ $x: number; $y: number }>`
    position: absolute; left: ${p => p.$x}%; top: ${p => p.$y}%;
    transform: translate(-50%, -50%);
    padding: 7px 13px; border-radius: 999px;
    background: ${p => p.theme.color.paperRaised};
    border: 1.5px solid ${p => p.theme.color.themeText};
    font-family: ${p => p.theme.font.sans}; font-size: 13px; font-weight: 600;
    color: ${p => p.theme.color.ink}; white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.10);
`;
