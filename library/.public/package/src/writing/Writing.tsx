import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, $Written, inert, look } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import type { $Annotation$, $Annotation } from './Annotation';
import type { $Catalogue$, $Catalogue } from '@/reference/Catalogue';
import type { $Type$, $Type } from './Type';
import { $Reference$ } from '@/reference/Reference';
import { $Theme, Theme as theme } from './Theme';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';

export interface $Writing$ extends $Chemical {
    book: $Writing$;
    theme: $Theme;
    mention?: $Catalogue$;
    meaning: $Reference$ | undefined;
    kind: $Type$;
    type: $Type[];
    annotations: $Annotation[];
    searchFor<T extends $Writing>(type: new() => $Type): T[];
    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined;
    specify(): void;
}

export class $Writing extends $Chemical implements $Writing$ {
    inline = true;
    @inert() mention?: $Catalogue;
    _block!: $Block;
    theme!: $Theme;

    get meaning(): $Reference$ | undefined { return reflection.meaning(this) as $Reference$ | undefined; }
    get annotations(): $Annotation[] { return reflection.annotations(this); }
    get type(): $Type[] { return reflection.types(this); }
    get book(): $Writing {
        const holding = this.parent;
        return reflection.writing(holding) && holding !== this ? holding.book : this;
    }
    get kind(): $Type {
        const carried = this.type;
        const standing = carried.filter(kind => reflection.composition(kind));
        $check(standing.length <= 1, `writing is one kind of writing, and this one is ${standing.length}`);
        return standing[0] ?? carried[0];
    }

    $Writing(block: $Block) {
        this._block = $check(block, $Block);
        this.theme = $check(theme, '!');
        for (const part of this._block.$elements ?? []) if (part instanceof $Writing && !reflection.writing(part.parent)) part.parent = this;
    }

    view(): ReactNode {
        const meaning = this.meaning;
        const Block = $(this._block);
        if (meaning === undefined) return <Block />;
        const Anchor = $(anchor);

        return (
            <Anchor href={html.text(meaning.path()?._block)}>
                <Block />
            </Anchor>
        );
    }

    @look('back')
    $view(): ReactNode {
        return html.text(this._block);
    }

    override frame(drawn: ReactNode): ReactNode {
        return super.frame(reflection.formatted(this,
            <span className={reflection.classNames(this).join(' ')}>{drawn}</span>));
    }

    searchFor<T extends $Writing>(type: new() => $Type): T[] {
        return (this._block.$elements ?? []).filter((part): part is T => reflection.instanceOf(part, type));
    }

    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined {
        const found = this.searchFor<T>(type);
        $check(found.length <= 1, `writing holds one of a kind, and this one holds ${found.length}`);
        return found[0];
    }

    addType(type: new() => $Type): void {
        if (!reflection.is(this, type)) this._block = this._block.concat($check(type, '!'));
    }

    valid(): boolean {
        this.specify();
        return true;
    }

    specify(): void {
        const kinds = new Set<unknown>();
        for (const annotation of this.annotations) {
            if (kinds.has(annotation.constructor)) continue;
            kinds.add(annotation.constructor);
            annotation.specifically(this);
        }
    }
}

export class WritingSpecification extends Specification<$Writing> {
    @specify('a piece of writing says what kind of writing it is')
    $saysItsKind(writing: $Writing): void {
        $check(writing.kind !== undefined,
            'a piece of writing says what kind of writing it is, and this one says nothing');
    }

    @specify('a piece of writing is drawn in a theme')
    $isDrawnInATheme(writing: $Writing): void {
        $check(writing.theme instanceof $Theme,
            'a piece of writing is drawn in a theme, and this one was given none');
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

    @specify('a piece of writing holds nothing above its own level')
    $composesWhatItHolds(writing: $Writing): void {
        $check(this.composed(writing).every(part => reflection.beneath(writing.kind, part.kind)),
            'a piece of writing holds nothing above its own level, and this one holds something above it');
    }

    // A RULE READS, AND A READING IS WHAT parts() ANSWERS. A composition arranges what
    // it holds and supplies what its own rules require, so a rule that consulted the
    // block alone would refuse a book for lacking a footer the book itself answers.
    // A writing that cannot read — one carrying a type but composing nothing — is
    // judged on what is written into it, which is all it has.
    protected composed(writing: $Writing): $Writing[] {
        const read = (writing as { parts?: () => $Writing[] }).parts?.();
        if (read !== undefined) return read;

        return (writing._block.$elements ?? []).filter((part): part is $Writing =>
            reflection.writing(part) && reflection.composition(part.kind));
    }

    protected beside(writing: $Writing): $Written[] {
        return (writing._block.$elements ?? []).filter(part => typeof part !== 'string' && typeof part !== 'number');
    }
}

export const Writing = $($Writing);
