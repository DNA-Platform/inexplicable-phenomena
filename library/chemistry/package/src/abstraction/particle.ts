import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $reaction$, $destroyed$, $molecule$, $construction$, $formRan$, $formPromise$,
    $component$, $resolveComponent$, $template$, $isTemplate$, $derived$, $isChemicalBase$,
    $particleMarker$, $deriveInit$, $remove$, $destroy$, $parent$, $devError$, $devException$, $$parent$$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$, $$template$$,
    $renderView$, $views$, looks
} from "../implementation/symbols";
import type { Component, $Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment, assigned, unassign } from "../implementation/augment";
import { $assigned$, $facade$ } from "../implementation/symbols";
import { dev, renderError, renderException } from "../implementation/dev";
import { withAsker } from "../implementation/scope";
import { hydration } from "../implementation/hydration";
import { $Reaction } from "./reaction";
import { $Molecule } from "./molecule";
import { lookName } from "./bond";

export const $phaseOrder: $Phase[] = ['setup', 'mount', 'render', 'layout', 'effect', 'unmount'];

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
    [$destroyed$]?: boolean;
    [$construction$]?: Promise<any>;
    [$formPromise$]?: Promise<any>;
    [$component$]?: Component<any>;
    get [$isTemplate$]() { return this == (this as any)[$type$][$$template$$]; }
    get [$derived$]() { return this !== this[$template$]; }

    $show?: boolean;
    $hide?: boolean;

    $look: number | string = 0;

    $on?: Function | Function[];

    inline = false;

    get [$prototype$]() { return Object.getPrototypeOf(this); }

    [$resolveComponent$](): Component<any> {
        if (Object.prototype.hasOwnProperty.call(this, $component$)) return this[$component$]!;
        return this[$component$] = $lift(this) as any;
    }

    constructor(particular?: object) {
        if (particular !== undefined && isParticle(particular)) {
            return particular as any;
        }

        this[$cid$] = $Particle[$$getNextCid$$]();
        this[$type$] = this.constructor as any;
        this[$symbol$] = $Particle[$$createSymbol$$](this);
        this[$phases$] = new Map($phaseOrder.map(p => [p, []]));

        this[$molecule$] = new $Molecule(this);
        this[$reaction$] = new $Reaction(this);

        const $this = this as any;
        if (!$this[$type$][$$template$$] || !($this[$type$][$$template$$] instanceof $this[$type$]))
            $this[$type$][$$template$$] = this;
        this[$template$] = this;

        if (particular === undefined) return;

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

    frame(): ReactNode {
        const table = this[$views$];
        const drawn = table.get(this.$look ?? 0);

        if (!drawn) throw new Error(missingLook(this, table, this.$look));

        return drawn.call(this);
    }

    [$renderView$](): ReactNode {
        return this.frame();
    }

    get [$views$](): Map<number | string, () => ReactNode> {
        const held = viewTables.get(this);
        if (held) return held;

        const table = new Map<number | string, () => ReactNode>();
        const highest = deepestLook(this);

        for (let at = 0; at <= highest; at++) {
            const member = '$'.repeat(at) + 'view';
            const drawn = (this as any)[member];

            if (typeof drawn !== 'function') {
                throw new Error(
                    `${(this as any)[$type$]?.name ?? 'a chemical'} declares ${'$'.repeat(highest)}view ` +
                    `but nothing at ${member} — a series of looks has no gaps.`
                );
            }

            table.set(at, drawn);
            const named = lookName(this, member);
            if (named !== undefined) table.set(named, drawn);
        }

        viewTables.set(this, table);
        return table;
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

            if (looks.test('$' + prop))
                throw new Error(
                    `${$this[$type$]?.name ?? 'a chemical'} was given a ${prop} prop, which would land on ` +
                    `$${prop} and overwrite a view. Choose which view draws with look.`
                );

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

($Particle.prototype as any)[$particleMarker$] = true;

($Particle.prototype as any)[$isChemicalBase$] = true;

const viewTables = new WeakMap<object, Map<number | string, () => ReactNode>>();

function deepestLook(particle: any): number {
    let deepest = 0;
    let proto = Object.getPrototypeOf(particle);

    while (proto && proto !== Object.prototype) {
        for (const member of Object.getOwnPropertyNames(proto)) {
            if (!looks.test(member)) continue;
            const descriptor = Object.getOwnPropertyDescriptor(proto, member);
            if (typeof descriptor?.value !== 'function') continue;
            deepest = Math.max(deepest, member.length - 'view'.length);
        }
        proto = Object.getPrototypeOf(proto);
    }

    return deepest;
}

function missingLook(particle: any, table: Map<number | string, unknown>, asked: number | string): string {
    const held = [...table.keys()];
    const drawn = held.filter(key => typeof key === 'number').length;
    const named = held.filter(key => typeof key === 'string');
    const whose = particle[$type$]?.name ?? 'a chemical';

    if (typeof asked === 'number')
        return `Nothing stands at look ${asked} — ${whose} draws ${drawn}.`;

    return named.length
        ? `${whose} has no look called ${asked} — it draws ${named.join(', ')}.`
        : `${whose} has no look called ${asked} — none of its ${drawn} looks is named.`;
}

export type $RenderFilter = (particle: $Particle) => ReactNode | undefined;

const $$filters: $RenderFilter[] = [
    (p: any) => (p.$show === false || p.$hide === true) ? null : undefined,
];

export function registerFilter(fn: $RenderFilter): void {
    $$filters.push(fn);
}

export function applyRenderFilters(p: $Particle): ReactNode | undefined {
    for (const filter of $$filters) {
        const result = filter(p);
        if (result !== undefined) return result;
    }
    return undefined;
}

export function $lift<T extends $Particle>(parent: T, contextParent?: any, bond?: boolean): $Component<T> {
    const direct = !(parent as any)[$isTemplate$];
    const Component = (props?: $Props): ReactNode => {
        const [cid, setCid] = useState(-1);
        let p: any;
        const derive = () => {
            if (direct) {
                const made = parent as any;
                made[$molecule$]?.reactivate?.();
                return made;
            }
            const made: any = Object.create(parent);
            made[$cid$] = $Particle[$$getNextCid$$]();
            made[$symbol$] = $Particle[$$createSymbol$$](made);
            made[$phases$] = new Map($phaseOrder.map(ph => [ph, []]));
            made[$phase$] = 'setup';
            made[$reaction$] = new $Reaction(made);
            if ($$parent$$ in made) made[$$parent$$] = made;
            if (bond && typeof made[$deriveInit$] === 'function') {
                made[$deriveInit$]();
            } else {
                (parent as any)[$molecule$]?.reactivate?.();
            }
            if (contextParent && $parent$ in made) {
                made[$parent$] = contextParent;
            }
            if ((made as any)._persist) {
                const was = made[$rendering$];
                made[$rendering$] = true;
                hydration.overwrite(made);
                made[$rendering$] = was;
            }
            return made;
        };
        if (cid === -1) {
            p = derive();
            setCid(p[$cid$]);
        } else {
            p = $Reaction.find(cid);
            if (!p) {
                p = derive();
                setCid(p[$cid$]);
            }
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
            belong(p);
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
                if (p[$facade$] === undefined) unassign(p.$on, p);
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
            const current = augment(withAsker(p, () => p[$renderView$](), true), react, p, false);
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
        if (bond && typeof p[$bond$] === 'function') withAsker(p, () => p[$bond$](), true);
        if (p[$devError$]) {
            p[$rendering$] = false;
            return renderException(p[$devException$] ?? new Error(p[$devError$]));
        }
        const output = augment(withAsker(p, () => p[$renderView$](), true), react, p);
        p[$viewCache$] = output;
        p[$rendering$] = false;
        return output;
    };
    (Component as any).$chemical = parent;
    Object.defineProperty(Component, '$', { get: () => parent, configurable: true });
    (Component as any).$bound = !!contextParent;
    (Component as any).$bind = (cp?: any) => $lift(parent, cp, bond);
    return Component as any;
}

function belong(particle: any): void {
    if (particle[$facade$] !== undefined) return;
    const assign = particle.$on;
    if (assign == null) return;
    if (typeof assign !== 'function') {
        if (!Array.isArray(assign)) return;
        throw new Error(
            `${particle[$type$]?.name ?? 'a chemical'} was told where it belongs by nothing that draws it. ` +
            `An assignment is resolved against the chemical whose view writes it, so it has to be written in one.`
        );
    }
    if (!assigned(assign))
        throw new Error(
            `${particle[$type$]?.name ?? 'a chemical'} was told where it belongs by nothing that draws it. ` +
            `An assignment is resolved against the chemical whose view writes it, so it has to be written in one.`
        );
    assign(particle);
    belongs(particle, assign);
}

function belongs(particle: any, assign: any): void {
    const places = assign?.[$assigned$] as { receiver: any }[] | undefined;
    const receiver = places?.[0]?.receiver;
    if (!receiver || receiver === particle) return;
    if (!($parent$ in particle) || !($parent$ in receiver)) return;
    if (particle[$parent$] && particle[$parent$] !== particle) return;
    particle[$parent$] = receiver;
}
