import { $, $Block } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Subject$ extends $Section$ { }

export class $Subject extends $Composition implements $Subject$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Subject(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSubject);
        if (this.heading() !== undefined) return;
        const Heading = $(heading);
        this._block = this._block.filter(piece => typeof piece !== 'string').concat($(<Heading>{html.text(this._block)}</Heading>));
    }
}

export class $TypeOfSubject extends $TypeOfSection {
    override name = 'Subject';
    protected override specification: Specification<$Writing> = new SubjectSpecification();
}

export class SubjectSpecification extends SectionSpecification {
    @specify('a subject is its own heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }
}

export const Subject = $($Subject);
export const TypeOfSubject = $($TypeOfSubject);
