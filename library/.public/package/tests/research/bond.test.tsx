import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { text } from '@/tools/html';

// The fork: if a composition is built from its bond constructor (live children,
// including HTML) instead of from `children`, what does the bond constructor
// actually receive — and does raw free text survive? These probes decide it.
// Assertions encode the hypothesis (free-text runs are dropped, live children
// kept); a red diff would be the correction.

describe('research: what a bond constructor receives', () => {
    it('PROBE 9 — mixed free text + HTML: the text runs are dropped, the live child stays', () => {
        let kinds: string[] = [];
        let texts: string[] = [];
        class $Host extends $Chemical {
            $Host(...parts: any[]) {
                kinds = parts.map(p => p?.constructor?.name ?? typeof p);
                texts = parts.map(p => {
                    if (p && typeof p === 'object' && 'copy' in p) return 'copy:' + p.copy;
                    if (p && typeof p === 'object' && 'children' in p) return 'html:' + text((p as any).children);
                    return 'raw:' + String(p);
                });
            }
            view() { return <div className="host" />; }
        }
        const Host = $($Host);
        render(<Host>Call me <b>Ishmael</b> today</Host>);

        expect(kinds).toEqual(['$Html$']);            // only the <b> survived; "Call me " and " today" dropped
        expect(texts).toEqual(['html:Ishmael']);       // a live HTML child yields its text via its content
    });

    it('PROBE 10 — a single raw string child: the bond constructor receives nothing', () => {
        let count = -1;
        class $Line extends $Chemical {
            $Line(...parts: any[]) { count = parts.length; }
            view() { return <div className="line" />; }
        }
        const Line = $($Line);
        render(<Line>Call me Ishmael</Line>);
        expect(count).toBe(0);                          // the free-text string never reaches the bond constructor
    });
});
