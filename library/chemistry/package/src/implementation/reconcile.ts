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
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++)
            if (!equivalent(a[i], b[i])) return false;
        return true;
    }
    if (Array.isArray(b)) return false;
    const protoA = Object.getPrototypeOf(a);
    if (protoA !== Object.prototype && protoA !== null) return false;
    const protoB = Object.getPrototypeOf(b);
    if (protoB !== Object.prototype && protoB !== null) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys)
        if (!equivalent(a[k], b[k])) return false;
    return true;
}
