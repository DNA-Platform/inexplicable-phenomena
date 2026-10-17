import { identifier } from './Identifier';

export class Binder {
    stylesheets = ['katex/dist/katex.min.css'];

    reference(copy: string): { name: string; identifier: string } | undefined {
        const match = /^\[([^\]]*)\]\(([^)]*)\)$/u.exec(copy.trim());
        if (match === null) return undefined;
        return { name: match[1].trim(), identifier: match[2].trim() };
    }

    referent(link: { name: string; identifier: string }): string {
        const fragment = link.identifier.split('#')[1];
        return fragment === undefined || fragment === '' ? identifier.slug(link.name) : fragment;
    }
}

export const binder = new Binder();
