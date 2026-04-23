import { describe, it, expect } from 'vitest';
import { $Particle } from '@/chemistry/particle';
import { $Chemical } from '@/chemistry/chemical';
import { $resolve$ } from '@/symbols';

// Lifecycle phases are the framework's coordination primitive for async work
// aligned with React's commit cycle. A chemical (or particle) can `await
// this.next(phase)` and the framework resolves when that phase is reached.
//
// These tests pin down the contract of next() — what it guarantees to
// developers writing async lifecycle code.

describe('next(phase) — when the requested phase has already been reached', () => {
    it('resolves immediately if already at that phase', async () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        await particle.next('effect'); // must not hang
    });

    it('resolves immediately if the phase has been passed', async () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        await particle.next('mount'); // mount precedes effect in phase order
    });
});

describe('next(phase) — when the requested phase is in the future', () => {
    it('the returned promise stays pending until the framework resolves', async () => {
        const particle = new $Particle();
        let resolved = false;
        const promise = particle.next('mount').then(() => { resolved = true; });
        expect(resolved).toBe(false);
        particle[$resolve$]('mount');
        await promise;
        expect(resolved).toBe(true);
    });

    it('all pending awaiters resolve together when the phase is reached', async () => {
        const particle = new $Particle();
        const results: number[] = [];
        particle.next('mount').then(() => results.push(1));
        particle.next('mount').then(() => results.push(2));
        particle.next('mount').then(() => results.push(3));
        particle[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(results).toEqual([1, 2, 3]);
    });
});

describe('next(phase) — special rules', () => {
    it('unmount always waits even when later phases have been reached', async () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        let resolved = false;
        particle.next('unmount').then(() => { resolved = true; });
        await new Promise(r => setTimeout(r, 10));
        expect(resolved).toBe(false);
        particle[$resolve$]('unmount');
        await new Promise(r => setTimeout(r, 10));
        expect(resolved).toBe(true);
    });
});

describe('Chemical lifecycle methods — named shortcuts for phases', () => {
    it('chemical.mount() awaits the mount phase', async () => {
        const chemical = new $Chemical();
        let mounted = false;
        chemical.mount().then(() => { mounted = true; });
        expect(mounted).toBe(false);
        chemical[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(mounted).toBe(true);
    });

    it('async code can sequence through phases with await this.next()', async () => {
        class $Worker extends $Chemical {
            result = '';
            async effect() {
                await this.next('mount');
                this.result = 'mounted';
            }
        }
        const worker = new $Worker();
        worker.effect();
        expect(worker.result).toBe('');
        worker[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(worker.result).toBe('mounted');
    });
});
