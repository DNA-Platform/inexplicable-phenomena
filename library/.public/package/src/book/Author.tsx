import { $, $Block } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Author$ extends $Section$ { }

export class $Author extends $Composition implements $Author$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Author(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfAuthor);
        if (this.heading() !== undefined) return;
        const Heading = $(heading);
        this._block = this._block.filter(piece => typeof piece !== 'string').concat($(<Heading>{html.text(this._block)}</Heading>));
    }
}

export class $TypeOfAuthor extends $TypeOfSection {
    override name = 'Author';
    protected override specification: Specification<$Writing> = new AuthorSpecification();
}

export class AuthorSpecification extends SectionSpecification {
    @specify('a author is its own heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }
}

export const Author = $($Author);
export const TypeOfAuthor = $($TypeOfAuthor);
