import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';
import { $Specification, specify } from './Specification';

export class $Type extends $Annotation {
    formula = true;

    get canonicalForm(): typeof $Writing { return $Writing; }

    getSpecification(): $Specification<$Writing> {
        return new $TypedSpecification<$Writing>();
    }

    specifically(writing: $Writing): void {
        this.getSpecification().check(writing);
    }

    override view(): ReactNode {
        return null;
    }
}

export class $TypedSpecification<T extends $Writing> extends $Specification<T> {
    @specify('a piece of writing has a block')
    $block(writing: T): void {
        $check(!!writing.block, 'a piece of writing has a block, and this one has none');
    }

    @specify('a piece of writing has characters')
    $characters(writing: T): void {
        $check(writing.copy !== '', 'a piece of writing has characters, and this one is empty');
    }

    @specify('a piece of writing has a type')
    $type(writing: T): void {
        this.for = writing.type instanceof $Type ? writing.type : undefined;
        $check(this.for !== undefined || writing.parenthetical,
            'a piece of writing has a type, and this one has none');
    }

    @specify('a piece of writing is typed once')
    $once(writing: T): void {
        $check(writing.annotations.filter(one => one instanceof $Type).length <= 1,
            'a piece of writing is typed once, and this one is typed more than once');
    }

    @specify('a piece of writing has something written in it')
    $written(writing: T): void {
        const inside = writing.block.$elements ?? [];
        $check(inside.some(one => !(one instanceof $Writing) || !one.annotation),
            'a piece of writing has something written in it, and this one is nothing but annotations');
    }

    @specify('a piece of writing is one kind of writing')
    $kind(writing: T): void {
        const type = this.for;
        const written = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && 'canonicalForm' in one);
        $check(written.every(one => one === type
            || (type !== undefined && type instanceof (one.constructor as new () => $Writing))),
            'a piece of writing is one kind of writing, and this one is written as two');
    }
}

export const Type = $($Type);
