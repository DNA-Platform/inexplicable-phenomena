import { ReactNode } from 'react';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter, ChapterSpecification } from './Chapter';
import { Specification, specify } from '@/utilities/Specification';
import { $References } from '@/reference/References';
import { $Reference } from '@/reference/Reference';
import { Heading as heading } from '@/encyclopedia/Heading';
import { Cited as cited } from '@/encyclopedia/Cited';

export class $Index extends $Chapter {
    override parenthetical = true;

    $Index(block: $Block) {
        const TypeOfIndex = $(typeOfIndex);
        this.type ??= $(<TypeOfIndex />);
        super.$Chapter(block);
    }

    override view(): ReactNode {
        const references = this.references;
        if (!references) return super.view();
        const written = (references.block?.$elements ?? [])
            .filter((reference): reference is $Reference => reference instanceof $Reference);
        const recollection = [...references.recollection].reverse();
        const Heading = $(heading);
        const Cited = $(cited);

        return <>
            <Heading>Index</Heading>
            <Cited>{written.map((one, at) => {
                const Cite = $(one);
                return <li key={at}><Cite /></li>;
            })}{recollection.map(one => {
                const Cite = $(one);
                return <li key={one.path?.copy ?? ''}><Cite /></li>;
            })}</Cited>
        </>;
    }
}

export class $TypeOfIndex extends $TypeOfChapter {
    override name = 'Index';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new IndexSpecification();
}

export class IndexSpecification extends ChapterSpecification {
    @specify('an index says nothing of its own — the references speak')
    override $mustHaveText(writing: $Writing): boolean | void {
        if (writing instanceof $Index) return false;
        return super.$mustHaveText(writing);
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
const typeOfIndex = TypeOfIndex;
