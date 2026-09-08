// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the article sprint, against the Aaronson paper Doug supplies.
// A THEOREM IS A SECTION whose heading is its label ("Theorem 1", "Lemma 2") and whose body is the statement; a proof is the same kind under another label. Numbered by a READING over the chapter, like $Equation — never a field.
// DEPENDS ON: $Composition, $TypeOfSection / SectionSpecification (writing/Section) — designed for it: a section reads its heading from its opening sentence and supplies one when none is written (Sprint 48), which is exactly a theorem's label.
// The label kind (`$kind`) is a PROXY name and a guess at the authoring surface: <Theorem kind="lemma">…</Theorem>. Doug's call; the paper decides which labels exist.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';

export interface $Theorem$ extends $Section$ {
    number(): number | undefined;
}

export class $Theorem extends $Composition implements $Theorem$ {
    $kind = 'theorem';

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    number(): number | undefined {
        throw new Error('not implemented: $Theorem.number — a reading over the chapter, shared in shape with $Equation.number');
    }

    $Theorem(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfTheorem, '!')));
    }
}

export class $TypeOfTheorem extends $TypeOfSection {
    override name = 'Theorem';
    protected override specification: Specification<$Writing> = new TheoremSpecification();
}

export class TheoremSpecification extends SectionSpecification {
}

export const Theorem = $($Theorem);
export const TypeOfTheorem = $($TypeOfTheorem);
