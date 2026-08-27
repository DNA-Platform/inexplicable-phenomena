import { isValidElement } from 'react';

export class HtmlUtilities {
    block(node: unknown): boolean {
        return !!node && typeof node === 'object' && (node as { type?: string }).type === 'block';
    }

    text(node: any): string {
        if (node == null || typeof node === 'boolean') return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(one => this.text(one)).join('');
        if (typeof node === 'object' && (node as { parenthetical?: boolean }).parenthetical === true) return '';
        if (typeof node === 'object' && 'copy' in node) return String(node.copy);
        if (typeof node === 'object' && Array.isArray(node.$elements)) return node.$elements.map((one: unknown) => this.text(one)).join('');
        if (typeof node === 'object' && node.$value != null) return String(node.$value);
        if (isValidElement(node)) return this.text((node as any).props?.children);
        if (typeof node === 'object' && 'children' in node) return this.text((node as any).children);
        return '';
    }
}

export const html = new HtmlUtilities();
