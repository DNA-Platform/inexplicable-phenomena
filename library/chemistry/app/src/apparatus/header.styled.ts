import styled from 'styled-components';

export const HeaderBar = styled.header`
    height: ${(p) => p.theme.size.headerHeight};
    background: ${(p) => p.theme.color.paperRaised};
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 12px;
    flex-shrink: 0;
`;

export const BrandMark = styled.code`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 17px;
    font-weight: 500;
    color: ${(p) => p.theme.color.brandBright};
    background: transparent;
    padding: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0;
`;

export const SubBrand = styled.span`
    font-family: ${(p) => p.theme.font.sans};
    color: ${(p) => p.theme.color.muted};
    margin-left: 14px;
    padding-left: 14px;
    border-left: 1px solid ${(p) => p.theme.color.rule};
    font-weight: 600;
    font-size: ${(p) => p.theme.type.micro};
    letter-spacing: 0.18em;
    text-transform: uppercase;
`;

export const Spacer = styled.div`
    flex: 1;
`;

export const SearchButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px 6px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    color: ${(p) => p.theme.color.muted};
    font-size: ${(p) => p.theme.type.caption};
    font-family: ${(p) => p.theme.font.sans};
    background: ${(p) => p.theme.color.paperRaised};
    transition: border-color 100ms;

    &:hover {
        border-color: ${(p) => p.theme.color.ruleStrong};
    }
`;

export const SearchLabel = styled.span`
    font-size: 11px;
`;

export const SearchKey = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 600;
    color: ${(p) => p.theme.color.mutedSoft};
    background: ${(p) => p.theme.color.paperRecessed};
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid ${(p) => p.theme.color.rule};
`;

export const CaseCounter = styled.div`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.micro};
    color: ${(p) => p.theme.color.muted};
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    margin-left: 14px;
    padding-left: 14px;
    border-left: 1px solid ${(p) => p.theme.color.rule};
`;

export const CaseCount = styled.span<{ $accent?: boolean }>`
    color: ${(p) => (p.$accent ? p.theme.color.brand : 'inherit')};
    font-weight: ${(p) => (p.$accent ? 800 : 600)};
`;
