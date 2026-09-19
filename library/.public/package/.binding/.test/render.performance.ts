import { execFileSync } from 'node:child_process';
import { afterAll, describe, expect, it } from 'vitest';
import { duplicated, staged } from './staging';

// WHAT A BIND COSTS, PHASE BY PHASE, OVER A LIBRARY OF N REAL BOOKS — and above all what the render
// costs, because the render is one Node process per page and was measured at 3.1s a page, serial,
// before the children ran together.
//
// THE NUMBERS ARE THE FINDING. Nothing here asserts a duration; a threshold is a number somebody
// chose once on one machine. What is asserted is that the bind finishes and reports every phase.
// Run with SCALE=<n> to size it; the default is small enough to run without thinking about it.
const scale = Number(process.env.SCALE ?? 20);
const held = staged();
afterAll(() => { held.remove(); });

describe(`a bind of ${5 + scale} real books`, () => {
    it('finishes, and says what each phase cost', () => {
        duplicated(held, { of: 'paper', name: 'A Paper', subject: 'the-library', author: 'persona' }, scale);
        const { NODE_ENV: _, ...environment } = process.env;
        const at = performance.now();
        const said = execFileSync('npx', ['tsx', 'binding.ts'], { cwd: held.binding, encoding: 'utf8', shell: true, stdio: ['ignore', 'pipe', 'pipe'], env: environment });
        const whole = performance.now() - at;

        const phases = [...said.matchAll(/^(\w+)\s+.*\((\d+\.\d)s\)$/gmu)].map(one => ({ phase: one[1], seconds: Number(one[2]) }));
        console.log(`\n${5 + scale} books, ${whole > 1000 ? `${(whole / 1000).toFixed(1)}s` : `${whole.toFixed(0)}ms`} in all`);
        for (const one of phases) console.log(`   ${one.phase.padEnd(12)} ${one.seconds.toFixed(1).padStart(6)}s`);
        const render = phases.find(one => one.phase === 'render');
        if (render !== undefined) console.log(`   ${'per page'.padEnd(12)} ${(render.seconds / (5 + scale + 1)).toFixed(2).padStart(6)}s   (${5 + scale + 1} pages, in parallel)`);

        expect(said).toMatch(/^bound /mu);
        expect(phases.map(one => one.phase)).toContain('render');
    });
});
