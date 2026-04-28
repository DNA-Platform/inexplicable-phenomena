import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';
import { $Particle } from '@/abstraction/particle';
import { registerFilter } from '@/symbolic';

// =============================================================================
// Render filters — cross-cutting interception of view rendering.
//
// $show / $hide are the framework-shipped filter. The registry mechanism is
// extensible — users (or future framework features) can register additional
// filters via $Particle.filter(fn).
//
// Filter contract:
//   (particle) => ReactNode | undefined
//   - undefined: no opinion, continue normal rendering
//   - anything else (including null): short-circuit, that's the output
// =============================================================================


// -----------------------------------------------------------------------------
// $show / $hide — the default visibility filter
// -----------------------------------------------------------------------------

describe('$show — default filter', () => {
    it('renders by default (no $show, no $hide)', () => {
        class $X extends $Chemical {
            view() { return React.createElement('span', null, 'visible'); }
        }
        new $X();
        const { container } = render(React.createElement($($X) as any));
        expect(container.textContent).toBe('visible');
    });

    it('hides when $show is explicitly false', () => {
        class $X extends $Chemical {
            view() { return React.createElement('span', null, 'should-not-show'); }
        }
        new $X();
        const { container } = render(
            React.createElement($($X) as any, { show: false } as any)
        );
        expect(container.textContent).toBe('');
        expect(container.querySelector('span')).toBeNull();
    });

    it('hides when $hide is explicitly true', () => {
        class $X extends $Chemical {
            view() { return React.createElement('span', null, 'should-not-show'); }
        }
        new $X();
        const { container } = render(
            React.createElement($($X) as any, { hide: true } as any)
        );
        expect(container.textContent).toBe('');
    });

    it('renders when $show is explicitly true (the default)', () => {
        class $X extends $Chemical {
            view() { return React.createElement('span', null, 'on'); }
        }
        new $X();
        const { container } = render(
            React.createElement($($X) as any, { show: true } as any)
        );
        expect(container.textContent).toBe('on');
    });

    it('hides when both $show=false AND $hide=true (both indicate hide)', () => {
        class $X extends $Chemical {
            view() { return React.createElement('span', null, 'no'); }
        }
        new $X();
        const { container } = render(
            React.createElement($($X) as any, { show: false, hide: true } as any)
        );
        expect(container.textContent).toBe('');
    });
});


// -----------------------------------------------------------------------------
// Reactivity — toggling $show/$hide re-renders correctly
// -----------------------------------------------------------------------------

describe('$show / $hide — reactive toggle', () => {
    it('toggling $show from inside the chemical re-renders', async () => {
        class $Toggle extends $Chemical {
            $show? = true;
            hideMe() { this.$show = false; }
            showMe() { this.$show = true; }
            view() {
                return React.createElement('div', null,
                    React.createElement('span', { className: 'tag' }, 'visible'),
                    React.createElement('button', {
                        className: 'h',
                        onClick: () => this.hideMe()
                    }, 'hide'),
                );
            }
        }
        const C = $($Toggle);
        const { container } = render(React.createElement(C as any));
        expect(container.querySelector('.tag')).not.toBeNull();
        await act(async () => {
            (container.querySelector('.h') as HTMLElement).click();
        });
        expect(container.querySelector('.tag')).toBeNull();
    });
});


// -----------------------------------------------------------------------------
// Universality — show/hide works for raw HTML, particles, AND chemicals
// -----------------------------------------------------------------------------

describe('$show / $hide — works on HTML elements via the catalogue', () => {
    it('hiding an HTML element via $hide=true', () => {
        const Div = $('section');
        const { container } = render(
            React.createElement(Div as any, { hide: true } as any, 'content')
        );
        expect(container.querySelector('section')).toBeNull();
    });
});


// -----------------------------------------------------------------------------
// Custom filters — extensibility
// -----------------------------------------------------------------------------

describe('$Particle.filter — registering custom filters', () => {
    it('a custom filter can intercept rendering for arbitrary criteria', () => {
        // A "feature flag" style filter: if the chemical has a $featureFlag
        // field set to false, render a placeholder instead of the view.
        registerFilter((p: any) =>
            p.$featureFlag === false
                ? React.createElement('span', { className: 'flag-off' }, 'feature off')
                : undefined
        );

        class $WithFlag extends $Chemical {
            $featureFlag? = false;
            view() { return React.createElement('span', { className: 'on' }, 'enabled'); }
        }
        new $WithFlag();

        const { container } = render(React.createElement($($WithFlag) as any));
        // The custom filter intercepted; placeholder rendered, not the view.
        expect(container.querySelector('.flag-off')).not.toBeNull();
        expect(container.querySelector('.on')).toBeNull();
    });

    it('filters that return undefined defer to normal rendering', () => {
        // An always-undefined filter is a no-op.
        registerFilter(() => undefined);

        class $Plain extends $Chemical {
            view() { return React.createElement('span', null, 'normal'); }
        }
        new $Plain();
        const { container } = render(React.createElement($($Plain) as any));
        expect(container.textContent).toBe('normal');
    });
});
