import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Row$ extends $Section$ { }

export class $Row extends $Composition implements $Row$ {
    definition = 'div';
    heading(): $Writing | undefined { return undefined; }

    $Row(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfRow));
    }
}

export class $TypeOfRow extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new RowSpecification();
}

export class RowSpecification extends SectionSpecification {
    @specify('a row of a contents says what it means')
    override $saysSomething(): boolean | void {
        return false;
    }

    @specify('a row of a contents opens with its mention')
    override $opensWithHeading(): boolean | void {
        return false;
    }

    @specify('a row of a contents holds its mention, not parts')
    override $holdsSpecifiedParts(): boolean | void {
        return false;
    }

    @specify('a row of a contents carries a mention')
    $carriesMention(writing: $Writing): void {
        $check(reflection.meaning(writing) !== undefined,
            'a row of a contents carries a mention, and this one carries none');
    }

    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
}

export const Row = $($Row);
export const TypeOfRow = $($TypeOfRow);
