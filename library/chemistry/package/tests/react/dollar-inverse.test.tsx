import { describe, it, expect } from 'vitest';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('$() inverse: $(Component) returns the chemical instance', () => {
    it('class form: $($Foo) → Component → $($Foo) returns the template', () => {
        class $Foo extends $Chemical {
            x = 42;
            view() { return <span>{this.x}</span>; }
        }
        const Foo = $($Foo);
        const instance = $(Foo);
        expect(instance).toBeDefined();
        expect(instance.x).toBe(42);
    });

    it('instance form: $(held) → Component → $(Component) returns the held instance', () => {
        class $Bar extends $Chemical {
            y = 99;
            view() { return <span>{this.y}</span>; }
        }
        new $Bar();
        const held = new $Bar();
        held.y = 7;
        const Bar = $(held);
        const recovered = $(Bar);
        expect(recovered).toBe(held);
        expect(recovered.y).toBe(7);
    });

    it('round-trip: instance → Component → instance is identity', () => {
        class $Baz extends $Chemical {
            view() { return null; }
        }
        new $Baz();
        const b = new $Baz();
        const C = $(b);
        expect($(C)).toBe(b);
    });
});
