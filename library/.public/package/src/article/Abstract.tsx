// CREATED 2026-09-09 · rating 3. A PAPER HAS AN ABSTRACT. Doug: "you should have an abstract in
// article and that should be carrying it."
//
// THIS REVERSES THE NOTE IN src/article.ts that deleted $Abstract, and the reason it gives —
// "read beside library/Synopsis it was the SAME CLASS under another name" — is true and beside the
// point. Two kinds may be structurally identical and still be different things, because a consumer
// registers components against each INDEPENDENTLY and a sheet selects each by its own name. Doug:
// "Our framework isn't fake. It is polymorphic… Two things can be nearly identical but different
// just because you can register components to each independently."
//
// So the test ch14 asks — name what this does that its type could not confer — is answered by the
// NAME itself: $(within, Abstract)(Something) reaches a paper's abstract and leaves every other
// book's synopsis alone, and `.pd-abstract` styles one without styling the other. An abstract
// stays parenthetical, inherited from the synopsis: present, and shown only where a paper prints it.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Synopsis$, $Synopsis, $TypeOfSynopsis, SynopsisSpecification } from '@/library/Synopsis';

export interface $Abstract$ extends $Synopsis$ { }

export class $Abstract extends $Synopsis implements $Abstract$ {
    $Abstract(block: $Block) {
        super.$Synopsis(this.addType(block, $TypeOfAbstract));
    }
}

export class $TypeOfAbstract extends $TypeOfSynopsis {
    override name = 'Abstract';
    protected override specification: Specification<$Writing> = new AbstractSpecification();
}

export class AbstractSpecification extends SynopsisSpecification {
}

export const Abstract = $($Abstract);
export const TypeOfAbstract = $($TypeOfAbstract);
