import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// =============================================================================
// $new() — Clone Behavior
//
// $new() creates a new chemical via Object.create(source). The clone inherits
// from the source through JavaScript's prototype chain:
//   - READS that haven't been shadowed fall through to the source
//   - WRITES create own properties on the clone, shadowing the source
//   - Once shadowed, the clone and source are independent for that property
//
// The framework uses a backing-store pattern: reactive properties read/write
// via this[$backing$][prop], where the backing store ALSO uses prototype
// inheritance (Object.create(parent.$backing$)). This means source writes
// are visible to unshadowed clones at the data level.
//
// The key question: does the clone RE-RENDER when the source changes?
// Template derivatives ($lift of a template) use the $derivatives$ set for
// broadcasting. $new() clones currently DON'T register in $derivatives$.
// =============================================================================


class $ThemeCard extends $Chemical {
    color = 'blue';
    size = 'medium';
    clicks = 0;

    setColor(c: string) { this.color = c; }
    setSize(s: string) { this.size = s; }
    click() { this.clicks++; }

    view() {
        return (
            <div className="card" data-color={this.color} data-size={this.size}>
                <span className="color">{this.color}</span>
                <span className="size">{this.size}</span>
                <span className="clicks">{String(this.clicks)}</span>
                <button className="click" onClick={this.click}>click</button>
            </div>
        );
    }
}
new $ThemeCard();


// =============================================================================
// 1. Basic: configured source → clone → functionally new
// =============================================================================

describe('$new() — configured component produces a new component', () => {
    it('clone starts with the source configuration', () => {
        const source = new $ThemeCard();
        source.color = 'red';
        source.size = 'large';
        const clone = source.$new();
        const C = $(clone);

        const { container } = render(<C />);
        expect(container.querySelector('.color')!.textContent).toBe('red');
        expect(container.querySelector('.size')!.textContent).toBe('large');
    });

    it('clone has its own identity — different cid and symbol', () => {
        const source = new $ThemeCard();
        const clone = source.$new();

        const S = $(source);
        const C = $(clone);

        expect(S).not.toBe(C);

        const { container } = render(
            <div>
                <div className="s"><S /></div>
                <div className="c"><C /></div>
            </div>
        );

        expect(container.querySelectorAll('.card').length).toBe(2);
    });

    it('clicking clone does not affect source', async () => {
        const source = new $ThemeCard();
        const clone = source.$new();
        const S = $(source);
        const C = $(clone);

        const { container } = render(
            <div>
                <div className="s"><S /></div>
                <div className="c"><C /></div>
            </div>
        );

        await act(async () => {
            fireEvent.click(container.querySelector('.c .click')!);
        });
        await act(async () => {
            fireEvent.click(container.querySelector('.c .click')!);
        });
        await act(async () => {
            fireEvent.click(container.querySelector('.c .click')!);
        });

        expect(container.querySelector('.c .clicks')!.textContent).toBe('3');
        expect(container.querySelector('.s .clicks')!.textContent).toBe('0');
    });

    it('multiple clones from same source are independent', async () => {
        const source = new $ThemeCard();
        source.color = 'green';
        const a = source.$new();
        const b = source.$new();
        const c = source.$new();

        const A = $(a);
        const B = $(b);
        const C = $(c);

        const { container } = render(
            <div>
                <div className="a"><A /></div>
                <div className="b"><B /></div>
                <div className="c"><C /></div>
            </div>
        );

        // All start green
        expect(container.querySelector('.a .color')!.textContent).toBe('green');
        expect(container.querySelector('.b .color')!.textContent).toBe('green');
        expect(container.querySelector('.c .color')!.textContent).toBe('green');

        // Change one — others unaffected
        await act(async () => { a.color = 'purple'; });
        expect(container.querySelector('.a .color')!.textContent).toBe('purple');
        expect(container.querySelector('.b .color')!.textContent).toBe('green');
        expect(container.querySelector('.c .color')!.textContent).toBe('green');
    });
});


