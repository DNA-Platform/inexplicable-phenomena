import React from 'react';
import { useParams } from 'react-router-dom';
import { defaultSectionId, catalogue, findSection } from '../data/catalogue';
import { sectionModules } from '../sections';
import { Header } from './header';
import { LabRoot } from './lab.styled';
import { ArticleFrame } from './section-page.styled';
import {
    SidebarNav, GroupHeader, GroupRoman, GroupTitle as SidebarGroupTitle,
    SectionList, SectionItem, SectionLink, SectionId, SectionTitle,
} from './sidebar.styled';
import styled from 'styled-components';

// Layout atoms — pure visual containers, no state. Function of props only.
const ThreePane = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background: ${(p) => p.theme.color.paper};
`;

const ContentMain = styled.main`
    flex: 1;
    overflow-y: auto;
    background: ${(p) => p.theme.color.paper};
    display: flex;
    justify-content: flex-start;
`;

const PageTitle = styled.h2`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.h3};
    font-weight: 800;
    color: ${(p) => p.theme.color.ink};
    margin-bottom: 24px;
    letter-spacing: -0.02em;
`;

const PageContext = styled.span`
    font-weight: 500;
    color: ${(p) => p.theme.color.muted};
    font-size: ${(p) => p.theme.type.body};
    margin-left: 12px;
    letter-spacing: 0;
`;

const NoTests = styled.p`
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.body};
    color: ${(p) => p.theme.color.muted};
    padding: 40px 0;
`;

// Sidebar data — filtered once at module scope.
const groups = catalogue
    .filter(g => g.roman === '·')
    .map(g => ({ ...g, sections: g.sections.filter(s => sectionModules[s.id]) }))
    .filter(g => g.sections.length > 0);

// Lab — the root of the app. A function component at the react-router
// boundary. Uses useParams() from react-router-dom to read the current
// section from the URL. Everything below it is $Chemistry chemicals
// or styled-components. This is the "unsafe" boundary — a plain React
// function that bridges the ecosystem package into the chemical tree.
export function Lab() {
    const { section } = useParams<{ section?: string }>();
    const active = section ?? defaultSectionId;
    const found = findSection(active);
    const group = found?.group;
    const sec = found?.section;
    const module = sec ? sectionModules[sec.id] : undefined;
    const ModuleComponent = module?.Component;

    return (
        <LabRoot data-section={active}>
            <Header />
            <ThreePane>
                <SidebarNav>
                    {groups.map(g => (
                        <div key={g.roman + g.title}>
                            <GroupHeader>
                                {g.roman !== '·' && <GroupRoman>{g.roman}</GroupRoman>}
                                <SidebarGroupTitle>{g.title}</SidebarGroupTitle>
                            </GroupHeader>
                            <SectionList>
                                {g.sections.map(s => (
                                    <SectionItem key={s.id}>
                                        <SectionLink to={`/${s.id}`} $active={active === s.id}>
                                            <SectionTitle $active={active === s.id}>{s.title}</SectionTitle>
                                        </SectionLink>
                                    </SectionItem>
                                ))}
                            </SectionList>
                        </div>
                    ))}
                </SidebarNav>
                <ContentMain key={active}>
                    <ArticleFrame>
                        {sec && group ? (
                            <>
                                <PageTitle>
                                    {sec.title}
                                    <PageContext>{group.title}</PageContext>
                                </PageTitle>
                                {ModuleComponent ? <ModuleComponent /> : <NoTests>No tests for this section yet.</NoTests>}
                            </>
                        ) : (
                            <NoTests>Section not found.</NoTests>
                        )}
                    </ArticleFrame>
                </ContentMain>
            </ThreePane>
        </LabRoot>
    );
}
