import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $reaction$, $derivatives$, $destroyed$, $molecule$, $construction$, $formRan$, $formPromise$,
    $component$, $resolveComponent$, $template$, $isTemplate$, $derived$, $isChemicalBase$,
    $particleMarker$, $deriveInit$, $remove$, $destroy$, $parent$, $devError$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$, $$template$$
} from "../implementation/symbols";
import type { Component, $Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment } from "../implementation/augment";
import { dev, renderError } from "../implementation/dev";
import { $Reaction } from "./reaction";
import { $Molecule } from "./molecule";

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
    [$rendering$] = false;
    [$reaction$]!: $Reaction;
    [$molecule$]!: $Molecule;
    [$template$]!: this;
    [$derivatives$]?: Set<$Particle>;
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

    $new(): this {
        const clone = Object.create(this) as this;
        const p = clone as any;
        p[$cid$] = $Particle[$$getNextCid$$]();
        p[$symbol$] = $Particle[$$createSymbol$$](p);
        p[$phases$] = new Map($phaseOrder.map(ph => [ph, []]));
        p[$phase$] = 'setup';
        p[$reaction$] = new $Reaction(p);
        p[$molecule$] = new $Molecule(p);
        p[$template$] = this;
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
                if (bond && typeof p[$deriveInit$] === 'function') {
                    p[$deriveInit$]();
                } else {
                    (parent as any)[$molecule$]?.reactivate?.();
                }
                if (contextParent && $parent$ in p) {
                    p[$parent$] = contextParent;
                }
                const par = parent as any;
                (par[$derivatives$] ??= new Set()).add(p);
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
                    (parent as any)[$derivatives$]?.delete(p);
                }
            };
        }, []);
        useLayoutEffect(() => {
            p[$resolve$]('layout');
        });
        useEffect(() => {
            p[$resolve$]('effect');
            p[$rendering$] = true;
            const current = augment(p.view(), react);
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
        const output = augment(p.view(), react);
        p[$viewCache$] = output;
        p[$rendering$] = false;
        return output;
    };
    (Component as any).$chemical = parent;
    (Component as any).$bound = !!contextParent;
    (Component as any).$bind = (cp?: any) => $lift(parent, cp, bond);
    return Component as any;
}