// =============================================================================
// 2. Shadowing: once a clone writes, it's fundamentally changed for that prop
// =============================================================================

describe('$new() — property shadowing', () => {
    it('clone can override one property while inheriting others', async () => {
        const source = new $ThemeCard();
        source.color = 'red';
        source.size = 'large';
        const clone = source.$new();
        const C = $(clone);

        const { container } = render(<C />);

        // Override only color
        await act(async () => { clone.color = 'blue'; });
        expect(container.querySelector('.color')!.textContent).toBe('blue');
        // Size still inherited from source
        expect(container.querySelector('.size')!.textContent).toBe('large');
    });

    it('shadowed property stays independent even if source changes later', async () => {
        const source = new $ThemeCard();
        source.color = 'red';
        const clone = source.$new();

        // Shadow color on clone
        clone.color = 'blue';

        const S = $(source);
        const C = $(clone);

        const { container } = render(
            <div>
                <div className="s"><S /></div>
                <div className="c"><C /></div>
            </div>
        );

        expect(container.querySelector('.c .color')!.textContent).toBe('blue');

        // Source changes color — clone should NOT follow
        await act(async () => { source.color = 'yellow'; });
        expect(container.querySelector('.s .color')!.textContent).toBe('yellow');
        expect(container.querySelector('.c .color')!.textContent).toBe('blue');
    });
});


// =============================================================================
// 3. Broadcasting: source writes propagate to unshadowed clone properties
//
// This is the prototype inheritance at work. Source writes to its backing
// store; clone's backing store inherits via Object.create, so the value
// is visible. But the RENDERING needs to update too — currently $new()
// clones are NOT in the source's $derivatives$ set, so they may not
// re-render when the source changes.
// =============================================================================

describe('$new() — prototype broadcasting (source changes reach unshadowed clones)', () => {
    it.fails('clone re-renders when source changes an unshadowed property', async () => {
        const source = new $ThemeCard();
        source.color = 'red';
        const clone = source.$new();

        const S = $(source);
        const C = $(clone);

        const { container } = render(
            <div>
                <div className="s"><S /></div>
                <div className="c"><C /></div>
            </div>
        );

        // Both start red
        expect(container.querySelector('.s .color')!.textContent).toBe('red');
        expect(container.querySelector('.c .color')!.textContent).toBe('red');

        // Source changes to green — clone should follow (unshadowed)
        await act(async () => { source.color = 'green'; });
        expect(container.querySelector('.s .color')!.textContent).toBe('green');
        // This is the broadcasting gap: clone should re-render and show 'green'
        expect(container.querySelector('.c .color')!.textContent).toBe('green');
    });

    it.fails('source broadcast stops for a property once the clone shadows it', async () => {
        const source = new $ThemeCard();
        source.color = 'red';
        source.size = 'small';
        const clone = source.$new();

        // Shadow ONLY color
        clone.color = 'blue';

        const S = $(source);
        const C = $(clone);

        const { container } = render(
            <div>
                <div className="s"><S /></div>
                <div className="c"><C /></div>
            </div>
        );

        // Source changes both
        await act(async () => {
            source.color = 'yellow';
            source.size = 'large';
        });

        expect(container.querySelector('.s .color')!.textContent).toBe('yellow');
        expect(container.querySelector('.s .size')!.textContent).toBe('large');

        // Clone's color is shadowed (stays blue), but size should follow
        expect(container.querySelector('.c .color')!.textContent).toBe('blue');
        expect(container.querySelector('.c .size')!.textContent).toBe('large');
    });
});


// =============================================================================
// 4. Clone state persists across unmount/remount
// =============================================================================

