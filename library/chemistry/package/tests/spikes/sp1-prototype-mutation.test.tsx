import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// SP-1 quick verification: does reactive bond installation actually mutate
// $Foo.prototype today? If not, Doug's concern is unfounded and the only
// remaining work is to PIN this invariant with a regression test.

describe('SP-1 — prototype mutation check', () => {
    it('reactive prop accessors do NOT land on the class prototype', () => {
        class $Foo extends $Chemical {
            $count? = 0;
            view() { return <span>{this.$count}</span>; }
        }
        const beforeNames = Object.getOwnPropertyNames($Foo.prototype).slice().sort();
        const beforeSyms = Object.getOwnPropertySymbols($Foo.prototype).slice();
        const f = new $Foo();
        const C = $(f);
        render(<C />);
        const afterNames = Object.getOwnPropertyNames($Foo.prototype).slice().sort();
        const afterSyms = Object.getOwnPropertySymbols($Foo.prototype).slice();
        expect(afterNames).toEqual(beforeNames);
        expect(afterSyms.length).toBe(beforeSyms.length);
        const desc = Object.getOwnPropertyDescriptor($Foo.prototype, '$count');
        expect(desc).toBeUndefined();
    });

    it('the reactive accessor IS installed as an own property on the instance', () => {
        class $Bar extends $Chemical {
            $count? = 0;
            view() { return <span>{this.$count}</span>; }
        }
        const b = new $Bar();
        const C = $(b);
        render(<C />);
        const desc = Object.getOwnPropertyDescriptor(b, '$count');
        expect(desc).toBeDefined();
        expect(typeof desc!.get).toBe('function');
        expect(typeof desc!.set).toBe('function');
    });

    it('two separate instances of the same class do not share state through the prototype', () => {
        class $Baz extends $Chemical {
            $count? = 0;
            view() { return <span>{this.$count}</span>; }
        }
        const a = new $Baz();
        const b = new $Baz();
        const Ca = $(a);
        const Cb = $(b);
        render(<Ca />);
        render(<Cb />);
        (a as any).$count = 7;
        expect((a as any).$count).toBe(7);
        expect((b as any).$count).toBe(0);
    });
});
