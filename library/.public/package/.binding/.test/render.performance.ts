import { afterAll, describe, expect, it } from 'vitest';
import { bound, duplicated, pulled } from './galleys';

// WHAT A BIND COSTS, PHASE BY PHASE, OVER A LIBRARY OF N REAL BOOKS — and above all what the render
// costs, because the render is one Node process per page and was measured at 3.1s a page, serial,
// before the children ran together.
//
// THE NUMBERS ARE THE FINDING. Nothing here asserts a duration; a threshold is a number somebody
// chose once on one machine. What is asserted is that the bind finishes and reports every phase.
// Run with SCALE=<n> to size it; the default is small enough to run without thinking about it.
const scale = Number(process.env.SCALE ?? 20);
// THE TEST LIBRARY'S SIX BOOKS AND THE COPIES, and a page for each with one more for the root.
const books = 6 + scale;
const pages = books + 1;
const galley = pulled();
afterAll(() => { galley.remove(); });

describe(`a bind of ${books} real books`, () => {
    it('finishes, and says what each phase cost', () => {
        duplicated(galley, { of: 'paper', name: 'A Paper', subject: 'library' }, scale);
        const at = performance.now();
        const said = bound(galley);
        const whole = performance.now() - at;

        const phases = [...said.matchAll(/^(\w+)\s+.*\((\d+\.\d)s\)$/gmu)].map(one => ({ phase: one[1], seconds: Number(one[2]) }));
        console.log(`\n${books} books, ${whole > 1000 ? `${(whole / 1000).toFixed(1)}s` : `${whole.toFixed(0)}ms`} in all`);
        for (const one of phases) console.log(`   ${one.phase.padEnd(12)} ${one.seconds.toFixed(1).padStart(6)}s`);
        const render = phases.find(one => one.phase === 'render');
        if (render !== undefined) console.log(`   ${'per page'.padEnd(12)} ${(render.seconds / pages).toFixed(2).padStart(6)}s   (${pages} pages, one server)`);
        expect(said).toMatch(new RegExp(`^resolve .*${books} books|^inventory +${books} books`, 'mu'));

        expect(said).toMatch(/^bound /mu);
        expect(phases.map(one => one.phase)).toContain('render');
    });
});
