import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// =============================================================================
// $ — the framework's main entry-point callable.
//
// Surface (typed via the $Chemistry interface in chemical.ts):
//   $(props)              JSX:    <$>...</$>          → fragment with keys
//   $(chemical)           inst:   $(myThing)          → $Component<T>
//   $(particle)           inst:   same path           → $Element<T>
//   $($EmptyCtorClass)    class:  $($Foo)             → Component<T>
//   $($ArgCtorClass)      class:  $($Foo)("hi")       → Component<T>
// =============================================================================


// -----------------------------------------------------------------------------
// 1. JSX form — <$>...</$>
// -----------------------------------------------------------------------------

describe('$ — JSX form (<$>...</$>)', () => {
    it('renders <$ /> as an empty Fragment', () => {
        const { container } = render(React.createElement($ as any, null));
        expect(container.textContent).toBe('');
    });

    it('renders <$>text</$> as a Fragment containing the text', () => {
        const { container } = render(React.createElement($ as any, null, 'hello'));
        expect(container.textContent).toBe('hello');
    });

    it('renders <$>{a}{b}{c}</$> as a Fragment of multiple children', () => {
        const { container } = render(React.createElement($ as any, null, 'a', 'b', 'c'));
        expect(container.textContent).toBe('abc');
    });

    it('preserves chemical children with non-colliding keys', () => {
        // JSX prop names are unprefixed; $apply prepends `$` to land on the
        // reactive field. So `tag='a'` writes `this.$tag = 'a'`.
        class $Leaf extends $Chemical {
            $tag = '';
            view() { return React.createElement('span', null, this.$tag); }
        }
        const Leaf = $($Leaf);
        const { container } = render(
            React.createElement($ as any, null,
                React.createElement(Leaf, { tag: 'a' } as any),
                React.createElement(Leaf, { tag: 'b' } as any),
            )
        );
        const spans = container.querySelectorAll('span');
        expect(spans.length).toBe(2);
        expect(spans[0].textContent).toBe('a');
        expect(spans[1].textContent).toBe('b');
    });

    it('accepts a {key} prop without breaking (React extracts key before call)', () => {
        const { container } = render(React.createElement($ as any, { key: 'k', children: 'x' } as any));
        expect(container.textContent).toBe('x');
    });
});


// -----------------------------------------------------------------------------
// 2. Class form — $($Class) — empty constructor
// -----------------------------------------------------------------------------

describe('$ — class form, empty constructor', () => {
    it('returns the template\'s Component when class has no ctor params', () => {
        class $Counter extends $Chemical {
            $count = 0;
            view() { return React.createElement('span', null, String(this.$count)); }
        }
        const Counter = $($Counter);
        expect(typeof Counter).toBe('function');
        const { container } = render(React.createElement(Counter as any));
        expect(container.textContent).toBe('0');
    });

    it('returns a stable Component reference across multiple $ calls (cache)', () => {
        class $Stable extends $Chemical {
            view() { return null; }
        }
        const A = $($Stable);
        const B = $($Stable);
        expect(A).toBe(B);
    });

    it('constructs the template implicitly if no `new $Class()` happened first', () => {
        class $Lazy extends $Chemical {
            $msg = 'lazy';
            view() { return React.createElement('span', null, this.$msg); }
        }
        // First contact via $().
        const Lazy = $($Lazy);
        const { container } = render(React.createElement(Lazy as any));
        expect(container.textContent).toBe('lazy');
    });

    it('isolates each subclass — `$Counter`\'s template is not `$Chemical`\'s', () => {
        class $Subclass extends $Chemical {
            $marker = 'subclass';
            view() { return React.createElement('span', null, this.$marker); }
        }
        const C = $($Subclass);
        const { container } = render(React.createElement(C as any));
        expect(container.textContent).toBe('subclass');
    });
});


// -----------------------------------------------------------------------------
// 3. Class form — $($Class)(...args) — constructor with args
// -----------------------------------------------------------------------------

describe('$ — class form, constructor with args', () => {
    it('returns a factory; each call constructs a fresh instance', () => {
        class $Greeting extends $Chemical {
            $name: string;
            constructor(name: string) {
                super();
                this.$name = name;
            }
            view() { return React.createElement('span', null, `hi ${this.$name}`); }
        }
        new $Greeting('template'); // pin template
        const make = $($Greeting);
        expect(typeof make).toBe('function');

        const Hello = make('hello');
        const World = make('world');
        // Different instances → different Components.
        expect(Hello).not.toBe(World);

        const { container: c1 } = render(React.createElement(Hello as any));
        expect(c1.textContent).toBe('hi hello');
        const { container: c2 } = render(React.createElement(World as any));
        expect(c2.textContent).toBe('hi world');
    });
});


