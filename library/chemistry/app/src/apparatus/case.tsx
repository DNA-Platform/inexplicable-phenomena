import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { $Status, $Planned } from './status';
import { tokens, fonts, type } from '../styles/tokens';

export class $Test extends $Chemical {
    $name = '';
}

// $Case — dense single-row card. Status tag left, name right.
export class $Case extends $Test {
    $status: $Status = new $Planned();
    $description?: string;

    view(): ReactNode {
        const isPlanned = this.$status instanceof $Planned;
        const borderColor = isPlanned ? tokens.rule : this.$status.color;
        return (
            <div style={{
                background: tokens.paperRaised,
                border: `1px solid ${tokens.rule}`,
                borderLeft: `3px solid ${borderColor}`,
                borderRadius: '4px',
                padding: '10px 14px',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.ruleStrong;
                    e.currentTarget.style.borderLeftColor = isPlanned ? tokens.muted : this.$status.color;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.rule;
                    e.currentTarget.style.borderLeftColor = borderColor;
                }}
            >
                <this.$status.Component />
                <span style={{
                    fontFamily: fonts.sans,
                    fontSize: type.caption,
                    fontWeight: 500,
                    color: tokens.inkSoft,
                    letterSpacing: '-0.005em',
                }}>
                    {this.$name}
                </span>
                {this.$description && (
                    <span style={{
                        fontFamily: fonts.sans,
                        fontSize: type.caption,
                        color: tokens.muted,
                        marginLeft: 'auto',
                    }}>
                        {this.$description}
                    </span>
                )}
            </div>
        );
    }
}

export class $PlannedCase extends $Case {
    $status: $Status = new $Planned();
}
