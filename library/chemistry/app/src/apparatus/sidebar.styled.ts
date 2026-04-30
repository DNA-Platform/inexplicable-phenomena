import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarNav = styled.nav`
    width: ${(p) => p.theme.size.sidebarWidth};
    background: ${(p) => p.theme.color.paperRecessed};
    border-right: 1px solid ${(p) => p.theme.color.rule};
    overflow-y: auto;
    flex-shrink: 0;
    padding-top: 4px;
    padding-bottom: 24px;
`;

export const GroupHeader = styled.header`
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 14px 14px 6px 14px;
`;

export const GroupRoman = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10.5px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    line-height: 1.4;
    font-variant-numeric: tabular-nums;
`;

export const GroupTitle = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.muted};
`;

export const SectionList = styled.ul`
    list-style: none;
`;

export const SectionItem = styled.li``;

export const SectionLink = styled(Link)<{ $active: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    height: 24px;
    font-family: ${(p) => p.theme.font.sans};
    border-left: 2px solid ${(p) => (p.$active ? p.theme.color.theme : 'transparent')};
    color: inherit;
    text-decoration: none;
    transition: background 100ms;
    ${(p) =>
        p.$active
            ? css`
                  background: ${p.theme.color.themeSoft};
              `
            : css`
                  background: transparent;
                  &:hover {
                      background: ${p.theme.color.paperRaised};
                  }
              `}
`;

export const SectionId = styled.span<{ $active: boolean }>`
    display: inline-block;
    font-family: ${(p) => p.theme.font.mono};
    font-weight: ${(p) => (p.$active ? 600 : 500)};
    font-size: 11px;
    color: ${(p) => (p.$active ? p.theme.color.themeText : p.theme.color.mutedSoft)};
    width: 60px;
    padding-left: 14px;
    padding-right: 6px;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
`;

export const SectionTitle = styled.span<{ $active: boolean }>`
    font-family: ${(p) => p.theme.font.sans};
    font-weight: ${(p) => (p.$active ? 600 : 400)};
    font-size: 13px;
    color: ${(p) => (p.$active ? p.theme.color.ink : p.theme.color.inkSoft)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 12px;
    letter-spacing: -0.005em;
`;
