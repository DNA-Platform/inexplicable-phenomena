import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $Error } from '../specimens/error';
import { isParticle } from '@/abstraction/particle';
import type { I } from '@/implementation/types';

describe('$Error — a particle that wraps a real Error', () => {
    it('constructor takes an Error and produces a particle', () => {
        const e = new Error('boom');
        const wrapped = new $Error(e);
        expect(isParticle(wrapped)).toBe(true);
    });

    it('carrier exposes the original error message and name via prototype', () => {
        const e = new Error('boom');
        const wrapped = new $Error(e) as any;
        expect(wrapped.message).toBe('boom');
        expect(wrapped.name).toBe('Error');
    });

    it('carrier still passes `instanceof Error`', () => {
        const e = new Error('boom');
        const wrapped = new $Error(e);
        expect(wrapped instanceof Error).toBe(true);
    });

    it('original error is left untouched', () => {
        const e = new Error('boom');
        const before = Object.getPrototypeOf(e);
        new $Error(e);
        expect(Object.getPrototypeOf(e)).toBe(before);
    });

    it('view() renders error name and message', () => {
        const e = new Error('something went wrong');
        const wrapped = new $Error(e);
        const { container } = render(<>{wrapped.view()}</>);
        expect(container.textContent).toContain('Error');
        expect(container.textContent).toContain('something went wrong');
    });

    it('static $Error.view(error) returns a typed carrier', () => {
        const e = new Error('boom');
        const carrier: I<$Error> & I<Error> = $Error.view(e);
        // Compile-time: carrier has both surfaces. Runtime spot-checks:
        expect((carrier as any).message).toBe('boom');
        expect(typeof (carrier as any).view).toBe('function');
    });
});

// I<T> compile-time shape checks — type-only, validated by tsc.
{
    type _ErrorIface = I<Error>;
    type _ParticleErrorIface = I<$Error>;
    type _Combined = I<$Error> & I<Error>;
    void (null as unknown as _ErrorIface);
    void (null as unknown as _ParticleErrorIface);
    void (null as unknown as _Combined);
}
