import { ReactNode } from 'react';
import { $Block } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';
import type { $Annotation } from '@/writing/Annotation';
import type { $Type } from '@/writing/Type';
import type { $Theme } from '@/writing/Theme';

export class Reflection {
    private templates = new WeakMap<new() => $Writing, $Writing>();
    private readings = new WeakMap<$Writing, { parts: $Writing[]; block: $Block }>();

    // HANDED THE THREE KINDS AT THE COMPOSITION ROOT, which is src/index.ts.
    // A utility that must ask `instanceof` cannot IMPORT what imports it: $Writing
    // reaches for reflection in its own methods, so a value import here closes a
    // ring, and once $Annotation and $Type live in their own files that ring is
    // fatal — a class would extend a base that is not built yet. The types are
    // unchanged and still checked; only the runtime edge is gone.
    protected kinds!: {
        writing: new () => $Writing;
        annotation: new () => $Annotation;
        type: new () => $Type;
        theme: new () => $Theme;
    };

    knows(kinds: Partial<Reflection['kinds']>): void {
        this.kinds = { ...this.kinds, ...kinds };
    }

    protected compositions = ['Book', 'Chapter', 'Section', 'Paragraph', 'Sentence', 'Word', 'Letter'];

    is(writing: $Writing, asked: new() => $Type): boolean {
        return this.types(writing).some(type => type instanceof asked);
    }

    instanceOf(part: unknown, asked: new() => $Type): boolean {
        return part instanceof this.kinds.writing && this.is(part, asked);
    }

    writing(part: unknown): part is $Writing {
        return part instanceof this.kinds.writing;
    }

    specialises(type: $Type, of: $Type): boolean {
        return type instanceof (of.constructor as new() => $Type);
    }

    composition(type: $Type | undefined): boolean {
        return type !== undefined && this.names(type).some(name => this.compositions.includes(name));
    }

    wrapped(writing: $Writing & { parts(): $Writing[] }): $Block {
        const parts = writing.parts();
        const held = this.readings.get(writing);
        if (held?.parts === parts) return held.block;
        const block = new $Block()
            .concat(...parts)
            .concat(writing._block.filter(part => part instanceof this.kinds.annotation));
        this.readings.set(writing, { parts, block });

        return block;
    }

    annotations(writing: $Writing): $Annotation[] {
        return (writing._block.$elements ?? []).filter((part): part is $Annotation => part instanceof this.kinds.annotation);
    }

    types(writing: $Writing): $Type[] {
        return (writing._block.$elements ?? []).filter((part): part is $Type => part instanceof this.kinds.type);
    }

    meaning(writing: $Writing): $Annotation | undefined {
        return (writing._block.$elements ?? []).find((part): part is $Annotation =>
            part instanceof this.kinds.annotation && this.types(part).some(type => this.names(type).includes('Reference')));
    }

    beneath(holding: $Type | undefined, held: $Type | undefined): boolean {
        if (holding === undefined || held === undefined) return false;
        for (let kind = holding.constructor as (new() => $Type) | undefined; kind !== undefined;) {
            if (held instanceof kind) return true;
            kind = this.template(kind).below();
        }
        return false;
    }

    names(type: $Type): string[] {
        const names = [type.name];
        if (type.constructor === this.kinds.type) return names;
        for (let kind = Object.getPrototypeOf(type.constructor) as (new() => $Type) | null;
            kind !== null && (kind as never) !== this.kinds.type; kind = Object.getPrototypeOf(kind)) {
            const named = this.template(kind).name;
            if (named !== names[names.length - 1]) names.push(named);
        }
        return names;
    }

    formatted(writing: $Writing, drawn: ReactNode): ReactNode {
        return this.types(writing).reduce((held, type) => type.format(held), drawn);
    }

    theme(writing: $Writing): $Theme {
        return this.nearest(writing, at => this.annotations(at).find((one): one is $Theme => one instanceof this.kinds.theme))
            ?? this.template(this.kinds.theme);
    }

    // A WALK UP STOPS WHERE THE HOLDING STOPS. A writing that holds itself is the top,
    // and reading its parent again would be reading it again — so the step is taken
    // only while it moves.
    nearest<T>(writing: $Writing, read: (at: $Writing) => T | undefined): T | undefined {
        for (let at: any = writing; this.writing(at); at = at.parent === at ? undefined : at.parent) {
            const found = read(at);
            if (found !== undefined) return found;
        }
        return undefined;
    }

    indent(writing: $Writing): number {
        return this.nearest(writing, at => at.$indent > 0 ? at.$indent : undefined) ?? 0;
    }

    classNames(writing: $Writing): string[] {
        const named = this.types(writing).flatMap(type => this.names(type).reverse());
        const held = [...new Set(named)].map(name => `pd-${this.kebab(name)}`);
        const deep = this.indent(writing);
        return deep > 0 ? [...held, `pd-indent-${Math.min(deep, 5)}`] : held;
    }


    template<T extends $Writing>(kind: new() => T): T {
        const held = (this.templates.get(kind) ?? new kind()) as T;
        held._block ??= new $Block();
        this.templates.set(kind, held);
        return held;
    }

    protected kebab(name: string): string {
        return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const reflection = new Reflection();
