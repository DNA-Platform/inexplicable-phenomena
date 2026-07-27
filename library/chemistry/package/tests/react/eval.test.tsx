import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, $Html$, $Function$ } from '@/abstraction/chemical';

// $(<X>…</X>) — the eval form. `$` runs an element through the SAME synthesis that
// binds a bond constructor's children, and hands back the materialized instance.
// These assert what that instance actually is, for each kind of child.

describe('$ eval — an element evaluates into a live instance', () => {
    it('a chemical element becomes its instance, content applied', () => {
        class $Word extends $Chemical {
            view() { return <span className="w">{this.children}</span>; }
        }
        const Word = $($Word);
        const w = $(<Word>hello</Word>);
        expect(w).toBeInstanceOf($Word);
        expect(w.children).toBe('hello');      // children set via the real synthesis
    });

    it('the eval\'d instance is renderable', () => {
        class $Word extends $Chemical {
            view() { return <span className="w">{this.children}</span>; }
        }
        const Word = $($Word);
        const w = $(<Word>hello</Word>);
        const W = $(w);                          // instance → Component
        const { container } = render(<W />);
        expect(container.querySelector('.w')?.textContent).toBe('hello');
    });

    it('a $-prop passes through eval', () => {
        class $Tag extends $Chemical {
            $label = '';
            view() { return <b>{this.$label}</b>; }
        }
        const Tag = $($Tag);
        const t = $(<Tag label="x" />) as any;   // JSX prop `label` → chemical.$label
        expect(t.$label).toBe('x');
    });

    it('an HTML element becomes an $Html$, tag and content intact', () => {
        const d = $(<div className="d">hi</div>) as any;
        expect(d).toBeInstanceOf($Html$);
        expect(d.type).toBe('div');
        expect(d.children).toBe('hi');
    });

    it('a function component becomes a $Function$', () => {
        function Badge() { return <span className="badge">b</span>; }
        const f = $(<Badge />);
        expect(f).toBeInstanceOf($Function$);
    });

    it('mixed text + HTML content survives as the instance\'s children', () => {
        const p = $(<p>Call me <b>Ishmael</b></p>) as any;
        expect(p).toBeInstanceOf($Html$);
        const kids = React.Children.toArray(p.children);
        expect(kids[0]).toBe('Call me ');        // the raw text run is preserved on children
        expect(React.isValidElement(kids[1])).toBe(true);
    });
});
