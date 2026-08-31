import { ReactNode } from 'react';
import { $, $check, $Chemical, $Html, look } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { Specification, specify } from '@/utilities/Specification';
import type { $Reference } from '@/reference/Reference';
import { html } from '@/utilities/Html';

export class $Writing extends $Chemical implements $Referent$ {
    inline = true;
    index = 0;
    type!: $Type;
    parenthetical = false;
    annotation = false;
    block: $Html<'block'> = undefined as any;

    get copy(): string { return this.bound ? this.inside!.copy : html.text(this.block); }
    get canonical(): boolean { return true; }
    get annotations(): $Writing[] { return (this.block?.$elements ?? []).filter((one): one is $Writing => one instanceof $Writing && one.annotation); }
    get attributes(): $Attribute[] { return this.annotations.filter((one): one is $Attribute => one instanceof $Attribute); }
    get means(): $Reference | undefined { return (this.block?.$elements ?? []).find((one): one is $Reference => one instanceof $Writing && (one as $Reference).path !== undefined); }
    get slug(): string { return this.copy.toLowerCase().match(/[\p{L}\p{N}]+/gu)?.slice(0, 5).join('-') ?? ''; }
    get ref(): string {
        const steps: string[] = [];
        for (let at: $Writing | undefined = this; at instanceof $Writing; at = at.parent as $Writing | undefined)
            steps.unshift(`${at.type?.code ?? ''}:${at.index}`);
        return steps.join('>');
    }

    protected inside?: $Writing = undefined;
    protected get bound() { return !!this.inside; }

    $Writing(block: $Html<'block'>) {
        this.block = block ?? this.block;
        this.type = this.annotations
            .filter((one): one is $Type => one instanceof $Type && !(one instanceof $Attribute))
            .reduce((most: $Type | undefined, one) => most === undefined || one instanceof (most.constructor as new () => $Type) ? one : most,
                undefined) as $Type;
    }

    view(): ReactNode {
        return this.bound ? this.inside!.view() : this.block?.view() ?? null;
    }

    @look('back')
    $view(): ReactNode {
        return this.bound ? this.inside!.$view() : this.copy;
    }

    specify(): void {
        $check(!!this.type || this.parenthetical, 'a piece of writing has a type, and this one has none');
        this.type?.specifically(this);
        for (const one of this.attributes) one.specifically(this);
    }

    bind(writing: $Writing) {
        this.type?.specifically(writing);
        for (const one of this.attributes) one.specifically(writing);
        this.inside = writing;
    }
}

export class $Annotation extends $Writing {
    override parenthetical = true;
    override annotation = true;
}

export class $Type extends $Annotation {
    formula = true;
    code = '';
    protected specification: Specification<$Writing> = new TypedSpecification<$Writing>();

    get canonicalForm(): typeof $Writing { return $Writing; }

    specifically(writing: $Writing): void {
        this.specification.check(writing);
    }

    override view(): ReactNode {
        return null;
    }
}

export class $Attribute extends $Type { }

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
        $check(writing.annotations.filter(one => one instanceof $Type && !(one instanceof $Attribute)).length <= 1,
            'a piece of writing is typed once, and this one is typed more than once');
    }

    @specify('a piece of writing has something written in it')
    $hasWriting(writing: T): void {
        const inside = writing.block?.$elements ?? [];
        $check(inside.some(one => !(one instanceof $Writing) || !one.annotation),
            'a piece of writing has something written in it, and this one is nothing but annotations');
    }

    @specify('a piece of writing is one kind of writing')
    $oneKind(writing: T): void {
        const type = this.for;
        const written = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Type && !(one instanceof $Attribute));
        $check(written.every(one => one === type
            || (type !== undefined && type instanceof (one.constructor as new () => $Writing))),
            'a piece of writing is one kind of writing, and this one is written as two');
    }
}

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Type = $($Type);
export const Attribute = $($Attribute);
