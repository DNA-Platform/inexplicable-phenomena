import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $reaction$, $destroyed$, $molecule$, $construction$, $formRan$, $formPromise$,
    $component$, $resolveComponent$, $template$, $isTemplate$, $derived$, $isChemicalBase$,
    $particleMarker$, $deriveInit$, $remove$, $destroy$, $parent$, $devError$, $$parent$$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$, $$template$$,
    $perspectives$, $isPerspective$, $activeView$, $renderView$, $isViewBase$, $viewLevel$
} from "../implementation/symbols";
import { $backing$ } from "../implementation/symbols";
import type { Component, $Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment } from "../implementation/augment";
import { dev, renderError } from "../implementation/dev";
import { currentScope, diffuse } from "../implementation/scope";
import { $Reaction } from "./reaction";
import { $Molecule } from "./molecule";
import { Perspective } from "./perspective";

export const $phaseOrder: $Phase[] = ['setup', 'mount', 'render', 'layout', 'effect', 'unmount'];

// isParticle — checks the prototype-chain marker stamped on $Particle.prototype.
// Particularized carriers have the marker stamped as an own property because
// their prototype chain is severed to the original (non-particle) object.
export function isParticle(x: any): boolean {
    return x != null && typeof x === 'object' && x[$particleMarker$] === true;
}

export class $Particle {
    [$cid$]!: number;
    [$type$]!: typeof this;
    [$symbol$]!: string;
    [$children$]: ReactNode;
    [$phase$]: $Phase = 'setup';
    [$phases$]!: Map<$Phase, (() => void)[]>;
    [$update$]?: () => void;
    [$viewCache$]?: ReactNode;
    [$activeView$]?: (this: any) => ReactNode;   // active view fn (vertical axis); unset = own-class view
    [$viewLevel$]?: number;                       // cursor into the user view-level chain; own-or-0 = most-derived
    [$rendering$] = false;
    [$reaction$]!: $Reaction;
    [$molecule$]!: $Molecule;
    [$template$]!: this;
    [$destroyed$]?: boolean;
    [$construction$]?: Promise<any>;
    [$component$]?: Component<this>;
    get [$isTemplate$]() { return this == (this as any)[$type$][$$template$$]; }
    get [$derived$]() { return this !== this[$template$]; }

    // Cross-cutting render-state props. Defaults: $show=true, $hide=false.
    // Hidden if $show is explicitly false or $hide is explicitly true.
    $show?: boolean;
    $hide?: boolean;

    get [$prototype$]() { return Object.getPrototypeOf(this); }

    // [$resolveComponent$] — internal accessor. The React FC for this particle.
    // $Chemical overrides to add bond-constructor wiring. Author code never
    // reaches for this; the public surface is the `$()` callable.
    [$resolveComponent$](): Component<this> {
        if (Object.prototype.hasOwnProperty.call(this, $component$)) return this[$component$]!;
        return this[$component$] = $lift(this) as any;
    }

    constructor(particular?: object) {
        // Particularizing an existing particle is a no-op: return it as-is.
        // (JS uses an object returned from a constructor in place of `this`.)
        if (particular !== undefined && isParticle(particular)) {
            return particular as any;
        }

        this[$cid$] = $Particle[$$getNextCid$$]();
        this[$type$] = this.constructor as any;
        this[$symbol$] = $Particle[$$createSymbol$$](this);
        this[$phases$] = new Map($phaseOrder.map(p => [p, []]));

        // Reactive machinery — every particle carries a molecule (its bond
        // graph) and a reaction (its single re-render entry point).
        this[$molecule$] = new $Molecule(this);
        this[$reaction$] = new $Reaction(this);

        // Template tracking — every instance is its own template by default.
        // Derivatives via $lift inherit the parent's $template$ via prototype.
        const $this = this as any;
        if (!$this[$type$][$$template$$] || !($this[$type$][$$template$$] instanceof $this[$type$]))
            $this[$type$][$$template$$] = this;
        this[$template$] = this;

        if (particular === undefined) return;

        // see [docs/chemistry/books/particle/particularization.md].
        let proto = Object.getPrototypeOf(this);
        while (proto && proto !== Object.prototype) {
            for (const key of Reflect.ownKeys(proto)) {
                if (key === 'constructor') continue;
                if (Object.prototype.hasOwnProperty.call(this, key)) continue;
                const desc = Object.getOwnPropertyDescriptor(proto, key);
                if (desc) Object.defineProperty(this, key, desc);
            }
            proto = Object.getPrototypeOf(proto);
        }
        (this as any)[$particleMarker$] = true;
        Object.setPrototypeOf(this, particular);
    }

