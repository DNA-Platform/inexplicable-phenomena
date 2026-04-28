import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// Pin: single-letter reactive prop names like `$v` must be reactive. Prior
// `$Reflection.isSpecial` required `length > 2`, which silently demoted any
// `$<one-char>` prop to inert. Fixed in sprint-24 by changing the gate to
// `length >= 2`.
describe('regression — single-letter $-prefixed reactive props', () => {
    it('held .Component + single mount + external write', async () => {
        class $Inner extends $Chemical {
            $v? = 'default';
            view() { return <span className="x">{this.$v}</span>; }
        }
        new $Inner();
        const inner = new $Inner();
        const C = inner.Component;
        const { container } = render(<C />);
        expect(container.querySelector('.x')!.textContent).toBe('default');
        await act(async () => { inner.$v = 'next'; });
        expect(container.querySelector('.x')!.textContent).toBe('next');
    });

    it('$() dispatch + single mount + external write', async () => {
        class $Inner extends $Chemical {
            $v? = 'default';
            view() { return <span className="x">{this.$v}</span>; }
        }
        new $Inner();
        const inner = new $Inner();
        const C = $(inner) as any;
        const { container } = render(<C />);
        expect(container.querySelector('.x')!.textContent).toBe('default');
        await act(async () => { inner.$v = 'next'; });
        expect(container.querySelector('.x')!.textContent).toBe('next');
    });

    it('$() dispatch + two mounts + external write', async () => {
        class $Inner extends $Chemical {
            $v? = 'default';
            view() { return <span className="x">{this.$v}</span>; }
        }
        new $Inner();
        const inner = new $Inner();
        const C = $(inner) as any;
        const { container } = render(<div><C key="a" /><C key="b" /></div>);
        const xs = container.querySelectorAll('.x');
        expect(xs[0].textContent).toBe('default');
        expect(xs[1].textContent).toBe('default');
        await act(async () => { inner.$v = 'next'; });
        const after = container.querySelectorAll('.x');
        expect(after[0].textContent).toBe('next');
        expect(after[1].textContent).toBe('next');
    });

    it('control: long name $value still works (regression sentinel)', async () => {
        class $Inner extends $Chemical {
            $value? = 'default';
            view() { return <span className="x">{this.$value}</span>; }
        }
        new $Inner();
        const inner = new $Inner();
        const C = $(inner) as any;
        const { container } = render(<C />);
        expect(container.querySelector('.x')!.textContent).toBe('default');
        await act(async () => { inner.$value = 'next'; });
        expect(container.querySelector('.x')!.textContent).toBe('next');
    });
});
