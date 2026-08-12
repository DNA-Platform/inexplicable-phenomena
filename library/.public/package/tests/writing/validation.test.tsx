import { describe, it, expect } from 'vitest';
import React from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

// VALIDATION SAYS WHY, and it says it in the same place $check says a parameter
// was wrong: one collection per bond, one raise, both kinds together — so a
// reader can see whether they are related instead of learning one and then,
// after a fix, the other.

const failure = (chemical: unknown): string | undefined => {
    const s = Object.getOwnPropertySymbols(chemical as object).find(x => x.description === '$Particle.devError');
    return s ? (chemical as Record<symbol, string>)[s] : undefined;
};

describe('a class states WHY it is not valid', () => {
    it('the reason reaches the failure, and it is the class\'s own sentence', () => {
        const p: $Paragraph = $(<Paragraph>{'   '}</Paragraph>);
        expect(p.valid()).toBe(false);
        expect(failure(p)).toContain('at least one letter or number');
    });

    it('a title says its own thing rather than the generic sentence', () => {
        const s: $Section = $(<Section><Title>{''}</Title>{'\n\nProse.'}</Section>);
        const said = failure(s.parts()[0]) ?? failure(s) ?? '';
        expect(said).toContain('a title has words');
    });

    it('EVERY failing condition is heard — not the first one only', () => {
        // A word that is neither unbroken nor lettered fails twice, and says so
        // twice. This is the promise that breaks the moment someone writes an &&
        // chain in front of a $valid call.
        class $Twice extends $Paragraph {
            valid(): boolean {
                const one = $valid(false, 'the first thing that is wrong');
                const two = $valid(false, 'the second thing that is wrong');
                return one && two;
            }
        }
        const Twice = $($Twice);
        const t: $Twice = $(<Twice>{'anything'}</Twice>);
        const said = failure(t) ?? '';
        expect(said).toContain('the first thing that is wrong');
        expect(said).toContain('the second thing that is wrong');
    });

    it('a valid bond states nothing and raises nothing', () => {
        const p: $Paragraph = $(<Paragraph>{'A whole sentence stands here.'}</Paragraph>);
        expect(p.valid()).toBe(true);
        expect(failure(p)).toBeUndefined();
    });

    it('and the reason is drawn where the part stands — the framework\'s own exception path', () => {
        const p: $Paragraph = $(<Paragraph>{'   '}</Paragraph>);
        // The instance is still returned and still held; nothing was dropped.
        expect(p).toBeInstanceOf($Paragraph);
        expect(failure(p)).toBeDefined();
    });
});