    view(): ReactNode {
        return this.toString();
    }

    // ── Vertical perspective: look up/down the instance's own ancestry ───────
    // The horizontal axis (`perspectives`/`reveal`, below) is sibling lenses
    // filed on a base. The vertical axis is ONE instance seen at any altitude
    // of its OWN inheritance: walk the prototype chain and render through an
    // ancestor's `view` — "revert to base view". Single inheritance ⇒ one
    // parent per step ⇒ unambiguous. `$view` is the internal write-point for
    // the active view function; `look` is the public verb that moves a cursor
    // along the chain of user-defined view levels and sets `$view`.

    // $view — the view FUNCTION this instance currently renders through. Get
    // returns the active view (or the own-class view when unset); set swaps it
    // and invalidates the view cache so the instance repaints. Internal — the
    // public surface is `look`. (Doug: "$view gets/sets from this.view.view".)
    // The active view is keyed to the cursor, so it is set via writeCursor —
    // $view's setter only stores the function + invalidates the cache.
    protected get $view(): (this: any) => ReactNode {
        return this[$activeView$] ?? (this as any).view;
    }
    protected set $view(fn: (this: any) => ReactNode) {
        this[$activeView$] = fn;
        this[$viewCache$] = undefined;   // invalidate the rendered output
    }

    // [$renderView$] — internal render entry. $lift calls THIS instead of
    // view(), so the active view is consulted without putting logic inside
    // view() (which user subclasses freely override). Defaults to the
    // instance's own-class view when no vertical lens is active.
    [$renderView$](): ReactNode {
        return (this[$activeView$] ?? (this as any).view).call(this);
    }

    // $viewLevels — the ordered chain of USER view-levels for this instance,
    // most-derived first, base last. A "level" is an ancestor class whose
    // prototype owns a `view` METHOD (an explicit override), EXCLUDING the
    // framework bases $Particle/$Chemical (their `view` renders toString/
    // children — not a semantic perspective, marked by $isViewBase$). A class
    // that does not override `view` is simply not a selectable level. `look`
    // indexes the cursor into this list, so both clamps are trivial (index 0 =
    // most specific, last = the base view). The descriptor-value test takes the
    // real function and skips accessor `get view()` forms.
    private get $viewLevels(): { ctor: any; view: (this: any) => ReactNode }[] {
        const levels: { ctor: any; view: (this: any) => ReactNode }[] = [];
        let proto = Object.getPrototypeOf(this);
        while (proto && proto !== Object.prototype) {
            if (!Object.prototype.hasOwnProperty.call(proto, $isViewBase$)) {
                const desc = Object.getOwnPropertyDescriptor(proto, 'view');
                if (desc && typeof desc.value === 'function') {
                    levels.push({ ctor: proto.constructor, view: desc.value });
                }
            }
            proto = Object.getPrototypeOf(proto);
        }
        return levels;
    }

    // The cursor — a SCOPE-TRACKED reactive read. Reading it (in look/viewLevel/
    // canLook, and so transitively in any consumer's render or breadcrumb)
    // records a scope read, exactly as a reactive property field does. That is
    // what makes a once-mounted consumer that reads viewLevel repaint when look
    // moves the cursor — the consumer subscribed to it by reading it. Value is
    // mirrored into $backing$ under a string key so the scope's read-snapshot
    // diff sees the change; the symbol field is the own-or-0 default source.
    private get $viewCursor(): number {
        const value = Object.prototype.hasOwnProperty.call(this, $viewLevel$) ? this[$viewLevel$]! : 0;
        currentScope()?.recordRead(this, $viewCursorProp, value);
        return value;
    }
    // Write the cursor through the SAME channel a reactive property setter uses:
    // store + mirror into $backing$, then record a scope write (so finalize
    // re-reacts every consumer that read it) or — outside any scope — fire the
    // reaction and diffuse up the composition tree immediately.
    private writeCursor(next: number): void {
        this[$viewLevel$] = next;
        viewCursorBacking(this)[$viewCursorProp] = next;
        const scope = currentScope();
        if (scope) {
            scope.recordWrite(this, $viewCursorProp);
        } else {
            this[$reaction$]?.react();
            diffuse(this);
        }
    }

