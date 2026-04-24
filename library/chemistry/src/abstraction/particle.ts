import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import {
    $cid$, $symbol$, $type$, $prototype$, $particular$, $children$, $apply$, $bond$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $$getNextCid$$, $$createSymbol$$, $$isSymbol$$, $$parseCid$$
} from "../implementation/symbols";
import type { $$Component, $Props, $Phase } from "../implementation/types";
import { diff } from "../implementation/reconcile";
import { augment } from "../implementation/augment";

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
        if (!queue) return;
        while (queue.length > 0) queue.shift()!();
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

// $lift — wrap a non-template particle as a function component
export function $lift<T extends $Particle>(particle: T, view?: () => ReactNode): $$Component<T> {
    const $view = view || particle.view;
    const react = () => particle[$update$]?.();
    const Component = (props?: $Props): ReactNode => {
        const [, setToken] = useState(0);
        particle[$update$] = () => setToken((t: number) => t + 1);
        useEffect(() => {
            particle[$resolve$]('mount');
            return () => particle[$resolve$]('unmount');
        }, []);
        useLayoutEffect(() => {
            particle[$resolve$]('layout');
        });
        useEffect(() => {
            particle[$resolve$]('effect');
            particle[$rendering$] = true;
            const current = augment($view.call(particle), react);
            particle[$rendering$] = false;
            if (diff(current, particle[$viewCache$])) {
                particle[$viewCache$] = current;
                particle[$update$]!();
            }
        });
        particle[$rendering$] = true;
        particle[$apply$](props);
        particle[$bond$]();
        const output = augment($view.call(particle), react);
        particle[$viewCache$] = output;
        particle[$rendering$] = false;
        return output;
    };
    (Component as any).$view = $view;
    (Component as any).$this = particle;
    (Component as any).$chemical = particle;
    (Component as any).$bound = true;
    return Component as any;
}

export const Particle = new $Particle();
