import React from 'react';
import { useParams } from 'react-router-dom';
import { defaultSectionId, catalogue, findSection } from '../data/catalogue';
import { sectionModules } from '../sections';
import { Header } from './header';
import { CodePanel } from './code-panel';
import { ThreePaneLayout, ContentArea } from './layout';
import { LabRoot } from './lab.styled';
import { ArticleFrame } from './section-page.styled';
import {
    SidebarNav, GroupHeader, GroupRoman, GroupTitle as SidebarGroupTitle,
    SectionList, SectionItem, SectionLink, SectionId, SectionTitle,
} from './sidebar.styled';
import styled from 'styled-components';

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

const groups = catalogue
    .map(g => ({ ...g, sections: g.sections.filter(s => sectionModules[s.id]) }))
    .filter(g => g.sections.length > 0);

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
            <ThreePaneLayout>
                <SidebarNav>
                    {groups.map(g => (
                        <div key={g.roman}>
                            <GroupHeader>
                                <GroupRoman>{g.roman}</GroupRoman>
                                <SidebarGroupTitle>{g.title}</SidebarGroupTitle>
                            </GroupHeader>
                            <SectionList>
                                {g.sections.map(s => (
                                    <SectionItem key={s.id}>
                                        <SectionLink to={`/${s.id}`} $active={active === s.id}>
                                            <SectionId $active={active === s.id}>{s.id}</SectionId>
                                            <SectionTitle $active={active === s.id}>{s.title}</SectionTitle>
                                        </SectionLink>
                                    </SectionItem>
                                ))}
                            </SectionList>
                        </div>
                    ))}
                </SidebarNav>
                <ContentArea>
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
                </ContentArea>
                <CodePanel />
            </ThreePaneLayout>
        </LabRoot>
    );
}