    // look — walk this instance's own ancestry. 'up' = toward the base view
    // (more general), 'down' = toward the actual class (more specific); both
    // clamps are silent no-ops ('up' stops at the highest user view-level, never
    // the framework base; 'down' at the instance's actual class). The '?' forms
    // — 'up?' / 'down?' — DON'T move: they RETURN whether that move is possible,
    // so a UI greys the ends with no separate canLook, and `look` is called twice
    // (query in the render, act in the handler). Reading a '?' form in a render
    // also subscribes the consumer to the cursor, so the clamp is live. The two
    // overloads give each form its exact return type.
    look(direction: 'up' | 'down'): void;
    look(direction: 'up?' | 'down?'): boolean;
    look(direction: 'up' | 'down' | 'up?' | 'down?'): void | boolean {
        const levels = this.$viewLevels;
        const next = (direction.startsWith('up') ? this.$viewCursor + 1 : this.$viewCursor - 1);
        const canMove = levels.length > 0 && next >= 0 && next < levels.length;
        if (direction.endsWith('?')) return canMove;
        if (!canMove) return;                                // clamp — silent no-op
        this.writeCursor(next);
        this.$view = levels[next].view;
    }

    // viewLevel — the constructor name of the class the active view came from
    // (the current altitude). For a breadcrumb / clamp UI.
    get viewLevel(): string {
        const levels = this.$viewLevels;
        if (levels.length === 0) return (this[$type$] as any)?.name ?? this.constructor.name;
        return levels[this.$viewCursor].ctor.name;
    }

    // ── Perspectives ────────────────────────────────────────────────────────
    // A perspective is a SUBCLASS of this particle that overrides `view`. It
    // reveals itself from its (template) constructor: `reveal` POPS that
    // subclass's `view` off onto a Perspective and files it on the base class.
    // Reading `perspectives` then BINDS: the instance clones each lens and stores
    // ITSELF on the clone (cached per instance), so each perspective is "this
    // object, seen this way" — `perspective.render()` draws the live instance
    // through that lens. The thing rendering a lens never has to pass it the object.

    get perspectives(): Perspective[] {
        let bound = perspectiveCache.get(this);
        if (bound) return bound;
        let base: any = this.constructor;
        while (base && Object.prototype.hasOwnProperty.call(base, $isPerspective$)) base = Object.getPrototypeOf(base);
        const raw: Perspective[] = base && Object.prototype.hasOwnProperty.call(base, $perspectives$) ? base[$perspectives$] : [];
        bound = raw.map(p => {
            const lens = new Perspective((p as any).name, (p as any).default);
            (lens as any).view = (p as any).view;       // the popped subclass view
            (lens as any).instance = this;              // bind THIS instance into the lens
            return lens;
        });
        perspectiveCache.set(this, bound);
        return bound;
    }

    protected reveal(perspective: Perspective): void {
        const lens: any = this.constructor;
        if (Object.prototype.hasOwnProperty.call(lens, $isPerspective$)) return; // idempotent: once per subclass
        (perspective as any).view = (this as any).view;     // pop this subclass's view off onto the perspective
        lens[$isPerspective$] = true;                        // untyped static mark: this class is perspectival
        let base: any = Object.getPrototypeOf(lens);
        while (base && Object.prototype.hasOwnProperty.call(base, $isPerspective$)) base = Object.getPrototypeOf(base);
        if (!Object.prototype.hasOwnProperty.call(base, $perspectives$)) base[$perspectives$] = [];
        base[$perspectives$].push(perspective);
    }

    $new(): this {
        const clone = new (this[$type$] as any)() as this;
        this[$molecule$].reactivate();
        for (const bond of this[$molecule$].bonds.values()) {
            if (bond.isField) {
                (clone as any)[bond.property] = (this as any)[bond.property];
            }
        }
        return clone;
    }

    next(phase: $Phase): Promise<void> {
        if (phase === 'construction') {
            return (this[$construction$] || Promise.resolve()) as Promise<void>;
        }
        if (phase === 'formation') {
            return (this[$formPromise$] || Promise.resolve()) as Promise<void>;
        }
        if (this[$phase$] === 'unmount' && phase !== 'unmount') return Promise.reject();
        if (phase === this[$phase$]) return Promise.resolve();
        const current = $phaseOrder.indexOf(this[$phase$]);
        const target = $phaseOrder.indexOf(phase);
        if (phase !== 'unmount' && current >= target) return Promise.resolve();
        return new Promise<void>(resolve => {
            this[$phases$].get(phase)!.push(resolve);
        });
    }

