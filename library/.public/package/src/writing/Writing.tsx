import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, $Written, look } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Reference$ } from '@/reference/Reference';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';

export interface $Annotation$ extends $Writing$ {
    specifically(writing: $Writing$): void;
}

export interface $Type$ extends $Annotation$ { }

export interface $Writing$ extends $Chemical {
    type(): $Type$;
    means(): $Reference$ | undefined;
    annotations(): $Annotation[];
    types(): $Type[];
    book(): $Writing$;
    searchFor<T extends $Writing>(type: new() => $Type): T[];
    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined;
    specify(): void;
}

export class $Writing extends $Chemical implements $Writing$ {
    inline = true;
    _block!: $Block;

    type(): $Type {
        const carried = this.types();
        const standing = carried.filter(one => reflection.composition(one));
        $check(standing.length <= 1, `writing is one kind of writing, and this one is ${standing.length}`);
        return standing[0] ?? carried[0];
    }
    means(): $Reference$ | undefined { return reflection.means(this) as $Reference$ | undefined; }
    annotations(): $Annotation[] { return reflection.annotations(this); }
    types(): $Type[] { return reflection.types(this); }
    book(): $Writing {
        const holding = this.parent;
        return reflection.writing(holding) && holding !== this ? holding.book() : this;
    }

    $Writing(block: $Block) {
        this._block = $check(block, $Block);
    }

    view(): ReactNode {
        const Block = $(this._block);
        const means = this.means();
        if (means === undefined) return <Block />;
        const Anchor = $(anchor);

        return (
            <Anchor href={html.text(means.path()?._block)}>
                <Block />
            </Anchor>
        );
    }

    @look('back')
    $view(): ReactNode {
        return html.text(this._block);
    }

    override frame(): ReactNode {
        return <span className={reflection.classNames(this).join(' ')}>{super.frame()}</span>;
    }

    searchFor<T extends $Writing>(type: new() => $Type): T[] {
        return (this._block.$elements ?? []).filter((part): part is T =>
            reflection.instanceOf(part, type));
    }

    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined {
        const found = this.searchFor<T>(type);
        $check(found.length <= 1, `writing holds one of a kind, and this one holds ${found.length}`);
        return found[0];
    }

    specify(): void {
        const kinds = new Set<unknown>();
        for (const annotation of this.annotations()) {
            if (kinds.has(annotation.constructor)) continue;
            kinds.add(annotation.constructor);
            annotation.specifically(this);
        }
    }
}

export class $Annotation extends $Writing implements $Annotation$ {
    protected specification: Specification<$Writing> = new WritingSpecification();

    specifically(writing: $Writing): void {
        this.specification.check(writing);
    }
}

export class $Type extends $Annotation implements $Type$ {
    name = 'Type';

    override view(): ReactNode {
        return null;
    }

    override frame(): ReactNode {
        return null;
    }

    below(): (new() => $Type) | undefined { return undefined; }

    makes(tokens: (string | $Writing)[]): $Writing[] { return []; }
}

export class WritingSpecification extends Specification<$Writing> {
    @specify('a piece of writing says what kind of writing it is')
    $saysItsKind(writing: $Writing): void {
        $check(writing.type() !== undefined,
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

    @specify('a piece of writing composes the kind beneath it, or its own')
    $composesWhatItHolds(writing: $Writing): void {
        const kind = writing.type();
        const beneath = kind?.below();
        const own = kind?.constructor as (new() => $Type) | undefined;
        $check(this.composed(writing).every(part =>
            (beneath !== undefined && reflection.instanceOf(part, beneath))
            || (own !== undefined && reflection.instanceOf(part, own))),
            'a piece of writing composes the kind beneath it, or its own, and this one holds neither');
    }

    protected composed(writing: $Writing): $Writing[] {
        return writing.searchFor($Type).filter(part => reflection.composition(part.type()));
    }

    protected beside(writing: $Writing): $Written[] {
        return (writing._block.$elements ?? []).filter(part => typeof part !== 'string' && typeof part !== 'number');
    }
}

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Type = $($Type);
