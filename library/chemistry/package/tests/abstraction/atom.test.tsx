import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { $ } from '@/abstraction/chemical';
import { $Atom } from '@/abstraction/atom';
import { hydration } from '@/implementation/hydration';

const settled = async () => { await Promise.resolve(); await Promise.resolve(); };

describe('$Atom — the atomic singleton', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('constructor always returns the same instance, and it persists with the class as its aid', () => {
        class $A extends $Atom {}
        const a = new $A();
        const b = new $A();
        expect(a).toBe(b);
        expect(a.persist).toBe(true);
        expect(a.$pid).toBe('$A');
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

        localStorage.setItem('$Chemistry.hydration', JSON.stringify({ $Later: { count: 42, _persist: true, $pid: '$Later' } }));
        hydration.load();
        class $Later extends $Atom {
            count = 0;
        }
        const later = new $Later();
        await settled();
        expect(later.count).toBe(42);
    });

    it('persist TOGGLES — off clears, on re-enrolls with an immediate snapshot, and writes persist again', async () => {
        class $Toggled extends $Atom {
            count = 0;
        }
        const one = new $Toggled();
        one.count = 5;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('"count":5');
        one.persist = false;
        expect(localStorage.getItem('$Chemistry.hydration')).not.toContain('$Toggled');
        one.persist = true;
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

    it('persist set false clears the browser record, and later writes stay unstored', async () => {
        class $Fickle extends $Atom {
            count = 0;
        }
        const one = new $Fickle();
        one.count = 3;
        await settled();
        expect(localStorage.getItem('$Chemistry.hydration')).toContain('$Fickle');
        one.persist = false;
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

describe('joint syncing — one pid, many live chemicals', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('a write on one converges the others after the flush', async () => {
        class $TwinA extends $Atom {
            count = 0;
        }
        const one = new $TwinA();
        await settled();
        const { $Chemical } = await import('@/abstraction/chemical');
        class $Shadow extends $Chemical {
            count = 0;
        }
        const other = new $Shadow() as any;
        other.$pid = '$TwinA';
        other._persist = true;
        hydration.overwrite(other);
        (one as any).count = 7;
        await settled();
        expect(other.count).toBe(7);
    });
});

describe('composed persistence — multiple persistent parts of different types, interacting', () => {
    beforeEach(() => { hydration.forget(); localStorage.clear(); });

    it('atoms of different types interact and each persists its own state', async () => {
        class $Core extends $Atom {
            heat = 0;
        }
        class $Rod extends $Atom {
            raised = 0;
            pull() { this.raised++; (new $Core() as any).heat += 10; }
        }
        const rod = new $Rod();
        await settled();
        rod.pull();
        rod.pull();
        await settled();
        expect((new $Core() as any).heat).toBe(20);
        const record = localStorage.getItem('$Chemistry.hydration')!;
        expect(record).toContain('"raised":2');
        expect(record).toContain('"heat":20');
    });

    it('persistence is NOT viral — a bond-child persists only by being persistent itself', async () => {
        const { $, $Chemical } = await import('@/abstraction/chemical');
        class $Part extends $Chemical {
            level = 5;
        }
        class $Holder extends $Atom {
            label = 'held';
            $Holder(part: $Part) { }
        }
        const Holder = $($Holder) as any;
        const Part = $($Part) as any;
        const holder = $(<Holder><Part /></Holder>) as any;
        await settled();
        const record = localStorage.getItem('$Chemistry.hydration') ?? '{}';
        expect(record).toContain('$Holder');
        expect(record).not.toContain('level');
        expect(record).not.toContain('$Part');
    });
});
