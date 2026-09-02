import styled from 'styled-components';

// ── The desk ──
export const Desk = styled.div`
    display: flex; align-items: stretch; justify-content: center; gap: 18px; flex-wrap: wrap;
    padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;
export const Hint = styled.div`
    text-align: center; padding-top: 10px;
    font-family: ${p => p.theme.font.mono}; font-size: 12px;
    letter-spacing: 0.06em; color: ${p => p.theme.color.muted};
`;

// ── Face: the open book ──
export const BookFace = styled.div`
    display: flex; flex-direction: column; gap: 12px; align-items: center;
`;
export const Spread = styled.div`
    position: relative; display: flex; width: 340px; height: 224px;
    border-radius: 6px; overflow: hidden;
    background: ${p => p.theme.color.paperRaised};
    border: 1px solid ${p => p.theme.color.rule};
    box-shadow: 0 10px 28px rgba(0,0,0,0.14);
`;
export const PageHalf = styled.div<{ $right?: boolean }>`
    flex: 1; padding: 18px 20px; box-sizing: border-box;
    border-left: ${p => (p.$right ? `1px solid ${p.theme.color.rule}` : 'none')};
    background: ${p => (p.$right ? 'rgba(0,0,0,0.02)' : 'none')};
    display: flex; flex-direction: column; gap: 10px;
`;
export const ChapterTitle = styled.div`
    font-family: Georgia, 'Times New Roman', serif; font-size: 17px; font-weight: 700;
    color: ${p => p.theme.color.ink};
`;
export const TextLine = styled.div<{ $w: number }>`
    height: 7px; width: ${p => p.$w}%; border-radius: 4px;
    background: ${p => p.theme.color.ink}; opacity: 0.14;
`;
export const PageNumber = styled.div`
    margin-top: auto; font-family: ${p => p.theme.font.mono}; font-size: 11px;
    color: ${p => p.theme.color.muted}; font-variant-numeric: tabular-nums;
`;
export const Ribbon = styled.div<{ $here: boolean }>`
    position: absolute; top: -2px; right: 34px; width: 16px; height: ${p => (p.$here ? 78 : 26)}px;
    background: hsl(354 62% 48%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 8px), 0 100%);
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
`;
export const Tallies = styled.div`
    position: absolute; left: 12px; bottom: 14px; display: flex; gap: 3px;
`;
export const Tally = styled.div`
    width: 2.5px; height: 13px; border-radius: 2px;
    background: hsl(210 55% 45%); opacity: 0.75; transform: rotate(7deg);
`;

// ── Controls ──
export const Controls = styled.div`display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;`;
export const Btn = styled.button`
    padding: 8px 14px; border-radius: 10px;
    background: ${p => p.theme.color.paper};
    border: 2px solid ${p => p.theme.color.rule};
    font-family: ${p => p.theme.font.sans}; font-size: 12px; font-weight: 600;
    color: ${p => p.theme.color.ink};
    cursor: pointer; transition: border-color 130ms ease, transform 130ms ease, box-shadow 130ms ease;
    &:hover { transform: translateY(-2px); border-color: ${p => p.theme.color.themeText}; box-shadow: 0 5px 16px rgba(0,0,0,0.10); }
    &:active { transform: translateY(0); }
`;
export const QuietBtn = styled(Btn)`
    border-style: dashed; font-weight: 500; color: ${p => p.theme.color.muted};
    &:hover { border-color: hsl(354 62% 48%); color: hsl(354 62% 48%); box-shadow: none; }
`;

// ── Face: the library card ──
export const Card = styled.div`
    align-self: center; width: 218px; padding: 16px 18px 14px; box-sizing: border-box;
    border-radius: 6px;
    background: ${p => p.theme.color.paperRecessed};
    border: 1px solid ${p => p.theme.color.rule};
    background-image: linear-gradient(hsl(354 60% 55% / 0.55) 1px, transparent 1px),
        repeating-linear-gradient(transparent, transparent 27px, ${p => p.theme.color.rule} 27px, ${p => p.theme.color.rule} 28px);
    background-size: 100% 100%, 100% 28px;
    background-position: 0 34px, 0 40px;
`;
export const CardHead = styled.div`
    font-family: ${p => p.theme.font.sans}; font-size: 13px; font-weight: 700;
    color: ${p => p.theme.color.ink}; padding-bottom: 14px;
`;
export const CardRow = styled.div`
    display: flex; justify-content: space-between; align-items: baseline; height: 28px;
    font-family: ${p => p.theme.font.sans}; font-size: 12px; color: ${p => p.theme.color.ink};
`;
export const CardValue = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 12px; font-variant-numeric: tabular-nums;
    color: ${p => p.theme.color.themeText};
`;

// ── Face: the spine ──
export const Spine = styled.div`
    align-self: center; position: relative; width: 44px; height: 224px; overflow: hidden;
    border-radius: 4px 8px 8px 4px;
    background: hsl(202 44% 36%);
    border-left: 5px solid rgba(0,0,0,0.28);
    box-shadow: 0 10px 28px rgba(0,0,0,0.2);
`;
export const SpineFill = styled.div<{ $at: number }>`
    position: absolute; left: 0; right: 0; bottom: 0; height: ${p => p.$at}%;
    background: rgba(255, 255, 255, 0.16);
    transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
`;
export const SpineTitle = styled.div`
    position: absolute; top: 14px; left: 50%;
    transform: translateX(-50%);
    writing-mode: vertical-rl;
    font-family: Georgia, serif; font-size: 13px; font-weight: 700; color: #fff;
    letter-spacing: 0.04em; text-shadow: 0 1px 2px rgba(0,0,0,0.25);
`;
