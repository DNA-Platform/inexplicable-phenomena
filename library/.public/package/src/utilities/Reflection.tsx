import { createElement } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Type, $Writing } from '@/writing/Writing';

export class Reflection {
    private templates = new WeakMap<new () => $Type, $Type>();
    private declarations = new WeakMap<new () => $Writing, $Type | undefined>();
    private bares = new WeakMap<new () => $Writing, $Writing>();

    protected levels = ['Book', 'Chapter', 'Section', 'Paragraph', 'Sentence', 'Word', 'Letter'];

    is(writing: $Writing, asked: (new () => $Type) | string): boolean {
        const worn = [writing.type, this.declared(writing), ...writing.types].filter((one): one is $Type => one instanceof $Type);
        if (typeof asked === 'string')
            return worn.some(one => this.names(one).includes(asked) || one.copy === asked);
        return worn.some(one => one instanceof asked);
    }

    below(type: $Type): string | undefined {
        const names = this.names(type);
        const at = this.levels.findIndex(level => names.includes(level));
        return at >= 0 && at < this.levels.length - 1 ? this.levels[at + 1] : undefined;
    }

    level(type: $Type): boolean {
        return this.levels.includes(type.name);
    }

    code(name: string): string {
        return name[0].toUpperCase() + name[name.length - 1].toLowerCase();
    }

    indent(writing: $Writing): number {
        const kind = writing.constructor as new () => $Writing;
        const bare = this.bares.get(kind) ?? new kind();
        this.bares.set(kind, bare);
        return Math.max(bare.indent, writing.indent, this.deep(writing));
    }

    protected deep(writing: $Writing): number {
        const of = writing.type?.constructor as (new () => $Type) | undefined;
        if (of === undefined) return 0;
        let depth = 0;
        for (let at = writing.parent; at instanceof $Writing && at !== at.parent; at = at.parent)
            if (at.type instanceof of) depth += 1;
        return depth;
    }

    names(type: $Type): string[] {
        const names = [type.name];
        for (let at = Object.getPrototypeOf(Object.getPrototypeOf(type)); at !== null && at !== Object.prototype; at = Object.getPrototypeOf(at)) {
            const kind = at.constructor as new () => $Type;
            if (kind === ($Type as never)) break;
            const template = this.templates.get(kind) ?? new kind();
            this.templates.set(kind, template);
            if (template.name !== names[names.length - 1]) names.push(template.name);
        }
        return names;
    }

    classNames(writing: $Writing): string[] {
        const found: string[] = [];
        if (writing.type instanceof $Type) found.push(...this.names(writing.type).reverse());
        for (const one of writing.types) if (one !== writing.type) found.push(one.copy !== '' ? one.copy : one.name);
        return [...new Set(found)].map(one => `pd-${this.kebab(one)}`);
    }

    protected declared(writing: $Writing): $Type | undefined {
        const kind = writing.constructor as new () => $Writing;
        if (this.declarations.has(kind)) return this.declarations.get(kind);
        const Kind = $(kind);
        const made = $(createElement(Kind as never)) as $Writing;
        this.declarations.set(kind, made.type);
        return made.type;
    }

    protected kebab(name: string): string {
        return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase();
    }
}

export const reflection = new Reflection();
