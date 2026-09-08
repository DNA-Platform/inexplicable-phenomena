import { createElement, ReactNode } from 'react';
import { $, $Block, $Component } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';
import type { $Annotation } from '@/writing/Annotation';
import type { $Type } from '@/writing/Type';
import type { $Theme } from '@/formatting/Theme';

export class Reflection {
    private templates = new WeakMap<new() => $Writing, $Writing>();
    private readings = new WeakMap<$Writing, { parts: $Writing[]; block: $Block }>();
    private contents = new WeakMap<$Block, $Block>();

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

    // WHAT A WRITING DRAWS IS ITS BLOCK WITHOUT ITS ANNOTATIONS — present in the writing, absent from the reading — memoised on the block, which a bond replaces whole.
    content(writing: $Writing): $Block {
        const held = this.contents.get(writing._block);
        if (held !== undefined) return held;
        const block = writing._block.filter(part => !(part instanceof this.kinds.annotation));
        this.contents.set(writing._block, block);

        return block;
    }

    wrapped(writing: $Writing & { parts(): $Writing[] }): $Block {
        const parts = writing.parts();
        const held = this.readings.get(writing);
        if (held?.parts === parts) return held.block;
        const block = new $Block().concat(...parts);
        this.readings.set(writing, { parts, block });

        return block;
    }

    // A WRITING BEING CONSTRUCTED HOLDS NOTHING YET, and the walk reaches one: a format asks its
    // theme, the theme walks parents, and a parent whose bond has not run has no block. Asking such
    // a writing what it holds answers NOTHING, which is true — the same fact M5 states about a field
    // initializer, met from the other side. Reading `_block` as though it were always there threw,
    // and it threw only once the specification refusals stopped hiding it.
    annotations(writing: $Writing): $Annotation[] {
        return (writing._block?.$elements ?? []).filter((part): part is $Annotation => part instanceof this.kinds.annotation);
    }

    types(writing: $Writing): $Type[] {
        return (writing._block?.$elements ?? []).filter((part): part is $Type => part instanceof this.kinds.type);
    }

    meaning(writing: $Writing): $Annotation | undefined {
        return (writing._block?.$elements ?? []).find((part): part is $Annotation =>
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

    // CARRYING WHAT IS ALREADY WRITTEN. A token that is already a piece of writing is HANDED to the
    // one being made, rather than turned back into an element and evaluated again — which is what
    // `parser.elements` did until it was deleted, because evaluating an element whose component
    // stands for a BUILT chemical constructs that class a second time, on an empty block. Measured 2026-09-09,
    // with no list involved — <Section>see <Ref>[a page](url)</Ref> here.</Section> drew a refusal
    // panel reading "a ref names a target, and this one names none", because the ref it re-made
    // held nothing. Chemistry's written-argument form takes strings and writings TOGETHER and keeps
    // their order, which is exactly what a piece of writing made out of a run of tokens needs.
    // `carrying` is a proxy name.
    carrying<T extends $Writing>(kind: $Component<T>, tokens: (string | $Writing)[]): T {
        return $<T>(createElement(kind as never), ...tokens as never[]);
    }

    formatted(writing: $Writing, drawn: ReactNode): ReactNode {
        return this.annotations(writing).reduce((held, one) => one.format(held), drawn);
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

    // HOW DEEP A WRITING STANDS, COUNTED — and until 2026-09-09 it could only be DECLARED, because
    // $Composition.parts() replaced a section written inside a section with that section's
    // paragraphs, so no depth survived to be counted. AN AUTHORED $indent STILL WINS, and must: the
    // 37 that stand in the demos were written to say what the reading could not answer, and both
    // themes select .pd-indent-1 against them. A HEADING IS NOT NESTED IN HEADINGS but in what
    // holds it, so the count is taken against the kind of the nearest holder — the section a
    // heading opens — and every further holder of that same kind is one level down.
    indent(writing: $Writing): number {
        const declared = this.nearest(writing, at => at.$indent > 0 ? at.$indent : undefined);
        if (declared !== undefined) return declared;

        let holder: unknown;
        let held = 0;
        for (let at: any = writing.parent; this.writing(at) && at.parent !== at; at = at.parent) {
            const own = at.kind?.constructor;
            if (holder === undefined) { holder = own; continue; }
            if (own === holder) held++;
        }

        return held;
    }

    // THE NUMBER A KIND WEARS — a writing's position among the writings of its own kind that a
    // holder holds, however deeply it holds them. FIVE KINDS ASKED FOR THIS SEPARATELY — $Equation,
    // $Theorem, $Citation, $Footnote and a numbered section — and five implementations of one
    // reading is what a base is for. The holder is GIVEN because the scope differs by kind: a
    // citation counts across its book, an equation across its chapter. `numbered` is a proxy name.
    numbered(writing: $Writing, within: $Writing): number | undefined {
        const kind = writing.kind?.constructor as (new() => $Type) | undefined;
        if (kind === undefined) return undefined;

        const found: $Writing[] = [];
        const seen = new Set<unknown>();
        const gather = (at: $Writing): void => {
            if (seen.has(at)) return;
            seen.add(at);
            for (const part of at._block.$elements ?? []) {
                if (!this.writing(part)) continue;
                // ITS OWN KIND, NOT ANYTHING CARRYING THE TYPE. A heading IS a paragraph by type, so
                // asking `is` counts it among the paragraphs — measured, by the promise that pins this.
                // Theorem 3 is the third theorem and not the third section.
                if (part.kind?.constructor === kind) found.push(part);
                gather(part);
            }
        };
        gather(within);

        const at = found.indexOf(writing);
        return at < 0 ? undefined : at + 1;
    }

    // A KIND IS NAMED BY ITS CLASS WHERE IT HAS NO TYPE. Measured 2026-09-08: the .wiki demo declares
    // TWENTY kinds and not one carries a type of its own, which is the consumer shape Doug ruled —
    // one class, no interface, no type, no specification. Reading only the types made every one of
    // them INVISIBLE to a sheet: $Editions, $Languages, $Logo and the rest all answered pd-chapter or
    // pd-paragraph and nothing else. That is the whole reason a consumer reached for a wrapper — a
    // kind that cannot be named cannot be dressed, so it had to be wrapped in something that could.
    // The class chain is read only ABOVE the point the types already name, and STOPS AT $Writing —
    // measured, because it climbed into chemistry and answered pd-chemical and pd-particle, which are
    // machinery and not kinds. Two promises caught that, which is what they are for.
    classNames(writing: $Writing): string[] {
        const named = this.types(writing).flatMap(type => this.names(type).reverse());
        const own: string[] = [];
        for (let cls: any = writing.constructor; cls && cls !== this.kinds.writing && cls.name && !named.includes(this.authored(cls.name)); cls = Object.getPrototypeOf(cls))
            own.unshift(this.authored(cls.name));
        const held = [...new Set([...own, ...named])].map(name => `pd-${this.kebab(name)}`);
        const deep = this.indent(writing);
        return deep > 0 ? [...held, `pd-indent-${Math.min(deep, 5)}`] : held;
    }


    template<T extends $Writing>(kind: new() => T): T {
        const held = (this.templates.get(kind) ?? new kind()) as T;
        held._block ??= new $Block();
        this.templates.set(kind, held);
        return held;
    }

    // A class name with the $ it is written with and any build decoration taken off, so `$Editions`
    // and a bundler's `_$Editions2` name the same kind.
    protected authored(name: string): string {
        return name.replace(/^_*\$?/u, '').replace(/\d+$/u, '');
    }

    protected kebab(name: string): string {
        return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const reflection = new Reflection();
