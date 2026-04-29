import React, { ReactNode, useEffect, useRef } from 'react';
import { $Chemical } from '@/index';
import { catalogue } from '../data/catalogue';
import type { $Lab } from './lab';
import { tokens, fonts, sizes, type } from '../styles/tokens';

// $SidebarLink — single-line nav row. Mono section ID in fixed-width column,
// title runs to the right. Active = brand-soft bg + 2px brand-green left bar.
export class $SidebarLink extends $Chemical {
    $id?: string;
    $title?: string;
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab) return null;
        const active = lab.$activeSection === this.$id;
        return (
            <ScrollableLink
                id={this.$id!}
                title={this.$title!}
                active={active}
                onClick={() => lab.$router.navigate(this.$id!)}
            />
        );
    }
}

function ScrollableLink({ id, title, active, onClick }: {
    id: string; title: string; active: boolean; onClick: () => void;
}) {
    const ref = useRef<HTMLLIElement>(null);
    useEffect(() => {
        if (active && ref.current) {
            ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [active]);
    return (
        <li ref={ref}>
            <button
                onClick={onClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0',
                    height: '24px',
                    fontFamily: fonts.sans,
                    background: active ? tokens.themeSoft : 'transparent',
                    borderLeft: active ? `2px solid ${tokens.theme}` : '2px solid transparent',
                    color: 'inherit',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = tokens.paperRaised; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
                <span style={{
                    display: 'inline-block',
                    fontFamily: fonts.mono,
                    fontWeight: active ? 600 : 500,
                    fontSize: '11px',
                    color: active ? tokens.themeText : tokens.mutedSoft,
                    letterSpacing: '0',
                    width: '60px',
                    paddingLeft: '14px',
                    paddingRight: '6px',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {id}
                </span>
                <span style={{
                    fontFamily: fonts.sans,
                    fontWeight: active ? 600 : 400,
                    fontSize: '13px',
                    color: active ? tokens.ink : tokens.inkSoft,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingRight: '12px',
                    letterSpacing: '-0.005em',
                }}>
                    {title}
                </span>
            </button>
        </li>
    );
}

const SidebarLink = new $SidebarLink().Component;

// $Sidebar — paper-recessed background; group headers as small uppercase labels
// with brand-color Roman badges; sections as dense single-line rows.
export class $Sidebar extends $Chemical {
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        if (!lab) return null;
        return (
            <nav style={{
                width: sizes.sidebarWidth,
                background: tokens.paperRecessed,
                borderRight: `1px solid ${tokens.rule}`,
                overflowY: 'auto',
                flexShrink: 0,
                paddingTop: '4px',
                paddingBottom: '24px',
            }}>
                {catalogue.map((group) => (
                    <div key={group.roman}>
                        <header style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '10px',
                            padding: '14px 14px 6px 14px',
                        }}>
                            <span style={{
                                fontFamily: fonts.mono,
                                fontSize: '10.5px',
                                fontWeight: 700,
                                color: tokens.themeText,
                                letterSpacing: '0',
                                lineHeight: 1.4,
                                fontVariantNumeric: 'tabular-nums',
                            }}>
                                {group.roman}
                            </span>
                            <span style={{
                                fontFamily: fonts.sans,
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: tokens.muted,
                            }}>
                                {group.title}
                            </span>
                        </header>
                        <ul style={{ listStyle: 'none' }}>
                            {group.sections.map(section => (
                                <SidebarLink
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    lab={lab}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        );
    }
}
