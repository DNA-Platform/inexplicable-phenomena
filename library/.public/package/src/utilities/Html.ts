import { isValidElement } from 'react';
import { children } from '@dna-platform/chemistry';

export class HtmlUtilities {
    text(node: any): string {
        if (node == null || typeof node === 'boolean') return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(child => this.text(child)).join('');
        if (typeof node === 'object' && typeof node.specifically === 'function') return '';
        if (typeof node === 'object' && Array.isArray(node.$elements))
            return node.$elements.map((element: unknown) => this.text(element)).join('');
        if (typeof node === 'object' && node.$value != null) return String(node.$value);
        if (isValidElement(node)) return this.text((node as any).props?.children);
        if (typeof node === 'object' && children in node) return this.text((node as any)[children]);
        return '';
    }
}

export const html = new HtmlUtilities();
