import { ReactNode, createElement } from 'react';
import { $, $Block, $check, $Chemical, $Written } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import type { $Annotation$, $Annotation } from './Annotation';
import type { $Catalogue$, $Catalogue } from '@/reference/Catalogue';
import type { $Type$, $Type } from './Type';
import type { $Reference$, $Reference } from '@/reference/Reference';
import type { $Theme } from '@/formatting/Theme';
import type { $Book } from '@/library/Book';

const printed = new WeakMap<$Block, $Block>();

export interface $Writing$ extends $Chemical {
    document?: $Catalogue$;
    mention?: $Catalogue$;
    meaning?: $Reference$;
    kind: $Type$;
    annotations: $Annotation[];
}

export class $Writing extends $Chemical implements $Writing$ {
    $className?: string;
    $print?: boolean;
    parenthetical = false;
    inline = true;
    definition = 'span';
    _mention?: $Catalogue;
    _block!: $Block;

    get mention(): $Catalogue | undefined { return this._mention; }
    get document(): $Catalogue | undefined { return reflection.holding(this)?.mention; }
    get meaning(): $Reference | undefined { return reflection.meaning(this); }
    get annotations(): $Annotation[] { return reflection.annotations(this); }
    get theme(): $Theme { return reflection.theme(this); }
    get book(): $Book | undefined { return reflection.book(this); }
    get className(): string { return [...reflection.classNames(this), this.$className ?? ''].join(' ').trim(); }

    get kind(): $Type {
        const carried = reflection.types(this);
        const standing = carried.filter(kind => reflection.level(kind));
        const chosen = standing.filter(kind => !standing.some(other => other !== kind && reflection.specialises(other, kind)));
        $check(chosen.length <= 1, `writing is one kind of writing, and this one is ${chosen.length}`);
        return chosen[0] ?? carried[0];
    }

    $Writing(block: $Block) {
        this._block = $check(block, $Block);
        if (this.$print !== undefined) this.parenthetical = !this.$print;
    }

    view(): ReactNode {
        if (this.parenthetical) return null;
        const meaning = this.meaning?.parenthetical ? this.meaning : undefined;
        const fold = reflection.folded(this);
        const printed = meaning === undefined && fold === undefined ? this.print()
            : <a id={fold?.key()} href={meaning === undefined ? undefined : html.text(meaning.path()?._block)} className="pd-meaning">{this.print()}</a>;

        return reflection.formatted(this, createElement(this.definition, { className: this.className }, printed));
    }

    print(): ReactNode {
        let children = printed.get(this._block);
        if (children === undefined) printed.set(this._block, children = this._block.filter(part => !reflection.writing(part) || !part.parenthetical));
        const Children = $(children);

        return <Children />;
    }

    searchFor<T extends $Writing>(type: new() => $Type): T[] {
        return (this._block.$elements ?? []).filter((part): part is T => reflection.is(part, type));
    }

    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined {
        const found = this.searchFor<T>(type);
        $check(found.length <= 1, `writing holds one of a kind, and this one holds ${found.length}`);
        return found[0];
    }

    addType(block: $Block, ...types: (new() => $Type)[]): $Block {
        return types.reduce((held, type) => held.concat($check(type, '!')), $check(block, $Block, '!'));
    }

    valid(): boolean {
        this.specify();
        return true;
    }

    specify(): void {
        const carried = reflection.types(this);
        const kinds = new Set<unknown>();
        for (const annotation of this.annotations) {
            if (kinds.has(annotation.constructor)) continue;
            kinds.add(annotation.constructor);
            if (carried.some(other => other !== annotation && reflection.specialises(other, annotation as $Type))) continue;
            annotation.specifically(this);
        }
    }
}

export class WritingSpecification extends Specification<$Writing> {
    private readonly divided = /\n[^\S\n]*\n/u;

    @specify('a piece of writing carries no blank line')
    $noBlankLine(writing: $Writing): void {
        $check(!this.divided.test(html.text(writing._block)),
            'a piece of writing carries no blank line, and this one is broken by one');
    }

    @specify('a piece of writing says what kind of writing it is')
    $saysItsKind(writing: $Writing): void {
        $check(writing.kind !== undefined,
            'a piece of writing says what kind of writing it is, and this one says nothing');
    }

    @specify('a piece of writing says something')
    $saysSomething(writing: $Writing): void {
        $check(html.text(writing._block).length > 0 || this.composed(writing).length > 0,
            'a piece of writing says something, and this one says nothing at all');
    }

    @specify('a piece of writing holds copy, annotations and writing')
    $holdsCopyAndWriting(writing: $Writing): void {
        $check(this.beside(writing).every(part => reflection.writing(part)),
            'a piece of writing holds copy, annotations and writing, and this one holds something else');
    }

    protected composed(writing: $Writing): $Writing[] {
        return (writing._block.$elements ?? []).filter((part): part is $Writing =>
            reflection.composition(part));
    }

    protected beside(writing: $Writing): $Written[] {
        return (writing._block.$elements ?? []).filter(part => typeof part !== 'string' && typeof part !== 'number');
    }
}

export const Writing = $($Writing);
