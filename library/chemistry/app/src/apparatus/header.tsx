import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import { sectionModules } from '../sections';
import { catalogue } from '../data/catalogue';
import {
    HeaderBar, BrandMark, SubBrand, Spacer,
    SearchButton, SearchLabel, SearchKey,
    CaseCounter, CaseCount,
} from './header.styled';

const totalPlanned = catalogue.reduce((sum, g) => sum + g.sections.reduce((s, sec) => s + sec.planned.length, 0), 0);
const totalLive = Object.values(sectionModules).reduce((sum, m) => sum + m.cases, 0);

class $Header extends $Chemical {
    view(): ReactNode {
        return (
            <HeaderBar>
                <BrandMark>$Chemistry</BrandMark>
                <SubBrand>The Lab</SubBrand>
                <Spacer />
                <SearchButton title="Search — coming soon">
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
}

export const Header = $($Header);
