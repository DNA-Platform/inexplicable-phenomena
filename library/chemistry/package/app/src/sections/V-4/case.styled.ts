import styled from 'styled-components';

export const CollectionFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const CollectionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const CollectionLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 600;
    min-width: 88px;
`;

export const CollectionDisplay = styled.div`
    flex: 1;
    padding: 8px 12px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 3px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    min-height: 36px;
    word-break: break-all;
`;

export const Pill = styled.span`
    display: inline-block;
    padding: 2px 8px;
    margin: 2px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
`;

export const Action = styled.button`
    padding: 6px 12px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const EmptyLabel = styled.span`
    opacity: 0.5;
`;

export const SizeBadge = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
`;

/* ── Tag input (case-1) ── */

export const TagInputFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const TagFieldRow = styled.div`
    display: flex;
    gap: 8px;
`;

export const TagField = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const TagAddButton = styled.button`
    padding: 8px 16px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 32px;
`;

export const TagPill = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    border-radius: 12px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: 12px;
    font-weight: 600;
`;

export const TagRemove = styled.button`
    border: none;
    background: none;
    color: ${(p) => p.theme.color.themeText};
    font-size: 14px;
    cursor: pointer;
    padding: 0 2px;
    opacity: 0.6;
    line-height: 1;

    &:hover {
        opacity: 1;
    }
`;

export const TagCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
    align-self: flex-end;
`;

/* ── Settings editor (case-2) ── */

export const SettingsPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const SettingsInputRow = styled.div`
    display: flex;
    gap: 8px;
`;

export const SettingsField = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paperRecessed};

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const SettingsSetBtn = styled.button`
    padding: 8px 16px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${(p) => p.theme.color.themeSoft};
    }
`;

export const SettingsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 4px;
`;

export const SettingsKey = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    min-width: 80px;
`;

export const SettingsValue = styled.span`
    flex: 1;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.ink};
`;

export const SettingsDeleteBtn = styled.button`
    border: none;
    background: none;
    color: ${(p) => p.theme.color.fail};
    font-size: 16px;
    cursor: pointer;
    padding: 0 4px;
    opacity: 0.6;
    line-height: 1;

    &:hover {
        opacity: 1;
    }
`;

/* ── Feature flags (case-3) ── */

export const FlagsPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

export const FlagRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
`;

export const FlagName = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;
    color: ${(p) => p.theme.color.ink};
`;

export const FlagSwitch = styled.button`
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
`;

export const FlagTrack = styled.div<{ $on: boolean }>`
    width: 40px;
    height: 22px;
    border-radius: 11px;
    background: ${(p) => (p.$on ? p.theme.color.ok : p.theme.color.mutedFaint)};
    position: relative;
    transition: background 150ms;
`;

export const FlagThumb = styled.div<{ $on: boolean }>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${(p) => p.theme.color.paperRaised};
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? '20px' : '2px')};
    transition: left 150ms;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

/* ── Feature flags preview (case-3) ── */

export const FlagPreview = styled.div<{ $dark: boolean }>`
    margin-top: 4px;
    padding: 14px 18px;
    border-radius: 6px;
    border: 1px solid ${(p) => (p.$dark ? '#313244' : p.theme.color.rule)};
    background: ${(p) => (p.$dark ? '#1e1e2e' : p.theme.color.paperRecessed)};
    color: ${(p) => (p.$dark ? '#cdd6f4' : p.theme.color.ink)};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    transition: background 200ms, border-color 200ms, color 200ms;
`;

export const FlagBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 12px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
`;

export const FlagPreviewLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: inherit;
    opacity: 0.6;
`;
