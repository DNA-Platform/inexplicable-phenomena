import type { ReactNode, ReactElement } from 'react';

export type ElementVisitor = (
    element: ReactElement<any>,
    children: ReactNode,
    pair?: ReactElement<any>
) => ReactNode;

export type NodeCallback = (node: ReactNode) => void;

export function walk(
    node: ReactNode,
    visit: ElementVisitor,
    pair?: ReactNode,
    each?: NodeCallback
): ReactNode {
    if (each) each(node);
    if (node == null) return node;
    if (typeof node !== 'object') return node;
    if (Array.isArray(node)) {
        const paired = Array.isArray(pair) ? pair as ReactNode[] : undefined;
        for (let i = 0; i < node.length; i++) {
            const walked = walk(node[i], visit, paired?.[i], each);
            if (walked !== node[i]) {
                const result = node.slice(0, i);
                result.push(walked);
                for (let j = i + 1; j < node.length; j++)
                    result.push(walk(node[j], visit, paired?.[j], each));
                return result;
            }
        }
        return node;
    }
    const element = node as ReactElement<any>;
    const pairedEl = (pair && typeof pair === 'object' && !Array.isArray(pair))
        ? pair as ReactElement<any> : undefined;
    const children = element.props?.children;
    const pairedChildren = pairedEl?.props?.children;
    const walked = children !== undefined
        ? walk(children, visit, pairedChildren, each)
        : undefined;
    return visit(element, walked, pairedEl);
}
