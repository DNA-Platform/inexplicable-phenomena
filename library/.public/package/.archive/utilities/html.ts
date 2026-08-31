import { isValidElement } from 'react';
import { children } from '@dna-platform/chemistry';

export function block(node: any): boolean {
    return !!node && typeof node === 'object' && (node as { type?: string }).type === 'block';
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
    if (typeof node === 'object' && children in node) return text((node as any)[children]);
    return '';
}
