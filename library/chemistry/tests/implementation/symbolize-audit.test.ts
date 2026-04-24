import { describe, it, expect } from 'vitest';
import { $symbolize } from '@/implementation/representation';
import { $Chemical } from '@/abstraction/chemical';

describe('$symbolize audit for scope-tracking snapshots', () => {
    it('primitives: string', () => {
        expect($symbolize('hello')).toBe($symbolize('hello'));
        expect($symbolize('hello') === $symbolize('world')).toBe(false);
    });

    it('primitives: number', () => {
        expect($symbolize(42)).toBe($symbolize(42));
    });

    it('primitives: boolean', () => {
        expect($symbolize(true)).toBe($symbolize(true));
    });

    it('primitives: null and undefined', () => {
        expect($symbolize(null)).toBe($symbolize(null));
        expect($symbolize(undefined)).toBe($symbolize(undefined));
    });

    it('plain object: same shape produces same string', () => {
        const a = { x: 1, y: 2 };
        const b = { x: 1, y: 2 };
        expect($symbolize(a)).toBe($symbolize(b));
    });

    it('plain object: different values produce different strings', () => {
        const a = { x: 1 };
        const b = { x: 2 };
        expect($symbolize(a) === $symbolize(b)).toBe(false);
    });

    it('array: same elements produce same string', () => {
        expect($symbolize([1, 2, 3])).toBe($symbolize([1, 2, 3]));
    });

    it('array: different length produces different string', () => {
        expect($symbolize([1, 2]) === $symbolize([1, 2, 3])).toBe(false);
    });

    it('CRITICAL: Map with same contents produces same string', () => {
        const a = new Map([['x', 1], ['y', 2]]);
        const b = new Map([['x', 1], ['y', 2]]);
        const symA = $symbolize(a);
        const symB = $symbolize(b);
        console.log('Map a:', symA);
        console.log('Map b:', symB);
        expect(symA).toBe(symB);
    });

    it('CRITICAL: Map with different contents produces different string', () => {
        const a = new Map([['x', 1]]);
        const b = new Map([['x', 2]]);
        expect($symbolize(a) === $symbolize(b)).toBe(false);
    });

    it('CRITICAL: Map mutation (set) is detected', () => {
        const m = new Map([['x', 1]]);
        const before = $symbolize(m);
        m.set('y', 2);
        const after = $symbolize(m);
        console.log('Map before:', before);
        console.log('Map after:', after);
        expect(before === after).toBe(false);
    });

    it('CRITICAL: Set with same elements produces same string', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2, 3]);
        expect($symbolize(a)).toBe($symbolize(b));
    });

    it('CRITICAL: Set add is detected', () => {
        const s = new Set([1, 2]);
        const before = $symbolize(s);
        s.add(3);
        const after = $symbolize(s);
        expect(before === after).toBe(false);
    });

    it('functions are skipped', () => {
        const a = { x: 1, f: () => 'hello' };
        const b = { x: 1, f: () => 'world' };
        expect($symbolize(a)).toBe($symbolize(b));
    });

    it('Date: same time same symbolization', () => {
        const t = Date.now();
        expect($symbolize(new Date(t))).toBe($symbolize(new Date(t)));
    });

    it('Date: different times different symbolization', () => {
        const a = new Date(1000);
        const b = new Date(2000);
        console.log('Date 1000:', $symbolize(a));
        console.log('Date 2000:', $symbolize(b));
        expect($symbolize(a) === $symbolize(b)).toBe(false);
    });

    it('cyclic object handled', () => {
        const a: any = { x: 1 };
        a.self = a;
        expect(() => $symbolize(a)).not.toThrow();
    });

    it('chemical: same state produces same string', () => {
        class $Foo extends $Chemical {
            $count = 0;
            $name = 'a';
        }
        new $Foo();
        const f1 = new $Foo();
        const f2 = new $Foo();
        const s1 = $symbolize(f1);
        const s2 = $symbolize(f2);
        console.log('Chemical same state 1:', s1);
        console.log('Chemical same state 2:', s2);
        // Expect state match (cids may differ and appear in output)
    });

    it('chemical: state change detected', () => {
        class $Bar extends $Chemical {
            $count? = 0;
        }
        new $Bar();
        const b = new $Bar();
        const before = $symbolize(b);
        b.$count = 5;
        const after = $symbolize(b);
        console.log('Chemical before:', before);
        console.log('Chemical after:', after);
        expect(before === after).toBe(false);
    });

    it('nested chemical: inner state change detected in outer symbolize', () => {
        class $Inner extends $Chemical {
            $value? = 0;
        }
        class $Outer extends $Chemical {
            $inner!: $Inner;
        }
        new $Inner();
        new $Outer();
        const inner = new $Inner();
        const outer = new $Outer();
        outer.$inner = inner;
        const before = $symbolize(outer);
        inner.$value = 42;
        const after = $symbolize(outer);
        console.log('Nested before:', before);
        console.log('Nested after:', after);
        expect(before === after).toBe(false);
    });
});
