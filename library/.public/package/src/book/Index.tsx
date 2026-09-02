import { ReactNode } from 'react';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { DocumentSpecification } from '@/writing/Document';
import { Specification, specify } from '@/utilities/Specification';
import { $Chapter, $TypeOfChapter } from './Chapter';
import { $References } from '@/reference/References';
import { $Reference } from '@/reference/Reference';
import { Heading } from '@/encyclopedia/Heading';
import { Cited } from '@/encyclopedia/Cited';

export class $Index extends $Chapter {
    override parenthetical = true;

    $Index(block: $Block) {
        super.$Chapter(block);
        this._type = $(<TypeOfIndex />);
    }

    get references(): $References | undefined {
        return (this.block?.$elements ?? []).find((one): one is $References => one instanceof $References);
    }

    override view(): ReactNode {
        const references = this.references;
        if (!references) return super.view();
        const written = (references.block?.$elements ?? [])
            .filter((one): one is $Reference => one instanceof $Reference);
        const remembered = [...references.remembered].reverse();
        return <>
            <Heading>Index</Heading>
            <Cited>{written.map((one, at) => {
                const Cite = $(one);
                return <li key={at}><Cite /></li>;
            })}{remembered.map(one => {
                const Cite = $(one);
                return <li key={one.path?.copy ?? ''}><Cite /></li>;
            })}</Cited>
        </>;
    }
}

export class $TypeOfIndex extends $TypeOfChapter {
    override get canonicalForm(): typeof $Writing { return $Index; }

    constructor() {
        super();
        this[cache]('Index');
    }

    protected override specification: Specification<$Writing> = new IndexSpecification();
}

export class IndexSpecification extends DocumentSpecification {
    @specify('an index says nothing of its own — the references speak')
    override $mustHaveText(writing: $Writing): boolean | void {
        if (writing instanceof $Index) return false;
        return super.$mustHaveText(writing);
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
