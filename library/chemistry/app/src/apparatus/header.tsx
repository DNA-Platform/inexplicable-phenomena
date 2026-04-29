import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { tokens, fonts, sizes, type } from '../styles/tokens';
import type { $Lab } from './lab';

// $Header — top chrome. Brand mark left, ⌘K palette stub right, case counter.
// Near-black with a single bottom rule. The brand mark is the only place
// where Fiverr-green appears in the header chrome.
export class $Header extends $Chemical {
    $lab?: $Lab;

    view(): ReactNode {
        const lab = this.$lab;
        const totalCases = lab ? lab.$cases.size : 0;
        const implementedCases = 0;
        return (
            <header style={{
                height: sizes.headerHeight,
                background: tokens.paperRaised,
                borderBottom: `1px solid ${tokens.rule}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
                paddingRight: '12px',
                flexShrink: 0,
            }}>
                {/* `$Chemistry` is code, not a logo. Mono font, plain weight,
                    neon green. Reads like an inline `code` mark in the source.
                    No embossing, no display weight, no letter-spacing tricks. */}
                <code style={{
                    fontFamily: fonts.mono,
                    fontSize: '17px',
                    fontWeight: 500,
                    color: tokens.brandBright,
                    background: 'transparent',
                    padding: 0,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: 0,
                }}>
                    $Chemistry
                </code>
                <span style={{
                    fontFamily: fonts.sans,
                    color: tokens.muted,
                    marginLeft: '14px',
                    paddingLeft: '14px',
                    borderLeft: `1px solid ${tokens.rule}`,
                    fontWeight: 600,
                    fontSize: type.micro,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                }}>The Lab</span>

                <div style={{ flex: 1 }} />

                {/* ⌘K palette stub — visual only this sprint */}
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px 6px 12px',
                    border: `1px solid ${tokens.rule}`,
                    borderRadius: '4px',
                    color: tokens.muted,
                    fontSize: type.caption,
                    fontFamily: fonts.sans,
                    background: tokens.paperRaised,
                }}
                    title="Search (⌘K) — coming sprint 35"
                    onMouseEnter={e => e.currentTarget.style.borderColor = tokens.ruleStrong}
                    onMouseLeave={e => e.currentTarget.style.borderColor = tokens.rule}
                >
                    <span style={{ fontSize: '11px' }}>Search…</span>
                    <span style={{
                        fontFamily: fonts.mono,
                        fontSize: '10px',
                        fontWeight: 600,
                        color: tokens.mutedSoft,
                        background: tokens.paperRecessed,
                        padding: '1px 6px',
                        borderRadius: '3px',
                        border: `1px solid ${tokens.rule}`,
                    }}>⌘K</span>
                </button>

                <div style={{
                    fontFamily: fonts.sans,
                    fontSize: type.micro,
                    color: tokens.muted,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontVariantNumeric: 'tabular-nums',
                    marginLeft: '14px',
                    paddingLeft: '14px',
                    borderLeft: `1px solid ${tokens.rule}`,
                }}>
                    <span style={{ color: tokens.brand, fontWeight: 800 }}>{implementedCases}</span>
                    {' / '}
                    <span>{totalCases}</span>
                    {' cases'}
                </div>
            </header>
        );
    }
}
