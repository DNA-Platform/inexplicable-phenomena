import { describe, it, expect } from 'vitest';
import { $Particle, isParticle } from '@/abstraction/particle';
import { $Chemical } from '@/abstraction/chemical';
import {
    $cid$, $type$, $symbol$, $phases$, $particleMarker$,
} from '@/implementation/symbols';

describe('particularization — new $Particle(particular)', () => {
    it('isParticle is true for a naturally-constructed particle', () => {
        expect(isParticle(new $Particle())).toBe(true);
    });

    it('isParticle is false for a plain object / error / null', () => {
        expect(isParticle(null)).toBe(false);
        expect(isParticle({})).toBe(false);
        expect(isParticle(new Error('x'))).toBe(false);
        expect(isParticle('hi' as any)).toBe(false);
    });

    it('carrier has its own fresh $cid (different from any other particle)', () => {
        const fresh = new $Particle();
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(Object.prototype.hasOwnProperty.call(carrier, $cid$)).toBe(true);
        expect((carrier as any)[$cid$]).not.toBe((fresh as any)[$cid$]);
    });

    it('carrier has $type, $symbol, $phases as own properties', () => {
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(Object.prototype.hasOwnProperty.call(carrier, $type$)).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(carrier, $symbol$)).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(carrier, $phases$)).toBe(true);
    });

    it('carrier has $particleMarker$ as an own property and isParticle is true', () => {
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(Object.prototype.hasOwnProperty.call(carrier, $particleMarker$)).toBe(true);
        expect(isParticle(carrier)).toBe(true);
    });

    it('carrier lifts particle methods as own properties', () => {
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(Object.prototype.hasOwnProperty.call(carrier, 'view')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(carrier, 'toString')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(carrier, 'next')).toBe(true);
    });

    it('original object becomes the carrier prototype', () => {
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(Object.getPrototypeOf(carrier)).toBe(err);
    });

    it('carrier is `instanceof Error` (because Error.prototype is reachable via prototype chain)', () => {
        const err = new Error('boom');
        const carrier = new $Particle(err);
        expect(carrier instanceof Error).toBe(true);
    });

    it('original object is left untouched (no marker, no lifted methods, no own particle props)', () => {
        const err = new Error('boom');
        const before = Object.getPrototypeOf(err);
        new $Particle(err);
        expect(Object.getPrototypeOf(err)).toBe(before);
        expect(Object.prototype.hasOwnProperty.call(err, $particleMarker$)).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(err, $cid$)).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(err, 'view')).toBe(false);
    });

    it('carrier exposes own data of the original via prototype lookup', () => {
        const err = new Error('boom');
        (err as any).code = 'EBOOM';
        const carrier: any = new $Particle(err);
        expect(carrier.message).toBe('boom');
        expect(carrier.code).toBe('EBOOM');
    });

    it('particularizing a particle is a no-op (returns the same particle)', () => {
        const original = new $Particle();
        const result: any = new $Particle(original as any);
        expect(result).toBe(original);
    });

    it('particularizing a chemical is a no-op (chemicals are already particles)', () => {
        class $Foo extends $Chemical {}
        new $Foo();
        const c = new $Foo();
        const result: any = new $Particle(c as any);
        expect(result).toBe(c);
    });

    it('two particularizations of the same error get distinct cids', () => {
        const err = new Error('boom');
        const c1: any = new $Particle(err);
        const c2: any = new $Particle(err);
        expect(c1[$cid$]).not.toBe(c2[$cid$]);
        // Both reach the same underlying error object via prototype.
        expect(Object.getPrototypeOf(c1)).toBe(err);
        expect(Object.getPrototypeOf(c2)).toBe(err);
    });

    it('particle methods on the carrier still produce a unique $Chemistry symbol', () => {
        const err = new Error('boom');
        const carrier: any = new $Particle(err);
        expect(carrier.toString()).toMatch(/^\$Chemistry\.\$Particle\[\d+\]$/);
    });
});
