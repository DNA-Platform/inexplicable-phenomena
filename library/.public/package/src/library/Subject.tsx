import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Subject$ extends $Section$ { }

export class $Subject extends $Section implements $Subject$ {
    // PRESENT, AND SHOWN ONLY WHERE A BOOK ASKS. A cover's specification REQUIRES a subject, and a
    // paper does not print one — Doug: "You can not print parenthetical things if you need them in
    // the schema but not on the page." Removing it from the cover answered with a refusal panel
    // reading "a cover carries its subject, and this one carries none", which is the specification
    // doing its job. An encyclopedia, which does show it, writes <Subject print>.
    override parenthetical = true;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Subject(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check($TypeOfSubject, '!')));
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
