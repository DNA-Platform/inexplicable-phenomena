import styled from 'styled-components';

// SectionCard — periodic-element-style square. Sized as a chip, not a hero.
// Inverted from v1: the TITLE is the symbol-equivalent (big, center); the
// section ID is the atomic-number-style decorative corner. Group context
// reads below the title like an element name.
//
// Card sized 168×168 — ptable's proportion at column scale. Floats top-left;
// section prose flows alongside it on wider screens.

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

// Top row — atomic-number-style decoration. Section ID top-left, mono, small.
// Roman numeral top-right as a counter-balance.
export const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0;
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

// Center — title is the SYMBOL position. Large, bold, dominant.
export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
`;

type Tier = 'XL' | 'L' | 'M' | 'S';

const tierFor = (length: number): Tier =>
    length <= 8  ? 'XL' :
    length <= 16 ? 'L'  :
    length <= 24 ? 'M'  :
    'S';

const tierSizes: Record<Tier, string> = {
    XL: '20px',
    L:  '15px',
    M:  '12px',
    S:  '11px',
};

const bumpTierDown = (t: Tier): Tier =>
    t === 'XL' ? 'L' : t === 'L' ? 'M' : 'S';

export const titleTier = (title: string, mono: boolean): Tier => {
    const baseTier = tierFor(title.length);
    return mono ? bumpTierDown(baseTier) : baseTier;
};

// Title — center symbol position. Auto-tier sizing keyed on title length.
// Renders as h1 so the section's title is the page's primary heading; the
// card carries the semantic h1 even though it visually reads as a chip.
export const Title = styled.h1<{ $mono?: boolean; $tier: Tier }>`
    margin: 0;
    font-family: ${(p) => p.$mono ? p.theme.font.mono : p.theme.font.sans};
    font-size: ${(p) => tierSizes[p.$tier]};
    font-weight: ${(p) => p.$mono ? 500 : 800};
    color: ${(p) => p.theme.color.ink};
    letter-spacing: -0.02em;
    line-height: 1.1;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
    hyphens: none;
    text-wrap: balance;
`;

// Bottom row — group context below the title. Like the element name on a
// real card; reads as the title's contextual placement. Tracking is tight
// to fit longer group names like "COMPOSITION — $CHEMICAL" without ellipsis.
export const BottomRow = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 8px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

// Heuristic: does this title look like code (mono treatment)?
export const isMonoTitle = (title: string): boolean => {
    return title.includes('$') || title.includes('(') || title.includes('<');
};

// Layout for the card alongside the rest of the section content. The card
// floats top-left; supporting prose flows to its right.
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

// Section lead — abstract paragraph that sits to the right of the card.
// Carries the prose that introduces the section. NOT a repeat of the title.
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

// Body prose — the section's main reading content below the header. Comfortable
// line-length for sans-serif body at content-max-width.
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
