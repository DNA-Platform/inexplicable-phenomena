import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $reaction$, $derivatives$, $destroyed$, $molecule$, $construction$,
    $component$, $template$, $isTemplate$, $derived$, $isChemicalBase$,
    $particleMarker$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$, $$template$$
} from "../implementation/symbols";
import type { Component, $Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment } from "../implementation/augment";
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
    [$cid$]: number;
    [$type$]: typeof this;
    [$symbol$]: string;
    [$children$]: ReactNode;
    [$phase$]: $Phase = 'setup';
    [$phases$]: Map<$Phase, (() => void)[]>;
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

    // Component — the React FC for this particle. Lift-path only at this
    // layer; $Chemical overrides to handle template instances via $createComponent.
    get Component(): Component<this> {
        if (this[$component$]) return this[$component$];
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

    async mount() { return this.next('mount'); }
    async render() { return this.next('render'); }
    async layout() { return this.next('layout'); }
    async effect() { return this.next('effect'); }
    async unmount() { return this.next('unmount'); }

    next(phase: $Phase): Promise<void> {
        // 'construction' is a side-channel lifecycle event, not a linear
        // phase. It resolves when the bond ctor's async work has settled
        // (along with any context-parent's construction). If no bond ctor
        // ran or it was sync, the construction promise is `resolve()`.
        if (phase === 'construction') {
            return (this[$construction$] || Promise.resolve()) as Promise<void>;
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
        $this[$children$] = props.children;
        for (const prop in props) {
            if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
            $this['$' + prop] = props[prop];
        }
    }

    protected [$bond$]() {}

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

// see [docs/chemistry/books/particle/lift.md].
export function $lift<T extends $Particle>(parent: T, contextParent?: any): $Component<T> {
    const Component = (props?: $Props): ReactNode => {
        const [cid, setCid] = useState(-1);
        let p: any;
        if (cid === -1) {
            // Bond accessors live on the parent's prototype after molecule
            // reactivation. Derivatives inherit them via the prototype chain.
            // Reactivate now (idempotent) so reads cascade and writes fan out.
            (parent as any)[$molecule$]?.reactivate?.();
            p = Object.create(parent);
            p[$cid$] = $Particle[$$getNextCid$$]();
            p[$symbol$] = $Particle[$$createSymbol$$](p);
            p[$phases$] = new Map($phaseOrder.map(ph => [ph, []]));
            p[$phase$] = 'setup';
            p[$reaction$] = new $Reaction(p);
            // Wire context parent for the catalyst graph (separate from the
            // prototype parent which lives in the prototype chain itself).
            if (contextParent && (p as any)[Symbol.for('$Chemical.$parent')]) {
                // Chemical layer — assign through the $parent setter which
                // handles catalyst threading.
                try { (p as any).$parent = contextParent; } catch { /* particle layer; ignore */ }
            }
            // Register with prototype parent's derivatives set so parent
            // bond writes can fan out to this site.
            const par = parent as any;
            (par[$derivatives$] ??= new Set()).add(p);
            setCid(p[$cid$]);
        } else {
            p = $Reaction.find(cid)!;
        }
        const [, setToken] = useState(0);
        p[$update$] = () => setToken((t: number) => t + 1);
        const react = () => p[$update$]?.();
        useEffect(() => {
            p[$resolve$]('mount');
            return () => {
                p[$resolve$]('unmount');
                p[$destroyed$] = true;
                (parent as any)[$derivatives$]?.delete(p);
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
        const filtered = applyRenderFilters(p);
        if (filtered !== undefined) {
            p[$rendering$] = false;
            return filtered;
        }
        const output = augment(p.view(), react);
        p[$viewCache$] = output;
        p[$rendering$] = false;
        return output;
    };
    (Component as any).$chemical = parent;
    (Component as any).$bound = !!contextParent;
    // The synthesis may call $bind(contextParent) when it processes this
    // Component as a JSX child of another chemical's bond. Returns a fresh
    // Component that, when mounted, sets up the catalyst graph correctly.
    (Component as any).$bind = (cp?: any) => $lift(parent, cp);
    return Component as any;
}