    [$resolve$](phase: $Phase) {
        this[$phase$] = phase;
        const queue = this[$phases$].get(phase);
        if (queue) while (queue.length > 0) queue.shift()!();
        // see [docs/chemistry/books/particle/lifecycle.md] — prototype-chain propagation.
        const proto = Object.getPrototypeOf(this);
        if (proto && Object.prototype.hasOwnProperty.call(proto, $phases$)) {
            proto[$resolve$](phase);
        }
    }

    toString() {
        if (this[$symbol$]) return this[$symbol$];
        return $Particle[$$createSymbol$$](this);
    }

    protected [$apply$](props?: $Props) {
        if (!props) return;
        const $this = this as any;
        if ('children' in (props as any)) $this[$children$] = props.children;
        for (const prop in props) {
            if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
            $this['$' + prop] = props[prop];
        }
    }

    static [$$getNextCid$$](): number { return $Particle.#nextCid++; }
    static #nextCid = 1;

    static [$$createSymbol$$](particle: $Particle) {
        const type = particle[$type$] as any;
        return `$Chemistry.${type.name}[${particle[$cid$]}]`;
    }

    static [$$isSymbol$$](symbol: string): boolean {
        return symbol.startsWith('$Chemistry.');
    }

    static [$$parseCid$$](symbol: string): number | undefined {
        if (!$Particle[$$isSymbol$$](symbol)) return undefined;
        const match = symbol.match($Particle.#symbolPattern);
        if (!match) throw new Error(`Invalid chemical symbol: ${symbol}`);
        return Number(match[1]);
    }

    static #symbolPattern = /\[(\d+)\]$/;
}

// Stamp the marker on $Particle.prototype so every naturally-constructed
// particle (and subclass instance) inherits it. Particularized carriers have
// the marker copied as an own property when their prototype chain is severed.
($Particle.prototype as any)[$particleMarker$] = true;

// $isChemicalBase$ stops the molecule's prototype walk at the framework base.
// Set on $Particle.prototype (the actual framework root for reactive entities)
// so subclasses inherit transitively — the walk halts at the user's class.
($Particle.prototype as any)[$isChemicalBase$] = true;

// $isViewBase$ — $Particle.view renders toString(), a structural fallback, not
// a semantic perspective. `look` skips it so the vertical walk bottoms out at
// the highest user-defined view. $Chemical.prototype is stamped likewise in
// chemical.ts. Own-property so user subclasses don't inherit-match.
($Particle.prototype as any)[$isViewBase$] = true;

// Per-instance cache of bound perspectives: reading `perspectives` returns the
// same cloned, instance-bound lenses each time (stable identity for menus).
const perspectiveCache = new WeakMap<any, Perspective[]>();

// The reserved string key the view cursor is tracked under. Special-prefixed
// ($ + lowercase) so it reads as reactive; mirrored into $backing$ so the
// scope's read-snapshot diff in finalize() can detect the cursor's movement.
const $viewCursorProp = '$viewLevel';

// viewCursorBacking — lazily create (and inherit) the $backing$ store on a
// particle, mirroring the reactive-field machinery in bond.ts so the cursor
// participates in the SAME scope diffing. A particle that already carries a
// $backing$ (any reactive field) reuses it; otherwise one is created.
function viewCursorBacking(particle: any): any {
    if (!Object.prototype.hasOwnProperty.call(particle, $backing$)) {
        const parent = Object.getPrototypeOf(particle)?.[$backing$] ?? null;
        Object.defineProperty(particle, $backing$, {
            value: Object.create(parent),
            writable: false, enumerable: false, configurable: false,
        });
    }
    return particle[$backing$];
}


// ===========================================================================
// Render filters — cross-cutting interception of view rendering.
//
// Each filter is consulted right after $apply(props), before $bond() and
// view(). Returning `undefined` means "no opinion, continue normally."
// Returning anything else (including null) means "this is the rendered
// output; skip view." First non-undefined wins.
//
// Used internally for $show/$hide. Users can register their own filters via
// `$Particle.filter(fn)` for cross-cutting concerns (loading, error, A/B
// gating, feature flags). The registry lives at module scope so the class
// itself stays clean.
// ===========================================================================

export type $RenderFilter = (particle: $Particle) => ReactNode | undefined;

const $$filters: $RenderFilter[] = [
    // Default filter: $show/$hide visibility.
    (p: any) => (p.$show === false || p.$hide === true) ? null : undefined,
];

// registerFilter — framework-developer API to add a render filter. Lives in
// `@dna-platform/chemistry/symbolic` (audience-1 surface) — component
// developers never see this; framework extenders import it deliberately.
export function registerFilter(fn: $RenderFilter): void {
    $$filters.push(fn);
}

// applyRenderFilters — consult the filter chain for a particle. Returns the
// short-circuit ReactNode if any filter intercepts, or `undefined` if all
// pass and normal rendering should proceed.
export function applyRenderFilters(p: $Particle): ReactNode | undefined {
    for (const filter of $$filters) {
        const result = filter(p);
        if (result !== undefined) return result;
    }
    return undefined;
}

// $lift — the single FC factory for both particles and chemicals.
//
// Two paths based on whether parent is a template:
//   Template:     Object.create → derivative with own cid, reaction, molecule.
//                 Per-mount isolation. Destroyed on unmount.
//   Non-template: Instance IS the component. No clone, no derivative.
//                 State persists across unmount/remount. Caller owns lifecycle.
export function $lift<T extends $Particle>(parent: T, contextParent?: any, bond?: boolean): $Component<T> {
    const direct = !(parent as any)[$isTemplate$];
    const Component = (props?: $Props): ReactNode => {
        const [cid, setCid] = useState(-1);
        let p: any;
        if (cid === -1) {
            if (direct) {
                p = parent;
                p[$molecule$]?.reactivate?.();
            } else {
                p = Object.create(parent);
                p[$cid$] = $Particle[$$getNextCid$$]();
                p[$symbol$] = $Particle[$$createSymbol$$](p);
                p[$phases$] = new Map($phaseOrder.map(ph => [ph, []]));
                p[$phase$] = 'setup';
                p[$reaction$] = new $Reaction(p);
                if ($$parent$$ in p) p[$$parent$$] = p;
                if (bond && typeof p[$deriveInit$] === 'function') {
                    p[$deriveInit$]();
                } else {
                    (parent as any)[$molecule$]?.reactivate?.();
                }
                if (contextParent && $parent$ in p) {
                    p[$parent$] = contextParent;
                }
            }
            setCid(p[$cid$]);
        } else {
            p = $Reaction.find(cid)!;
        }
        const [, setToken] = useState(0);
        p[$update$] = () => setToken((t: number) => t + 1);
        const react = () => p[$reaction$]?.react();
        useEffect(() => {
            if (direct && p[$phase$] === 'unmount') {
                p[$phase$] = 'setup';
                p[$phases$] = new Map($phaseOrder.map(ph => [ph, []]));
            }
            p[$resolve$]('mount');
            if (typeof p.$form === 'function' && !p[$formRan$]) {
                p[$formRan$] = true;
                const result = p.$form();
                if (result instanceof Promise) {
                    p[$formPromise$] = result.then(() => {
                        p[$reaction$]?.react();
                    });
                }
            }
            return () => {
                p[$resolve$]('unmount');
                if (direct) {
                    p[$update$] = undefined;
                } else {
                    if (typeof p[$destroy$] === 'function') {
                        if (!p[$remove$]) p[$remove$] = true;
                        else if (!p[$destroyed$]) p[$destroy$]();
                    } else {
                        p[$destroyed$] = true;
                    }
                }
            };
        }, []);
        useLayoutEffect(() => {
            p[$resolve$]('layout');
        });
        useEffect(() => {
            p[$resolve$]('effect');
            p[$rendering$] = true;
            const current = augment(p[$renderView$](), react);
            p[$rendering$] = false;
            if (diff(current, p[$viewCache$])) {
                p[$viewCache$] = current;
                p[$update$]!();
            }
        });
        p[$rendering$] = true;
        p[$apply$](props);
        p[$molecule$]?.reactivate?.();
        const filtered = applyRenderFilters(p);
        if (filtered !== undefined) {
            p[$rendering$] = false;
            return filtered;
        }
        if (bond && typeof p[$bond$] === 'function') p[$bond$]();
        if (dev && p[$devError$]) {
            p[$rendering$] = false;
            return renderError('Bond Constructor Failed', p[$devError$]);
        }
        const output = augment(p[$renderView$](), react);
        p[$viewCache$] = output;
        p[$rendering$] = false;
        return output;
    };
    (Component as any).$chemical = parent;
    (Component as any).$bound = !!contextParent;
    (Component as any).$bind = (cp?: any) => $lift(parent, cp, bond);
    return Component as any;
}

