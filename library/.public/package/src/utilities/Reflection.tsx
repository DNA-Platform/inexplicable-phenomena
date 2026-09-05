import { $Block } from '@dna-platform/chemistry';
import { $Annotation, $Type, $Writing } from '@/writing/Writing';

export class Reflection {
    private templates = new WeakMap<new() => $Type, $Type>();

    protected compositions = ['Book', 'Chapter', 'Section', 'Paragraph', 'Sentence', 'Word', 'Letter'];
    protected codes = ['Bk', 'Cr', 'Sn', 'Ph', 'Se', 'Wd', 'Lr'];

    is(writing: $Writing, asked: new() => $Type): boolean {
        return this.types(writing).some(type => type instanceof asked);
    }

    instanceOf(part: unknown, asked: new() => $Type): boolean {
        return part instanceof $Writing && this.is(part, asked);
    }

    writing(part: unknown): part is $Writing {
        return part instanceof $Writing;
    }

    composition(type: $Type | undefined): boolean {
        return type !== undefined && this.names(type).some(name => this.compositions.includes(name));
    }

    annotations(writing: $Writing): $Annotation[] {
        return (writing._block.$elements ?? []).filter((part): part is $Annotation => part instanceof $Annotation);
    }

    types(writing: $Writing): $Type[] {
        return (writing._block.$elements ?? []).filter((part): part is $Type => part instanceof $Type);
    }

    means(writing: $Writing): $Annotation | undefined {
        return (writing._block.$elements ?? []).find((part): part is $Annotation =>
            part instanceof $Annotation && this.types(part).some(type => this.names(type).includes('Reference')));
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
        for (let kind = Object.getPrototypeOf(type.constructor) as (new() => $Type) | null;
            kind !== null && (kind as never) !== $Type; kind = Object.getPrototypeOf(kind)) {
            const named = this.template(kind).name;
            if (named !== names[names.length - 1]) names.push(named);
        }
        return names;
    }

    classNames(writing: $Writing): string[] {
        const named = this.types(writing).flatMap(type => this.names(type).reverse());
        return [...new Set(named)].map(name => `pd-${this.kebab(name)}`);
    }

    code(type: $Type): string | undefined {
        const at = this.names(type)
            .map(name => this.compositions.indexOf(name.replace(/^\$/u, '')))
            .find(place => place >= 0);
        return at === undefined ? undefined : this.codes[at];
    }

    template(kind: new() => $Type): $Type {
        const held = this.templates.get(kind) ?? new kind();
        held._block ??= new $Block();
        this.templates.set(kind, held);
        return held;
    }

    protected kebab(name: string): string {
        return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const reflection = new Reflection();
