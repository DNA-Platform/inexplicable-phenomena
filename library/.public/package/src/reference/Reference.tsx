import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, $Annotation, $Type, TypedSpecification } from '@/writing/Writing';
import { $Path } from './Path';
import { Anchor } from '@/encyclopedia/Anchor';
import type { $References } from './References';

export interface $Reference$<T extends $Writing = $Writing> extends $Writing {
    get path(): $Path | undefined;
    read(): Promise<T>;
}

export class $Reference extends $Annotation implements $Reference$ {
    $active = false;

    override get canonical(): boolean { return false; }

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }

    $Reference(block: $Block) {
        super.$Writing(block);
        this._type = $(<TypeOfReference />);
        this.$aid ??= this.path?.copy;
    }

    override view(): ReactNode {
        return <Anchor href={this.path?.copy} onClick={() => this.focus()}>{this.path?.copy}</Anchor>;
    }

    focus(): void {
        this.$aid ??= this.path?.copy;
        this.$active = true;
        this.atomic = true;
        (this.book() as { references?: $References }).references?.append(this);
    }

    unfocus(): void {
        this.$active = false;
        this.atomic = false;
        (this.book() as { references?: $References }).references?.remove(this);
    }

    async read(): Promise<$Writing> {
        const held = (this.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        if (held) return held;
        if (this.path !== undefined) throw new Error('a reference reads to what it means, and following its path is not yet designed');
        throw new Error('a reference reads to what it means, and this one holds nothing to read');
    }
}

export class $TypeOfReference extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Reference; }

    override specifically(reference: $Reference): void {
        super.specifically(reference);
    }

    constructor() {
        super();
        this[cache]('Reference');
    }

    protected override specification: Specification<$Writing> = new ReferenceSpecification();
}

export class ReferenceSpecification extends TypedSpecification<$Writing> {
    @specify('a reference carries a path')
    $carriesPath(writing: $Writing): void {
        $check((writing.block?.$elements ?? []).some(one => one instanceof $Path),
            'a reference carries a path, and this one carries none');
    }
}

export const prints = new Map<string, new () => $Reference>();

export const Reference = $($Reference);
export const TypeOfReference = $($TypeOfReference);
