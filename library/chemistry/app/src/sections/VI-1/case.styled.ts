import styled from 'styled-components';

export const DerivativesRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

export const DerivativeCard = styled.div`
    flex: 1;
    min-width: 160px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const MountLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.08em;
`;

export const HostActionRow = styled.div`
    margin-top: 10px;
`;

/* ── Emoji reactions (case-1) ── */

export const ReactionCard = styled.div`
    flex: 1;
    min-width: 100px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: border-color 150ms, background 150ms;

    &:hover {
        border-color: ${(p) => p.theme.color.theme};
        background: ${(p) => p.theme.color.themeFaint};
    }
`;

export const ReactionEmoji = styled.span<{ $pop?: boolean }>`
    font-size: 32px;
    line-height: 1;
    display: inline-block;
    transform: ${(p) => (p.$pop ? 'scale(1.4)' : 'scale(1)')};
    transition: transform 150ms ease-out;
`;

export const ReactionCount = styled.span<{ $active: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 20px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${(p) => (p.$active ? p.theme.color.ink : p.theme.color.muted)};
`;

/* ── Theme switcher (case-2) ── */

export const ThemeSwitcherFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const ThemeToggleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ThemeToggleBtn = styled.button<{ $on: boolean }>`
    padding: 8px 18px;
    border: 1px solid ${(p) => (p.$on ? p.theme.color.ink : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$on ? p.theme.color.ink : p.theme.color.paperRaised)};
    color: ${(p) => (p.$on ? p.theme.color.paperRaised : p.theme.color.ink)};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 700;
    cursor: pointer;
    transition: background 150ms, color 150ms, border-color 150ms;
`;

export const PreviewCardFrame = styled.div<{ $dark: boolean }>`
    flex: 1;
    min-width: 180px;
    padding: 16px 18px;
    background: ${(p) => (p.$dark ? '#1e1e2e' : p.theme.color.paperRaised)};
    border: 1px solid ${(p) => (p.$dark ? '#313244' : p.theme.color.rule)};
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: background 200ms, border-color 200ms;
`;

export const PreviewText = styled.div<{ $dark: boolean; $size: number }>`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.$size}px;
    line-height: 1.5;
    color: ${(p) => (p.$dark ? '#cdd6f4' : p.theme.color.ink)};
    transition: color 200ms;
`;

export const FontSliderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const FontSliderLabel = styled.span<{ $dark: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => (p.$dark ? '#a6adc8' : p.theme.color.muted)};
    min-width: 72px;
    transition: color 200ms;
`;
