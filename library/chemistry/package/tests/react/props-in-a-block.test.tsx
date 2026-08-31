import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { $, $Block, $check, $Chemical } from '../../src/index';

// Props are construction, not mutation.
//
// A chemical written inside another chemical's writing is BUILT during that
// chemical's render, and handed its props there. Recording those writes as
// changes marked the running scope dirty, so the host rendered again, built the
// child again, and never settled: the host looped and the child never rendered
// once. Standalone it was fine; with no prop it was fine; block-level it was
// fine. Only an inline child, passed a prop, inside a block.

// The host keeps the WHOLE sequence it is handed: inline runs grouped into
// blocks, and block-level children as arguments of their own. A host that keeps
// only the first argument drops every block-level child written into it.
class $Host extends $Chemical {
    written: unknown[] = [];
    $Host(...parts: unknown[]) {
        $check(parts[0] as $Block, 'block');
        this.written = parts;
    }
    view(): ReactNode {
        return this.written.map((part, i) => React.createElement($(part as any) as any, { key: i }));
    }
}
const Host = $($Host);

class $Marked extends $Chemical {
    $label = '';
    constructor() { super(); this.inline = true; }
    get label(): string { return this.$label; }
    view(): ReactNode { return <span className="marked">{this.label}</span>; }
}
const Marked = $($Marked);

class $Plain extends $Chemical {
    constructor() { super(); this.inline = true; }
    view(): ReactNode { return <span className="plain">plain</span>; }
}
const Plain = $($Plain);

class $Blocked extends $Chemical {
    $label = '';
    constructor() { super(); this.inline = false; }
    get label(): string { return this.$label; }
    view(): ReactNode { return <div className="blocked">{this.label}</div>; }
}
const Blocked = $($Blocked);

describe('props are construction — a propped child inside a block settles', () => {
    it('an inline child passed a prop, inside a block, renders and settles', () => {
        const { container } = render(<Host>before <Marked label="plate">x</Marked> after</Host>);
        expect(container.querySelector('.marked')!.textContent).toBe('plate');
        expect(container.textContent).toContain('before');
        expect(container.textContent).toContain('after');
    });

    it('an inline child with no prop still settles', () => {
        const { container } = render(<Host>before <Plain>x</Plain> after</Host>);
        expect(container.querySelector('.plain')).not.toBeNull();
    });

    it('the same child passed a prop standing alone settles', () => {
        const { container } = render(<Marked label="plate">x</Marked>);
        expect(container.querySelector('.marked')!.textContent).toBe('plate');
    });

    it('a block-level child passed a prop, inside a block, settles', () => {
        const { container } = render(<Host>before <Blocked label="plate">x</Blocked> after</Host>);
        expect(container.querySelector('.blocked')!.textContent).toBe('plate');
    });

    it('a child that maps a prop in a method its view calls renders its data', () => {
        class $Drawn extends $Chemical {
            $items: string[] = [];
            constructor() { super(); this.inline = true; }
            get items(): string[] { return this.$items; }
            view(): ReactNode { return <span className="drawn">{this.drawn()}</span>; }
            drawn(): ReactNode { return this.items.map(k => <b key={k}>{k}</b>); }
        }
        const Drawn = $($Drawn);
        const { container } = render(<Host>before <Drawn items={['x', 'y']}>c</Drawn> after</Host>);
        expect(container.querySelector('.drawn')!.textContent).toBe('xy');
    });
});
