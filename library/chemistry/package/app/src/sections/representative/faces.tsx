import styled from 'styled-components';

// Styling only — the data, the asks and the views live in the classes.

export const Frame = styled.div`
    display: flex; flex-direction: column; gap: 18px; padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;

export const WriteRow = styled.div`display: flex; align-items: center; gap: 14px; align-self: stretch;`;
export const WriteLabel = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; color: ${p => p.theme.color.muted};
    min-width: 74px; text-transform: uppercase; letter-spacing: 0.05em;
`;
export const WriteInput = styled.input`
    flex: 1; padding: 9px 12px; border-radius: 8px;
    font-family: ${p => p.theme.font.sans}; font-size: 13px;
    color: ${p => p.theme.color.ink};
    background: ${p => p.theme.color.paperRecessed};
    border: 1px solid ${p => p.theme.color.rule};
    &:focus { outline: none; border-color: ${p => p.theme.color.themeText}; }
`;

export const Houses = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; align-items: start;`;

export const House = styled.div<{ $lit?: boolean }>`
    display: flex; flex-direction: column; gap: 10px; padding: 14px;
    border-radius: 11px;
    background: ${p => p.theme.color.paperRaised};
    border: 2px solid ${p => (p.$lit ? p.theme.color.themeText : p.theme.color.rule)};
    box-shadow: ${p => (p.$lit ? '0 4px 14px rgba(0,0,0,0.10)' : 'none')};
    transition: border-color 130ms ease, box-shadow 130ms ease;
`;

export const HouseName = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.06em; color: ${p => p.theme.color.muted};
`;

export const HouseRegistered = styled.code`
    font-family: ${p => p.theme.font.mono}; font-size: 10.5px; line-height: 1.6;
    color: ${p => p.theme.color.inkSoft}; white-space: pre-wrap;
`;

export const SheetBox = styled.div`
    display: flex; flex-direction: column; gap: 9px; padding: 12px;
    min-height: 96px; border-radius: 8px;
    background: ${p => p.theme.color.paperRecessed};
`;

export const NoteCard = styled.div<{ $travelling?: boolean }>`
    display: flex; align-items: baseline; gap: 10px; padding: 7px 9px; border-radius: 6px;
    background: ${p => p.theme.color.paper};
    outline: ${p => (p.$travelling ? `2px dashed ${p.theme.color.themeText}` : 'none')};
    outline-offset: 2px;
`;

// ── the marks ──
export const MarkDot = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 14px; color: ${p => p.theme.color.muted};
    min-width: 22px; flex: none;
`;
export const MarkStar = styled.span`
    font-size: 13px; color: hsl(38, 82%, 48%); min-width: 22px; flex: none;
`;
export const MarkNumeral = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; font-weight: 700;
    color: ${p => p.theme.color.themeText}; min-width: 22px; flex: none;
    font-variant-numeric: tabular-nums;
`;

// ── the bodies ──
export const ProseText = styled.span`
    font-family: ${p => p.theme.font.sans}; font-size: 13px; line-height: 1.5; color: ${p => p.theme.color.ink};
`;
export const MonoText = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 12px; line-height: 1.5; color: ${p => p.theme.color.ink};
`;
export const BoxedText = styled.span`
    font-family: ${p => p.theme.font.sans}; font-size: 12.5px; line-height: 1.45;
    color: ${p => p.theme.color.ink};
    padding: 5px 8px; border-radius: 5px;
    border: 1px solid ${p => p.theme.color.rule};
    background: ${p => p.theme.color.paperRecessed};
`;

// ── the travelling note's control ──
export const TravelRow = styled.div`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`;
export const TravelLabel = styled.span`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; color: ${p => p.theme.color.muted};
    text-transform: uppercase; letter-spacing: 0.05em;
`;
export const TravelPick = styled.button<{ $active?: boolean }>`
    padding: 6px 12px; border-radius: 7px; cursor: pointer;
    font-family: ${p => p.theme.font.mono}; font-size: 11px;
    color: ${p => (p.$active ? p.theme.color.paper : p.theme.color.ink)};
    background: ${p => (p.$active ? p.theme.color.themeText : p.theme.color.paperRecessed)};
    border: 1px solid ${p => (p.$active ? p.theme.color.themeText : p.theme.color.rule)};
    &:hover { border-color: ${p => p.theme.color.themeText}; }
`;

export const Sameness = styled.div`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; line-height: 1.7;
    color: ${p => p.theme.color.muted};
    padding: 10px 12px; border-radius: 8px;
    background: ${p => p.theme.color.paperRecessed};
    b { color: ${p => p.theme.color.ink}; font-weight: 600; }
`;
