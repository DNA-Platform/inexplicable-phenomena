import { describe, it, expect } from 'vitest';
import { $Particle } from '@/chemistry/particle';
import { $Chemical } from '@/chemistry/chemical';
import { $phase$, $phases$, $resolve$ } from '@/symbols';

describe('Lifecycle: next() on $Particle', () => {
    it('resolves immediately if already at the requested phase', async () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        await particle.next('effect');
    });

    it('resolves immediately if past the requested phase', async () => {
        const particle = new $Particle();
        particle[$resolve$]('effect');
        await particle.next('mount');
    });

    it('waits for a future phase', async () => {
        const particle = new $Particle();
        let resolved = false;
        const promise = particle.next('mount').then(() => { resolved = true; });
        expect(resolved).toBe(false);
        particle[$resolve$]('mount');
        await promise;
        expect(resolved).toBe(true);
    });

    it('multiple awaiters on the same phase all resolve', async () => {
        const particle = new $Particle();
        const results: number[] = [];
        particle.next('mount').then(() => results.push(1));
        particle.next('mount').then(() => results.push(2));
        particle.next('mount').then(() => results.push(3));
        particle[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(results).toEqual([1, 2, 3]);
    });

    it('tracks the current phase', () => {
        const particle = new $Particle();
        expect(particle[$phase$]).toBe('setup');
        particle[$resolve$]('mount');
        expect(particle[$phase$]).toBe('mount');
        particle[$resolve$]('effect');
        expect(particle[$phase$]).toBe('effect');
    });

    it('unmount always waits even if past other phases', async () => {
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

describe('Lifecycle: next() on $Chemical', () => {
    it('provides named method shortcuts', () => {
        const chemical = new $Chemical();
        expect(typeof chemical.mount).toBe('function');
        expect(typeof chemical.layout).toBe('function');
        expect(typeof chemical.effect).toBe('function');
        expect(typeof chemical.unmount).toBe('function');
    });

    it('named methods delegate to next()', async () => {
        const chemical = new $Chemical();
        let mounted = false;
        chemical.mount().then(() => { mounted = true; });
        expect(mounted).toBe(false);
        chemical[$resolve$]('mount');
        await new Promise(r => setTimeout(r, 10));
        expect(mounted).toBe(true);
    });
});

describe('Lifecycle: the await this.next() pattern', () => {
    it('linear async lifecycle code works', async () => {
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
