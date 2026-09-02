import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Columns } from '@/encyclopedia/Columns';
import { $Type, TypedSpecification, $Writing, Dress } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Document } from './Document';
import { $$ } from '@/utilities/Lib';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';

export class $File extends $Composition<$Document> implements $Composition$<$Document> {

    $File(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfFile />);
    }

    override get dress(): Dress | undefined { return this.constructor === $File ? Columns : undefined; }
}

export class $$File extends $Reference implements $Reference$<$File> {
    $$File(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$File />);
    }

    override async read(): Promise<$File> {
        return $$(await super.read(), $File);
    }
}

export class $TypeOfFile extends $Type {
    override flows = false;

    override get shell(): typeof $Writing { return $File; }
    resolve = false;
    override code = 'Fe';
    override get writtenAs(): new () => $Writing { return $Document; }

    override get canonicalForm(): typeof $Writing { return $File; }

    constructor() {
        super();
        this[cache]('File');
    }

    protected override specification: Specification<$Writing> = new FileSpecification();
}

export class $TypeOf$File extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$File; }

    constructor() {
        super();
        this[cache]('$File');
    }

    protected override specification: Specification<$Writing> = new $FileSpecification();
}

export class FileSpecification extends TypedSpecification<$Writing> {
    @specify('a file is written as documents')
    $writtenAsDocuments(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Document)), 'a file is written as documents, and something in this one is not one');
    }
}

export class $FileSpecification extends ReferenceSpecification {
    @specify('a reference to a file lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Fe:'),
            'a reference to a file lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($File),
            'a reference to a file lands on one, and what it holds is not one');
    }
}

export const File = $($File);
export const TypeOfFile = $($TypeOfFile);
export const TypeOf$File = $($TypeOf$File);
prints.set('Fe', $$File);
