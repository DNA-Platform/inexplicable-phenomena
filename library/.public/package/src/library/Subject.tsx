import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Subject$ extends $Section$ { }

export class $Subject extends $Composition implements $Subject$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Subject(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfSubject, '!')));
        if (this.heading() === undefined) {
            const Heading = $(heading);
            this._block = this._block.filter(piece => typeof piece !== 'string').concat($(<Heading>{html.text(this._block)}</Heading>));
        }
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
