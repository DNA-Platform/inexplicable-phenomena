import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { text } from '@/utilities/html';

describe('research: what a bond constructor receives', () => {
    it('PROBE 9 — a mixed inline run (free text + HTML) is grouped into ONE block, all text kept', () => {
        let kinds: string[] = [];
        let texts: string[] = [];
        class $Host extends $Chemical {
            $Host(...parts: any[]) {
                kinds = parts.map(p => p?.constructor?.name ?? typeof p);
                texts = parts.map(p => text(p));
            }

            view() {
                return <div className="host" />;
            }
        }
        const Host = $($Host);
        render(<Host>Call me <b>Ishmael</b> today</Host>);
        expect(kinds).toEqual(['$Html$']);
        expect(texts).toEqual(['Call me Ishmael today']);
    });

    it('PROBE 10 — a single raw string child is grouped into ONE block, and reaches the bond constructor', () => {
        let count = -1;
        let copy = '';
        class $Line extends $Chemical {
            $Line(...parts: any[]) {
                count = parts.length;
                copy = text(parts[0]);
            }

            view() {
                return <div className="line" />;
            }
        }
        const Line = $($Line);
        render(<Line>Call me Ishmael</Line>);
        expect(count).toBe(1);
        expect(copy).toBe('Call me Ishmael');
    });
});
