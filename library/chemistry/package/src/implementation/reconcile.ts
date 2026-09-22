import React, { type ReactNode, type ReactElement } from 'react';
import { walk } from './walk';
import { $original$ } from './symbols';

export function diff(node: ReactNode, cached: ReactNode): boolean {
    return reconcile(node, cached) !== cached;
}

export function reconcile(node: ReactNode, cached: ReactNode): ReactNode {
    if (node === cached) return cached;
    if (node == null || cached == null) return node;
    if (typeof node !== typeof cached) return node;
    if (typeof node !== 'object') return node === cached ? cached : node;
    if (Array.isArray(node)) {
        if (!Array.isArray(cached) || node.length !== (cached as any[]).length) return node;
        let same = true;
        for (let i = 0; i < node.length; i++)
            if (reconcile(node[i], (cached as ReactNode[])[i]) !== (cached as ReactNode[])[i])
                { same = false; break; }
        return same ? cached : walk(node, reconcileVisitor, cached);
    }
    return walk(node, reconcileVisitor, cached);
}

function reconcileVisitor(
    element: ReactElement<any>,
    children: ReactNode,
    pair?: ReactElement<any>
): ReactNode {
    if (!pair) return element;
    if (element.type !== pair.type) return element;
    if (element.key !== pair.key) return element;
    const a = element.props, b = pair.props;
    if (a === b) return pair;
    if (!a || !b) return element;
    let count = 0;
    for (const key in a) {
        count++;
        if (key === 'children') {
            if (children !== b.children) return element;
        } else if (!equivalent(a[key], b[key])) return element;
    }
    for (const _ in b) count--;
    if (count !== 0) return element;
    return pair;
}

// THE WALKED SHAPES. snapshot() copies one by content and equivalent() compares
// one by content, from one list, so the two cannot disagree. Every other object
// is a class instance and is held by reference: the class owns its equivalence.
// (`walked` is a proxy name, flagged for Doug.)
type Walked = {
    is(value: object): boolean;
    copy(value: any, copy: (value: any) => any): any;
    same(a: any, b: any, same: (a: any, b: any) => boolean): boolean;
};

const walked: Walked[] = [
    {
        is: value => Array.isArray(value),
        copy: (value: any[], copy) => value.map(copy),
        same: (a: any[], b: any[], same) => a.length === b.length && a.every((value, i) => same(value, b[i])),
    },
    {
        is: value => value instanceof Map,
        copy: (value: Map<any, any>, copy) => {
            const out = new Map();
            for (const [key, held] of value) out.set(key, copy(held));
            return out;
        },
        same: (a: Map<any, any>, b: Map<any, any>, same) => {
            if (a.size !== b.size) return false;
            for (const [key, held] of a) if (!b.has(key) || !same(held, b.get(key))) return false;
            return true;
        },
    },
    {
        is: value => value instanceof Set,
        copy: (value: Set<any>, copy) => {
            const out = new Set();
            for (const held of value) out.add(copy(held));
            return out;
        },
        same: (a: Set<any>, b: Set<any>, same) => {
            if (a.size !== b.size) return false;
            for (const held of a) if (!b.has(held) && !holds(b, held, same)) return false;
            return true;
        },
    },
    {
        is: value => value instanceof Date,
        copy: (value: Date) => new Date(value.getTime()),
        same: (a: Date, b: Date) => a.getTime() === b.getTime(),
    },
    {
        is: value => {
            const proto = Object.getPrototypeOf(value);
            return proto === Object.prototype || proto === null;
        },
        copy: (value, copy) => {
            const out: any = {};
            for (const key of Object.keys(value)) out[key] = copy(value[key]);
            return out;
        },
        same: (a, b, same) => {
            const keys = Object.keys(a);
            if (keys.length !== Object.keys(b).length) return false;
            for (const key of keys) if (!same(a[key], b[key])) return false;
            return true;
        },
    },
];

// A member that is itself walked was copied into the snapshot, so `has` cannot
// find it; it is found by content.
function holds(set: Set<any>, value: any, same: (a: any, b: any) => boolean): boolean {
    if (value === null || typeof value !== 'object') return false;
    for (const held of set) if (same(held, value)) return true;
    return false;
}

function shapeOf(value: object): Walked | undefined {
    for (const shape of walked) if (shape.is(value)) return shape;
    return undefined;
}

// snapshot(value) — what a scope records at a read, compared at finalize.
export function snapshot(value: any): any {
    if (value === null || typeof value !== 'object') return value;
    const shape = shapeOf(value);
    return shape ? shape.copy(value, snapshot) : value;
}

// equivalent(a, b) — the one equality: at a setter, at a prop, at a snapshot.
// === first, so a scalar costs what it always did; a function by its original
// source; an element through reconcile; a walked shape by content; anything
// else by reference.
export function equivalent(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    const ta = typeof a, tb = typeof b;
    if (ta !== tb) return false;
    if (ta === 'function') {
        const aOrig = (a as any)[$original$] || a;
        const bOrig = (b as any)[$original$] || b;
        if (aOrig === bOrig) return true;
        return aOrig.toString() === bOrig.toString();
    }
    if (ta !== 'object') return false;
    if (React.isValidElement(a) || React.isValidElement(b)) {
        if (!React.isValidElement(a) || !React.isValidElement(b)) return false;
        return reconcile(a, b) === b;
    }
    const shape = shapeOf(a);
    if (!shape || !shape.is(b)) return false;
    return shape.same(a, b, equivalent);
}
