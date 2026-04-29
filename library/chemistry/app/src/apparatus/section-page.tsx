import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { Section, Group, neighbors, findSection } from '../data/catalogue';
import { $Definition, $Rules, $SeeAlso } from './callout';
import { $PlannedCase } from './case';
import type { $Lab } from './lab';
import { tokens, fonts, sizes, type } from '../styles/tokens';
import {
    SectionCard, TopRow, AtomicNumber, RomanCorner, Center,
    Title as TitleEl, BottomRow,
    SectionHeader as SectionHeaderEl, SectionHeaderAside,
    SectionLead, SectionLeadEm, SectionBody,
    isMonoTitle, titleTier,
} from './section-card.styled';
import { ParticularizationCases } from '../sections/II-5-particularization';

// $Breadcrumb — section path at the top of every section page.
export class $Breadcrumb extends $Chemical {
    $group?: Group;
    $section?: Section;

    view(): ReactNode {
        if (!this.$group || !this.$section) return null;
        return (
            <div style={{
                fontFamily: fonts.sans,
                fontSize: type.micro,
                color: tokens.mutedSoft,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '24px',
                fontWeight: 600,
            }}>
                <span style={{ color: tokens.themeText, fontWeight: 700 }}>§ {this.$group.roman}</span>
                <span style={{ margin: '0 10px', color: tokens.mutedFaint }}>·</span>
                {this.$group.title}
                <span style={{ margin: '0 10px', color: tokens.mutedFaint }}>›</span>
                <span style={{ color: tokens.muted }}>§ {this.$section.id}</span>
            </div>
        );
    }
}

const Breadcrumb = new $Breadcrumb().Component;

// $PrevNext — section pager.
export class $PrevNext extends $Chemical {
    $sectionId?: string;
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab || !this.$sectionId) return null;
        const { prev, next } = neighbors(this.$sectionId);
        return (
            <div style={{
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: `1px solid ${tokens.rule}`,
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
            }}>
                {prev ? (
                    <button
                        onClick={() => lab.$router.navigate(prev.id)}
                        style={{ ...navButtonStyle, textAlign: 'left' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = tokens.theme; e.currentTarget.style.background = tokens.themeFaint; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = tokens.rule; e.currentTarget.style.background = tokens.paperRaised; }}
                    >
                        <span style={{ display: 'block', fontSize: type.micro, color: tokens.mutedSoft, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontFamily: fonts.sans }}>← Previous</span>
                        <span style={{ display: 'block', marginTop: '6px', color: tokens.ink, fontSize: type.body, fontWeight: 600 }}>
                            <span style={{ fontFamily: fonts.mono, color: tokens.themeText, fontWeight: 700, marginRight: '8px', fontVariantNumeric: 'tabular-nums' }}>§ {prev.id}</span>
                            {prev.title}
                        </span>
                    </button>
                ) : <div style={{ flex: 1 }} />}
                {next ? (
                    <button
                        onClick={() => lab.$router.navigate(next.id)}
                        style={{ ...navButtonStyle, textAlign: 'right' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = tokens.theme; e.currentTarget.style.background = tokens.themeFaint; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = tokens.rule; e.currentTarget.style.background = tokens.paperRaised; }}
                    >
                        <span style={{ display: 'block', fontSize: type.micro, color: tokens.mutedSoft, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontFamily: fonts.sans }}>Next →</span>
                        <span style={{ display: 'block', marginTop: '6px', color: tokens.ink, fontSize: type.body, fontWeight: 600 }}>
                            <span style={{ fontFamily: fonts.mono, color: tokens.themeText, fontWeight: 700, marginRight: '8px', fontVariantNumeric: 'tabular-nums' }}>§ {next.id}</span>
                            {next.title}
                        </span>
                    </button>
                ) : <div style={{ flex: 1 }} />}
            </div>
        );
    }
}

const navButtonStyle: React.CSSProperties = {
    flex: 1,
    fontFamily: fonts.sans,
    padding: '14px 16px',
    border: `1px solid ${tokens.rule}`,
    borderRadius: '6px',
    background: tokens.paperRaised,
    color: tokens.ink,
};

const PrevNext = new $PrevNext().Component;
const PlannedCase = new $PlannedCase().Component;
const Definition = new $Definition().Component;

// $SectionPage — body of the content panel. Drops the periodic-element card
// per the sprint-29-redesign comp survey: chemistry register is verbal, not
// visual. Uses a small mono monogram chip + big heading + uppercase group tag.
export class $SectionPage extends $Chemical {
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab) return null;
        const found = findSection(lab.$activeSection);
        if (!found) return <div>Section not found.</div>;
        const { group, section } = found;

        return (
            <article style={{
                maxWidth: sizes.contentMaxWidth,
                margin: '0 auto',
                padding: '40px 40px 64px',
                fontSize: sizes.bodyText,
                color: tokens.ink,
            }}>
                {/* Periodic-element-style cell — title is the symbol position
                    (center, big), section ID becomes the decorative atomic-
                    number corner. Card floats top-left; supporting prose flows
                    alongside it. */}
                <SectionHeaderEl>
                    <SectionCard>
                        <TopRow>
                            <AtomicNumber>{section.id}</AtomicNumber>
                            <RomanCorner>§{group.roman}</RomanCorner>
                        </TopRow>
                        <Center>
                            <TitleEl
                                $mono={isMonoTitle(section.title)}
                                $tier={titleTier(section.title, isMonoTitle(section.title))}
                            >
                                {section.title}
                            </TitleEl>
                        </Center>
                        <BottomRow>{group.title}</BottomRow>
                    </SectionCard>
                    <SectionHeaderAside>
                        <SectionLead>
                            <SectionLeadEm>§ {section.id}</SectionLeadEm>
                            {' '}is one of {found.group.sections.length} sections under{' '}
                            <SectionLeadEm>{group.title}</SectionLeadEm>.
                            {' '}This section is part of the <code>$Chemistry</code> reference
                            catalogue and will hold the Definition, Rules, and Cases that
                            specify the framework's behaviour at this point.
                        </SectionLead>
                    </SectionHeaderAside>
                </SectionHeaderEl>

                <Definition>
                    <p>
                        <em>Definition prose pending sprint 30.</em> Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </Definition>

                <SectionBody>
                    <p>
                        <em>Body prose pending sprint 30.</em> Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </p>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                        adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                        dolore magnam aliquam quaerat voluptatem.
                    </p>
                </SectionBody>

                <h2 style={{
                    marginTop: '40px',
                    marginBottom: '16px',
                    fontSize: type.micro,
                    color: tokens.themeText,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontFamily: fonts.sans,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <span>Cases</span>
                    <span style={{ flex: 1, height: '1px', background: tokens.rule }} />
                    <span style={{
                        color: tokens.muted,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                    }}>{section.cases.length}</span>
                </h2>
                {section.id === 'II.5' ? (
                    <div style={{ marginTop: '8px' }}>
                        <ParticularizationCases />
                    </div>
                ) : section.cases.length === 0 ? (
                    <p style={{
                        color: tokens.mutedSoft,
                        fontFamily: fonts.sans,
                        fontSize: type.caption,
                        marginTop: '8px',
                        fontStyle: 'italic',
                    }}>
                        No cases for this section yet.
                    </p>
                ) : (
                    <div style={{ marginTop: '8px' }}>
                        {section.cases.map((caseName, i) => (
                            <PlannedCase key={i} name={caseName} />
                        ))}
                    </div>
                )}

                <PrevNext sectionId={section.id} lab={lab} />
            </article>
        );
    }
}
