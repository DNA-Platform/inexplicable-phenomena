import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Reference } from './Reference';
import { Heading } from '@/encyclopedia/Heading';
import { Cited } from '@/encyclopedia/Cited';
import { Anchor } from '@/encyclopedia/Anchor';

export class $References extends $Section {
    override parenthetical = true;
    serialized = '[]';

    get stack(): string[] { return JSON.parse(this.serialized); }

    $References(block: $Block) {
        super.$Section(block);
        this._type = $(<TypeOfReferences />);
        this.$pid ??= 'References';
        this.persist = true;
    }

    append(one: $Reference): void {
        const path = one.path?.copy;
        if (path === undefined) return;
        const list = this.stack;
        if (list.includes(path)) return;
        list.push(path);
        this.serialized = JSON.stringify(list);
    }

    remove(one: $Reference): void {
        const path = one.path?.copy;
        this.serialized = JSON.stringify(this.stack.filter(kept => kept !== path));
    }

    override view(): ReactNode {
        if (this.parenthetical) return null;
        const written = (this.block?.$elements ?? [])
            .filter((one): one is $Reference => one instanceof $Reference);
        const stacked = [...this.stack].reverse();
        return <>
            <Heading>References</Heading>
            <Cited>{written.map((one, at) => {
                const Cite = $(one);
                return <li key={at}><Cite /></li>;
            })}{stacked.map(path => <li key={path}><Anchor href={path}>{path}</Anchor></li>)}</Cited>
        </>;
    }
}

export class $TypeOfReferences extends $TypeOfSection {
    override get canonicalForm(): typeof $Writing { return $References; }

    constructor() {
        super();
        this[cache]('References');
    }

    protected override specification: Specification<$Writing> = new ReferencesSpecification();
}

export class ReferencesSpecification extends SectionSpecification {
    @specify('a references section holds references, and needs no title')
    override $opensWithTitle(writing: $Writing): boolean | void {
        if (writing instanceof $References) return false;
        return super.$opensWithTitle(writing);
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