// -----------------------------------------------------------------------------
// 4. Instance form — $(chemical)
// -----------------------------------------------------------------------------

describe('$ — instance form (chemical reference)', () => {
    it('returns a Component-shape function for a chemical instance', () => {
        class $Datum extends $Chemical {
            $value = 42;
            view() { return React.createElement('span', null, String(this.$value)); }
        }
        new $Datum(); // template
        const d = new $Datum();
        const D = $(d);
        expect(typeof D).toBe('function');
    });

    it('mounted $(chemical) renders the chemical\'s view', () => {
        class $Display extends $Chemical {
            $text = 'displayed';
            view() { return React.createElement('span', null, this.$text); }
        }
        const D = $($Display);
        const { container } = render(React.createElement(D as any));
        expect(container.textContent).toBe('displayed');
    });

    it('caches the Component per instance — repeat calls return the same function', () => {
        class $Cached extends $Chemical {
            view() { return null; }
        }
        new $Cached();
        const c = new $Cached();
        const A = $(c);
        const B = $(c);
        expect(A).toBe(B);
    });

    it('does NOT re-run the bond constructor on mount (chemical is already built)', () => {
        let bondCtorCalls = 0;
        class $Tagger extends $Chemical {
            $tag = '';
            // Named-after-class method = bond constructor. Should NOT fire
            // when we route through `$(instance)`.
            $Tagger(...args: any[]) {
                bondCtorCalls++;
            }
            view() { return React.createElement('span', null, this.$tag); }
        }
        const t = new $Tagger(); // construct template; bond ctor not invoked at `new`
        const T = $(t);
        render(React.createElement(T as any, { tag: 'hi' }));
        expect(bondCtorCalls).toBe(0);
    });
});


// -----------------------------------------------------------------------------
// 5. Dispatch boundaries — what falls through where
// -----------------------------------------------------------------------------

describe('$ — dispatch boundaries', () => {
    it('null/undefined → empty Fragment', () => {
        const { container } = render(($ as any)(null));
        expect(container.textContent).toBe('');
    });

    it('plain object with `children` → JSX path (Fragment)', () => {
        const out = ($ as any)({ children: 'direct' });
        expect(React.isValidElement(out)).toBe(true);
    });

    it('plain object that is empty → JSX path (empty Fragment)', () => {
        const out = ($ as any)({});
        expect(React.isValidElement(out)).toBe(true);
    });

    it('plain object without children and non-empty → returns null (no fallback)', () => {
        // `{foo: 1}` is not JSX-shape. Dispatch falls through every check
        // and returns null rather than re-entering the JSX path.
        const out = ($ as any)({ foo: 1 });
        expect(out).toBeNull();
    });

    it('strings route to the HTML catalogue (e.g. $("span"))', () => {
        // String args are now HTML-tag lookups; see catalogue tests.
        expect(typeof ($ as any)('span')).toBe('function');
    });

    it('arbitrary non-object, non-function, non-particle, non-string → null', () => {
        expect(($ as any)(42)).toBeNull();
    });
});


// -----------------------------------------------------------------------------
// 6. Type contract — overload selection (compile-time discipline)
// -----------------------------------------------------------------------------

describe('$ — type contract (compile-time)', () => {
    it('accepts the documented overload shapes', () => {
        class $Empty extends $Chemical {
            view() { return null; }
        }
        class $WithArgs extends $Chemical {
            $n = 0;
            constructor(n: number) {
                super();
                this.$n = n;
            }
            view() { return null; }
        }
        new $WithArgs(0); // template

        // These compile only if overloads pick the right return type.
        const c1 = $($Empty);          // Component
        const c2 = $($WithArgs);        // (n: number) => Component
        const c3 = $($WithArgs)(7);     // Component
        const c4 = $(new $Empty());     // Component (instance form)

        expect(typeof c1).toBe('function');
        expect(typeof c2).toBe('function');
        expect(typeof c3).toBe('function');
        expect(typeof c4).toBe('function');
    });
});
