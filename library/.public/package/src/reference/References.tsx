import { ReactNode } from 'react';
import { $Block, $, cache, hydration } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Reference, Reference as reference, prints } from './Reference';
import { $Path, Path as path } from './Path';
import { Heading as heading } from '@/encyclopedia/Heading';
import { Cited as cited } from '@/encyclopedia/Cited';

export class $References extends $Section {
    override parenthetical = true;
    serialized = '[]';
    recollection: $Reference[] = [];

    get stack(): string[] { return JSON.parse(this.serialized); }

    $References(block: $Block) {
        const TypeOfReferences = $(typeOfReferences);
        this.type ??= $(<TypeOfReferences />);
        super.$Section(block);
        this.$pid ??= '$references$';
        this.persist = true;
        queueMicrotask(() => this.reassemble());
    }

    append(one: $Reference): void {
        const path = one.path?.copy;
        if (path === undefined) return;
        const list = this.stack;
        if (list.includes(path)) return;
        list.push(path);
        this.serialized = JSON.stringify(list);
        queueMicrotask(() => this.reassemble());
    }

    remove(one: $Reference): void {
        const path = one.path?.copy;
        this.serialized = JSON.stringify(this.stack.filter(kept => kept !== path));
        this.recollection = this.recollection.filter(kept => kept.path?.copy !== path);
    }

    reassemble(): void {
        const written = new Set((this.block?.$elements ?? [])
            .filter((reference): reference is $Reference => reference instanceof $Reference)
            .map(one => one.path?.copy));
        const held = new Set(this.recollection.map(one => one.path?.copy));
        const made: $Reference[] = [];
        for (const link of this.stack) {
            if (written.has(link) || held.has(link)) continue;
            const [step] = link.split('/').filter(Boolean);
            const code = step?.includes(':') ? step.split(':')[0] : undefined;
            const Reference = $(reference);
                const Printed = (code ? prints.get(code) : undefined) ?? Reference;
            const Path = $(path);
            const printed = $<$Reference>(<Printed />, $<$Path>(<Path>{link}</Path>));
            printed.$pid ??= link;
            printed.parent = this;
            hydration.overwrite(printed);
            made.push(printed);
        }
        if (made.length > 0) this.recollection = [...this.recollection, ...made];
    }

    override view(): ReactNode {
        if (this.parenthetical) return null;
        const written = (this.block?.$elements ?? [])
            .filter((reference): reference is $Reference => reference instanceof $Reference);
        const recollection = [...this.recollection].reverse();
        const Heading = $(heading);
        const Cited = $(cited);

        return <>
            <Heading>References</Heading>
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

export class $TypeOfReferences extends $TypeOfSection {
    override name = 'References';

    override specifically(writing: $Writing): void {
        super.specifically(writing);
        writing.$pid ??= '$references$';
        writing.persist = true;
    }

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new ReferencesSpecification();
}

export class ReferencesSpecification extends SectionSpecification {
    @specify('a references section holds references, and needs no title')
    override $opensWithHeading(writing: $Writing): boolean | void {
        if (writing instanceof $References) return false;
        return super.$opensWithHeading(writing);
    }

    @specify('a references section says nothing of its own')
    override $mustHaveText(writing: $Writing): boolean | void {
        if (writing instanceof $References) return false;
        return super.$mustHaveText(writing);
    }

    @specify('a references section may stand empty, waiting')
    override $hasBlock(writing: $Writing): boolean | void {
        if (writing instanceof $References) return false;
        return super.$hasBlock(writing);
    }

    @specify('a references section holds nothing but its references')
    override $hasWriting(writing: $Writing): boolean | void {
        if (writing instanceof $References) return false;
        return super.$hasWriting(writing);
    }
}

export const References = $($References);
export const TypeOfReferences = $($TypeOfReferences);
const typeOfReferences = TypeOfReferences;
