import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// =============================================================================
// The bond constructor chain — Sprint 48, U1 and U2.
//
// The framework invokes only the most-derived bond constructor on a class
// chain. Every ancestor that declares one is reached by the author calling
// upward, the way a C# constructor calls another, and arguments may be
// adapted on the way. A chain that fails to reach a declared ancestor is
// invalid, naming the ancestor never reached.
//
// A subclass that declares NO bond constructor still binds through its
// ancestor's, unchanged — the standing ban on ceremonial constructors
// survives this change untouched.
// =============================================================================

class $Item extends $Chemical {
    $name? = 'item';
    view() { return <span className="item">{this.$name}</span>; }
}

const Item = $($Item);

describe('U1 — the chain is callable, and the author calls upward', () => {
    it('reaches every declared constructor on a three-class chain, most-derived first', () => {
        const order: string[] = [];

        class $Base extends $Chemical {
            parts: $Item[] = [];
            $Base(...items: $Item[]) { order.push('Base'); this.parts = items; }
            view() { return <div className="base">{this.parts.length}</div>; }
        }

        class $Middle extends $Base {
            $Middle(...items: $Item[]) { order.push('Middle'); this.$Base(...items); }
        }

        class $Leaf extends $Middle {
            $Leaf(...items: $Item[]) { order.push('Leaf'); this.$Middle(...items); }
        }

        const Leaf = $($Leaf);
        const { container } = render(<Leaf><Item /><Item /></Leaf>);

        expect(order).toEqual(['Leaf', 'Middle', 'Base']);
        expect(container.querySelector('.base')?.textContent).toBe('2');
    });

    it('binds through the ancestor when a subclass declares none — the ceremonial ban survives', () => {
        const order: string[] = [];

        class $Ancestor extends $Chemical {
            parts: $Item[] = [];
            $Ancestor(...items: $Item[]) { order.push('Ancestor'); this.parts = items; }
            view() { return <div className="ancestor">{this.parts.length}</div>; }
        }

        class $Silent extends $Ancestor { }

        const Silent = $($Silent);
        const { container } = render(<Silent><Item /></Silent>);

        expect(order).toEqual(['Ancestor']);
        expect(container.querySelector('.ancestor')?.textContent).toBe('1');
    });

    it('counts the upward call whether it is written with this or with super', () => {
        const order: string[] = [];

        class $Crate extends $Chemical {
            parts: $Item[] = [];
            $Crate(...items: $Item[]) { order.push('Crate'); this.parts = items; }
            view() { return <div className="crate">{this.parts.length}</div>; }
        }

        class $Carton extends $Crate {
            $Carton(...items: $Item[]) { order.push('Carton'); super.$Crate(...items); }
        }

        const Carton = $($Carton);
        const { container } = render(<Carton><Item /><Item /></Carton>);

        expect(order).toEqual(['Carton', 'Crate']);
        expect(container.querySelector('.crate')?.textContent).toBe('2');
        expect(container.textContent).not.toContain('did not call');
    });

    it('lets the author adapt arguments on the way up', () => {
        class $Whole extends $Chemical {
            parts: $Item[] = [];
            $Whole(...items: $Item[]) { this.parts = items; }
            view() { return <div className="whole">{this.parts.length}</div>; }
        }

        class $Narrowed extends $Whole {
            $Narrowed(...items: $Item[]) { this.$Whole(items[0]); }
        }

        const Narrowed = $($Narrowed);
        const { container } = render(<Narrowed><Item /><Item /><Item /></Narrowed>);

        expect(container.querySelector('.whole')?.textContent).toBe('1');
    });

    it('lets a subclass configure, call its parent, then continue on what the parent did', () => {
        const order: string[] = [];

        class $Ledger extends $Chemical {
            parts: $Item[] = [];
            prefix = '';
            $Ledger(...items: $Item[]) { order.push('parent'); this.parts = items; }
            view() { return <div className="ledger">{this.prefix}{this.parts.length}</div>; }
        }

        class $Tally extends $Ledger {
            $Tally(...items: $Item[]) {
                order.push('before');
                this.prefix = 'n=';
                super.$Ledger(...items);
                order.push('after');
                if (!this.parts.length) throw new Error('A tally requires items.');
            }
        }

        const Tally = $($Tally);
        const { container } = render(<Tally><Item /><Item /></Tally>);

        expect(order).toEqual(['before', 'parent', 'after']);
        expect(container.querySelector('.ledger')?.textContent).toBe('n=2');
    });

    it('lets the continuing part state its own reason, in its own words', () => {
        class $Ledger extends $Chemical {
            parts: $Item[] = [];
            $Ledger(...items: $Item[]) { this.parts = items; }
            view() { return <div className="ledger">{this.parts.length}</div>; }
        }

        class $Tally extends $Ledger {
            $Tally(...items: $Item[]) {
                super.$Ledger(...items);
                if (!this.parts.length) throw new Error('A tally requires items.');
            }
        }

        const Tally = $($Tally);
        const { container } = render(<Tally>{null}</Tally>);

        expect(container.textContent).toContain('A tally requires items.');
    });
});

describe('U2 — a chain that does not reach a declared ancestor is invalid', () => {
    it('fails validation when a subclass declares a constructor and never calls upward, naming the ancestor', () => {
        class $Governed extends $Chemical {
            parts: $Item[] = [];
            $Governed(...items: $Item[]) { this.parts = items; }
            view() { return <div className="governed">{this.parts.length}</div>; }
        }

        class $Escaped extends $Governed {
            $Escaped(...items: $Item[]) { this.parts = items; }
        }

        const Escaped = $($Escaped);
        const { container } = render(<Escaped><Item /></Escaped>);

        expect(container.textContent).toContain('$Governed');
        expect(container.querySelector('.governed')).toBeNull();
    });

    it('stands when the only declared constructor is the one the framework called', () => {
        class $Alone extends $Chemical {
            parts: $Item[] = [];
            $Alone(...items: $Item[]) { this.parts = items; }
            view() { return <div className="alone">{this.parts.length}</div>; }
        }

        const Alone = $($Alone);
        const { container } = render(<Alone><Item /><Item /></Alone>);

        expect(container.querySelector('.alone')?.textContent).toBe('2');
    });
});
