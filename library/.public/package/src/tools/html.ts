import { isValidElement } from 'react';

// text — extract the invariant text of anything you can put in a composition:
// a $Writing yields its `copy`, elements and strings yield their content.
export function text(node: any): string {
    if (node == null || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(text).join('');
    if (typeof node === 'object' && 'copy' in node) return String(node.copy);
    if (isValidElement(node)) return text((node as any).props?.children);
    if (typeof node === 'object' && 'children' in node) return text((node as any).children);
    return '';
}
