import styled from 'styled-components';

// Styling only. Everything with an idea in it — the data, the geometry, the
// six drawings — lives in the classes (see figures.tsx).

export const Frame = styled.div`
    display: flex; flex-direction: column; gap: 16px; padding: 22px;
    background: ${p => p.theme.color.paper};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 12px;
`;

export const Dials = styled.div`display: flex; align-items: center; gap: 18px; flex-wrap: wrap;`;

export const Dial = styled.label`
    display: flex; align-items: center; gap: 10px;
    font-family: ${p => p.theme.font.mono}; font-size: 11px; color: ${p => p.theme.color.muted};
    letter-spacing: 0.04em; text-transform: uppercase;
`;

export const Slide = styled.input`width: 148px; accent-color: ${p => p.theme.color.themeText}; cursor: pointer;`;

export const Switch = styled.button<{ $on: boolean }>`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; padding: 4px 10px;
    border-radius: 999px; cursor: pointer;
    border: 1px solid ${p => (p.$on ? p.theme.color.themeText : p.theme.color.rule)};
    background: ${p => (p.$on ? p.theme.color.themeText : 'transparent')};
    color: ${p => (p.$on ? p.theme.color.paper : p.theme.color.muted)};
`;

export const Body = styled.div`
    display: flex; gap: 16px; align-items: flex-start;
    @media (max-width: 760px) { flex-direction: column; }
`;

export const PreviewRow = styled.div`
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
    width: 254px; flex: none;
    @media (max-width: 760px) { width: 100%; grid-template-columns: repeat(3, 1fr); }
`;

export const PreviewTile = styled.button<{ $active?: boolean }>`
    display: flex; flex-direction: column; align-items: stretch; gap: 6px; width: 100%; padding: 8px;
    border-radius: 11px; background: ${p => p.theme.color.paper};
    border: 2px solid ${p => (p.$active ? p.theme.color.themeText : p.theme.color.rule)};
    box-shadow: ${p => (p.$active ? '0 4px 14px rgba(0,0,0,0.10)' : 'none')};
    cursor: pointer; transition: border-color 130ms ease, box-shadow 130ms ease, transform 130ms ease;
    &:hover { transform: translateY(-2px); border-color: ${p => p.theme.color.themeText}; }
`;

export const PreviewScale = styled.div`
    height: 68px; border-radius: 7px; background: ${p => p.theme.color.paperRecessed};
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    > * { flex: none; width: 160px; }
`;

export const PreviewName = styled.code`
    font-family: ${p => p.theme.font.mono}; font-size: 9.5px; text-align: center; white-space: nowrap;
    color: ${p => p.theme.color.muted};
`;

export const Stage = styled.div`
    display: flex; align-items: center; justify-content: center;
    padding: 0; box-sizing: border-box; overflow: hidden; flex: none;
    height: 296px; aspect-ratio: 160 / 110;
    @media (max-width: 760px) { width: 100%; height: auto; }
    background: ${p => p.theme.color.paperRaised};
    border: 1px solid ${p => p.theme.color.rule};
    border-radius: 10px;
    > * { width: 100%; height: 100%; display: block; }
`;

export const Said = styled.code`
    font-family: ${p => p.theme.font.mono}; font-size: 12.5px;
    padding: 8px 12px; border-radius: 6px; align-self: flex-start;
    background: ${p => p.theme.color.paperRecessed}; color: ${p => p.theme.color.themeText};
`;