describe('$new() — state persistence', () => {
    it('clone state survives unmount/remount', async () => {
        const source = new $ThemeCard();
        const clone = source.$new();
        const C = $(clone);

        const r1 = render(<C />);
        await act(async () => { clone.color = 'purple'; });
        await act(async () => { clone.clicks = 5; });
        expect(r1.container.querySelector('.color')!.textContent).toBe('purple');
        expect(r1.container.querySelector('.clicks')!.textContent).toBe('5');
        r1.unmount();

        const r2 = render(<C />);
        expect(r2.container.querySelector('.color')!.textContent).toBe('purple');
        expect(r2.container.querySelector('.clicks')!.textContent).toBe('5');
    });

    it('external mutation while unmounted shows on remount', async () => {
        const source = new $ThemeCard();
        const clone = source.$new();
        const C = $(clone);

        const r1 = render(<C />);
        r1.unmount();

        clone.color = 'orange';
        clone.clicks = 42;

        const r2 = render(<C />);
        expect(r2.container.querySelector('.color')!.textContent).toBe('orange');
        expect(r2.container.querySelector('.clicks')!.textContent).toBe('42');
    });
});


// =============================================================================
// 5. Practical scenario: theme preset system
//
// A configured "base" component serves as a template for creating themed
// variants. Each variant starts with the base configuration but can be
// individually customized. This is the kind of "cool thing" $new() enables.
// =============================================================================

describe('$new() — practical: theme preset system', () => {
    it('create themed variants from a configured base', async () => {
        class $Button extends $Chemical {
            $label = 'Button';
            color = 'gray';
            rounded = false;
            pressed = false;

            press() { this.pressed = true; }

            view() {
                return (
                    <button
                        className={`btn ${this.pressed ? 'pressed' : ''}`}
                        data-color={this.color}
                        onClick={this.press}
                    >
                        {this.$label} {this.rounded ? '●' : '■'}
                    </button>
                );
            }
        }

        // Configure a "primary" preset
        const primary = new $Button();
        primary.color = 'blue';
        primary.rounded = true;

        // Create variants from the preset
        const submitBtn = primary.$new();
        submitBtn.$label = 'Submit';

        const cancelBtn = primary.$new();
        cancelBtn.$label = 'Cancel';
        cancelBtn.color = 'red'; // override color but keep rounded

        const Submit = $(submitBtn);
        const Cancel = $(cancelBtn);

        const { container } = render(
            <div>
                <div className="submit"><Submit /></div>
                <div className="cancel"><Cancel /></div>
            </div>
        );

        const submitEl = container.querySelector('.submit .btn') as HTMLButtonElement;
        const cancelEl = container.querySelector('.cancel .btn') as HTMLButtonElement;

        // Submit inherits blue + rounded from primary
        expect(submitEl.getAttribute('data-color')).toBe('blue');
        expect(submitEl.textContent).toContain('Submit');
        expect(submitEl.textContent).toContain('●');

        // Cancel overrode color to red, but kept rounded
        expect(cancelEl.getAttribute('data-color')).toBe('red');
        expect(cancelEl.textContent).toContain('Cancel');
        expect(cancelEl.textContent).toContain('●');

        // Press submit — cancel unaffected
        await act(async () => { fireEvent.click(submitEl); });
        expect(submitEl.classList.contains('pressed')).toBe(true);
        expect(cancelEl.classList.contains('pressed')).toBe(false);
    });

    it('clone chain: clone of clone inherits through multiple levels', () => {
        const base = new $ThemeCard();
        base.color = 'white';
        base.size = 'small';

        const level1 = base.$new();
        level1.color = 'red';

        const level2 = level1.$new();
        level2.size = 'large';

        const L2 = $(level2);
        const { container } = render(<L2 />);

        // color: inherited from level1 (red), not base (white)
        expect(container.querySelector('.color')!.textContent).toBe('red');
        // size: overridden at level2 (large), not base (small) or level1 (small)
        expect(container.querySelector('.size')!.textContent).toBe('large');
    });
});
