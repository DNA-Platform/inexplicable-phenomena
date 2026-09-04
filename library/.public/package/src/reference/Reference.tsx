import { ComponentType, ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, $Annotation, $Type, TypedSpecification } from '@/writing/Writing';
import { $Path, Path } from './Path';
import { $Composition } from '@/writing/Composition';
import { Anchor } from '@/encyclopedia/Anchor';
import type { $References } from './References';

export interface $Reference$ extends $Writing {
    get path(): $Path | undefined;
    read(): Promise<$Writing>;
}

export class $Reference extends $Annotation implements $Reference$ {
    $focused = false;

    override get canonical(): boolean { return false; }

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }

    $Reference(block: $Block) {
        const Asked = $(TypeOfReference);
        this.type ??= $(<Asked />);
        super.$Writing(block);
        this.$pid ??= this.path?.copy;
    }

    override view(): ReactNode {
        const Asked = $(Anchor);

        return <Asked href={this.path?.copy} onClick={() => this.focus()}>{this.path?.copy}</Asked>;
    }

    focus(): void {
        this.$pid ??= this.path?.copy;
        this.$focused = true;
        this.persist = true;
        (this.book() as { references?: $References }).references?.append(this);
    }

    unfocus(): void {
        this.$focused = false;
        this.persist = false;
        (this.book() as { references?: $References }).references?.remove(this);
    }

    async read(): Promise<$Writing> {
        const held = (this.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        if (held) return held;
        const path = this.path;
        if (path === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const fragment = path.copy.startsWith('#') ? path.copy.slice(1) : path.copy;
        const root = this.book();
        if (/^(?:[A-Z][a-z]?:)?\d/.test(fragment) && root instanceof $Composition) return root.catalogue().follow(fragment);
        throw new Error('a reference reads to what it means, and this route is the application to follow');
    }
}

export class $TypeOfReference extends $Type {
    resolve = false;
    override name = 'Reference';

    override specifically(reference: $Reference): void {
        const block = reference.block;
        if (block && !(block.$elements ?? []).some(one => one instanceof $Path)
            && /^(?:[a-z][a-z0-9+.-]*:\/\/|\/|#)/iu.test(reference.copy) && URL.canParse(reference.copy, 'https://library')) {
            const AskedPath = $(Path);
            block.$elements = [...(block.$elements ?? []), $<$Path>(<AskedPath>{reference.copy}</AskedPath>)];
        }
        super.specifically(reference);
    }

    constructor() {
        super();
        this[cache](this.name);
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

export const prints = new Map<string, ComponentType>();

export const Reference = $($Reference);
export const TypeOfReference = $($TypeOfReference);
