import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Title, $TypeOfTitle } from './Title';

export interface $Document$ extends $Composition$ {
    title(): $Writing | undefined;
}

export class $Document extends $Composition implements $Document$ {
    definition = 'article';
    // THE SECTION THAT TITLES IT: the title an author wrote, and otherwise the section it opens with,
    // whose heading is the document's own. The two become one reading once every document opens with
    // its title — Sprint 73 R9 — and this is the half of it that costs no rewrite.
    title(): $Section | undefined { return this.searchForOne<$Title>($TypeOfTitle) ?? this.searchFor<$Section>($TypeOfSection)[0]; }

    $Document(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfDocument));
    }
}

export class $$Document extends $Catalogue { }

export class $TypeOfDocument extends $Type {
    protected override specification: Specification<$Writing> = new DocumentSpecification();
}

export class DocumentSpecification extends WritingSpecification { }

export const Document = $($Document);
export const doc = $($$Document);
export const TypeOfDocument = $($TypeOfDocument);
