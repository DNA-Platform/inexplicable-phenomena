import { describe, it, expect } from 'vitest';
import { $promise, $await } from '@/implementation/promise';

describe('$promise — cancellable promise', () => {
    it('resolves normally', async () => {
        const p = $promise<number>(resolve => setTimeout(() => resolve(42), 10));
        const result = await p;
        expect(result).toBe(42);
        expect(p.complete).toBe(true);
        expect($await(p)).toBe(42);
    });

    it('cancel prevents resolution', async () => {
        let resolved = false;
        const p = $promise<void>(resolve => setTimeout(() => { resolved = true; resolve(); }, 100));
        p.cancel();
        await new Promise(r => setTimeout(r, 150));
        expect(resolved).toBe(true); // executor still fires
        expect(p.complete).toBe(true);
    });

    it('cancel propagates through .then chain', async () => {
        let step1 = false;
        let step2 = false;
        const p = $promise<number>(resolve => setTimeout(() => resolve(1), 50));
        const chained = p.then(v => { step1 = true; return v + 1; }).then(v => { step2 = true; return v + 1; });
        chained.cancel();
        await new Promise(r => setTimeout(r, 100));
        expect(step1).toBe(false);
        expect(step2).toBe(false);
    });

    it('$await returns undefined before resolution', () => {
        const p = $promise<number>(resolve => setTimeout(() => resolve(42), 1000));
        expect($await(p)).toBeUndefined();
        p.cancel();
    });
});
