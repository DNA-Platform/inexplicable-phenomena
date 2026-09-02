import { ReactNode } from 'react';
import { $Block, $, cache, hydration } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Reference, prints } from './Reference';
import { $Path, Path } from './Path';
import { Heading } from '@/encyclopedia/Heading';
import { Cited } from '@/encyclopedia/Cited';

export class $References extends $Section {
    override parenthetical = true;
    serialized = '[]';
    reprinted: $Reference[] = [];

    get stack(): string[] { return JSON.parse(this.serialized); }

    $References(block: $Block) {
        super.$Section(block);
        this._type = $(<TypeOfReferences />);
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
        this.reprinted = this.reprinted.filter(kept => kept.path?.copy !== path);
    }

    reassemble(): void {
        const written = new Set((this.block?.$elements ?? [])
            .filter((one): one is $Reference => one instanceof $Reference)
            .map(one => one.path?.copy));
        const held = new Set(this.reprinted.map(one => one.path?.copy));
        const made: $Reference[] = [];
        for (const path of this.stack) {
            if (written.has(path) || held.has(path)) continue;
            const [step] = path.split('/').filter(Boolean);
            const code = step?.includes(':') ? step.split(':')[0] : undefined;
            const Printed = $((code ? prints.get(code) : undefined) ?? $Reference);
            const printed = $<$Reference>(<Printed />, $<$Path>(<Path>{path}</Path>));
            printed.$pid ??= path;
            printed.parent = this;
            hydration.overwrite(printed);
            made.push(printed);
        }
        if (made.length > 0) this.reprinted = [...this.reprinted, ...made];
    }

    override view(): ReactNode {
        if (this.parenthetical) return null;
        const written = (this.block?.$elements ?? [])
            .filter((one): one is $Reference => one instanceof $Reference);
        const reprinted = [...this.reprinted].reverse();
        return <>
            <Heading>References</Heading>
            <Cited>{written.map((one, at) => {
                const Cite = $(one);
                return <li key={at}><Cite /></li>;
            })}{reprinted.map(one => {
                const Cite = $(one);
                return <li key={one.path?.copy ?? ''}><Cite /></li>;
            })}</Cited>
        </>;
    }
}

export class $TypeOfReferences extends $TypeOfSection {
    override get canonicalForm(): typeof $Writing { return $References; }
    override specifically(writing: $Writing): void {
        super.specifically(writing);
        writing.$pid ??= '$references$';
        writing.persist = true;
    }

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
