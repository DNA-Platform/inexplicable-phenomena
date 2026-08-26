import type { ReactNode, ReactElement } from 'react';
import { withScope, withAsker } from './scope';
import { $handlerOriginal$, $formula$ } from './symbols';

export function augment(node: ReactNode, react: () => void, asker?: any): ReactNode {
    return augmentNode(node, react, asker);
}

function augmentNode(node: ReactNode, react: () => void, asker?: any): ReactNode {
    if (node == null) return node;
    if (typeof node !== 'object') return node;
    if (Array.isArray(node)) {
        let modified = false;
        const result: ReactNode[] = new Array(node.length);
        for (let i = 0; i < node.length; i++) {
            const augmented = augmentNode(node[i], react, asker);
            result[i] = augmented;
            if (augmented !== node[i]) modified = true;
        }
        return modified ? result : node;
    }
    const element = node as ReactElement<any>;
    const props = element.props;
    if (!props) return element;

    const newChildren = props.children !== undefined
        ? augmentNode(props.children, react, asker)
        : undefined;

    let newProps: Record<string, any> | null = null;
    for (const key in props) {
        if (key === 'children') continue;
        const value = props[key];
        if (typeof value === 'function' && isEventHandlerProp(key)) {
            if (!newProps) newProps = { ...props };
            (newProps as Record<string, any>)[key] = wrapHandler(value as Function, react, asker);
        }
    }

    // A formula stands for something else, and this replaces it with what it
    // symbolizes — the component only, so the text and props cross unchanged.
    const stands = substitute(element, asker);

    if (stands || newProps || newChildren !== props.children) {
        let finalProps: any = props;
        if (newProps || newChildren !== props.children) {
            finalProps = newProps || { ...props };
            if (newChildren !== props.children) finalProps.children = newChildren;
        }
        if (finalProps === props) return stands ? { ...element, type: stands } : element;
        return stands ? { ...element, type: stands, props: finalProps } : { ...element, props: finalProps };
    }
    return element;
}

function substitute(element: ReactElement<any>, asker?: any): any {
    const chemical = (element.type as any)?.$chemical;
    const stands = chemical?.[$formula$];
    if (typeof stands !== 'function') return undefined;
    const replacement = stands.call(chemical, element, asker);
    return replacement && replacement !== element.type ? replacement : undefined;
}

function isEventHandlerProp(key: string): boolean {
    return key.length > 2
        && key[0] === 'o' && key[1] === 'n'
        && key[2] === key[2].toUpperCase()
        && key[2] !== key[2].toLowerCase();
}

function wrapHandler(handler: Function, _react: () => void, asker?: any): Function {
    const wrapper = function (this: any, ...args: any[]) {
        let result: any;
        // The handler runs with an asker, so `$(X)` resolves in the graph the
        // handler belongs to — but not DRAWING, so it may also configure.
        withScope(() => { result = withAsker(asker, () => handler.apply(this, args)); });
        if (result instanceof Promise) {
            result.then(
                () => withScope(() => {}),
                () => withScope(() => {})
            );
        }
        return result;
    };
    (wrapper as any)[$handlerOriginal$] = handler;
    return wrapper;
}
