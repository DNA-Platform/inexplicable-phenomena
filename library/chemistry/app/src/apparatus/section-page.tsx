import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import { findSection } from '../data/catalogue';
import type { $Lab } from './lab';
import { sectionModules } from '../sections';
import { ArticleFrame } from './section-page.styled';
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

export class $SectionPage extends $Chemical {
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab) return null;
        const found = findSection(lab.$activeSection);
        if (!found) return <div>Section not found.</div>;
        const { group, section } = found;
        const module = sectionModules[section.id];
        const ModuleComponent = module?.Component;

        return (
            <ArticleFrame>
                <PageTitle>
                    {section.title}
                    <PageContext>{group.title}</PageContext>
                </PageTitle>
                {ModuleComponent ? (
                    <ModuleComponent />
                ) : (
                    <NoTests>No tests for this section yet.</NoTests>
                )}
            </ArticleFrame>
        );
    }
}

export const SectionPage = $($SectionPage);
