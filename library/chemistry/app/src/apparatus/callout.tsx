import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { tokens, fonts, type } from '../styles/tokens';

// $Callout — left-bordered block with uppercase label header. Less chrome
// than v1; reads as a typographic register shift, not a UI box.
export class $Callout extends $Chemical {
    label = 'NOTE';
    accent = tokens.muted;

    view(): ReactNode {
        return (
            <section style={{
                marginTop: '20px',
                marginBottom: '20px',
                padding: '14px 18px',
                background: tokens.paperRaised,
                borderLeft: `2px solid ${this.accent}`,
                borderRadius: '0 3px 3px 0',
            }}>
                <header style={{
                    fontFamily: fonts.sans,
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    color: this.accent,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                }}>
                    {this.label}
                </header>
                <div style={{ fontSize: type.body, color: tokens.inkSoft, lineHeight: 1.6 }}>
                    {this.children}
                </div>
            </section>
        );
    }
}

export class $Definition extends $Callout {
    label = 'DEFINITION';
    accent = tokens.theme;
}

export class $Rules extends $Callout {
    label = 'RULES';
    accent = tokens.ink;
}

export class $Pitfall extends $Callout {
    label = 'PITFALL';
    accent = tokens.pending;
}

export class $DeepDive extends $Callout {
    label = 'DEEP DIVE';
    accent = tokens.muted;
}

export class $InTheLab extends $Callout {
    label = 'IN THE LAB';
    accent = tokens.themeBright;
}

export class $SeeAlso extends $Callout {
    label = 'SEE ALSO';
    accent = tokens.muted;
}
