import { $Block, children } from '@dna-platform/chemistry';
import { Collection } from './Collection';

export class HtmlUtilities {
    copy(node: unknown): string {
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (node instanceof $Block) return this.copy(node.elements);
        if (node instanceof Collection) return [...node].map(chemical => this.copy(chemical)).join('');
        if (Array.isArray(node)) return node.map(element => this.copy(element)).join('');
        if (node !== null && typeof node === 'object' && children in node) return this.copy((node as Record<symbol, unknown>)[children]);
        return '';
    }
}

export const html = new HtmlUtilities();
