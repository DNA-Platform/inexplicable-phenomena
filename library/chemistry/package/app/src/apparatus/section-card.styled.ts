import styled from 'styled-components';

// SectionCard — periodic-element-style square. The center is now a glyph
// (like an element symbol: H, He, $, T) rather than the section title.
// The full title sits below the symbol like an element's name.

export const SectionCard = styled.div`
    width: 132px;
    height: 132px;
    flex-shrink: 0;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1.5px solid ${(p) => p.theme.color.theme};
    border-radius: 5px;
    padding: 8px 10px 7px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    box-shadow:
        0 0 0 3px ${(p) => p.theme.color.themeFaint},
        0 1px 0 ${(p) => p.theme.color.theme};
    transition: box-shadow 150ms;

    &:hover {
        box-shadow:
            0 0 0 3px ${(p) => p.theme.color.themeSoft},
            0 1px 0 ${(p) => p.theme.color.themeDark};
    }
`;

// Top row — section ID top-left, Roman group top-right.
export const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    line-height: 1;
    font-variant-numeric: tabular-nums;
`;

export const AtomicNumber = styled.span`
    color: ${(p) => p.theme.color.themeText};
`;

export const RomanCorner = styled.span`
    color: ${(p) => p.theme.color.mutedSoft};
    font-weight: 600;
`;

// Center — the glyph position. Single bold character, dominant.
export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

// Symbol — periodic-table-style glyph: 1–3 chars, big, centered.
// Auto-shrinks slightly for two-char glyphs (e.g. He, Au, Pa) so they
// still feel like a unit and don't crowd the card.
export const Symbol = styled.span<{ $len: number }>`
    font-family: ${(p) => p.theme.font.sans};
    font-weight: 800;
    font-size: ${(p) =>
        p.$len === 1 ? '52px' :
        p.$len === 2 ? '40px' :
        '28px'};
    color: ${(p) => p.theme.color.ink};
    line-height: 1;
    letter-spacing: -0.03em;
`;

// Bottom row — section title under the symbol, like the element's name.
export const BottomRow = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 8px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

// Layout for the card alongside the rest of the section content.
export const SectionHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 32px;
    flex-wrap: wrap;
`;

export const SectionHeaderAside = styled.div`
    flex: 1;
    min-width: 240px;
    padding-top: 6px;
    color: ${(p) => p.theme.color.muted};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.body};
    line-height: 1.6;
`;

export const SectionLead = styled.p`
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.lead};
    line-height: 1.55;
    color: ${(p) => p.theme.color.inkSoft};
    letter-spacing: -0.005em;
    margin-bottom: 14px;
    font-weight: 400;
`;

export const SectionLeadEm = styled.span`
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
`;

export const SectionBody = styled.div`
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.body};
    line-height: 1.7;
    color: ${(p) => p.theme.color.inkSoft};

    p {
        margin-bottom: 16px;
    }

    p:last-child {
        margin-bottom: 0;
    }
`;
