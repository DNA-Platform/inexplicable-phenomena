import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { $ } from '@/abstraction/chemical';
import { $Atom } from '@/abstraction/atom';
import { hydration } from '@/implementation/hydration';

const settled = async () => { await Promise.resolve(); await Promise.resolve(); };

describe('$Atom — the atomic singleton', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('constructor always returns the same instance, and it is atomic with the class as its aid', () => {
        class $A extends $Atom {}
        const a = new $A();
        const b = new $A();
        expect(a).toBe(b);
        expect(a.atomic).toBe(true);
        expect(a.$aid).toBe('$A');
    });

    it('a write remembers itself, and a later formation recalls it — nothing called by hand', async () => {
        class $Kept extends $Atom {
            count = 0;
        }
        const one = new $Kept();
        await settled();
        one.count = 7;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"count":7');

        localStorage.setItem('$Chemistry.hydration', JSON.stringify({ $Later: { count: 42, _atomic: true, $aid: '$Later' } }));
        hydration.load();
        class $Later extends $Atom {
            count = 0;
        }
        const later = new $Later();
        await settled();
        expect(later.count).toBe(42);
    });

    it('atomic TOGGLES — off clears, on re-enrolls with an immediate snapshot, and writes persist again', async () => {
        class $Toggled extends $Atom {
            count = 0;
        }
        const one = new $Toggled();
        one.count = 5;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"count":5');
        one.atomic = false;
        expect(localStorage.getItem('$Chemistry.hydration')).not.toContain('$Toggled');
        one.atomic = true;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"count":5');
        one.count = 8;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"count":8');
    });

    it('a never-atomic chemical never touches storage', async () => {
        const { $Chemical } = await import('@/abstraction/chemical');
        class $Bystander extends $Chemical {
            count = 0;
        }
        const one = new $Bystander();
        (one as any).count = 9;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toBeNull();
    });

    it('atomic set false clears the browser record, and later writes stay unstored', async () => {
        class $Fickle extends $Atom {
            count = 0;
        }
        const one = new $Fickle();
        one.count = 3;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('$Fickle');
        one.atomic = false;
        expect(localStorage.getItem('$Chemistry.hydration')).not.toContain('$Fickle');
        one.count = 9;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).not.toContain('$Fickle');
    });
});

describe('the hydration cache — the edges', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it("a DRAWN atom's clicks persist — the demo path", async () => {
        class $Jar extends $Atom {
            charge = 0;
            bump() { this.charge++; }
            view() { return <button onClick={this.bump}>+{this.charge}</button>; }
        }
        const Jar = $($Jar);
        const { getByText } = render(<Jar />);
        const settled = async () => { await Promise.resolve(); await Promise.resolve(); };
        await settled();
        fireEvent.click(getByText(/\+/));
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"charge":1');
    });

    it('corrupted storage loads as empty and never throws', () => {
        localStorage.setItem('$Chemistry.hydration', '{not json');
        expect(() => hydration.load()).not.toThrow();
    });

    it('only primitives form — objects and functions stay out of the record', async () => {
        const settled = async () => { await Promise.resolve(); await Promise.resolve(); };
        class $Mixed extends $Atom {
            count = 1;
        }
        const one = new $Mixed();
        (one as any).junk = { a: 1 };
        await settled();
        (one as any).count = 2;
        await settled();
        const record = localStorage.getItem('$Chemistry.hydration')!;
        expect(record).toContain('"count":2');
        expect(record).not.toContain('junk');
    });
});
