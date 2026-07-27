import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, $Html$, $check } from '@/abstraction/chemical';

// The block/inline content model, framework level. `string`, `number`, `block` are
// intrinsic elements that lift through the SAME HTML path as real tags — no extra
// classes. The parser that GROUPS inline runs into blocks (in the bond-constructor
// path, one level deep) is the next, separate stage.

describe('inline / block on the $Html$ abstraction', () => {
    it('inline is read from the type: string/number/inline-tags inline; block/div block', () => {
        expect(new $Html$('string').inline).toBe(true);
        expect(new $Html$('number').inline).toBe(true);
        expect(new $Html$('block').inline).toBe(false);
        expect(new $Html$('span').inline).toBe(true);
        expect(new $Html$('em').inline).toBe(true);
        expect(new $Html$('div').inline).toBe(false);
        expect(new $Html$('p').inline).toBe(false);
    });

    it('a string node lifts through the HTML path and renders its $value', () => {
        const s = $(<string value="hi" />);
        expect(s).toBeInstanceOf($Html$);
        expect(s.inline).toBe(true);
        expect(s.$value).toBe('hi');
        const S = $(s);
        const { container } = render(<S />);
        expect(container.textContent).toBe('hi');
    });

    it('a number node renders its $value', () => {
        const n = $(<number value={5} />);
        const N = $(n);
        const { container } = render(<N />);
        expect(container.textContent).toBe('5');
    });

    it('an inline HTML element lifts to an inline $Html$ and renders its content', () => {
        const b = $(<b>bold</b>);
        expect(b).toBeInstanceOf($Html$);
        expect(b.inline).toBe(true);
        const B = $(b);
        const { container } = render(<B />);
        expect(container.querySelector('b')?.textContent).toBe('bold');
    });

    it('the parser groups an inline run into one block that renders its text', () => {
        let received: any[] = [];
        class $Host extends $Chemical {
            $Host(...parts: any[]) { received = parts; }
            view() { return <div className="host" />; }
        }
        const Host = $($Host);
        render(<Host>Call me <b>Ishmael</b> today</Host>);
        expect(received.length).toBe(1);            // the whole inline run collapses to one block
        expect(received[0].type).toBe('block');
        expect(received[0].inline).toBe(false);
        const Blk = $(received[0]);
        const { container } = render(<Blk />);
        expect(container.textContent).toBe('Call me Ishmael today');
    });

    it('a plain $Chemical is block by default', () => {
        class $Thing extends $Chemical { view() { return <i />; } }
        expect(new $Thing().inline).toBe(false);
    });

    it('a block exposes its inline members as readable $Html nodes (text + tags)', () => {
        let block: any;
        class $Host extends $Chemical {
            $Host(...p: any[]) { block = p[0]; }
            view() { return <div />; }
        }
        const Host = $($Host);
        render(<Host>Call me <b>Ishmael</b>!</Host>);
        const els = block.$elements;
        expect(els.length).toBe(3);
        expect(els[0].type).toBe('string');
        expect(els[0].$value).toBe('Call me ');
        expect(els[1].type).toBe('b');
        expect(els[1].children).toBe('Ishmael');   // a tag exposes its content as children
        expect(els[2].$value).toBe('!');
    });

    it('a caller can render a received block elsewhere — wrapped in a span for styling', () => {
        let block: any;
        class $Host extends $Chemical {
            $Host(...parts: any[]) { block = parts[0]; }
            view() { return <div className="host" />; }   // host does NOT render the block
        }
        const Host = $($Host);
        render(<Host>Call me <b>Ishmael</b> today</Host>);
        // The caller takes the block and renders it wherever they like.
        const B = $(block);
        const { container } = render(<span className="styled"><B /></span>);
        expect(container.querySelector('.styled')?.textContent).toBe('Call me Ishmael today');
        expect(container.querySelector('.styled b')?.textContent).toBe('Ishmael');   // the live span survives
    });

    it('empty content yields no block — the bond constructor gets undefined', () => {
        let received: any[] = ['sentinel'];
        class $Host extends $Chemical {
            $Host(...p: any[]) { received = p; }
            view() { return <div />; }
        }
        const Host = $($Host);
        render(<Host>{null}</Host>);
        expect(received.length).toBe(0);
        expect(received[0]).toBeUndefined();   // raw: no phantom block — the bond ctor gets undefined
    });

    it('$check(undefined, "block") mints an empty block instead of throwing', () => {
        const block = $check(undefined, 'block') as any;
        expect(block).toBeInstanceOf($Html$);
        expect(block.type).toBe('block');
        const B = $(block);
        const { container } = render(<B />);
        expect(container.textContent).toBe('');   // empty block renders nothing
    });

    it('a bond ctor using $check(x, "block") always gets a block — empty content included', () => {
        let received: any;
        class $Prose extends $Chemical {
            block: any;
            $Prose(block?: any) { this.block = $check(block, 'block'); received = this.block; }
            view() { return <div />; }
        }
        const Prose = $($Prose);
        render(<Prose>{null}</Prose>);   // empty content
        expect(received).toBeInstanceOf($Html$);
        expect(received.type).toBe('block');   // never undefined — no null-check needed
    });
});
