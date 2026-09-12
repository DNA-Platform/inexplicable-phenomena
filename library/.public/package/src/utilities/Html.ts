import { isValidElement } from 'react';
import { children } from '@dna-platform/chemistry';

export class HtmlUtilities {
    text(node: any): string {
        if (node == null || typeof node === 'boolean') return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(child => this.text(child)).join('');
        if (typeof node === 'object' && typeof node.specifically === 'function') return '';
        if (typeof node === 'object' && node._block != null) return this.text(node._block);
        if (typeof node === 'object' && Array.isArray(node.$elements))
            return node.$elements.map((element: unknown) => this.text(element)).join('');
        if (typeof node === 'object' && node.$value != null) return String(node.$value);
        if (isValidElement(node)) return this.text((node as any).props?.children);
        if (typeof node === 'object' && children in node) return this.text((node as any)[children]);
        return '';
    }

    // A SIZE IS A NUMBER OR A LENGTH. As an attribute it is the number alone, and nothing when it is
    // not one; as CSS a bare number is pixels and a length is kept as it was written.
    sized(value: string): number | undefined {
        return /^[0-9]+([.][0-9]+)?(px)?$/u.test(value) ? Number.parseFloat(value) : undefined;
    }

    length(value: string): string {
        return /^[0-9]+([.][0-9]+)?$/u.test(value) ? `${value}px` : value;
    }
}

export const html = new HtmlUtilities();
