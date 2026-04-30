import React from 'react';
import { sectionModules } from '../sections';
import { catalogue } from '../data/catalogue';
import {
    HeaderBar, BrandMark, SubBrand, Spacer,
    SearchButton, SearchLabel, SearchKey,
    CaseCounter, CaseCount,
} from './header.styled';

const totalPlanned = catalogue.reduce((sum, g) => sum + g.sections.reduce((s, sec) => s + sec.planned.length, 0), 0);
const totalLive = Object.values(sectionModules).reduce((sum, m) => sum + m.cases, 0);

export function Header() {
    return (
        <HeaderBar>
            <BrandMark>$Chemistry</BrandMark>
            <SubBrand>The Lab</SubBrand>
            <Spacer />
            <SearchButton title="Search (⌘K) — coming sprint 35">
                <SearchLabel>Search…</SearchLabel>
                <SearchKey>⌘K</SearchKey>
            </SearchButton>
            <CaseCounter>
                <CaseCount $accent>{totalLive}</CaseCount>
                {' live · '}
                <CaseCount>{totalPlanned}</CaseCount>
                {' planned'}
            </CaseCounter>
        </HeaderBar>
    );
}
