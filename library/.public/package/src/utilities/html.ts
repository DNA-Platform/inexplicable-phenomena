import { isValidElement } from 'react';

// 'block' is chemistry's own kind for a grouped run of inline nodes.
export function block(node: any): boolean {
    return !!node && typeof node === 'object' && (node as { type?: string }).type === 'block';
}

// A bond constructor is handed the writing as an ordered sequence: inline runs
// grouped into blocks, and block-level parts as arguments of their own. This
// flattens that sequence into one ordered list of elements, so a part standing
// between two paragraphs keeps its place beside the words either side of it.
export function gathered(writing: unknown[]): any[] {
    return writing.flatMap(part => {
        if (part === undefined || part === null) return [];
        if (block(part)) return ((part as { $elements?: any[] }).$elements ?? []);
        return [part];
    });
}

export function text(node: any): string {
    if (node == null || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(text).join('');
    if (typeof node === 'object' && (node as { parenthetical?: boolean }).parenthetical === true) return '';
    if (typeof node === 'object' && 'copy' in node) return String(node.copy);
    if (typeof node === 'object' && Array.isArray(node.$elements)) return node.$elements.map(text).join('');
    if (typeof node === 'object' && node.$value != null) return String(node.$value);
    if (isValidElement(node)) return text((node as any).props?.children);
    if (typeof node === 'object' && 'children' in node) return text((node as any).children);
    return '';
}
