import { isValidElement } from 'react';
import { children } from '@dna-platform/chemistry';

export class HtmlUtilities {
    private texts = new WeakMap<object, { held: unknown; text: string }>();

    block(node: unknown): boolean {
        return !!node && typeof node === 'object' && (node as { type?: string }).type === 'block';
    }

    surface(node: any): string {
        const held = (node?.$elements ?? []) as unknown[];
        return held.map(one => {
            if (typeof one === 'string' || typeof one === 'number') return String(one);
            const written = one as { parenthetical?: boolean; copy?: string };
            if (written?.parenthetical === true) return '';
            return written?.copy ?? '';
        }).join('');
    }

    text(node: any): string {
        if (node == null || typeof node === 'boolean') return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(one => this.text(one)).join('');
        if (typeof node === 'object' && (node as { parenthetical?: boolean }).parenthetical === true) return '';
        if (typeof node === 'object' && 'copy' in node) return String(node.copy);
        if (typeof node === 'object' && Array.isArray(node.$elements)) {
            const kept = this.texts.get(node);
            if (kept !== undefined && kept.held === node.$elements) return kept.text;
            const text = node.$elements.map((one: unknown) => this.text(one)).join('');
            this.texts.set(node, { held: node.$elements, text });
            return text;
        }
        if (typeof node === 'object' && node.$value != null) return String(node.$value);
        if (isValidElement(node)) return this.text((node as any).props?.children);
        if (typeof node === 'object' && children in node) return this.text((node as any)[children]);
        return '';
    }
}

export const html = new HtmlUtilities();
