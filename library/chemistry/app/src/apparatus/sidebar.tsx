import React, { ReactNode, useEffect, useRef } from 'react';
import { $, $Chemical } from '@/index';
import { catalogue } from '../data/catalogue';
import { sectionModules } from '../sections';
import type { $Lab } from './lab';
import {
    SidebarNav, GroupHeader, GroupRoman, GroupTitle,
    SectionList, SectionItem, SectionLink, SectionId, SectionTitle,
} from './sidebar.styled';

function ScrollableLink({ id, title, active }: {
    id: string; title: string; active: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    useEffect(() => {
        if (active && ref.current) {
            ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [active]);
    return (
        <SectionItem ref={ref}>
            <SectionLink to={`/${id}`} $active={active}>
                <SectionId $active={active}>{id}</SectionId>
                <SectionTitle $active={active}>{title}</SectionTitle>
            </SectionLink>
        </SectionItem>
    );
}

export class $Sidebar extends $Chemical {
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab) return null;
        const active = lab.$activeSection;
        const groups = catalogue
            .map(group => ({
                ...group,
                sections: group.sections.filter(s => sectionModules[s.id]),
            }))
            .filter(group => group.sections.length > 0);

        return (
            <SidebarNav>
                {groups.map((group) => (
                    <div key={group.roman}>
                        <GroupHeader>
                            <GroupRoman>{group.roman}</GroupRoman>
                            <GroupTitle>{group.title}</GroupTitle>
                        </GroupHeader>
                        <SectionList>
                            {group.sections.map(section => (
                                <ScrollableLink
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    active={active === section.id}
                                />
                            ))}
                        </SectionList>
                    </div>
                ))}
            </SidebarNav>
        );
    }
}

export const Sidebar = $($Sidebar);
