import type { ReactNode, ReactElement } from 'react';
import { withScope } from './scope';
import { $handlerOriginal$ } from './symbols';

export function augment(node: ReactNode, react: () => void): ReactNode {
    return augmentNode(node, react);
}

function augmentNode(node: ReactNode, react: () => void): ReactNode {
    if (node == null) return node;
    if (typeof node !== 'object') return node;
    if (Array.isArray(node)) {
        let modified = false;
        const result: ReactNode[] = new Array(node.length);
        for (let i = 0; i < node.length; i++) {
            const augmented = augmentNode(node[i], react);
            result[i] = augmented;
            if (augmented !== node[i]) modified = true;
        }
        return modified ? result : node;
    }
    const element = node as ReactElement<any>;
    const props = element.props;
    if (!props) return element;

    const newChildren = props.children !== undefined
        ? augmentNode(props.children, react)
        : undefined;

    let newProps: Record<string, any> | null = null;
    for (const key in props) {
        if (key === 'children') continue;
        const value = props[key];
        if (typeof value === 'function' && isEventHandlerProp(key)) {
            if (!newProps) newProps = { ...props };
            (newProps as Record<string, any>)[key] = wrapHandler(value as Function, react);
        }
    }

    if (newProps || newChildren !== props.children) {
        const finalProps = newProps || { ...props };
        if (newChildren !== props.children) finalProps.children = newChildren;
        return { ...element, props: finalProps };
    }
    return element;
}

function isEventHandlerProp(key: string): boolean {
    return key.length > 2
        && key[0] === 'o' && key[1] === 'n'
        && key[2] === key[2].toUpperCase()
        && key[2] !== key[2].toLowerCase();
}

function wrapHandler(handler: Function, _react: () => void): Function {
    const wrapper = function (this: any, ...args: any[]) {
        let result: any;
        withScope(() => { result = handler.apply(this, args); });
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
