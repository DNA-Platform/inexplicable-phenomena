import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ArticleFrame = styled.article`
    max-width: ${(p) => p.theme.size.contentMaxWidth};
    margin: 0 auto;
    padding: 40px 40px 64px;
    font-size: ${(p) => p.theme.size.bodyText};
    color: ${(p) => p.theme.color.ink};
`;

export const Breadcrumb = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.micro};
    color: ${(p) => p.theme.color.mutedSoft};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 24px;
    font-weight: 600;
`;

export const BreadcrumbRoman = styled.span`
    color: ${(p) => p.theme.color.themeText};
    font-weight: 700;
`;

export const BreadcrumbDot = styled.span`
    margin: 0 10px;
    color: ${(p) => p.theme.color.mutedFaint};
`;

export const BreadcrumbId = styled.span`
    color: ${(p) => p.theme.color.muted};
`;

export const CasesHeader = styled.h2`
    margin-top: 40px;
    margin-bottom: 16px;
    font-size: ${(p) => p.theme.type.micro};
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-family: ${(p) => p.theme.font.sans};
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const CasesRule = styled.span`
    flex: 1;
    height: 1px;
    background: ${(p) => p.theme.color.rule};
`;

export const CasesCount = styled.span`
    color: ${(p) => p.theme.color.muted};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
`;

export const NoCases = styled.p`
    color: ${(p) => p.theme.color.mutedSoft};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    margin-top: 8px;
    font-style: italic;
`;

export const CasesList = styled.div`
    margin-top: 8px;
`;

export const PrevNextRow = styled.div`
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    display: flex;
    justify-content: space-between;
    gap: 12px;
`;

export const PrevNextSpacer = styled.div`
    flex: 1;
`;

export const NavLink = styled(Link)<{ $align: 'left' | 'right' }>`
    flex: 1;
    font-family: ${(p) => p.theme.font.sans};
    padding: 14px 16px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    background: ${(p) => p.theme.color.paperRaised};
    color: ${(p) => p.theme.color.ink};
    text-align: ${(p) => p.$align};
    text-decoration: none;
    transition: border-color 100ms, background 100ms;

    &:hover {
        border-color: ${(p) => p.theme.color.theme};
        background: ${(p) => p.theme.color.themeFaint};
        text-decoration: none;
    }
`;

export const NavDirection = styled.span`
    display: block;
    font-size: ${(p) => p.theme.type.micro};
    color: ${(p) => p.theme.color.mutedSoft};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    font-family: ${(p) => p.theme.font.sans};
`;

export const NavTitle = styled.span`
    display: block;
    margin-top: 6px;
    color: ${(p) => p.theme.color.ink};
    font-size: ${(p) => p.theme.type.body};
    font-weight: 600;
`;

export const NavId = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    color: ${(p) => p.theme.color.themeText};
    font-weight: 700;
    margin-right: 8px;
    font-variant-numeric: tabular-nums;
`;
