import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';
import type { $Annotation } from '@/writing/Annotation';
import type { $Type } from '@/writing/Type';
import type { $Theme } from '@/formatting/Theme';
import type { $Composition } from '@/writing/Composition';
import type { $Reference } from '@/reference/Reference';
import type { $Fold } from '@/reference/Fold';
import type { $Book } from '@/library/Book';
import type { $Chapter } from '@/library/Chapter';

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
        composition: new () => $Composition;
        hierarchies: (new () => $Type)[];
        levels: (new () => $Type)[][];
        book: new () => $Type;
        chapter: new () => $Type;
        reference: new () => $Reference;
        fold: new () => $Fold;
    };

    knows(kinds: Partial<Reflection['kinds']>): void {
        this.kinds = { ...this.kinds, ...kinds };
    }

    is<T extends $Writing = $Writing>(part: unknown, asked: new() => $Type): part is T {
        return part instanceof this.kinds.writing
            && this.types(part as $Writing).some(type => type instanceof asked);
    }

    writing(part: unknown): part is $Writing {
        return part instanceof this.kinds.writing;
    }

    annotation(part: unknown): part is $Annotation {
        return part instanceof this.kinds.annotation;
    }

    specialises(type: $Type, of: $Type): boolean {
        return type instanceof (of.constructor as new() => $Type);
    }

    composition(part: unknown): part is $Composition {
        return part instanceof this.kinds.composition;
    }

    holding(writing: $Writing): $Writing | undefined {
        return this.nearest(writing, at => this.kinds.hierarchies.some(top => this.is(at, top)) ? at : undefined);
    }

    book(writing: $Writing): $Book | undefined {
        return this.nearest(writing, at => this.is<$Book>(at, this.kinds.book) ? at : undefined);
    }

    chapter(writing: $Writing): $Chapter | undefined {
        return this.nearest(writing, at => this.is<$Chapter>(at, this.kinds.chapter) ? at : undefined);
    }

    within<T extends $Writing>(writing: $Writing, kind: new() => $Type): T[] {
        const found: T[] = [];
        for (const part of writing._block?.$elements ?? []) {
            if (!this.writing(part)) continue;
            if (this.is<T>(part, kind)) found.push(part);
            found.push(...this.within<T>(part, kind));
        }
        return found;
    }

    level(type: $Type | undefined): boolean {
        return type !== undefined && this.kinds.hierarchies.some(top => this.beneath(this.template(top), type));
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

    // WHAT A WRITING POINTS AT, and its mirror: what points at IT. One reads as a reference and
    // the other as a fold, and neither has to be spelled — a fold is not a kind of reference.
    meaning(writing: $Writing): $Reference | undefined {
        return (writing._block?.$elements ?? []).find((part): part is $Reference => part instanceof this.kinds.reference);
    }

    folded(writing: $Writing): $Fold | undefined {
        return (writing._block?.$elements ?? []).find((part): part is $Fold => part instanceof this.kinds.fold);
    }

    beneath(holding: $Type | undefined, held: $Type | undefined): boolean {
        const placed = this.placed(holding);
        if (placed === undefined || held === undefined) return false;
        const [ladder, at] = placed;

        return ladder.slice(0, at + 1).some(level => held instanceof level);
    }

    below(kind: $Type | undefined): (new() => $Type) | undefined {
        const placed = this.placed(kind);
        if (placed === undefined) return undefined;
        const [ladder, at] = placed;
        const rung = ladder[at - 1];
        if (rung === undefined) return undefined;

        return $($(rung)).$.constructor as new() => $Type;
    }

    protected placed(kind: $Type | undefined): [(new() => $Type)[], number] | undefined {
        if (kind === undefined) return undefined;
        for (const ladder of this.kinds.levels) {
            const at = ladder.findIndex(level => kind instanceof level);
            if (at >= 0) return [ladder, at];
        }
        return undefined;
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

    // HOW DEEP A WRITING STANDS, COUNTED AND NEVER DECLARED. Until 2026-09-09 it could only be
    // declared, because $Composition.parts() replaced a section written inside a section with that
    // section's paragraphs, so no depth survived to be counted; that is fixed, and with it fixed an
    // authored $indent is going around the structure rather than saying something it cannot answer.
    // The 37 that stood in the demos are gone and those sections are NESTED. A HEADING IS NOT
    // NESTED IN HEADINGS but in what holds it, so the count is taken against the kind of the
    // nearest holder — the section a heading opens — and every further holder of that kind is one
    // level down. `indent` is a proxy name for a count of holders.
    indent(writing: $Writing): number {
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
    // citation counts across its book, an equation across its document. `numbered` is a proxy name.
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
    // them INVISIBLE to a sheet: $Editions, $Languages, $Logo and the rest all answered pd-document or
    // pd-paragraph and nothing else. That is the whole reason a consumer reached for a wrapper — a
    // kind that cannot be named cannot be styled, so it had to be wrapped in something that could.
    // The class chain is read only ABOVE the point the types already name, and STOPS AT $Writing —
    // measured, because it climbed into chemistry and answered pd-chemical and pd-particle, which are
    // machinery and not kinds. Two promises caught that, which is what they are for.
    classNames(writing: $Writing): string[] {
        const named = this.types(writing).flatMap(type => this.names(type).reverse());
        const own: string[] = [];
        for (let cls: any = writing.constructor; cls && cls !== this.kinds.writing && cls.name && !named.includes(this.authored(cls.name)); cls = Object.getPrototypeOf(cls))
            own.unshift(this.authored(cls.name));
        // NO pd-indent CLASS. Depth is structure — a section inside a section, a list inside an
        // item — so a sheet selects it by nesting and nothing has to carry a number.
        return [...new Set([...own, ...named])].map(name => `pd-${this.kebab(name)}`);
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

    kebab(name: string): string {
        return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-+|-+$/gu, '');
    }
}

export const reflection = new Reflection();
