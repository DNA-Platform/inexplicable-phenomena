import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $Figure, Figure } from '@/writing/Figure';
import { Link } from '@/reference/Link';
import { MemoryRouter } from 'react-router-dom';

class $Plate extends $Figure {
    drawn() { return <hr data-plate />; }
}
const Plate = $($Plate);

// A REGULAR section — plain hand-written prose, no markdown — with a part
// written in at paragraph grade and a part written in inside a sentence.
const written = (): $Section => $(
    <Section>
        <Title>Written In</Title>
        {'\n\nBefore the plate. It has two sentences.'}
        <Plate>the plate</Plate>
        {'\n\nAfter it. This sentence holds '}
        <Link url="/somewhere">a written link</Link>
        {' inside it.'}
    </Section>
);

describe('writing things INTO a regular section', () => {
    it('the plate is drawn where it was written', () => {
        const S = $(written()) as any;
        const { container } = render(<MemoryRouter><S /></MemoryRouter>);
        expect(container.querySelector('[data-plate]')).not.toBeNull();
    });

    it('the written link is DRAWN where it was written — the block carries it', () => {
        const S = $(written()) as any;
        const { container } = render(<MemoryRouter><S /></MemoryRouter>);
        const anchor = container.querySelector('a[href="/somewhere"]');
        expect(anchor).not.toBeNull();
        expect(anchor!.textContent).toBe('a written link');
    });

    it('the prose either side of both is still there, in order', () => {
        const S = $(written()) as any;
        const { container } = render(<MemoryRouter><S /></MemoryRouter>);
        const shown = container.textContent ?? '';
        expect(shown.indexOf('Before the plate')).toBeGreaterThanOrEqual(0);
        expect(shown.indexOf('a written link')).toBeGreaterThan(shown.indexOf('Before the plate'));
        expect(shown.indexOf('inside it')).toBeGreaterThan(shown.indexOf('a written link'));
    });

    it('the plate is a part of the section, at the position it was written', () => {
        const s = written();
        const parts = s.parts();
        const at = parts.findIndex(p => p instanceof $Figure);
        expect(at).toBe(2);
        expect(parts[at].index).toBe(2);
        expect(parts[3].copy).toContain('After it');
    });
});
