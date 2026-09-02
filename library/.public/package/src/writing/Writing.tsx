import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, look } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { Specification, specify } from '@/utilities/Specification';
import type { $Reference } from '@/reference/Reference';
import { html } from '@/utilities/Html';
import { Anchor } from '@/encyclopedia/Anchor';

export class $Writing extends $Chemical implements $Referent$ {
    parenthetical = false;
    override inline = true;
    annotation = false;
    block: $Block = undefined as any;
    protected inside?: $Writing = undefined;
    protected _type?: $Type = undefined;

    get copy(): string { return this.bound ? this.inside!.copy : html.text(this.block); }
    get canonical(): boolean { return true; }
    get labels(): string[] {
        return [...(this.type?.names ?? []), ...this.traits.flatMap(one => one.names ?? (one.copy === '' ? [] : [one.copy]))]
            .filter(name => !name.includes('$'))
            .map(name => 'pd-' + name.toLowerCase());
    }
    get traits(): $Trait[] { return this.annotations.filter((one): one is $Trait => one instanceof $Trait); }
    get means(): $Reference | undefined { return (this.block?.$elements ?? []).find((one): one is $Reference => one instanceof $Writing && (one as $Reference).url !== undefined); }
    get $print(): boolean { return !this.parenthetical; }
    set $print(print: boolean) { this.parenthetical = !print; }
    get type(): $Type { return this._type as $Type; }
    get annotations(): $Writing[] { return (this.block?.$elements ?? []).filter((one): one is $Writing => one instanceof $Writing && one.annotation); }

    book(): $Writing {
        if (this.bound) return this.inside!.book();
        const up = this.parent;
        return up instanceof $Writing && up !== this ? up.book() : this;
    }

    $Writing(block: $Block) {
        this.block = block ?? this.block;
        this._type = this.carried;
    }

    override frame(): ReactNode {
        const labels = this.labels;
        if (this.annotation || labels.length === 0) return super.frame();
        return this.type?.flows ?? true
            ? <span className={labels.join(' ')}>{super.frame()}</span>
            : <div className={labels.join(' ')}>{super.frame()}</div>;
    }

    view(): ReactNode {
        const Writing = this.bound ? $(this.inside!) : this.block ? $(this.block) : null;
        const means = this.means;
        if (means?.url !== undefined)
            return <Anchor href={means.url}>{Writing && <Writing />}</Anchor>;
        return <>
            {Writing && <Writing />}
        </>;
    }

    @look('back')
    $view(): ReactNode {
        return this.copy;
    }

    specify(): void {
        $check(!!this.type || this.parenthetical, 'a piece of writing has a type, and this one has none');
        this.type?.specifically(this);
        for (const one of this.traits) one.specifically(this);
    }

    valid(): boolean {
        this._type?.specifically(this);
        return true;
    }

    bind(writing: $Writing) {
        this.type?.specifically(writing);
        for (const one of this.traits) one.specifically(writing);
        this.inside = writing;
    }

    protected get bound() { return !!this.inside; }

    protected get carried(): $Type | undefined {
        return this.annotations
            .filter((one): one is $Type => one instanceof $Type && !(one instanceof $Trait))
            .reduce((most: $Type | undefined, one) => most === undefined || one instanceof (most.constructor as new () => $Type) ? one : most, undefined);
    }
}

export class $Annotation extends $Writing {
    override parenthetical = true;
    override annotation = true;
}

export class $Type extends $Annotation {
    formula = true;
    code = '';
    nests = false;
    seated = false;
    flows = true;
    get writtenAs(): (new () => $Writing) | undefined { return undefined; }
    get canonicalForm(): typeof $Writing { return $Writing; }
    protected specification: Specification<$Writing> = new TypedSpecification<$Writing>();

    specifically(writing: $Writing): void {
        this.specification.check(writing);
    }

    override view(): ReactNode {
        return null;
    }
}

export class $Trait extends $Type {
    override strict = false;
}

export class TypedSpecification<T extends $Writing> extends Specification<T> {
    @specify('a piece of writing has a block')
    $hasBlock(writing: T): void {
        $check(!!writing.block, 'a piece of writing has a block, and this one has none');
    }

    @specify('a piece of writing has characters')
    $mustHaveText(writing: T): void {
        $check(writing.copy !== '', 'a piece of writing has characters, and this one is empty');
    }

    @specify('a piece of writing has a type')
    $hasType(writing: T): void {
        this.for = writing.type instanceof $Type ? writing.type : undefined;
        $check(this.for !== undefined || writing.parenthetical,
            'a piece of writing has a type, and this one has none');
    }

    @specify('a piece of writing is typed once')
    $typedOnce(writing: T): void {
        $check(writing.annotations.filter(one => one instanceof $Type && !(one instanceof $Trait)).length <= 1,
            'a piece of writing is typed once, and this one is typed more than once');
    }

    @specify('a piece of writing has something written in it')
    $hasWriting(writing: T): void {
        const inside = writing.block?.$elements ?? [];
        $check(inside.some(one => !(one instanceof $Writing) || !one.annotation),
            'a piece of writing has something written in it, and this one is nothing but annotations');
    }

    @specify('a piece of writing descends from a chain that terminates')
    $terminates(writing: T): void {
        void writing.book;
    }

    @specify('a piece of writing is one kind of writing')
    $oneKind(writing: T): void {
        const type = this.for;
        const written = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Type && !(one instanceof $Trait));
        $check(written.every(one => one === type
            || (type !== undefined && type instanceof (one.constructor as new () => $Writing))),
            'a piece of writing is one kind of writing, and this one is written as two');
    }

}


export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Type = $($Type);
export const Trait = $($Trait);
