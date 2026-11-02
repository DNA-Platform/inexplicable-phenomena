import { describe, it, expect } from 'vitest';
import { $Particle, $lift } from '@/abstraction/particle';

describe('$Particle — identity', () => {
    it('each particle stringifies to a unique $Chemistry symbol', () => {
        const p1 = new $Particle();
        const p2 = new $Particle();
        expect(p1.toString()).not.toBe(p2.toString());
        expect(p1.toString()).toMatch(/^\$Chemistry\.\$Particle\[\d+\]$/);
    });

    it('a particle is usable in string contexts via its symbol', () => {
        const particle = new $Particle();
        expect(`${particle}`).toMatch(/^\$Chemistry\.\$Particle\[\d+\]$/);
    });
});

describe('$lift — turns a held particle into a renderable React component', () => {
    it('produces a component bound to the given particle', () => {
        const particle = new $Particle();
        const component = $lift(particle) as any;
        // The returned component exposes the particle it wraps.
        expect(component.$chemical).toBe(particle);
    });
});
