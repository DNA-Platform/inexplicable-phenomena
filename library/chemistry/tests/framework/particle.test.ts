import { describe, it, expect } from 'vitest';
import React from 'react';
import { $Particle, $lift } from '@/chemistry/particle';
import {
    $cid$, $symbol$, $type$, $children$, $apply$, $bond$, $phase$, $phases$, $resolve$
} from "@/symbols";

describe('$Particle', () => {
    it('should have a unique cid', () => {
        const p1 = new $Particle();
        const p2 = new $Particle();
        expect(p1[$cid$]).not.toBe(p2[$cid$]);
    });

    it('should have a unique symbol for each instance', () => {
        const p1 = new $Particle();
        const p2 = new $Particle();
        expect(p1[$symbol$]).toBeDefined();
        expect(p2[$symbol$]).toBeDefined();
        expect(p1[$symbol$]).not.toBe(p2[$symbol$]);
    });

    it('should store constructor as type', () => {
        const particle = new $Particle();
        expect(particle[$type$]).toBe($Particle);
    });

    it('should format symbol as $Chemistry.ClassName[cid]', () => {
        const particle = new $Particle();
        expect(particle[$symbol$]).toMatch(/^\$Chemistry\.\$Particle\[\d+\]$/);
    });

    it('should start in setup phase', () => {
        const particle = new $Particle();
        expect(particle[$phase$]).toBe('setup');
    });

    it('should have phase queues for all lifecycle phases', () => {
        const particle = new $Particle();
        const phases = particle[$phases$];
        expect(phases.get('mount')).toBeDefined();
        expect(phases.get('layout')).toBeDefined();
        expect(phases.get('effect')).toBeDefined();
        expect(phases.get('unmount')).toBeDefined();
    });
});

describe('$Particle.next()', () => {
    it('should resolve immediately if already at the requested phase', () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        const result = particle.next('effect');
        expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve immediately if past the requested phase', () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        // effect is past mount in the phase order
        const result = particle.next('mount');
        expect(result).toBeInstanceOf(Promise);
    });

    it('should return a pending promise for a future phase', async () => {
        const particle = new $Particle();
        let resolved = false;
        particle.next('mount').then(() => { resolved = true; });
        await new Promise(r => setTimeout(r, 10));
        expect(resolved).toBe(false);
        particle[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(resolved).toBe(true);
    });

    it('should drain the phase queue on resolve', () => {
        const particle = new $Particle();
        const calls: string[] = [];
        particle[$phases$].get('mount')!.push(() => calls.push('a'));
        particle[$phases$].get('mount')!.push(() => calls.push('b'));
        particle[$resolve$]('mount');
        expect(calls).toEqual(['a', 'b']);
        expect(particle[$phases$].get('mount')!.length).toBe(0);
    });
});

describe('$Particle.use()', () => {
    it('should produce a callable function', () => {
        const particle = new $Particle();
        expect(typeof particle.view).toBe('function');
    });

    it('should carry $view and $this on the component', () => {
        const particle = new $Particle();
        const component = $lift(particle) as any;
        expect(component.$this).toBe(particle);
        expect(typeof component.$view).toBe('function');
    });
});

describe('$Particle.toString()', () => {
    it('should return the symbol string', () => {
        const particle = new $Particle();
        expect(particle.toString()).toBe(particle[$symbol$]);
    });

    it('should be usable in string contexts', () => {
        const particle = new $Particle();
        expect(`${particle}`).toMatch(/^\$Chemistry\.\$Particle\[\d+\]$/);
    });
});
