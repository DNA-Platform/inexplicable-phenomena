import React from 'react';
import { $Particle } from '@/index';
import { tokens, fonts, sizes } from '../styles/tokens';

// $Status — tag-shaped indicator. GitHub-flavored. Sharp 3px corners, mono
// uppercase label, color-coded square dot before the label.
export class $Status extends $Particle {
    color = tokens.muted;
    bg = tokens.paperRecessed;
    label = 'STATUS';

    view() {
        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: fonts.mono,
                fontSize: sizes.pillText,
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: this.color,
                background: this.bg,
                border: `1px solid ${this.color}33`,
                padding: '3px 8px 3px 7px',
                borderRadius: '3px',
                lineHeight: 1.4,
                textTransform: 'uppercase',
                fontVariantNumeric: 'tabular-nums',
            }}>
                <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '1px',
                    background: this.color,
                    display: 'inline-block',
                }} />
                {this.label}
            </span>
        );
    }
}

export class $Planned extends $Status {
    color = tokens.planned;
    bg = tokens.plannedBg;
    label = 'PLANNED';
}

export class $Pending extends $Status {
    color = tokens.pending;
    bg = tokens.pendingBg;
    label = 'PENDING';
}

export class $Pass extends $Status {
    color = tokens.ok;
    bg = tokens.okBg;
    label = 'PASS';
}

export class $Fail extends $Status {
    color = tokens.fail;
    bg = tokens.failBg;
    label = 'FAIL';
}

export class $Broken extends $Status {
    color = tokens.broken;
    bg = tokens.brokenBg;
    label = 'BROKEN';
}
