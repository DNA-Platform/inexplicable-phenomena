import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $particular$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $reaction$, $derivatives$, $destroyed$, $molecule$, $construction$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$
} from "../implementation/symbols";
import type { $Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment } from "../implementation/augment";
import { $Reaction } from "./reaction";

export const $phaseOrder: $Phase[] = ['setup', 'mount', 'render', 'layout', 'effect', 'unmount'];

export class $Particle {
    [$cid$]: number;
    [$type$]: typeof this;
    [$symbol$]: string;
    [$children$]: ReactNode;
    [$particular$] = false;
    [$phase$]: $Phase = 'setup';
    [$phases$]: Map<$Phase, (() => void)[]>;
    [$update$]?: () => void;
    [$viewCache$]?: ReactNode;
    [$rendering$] = false;
    [$reaction$]?: $Reaction;
    [$derivatives$]?: Set<$Particle>;
    [$destroyed$]?: boolean;
    [$construction$]?: Promise<any>;

    // Cross-cutting render-state props. Defaults: $show=true, $hide=false.
    // Hidden if $show is explicitly false or $hide is explicitly true.
    $show?: boolean;
    $hide?: boolean;

    get [$prototype$]() { return Object.getPrototypeOf(this); }

    constructor(particular?: object) {
        let $this: any = this;
        this[$cid$] = $Particle[$$getNextCid$$]();
        this[$type$] = this.constructor as any;
        this[$symbol$] = $Particle[$$createSymbol$$](this);
        this[$phases$] = new Map($phaseOrder.map(p => [p, []]));
        if (particular && !(particular instanceof $Particle)) {
            Object.setPrototypeOf(particular, this);
            this[$particular$] = true;
            $this = particular;
        }
        return $this;
    }

    view(): ReactNode {
        return this.toString();
    }

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
        // Propagate up the prototype chain so derivatives mounting also
        // resolve their parent's lifecycle promises (the user holding the
        // parent reference can `await parent.next('mount')` and have it
        // resolve when the first derivative mounts).
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

// $lift — turn a parent particle/chemical into a component that, on each
// React mount site, creates its own derivative via Object.create. The
// derivative inherits the parent's prototype chain (so reads cascade and
// bond accessors are inherited), gets its own identity (cid, symbol,
// reaction, phases, update), and registers with the parent's $derivatives
// set so parent writes can fan out. Skips $bond() — the parent was already
// constructed; reuse means no re-construction.
//
// Two parent concepts compose here:
//   - Prototype parent (the `parent` argument): state inheritance via
//     prototype chain; bond accessors inherited; fan-out via $derivatives$.
//   - Context parent (set via $bind(contextParent)): the chemical containing
//     this one in the JSX tree; wires up the catalyst graph for the
//     reaction system. The orchestrator calls $bind to set this when it
//     processes child elements inside another chemical's bond.
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
    // The orchestrator may call $bind(contextParent) when it processes this
    // Component as a JSX child of another chemical's bond. Returns a fresh
    // Component that, when mounted, sets up the catalyst graph correctly.
    (Component as any).$bind = (cp?: any) => $lift(parent, cp);
    return Component as any;
}

export const Particle = new $Particle();
