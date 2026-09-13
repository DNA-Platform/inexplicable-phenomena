import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection } from '@/writing/Section';

export interface $Document$ extends $Composition$ {
    title(): $Writing | undefined;
}

export class $Document extends $Composition implements $Document$ {
    definition = 'article';
    title(): $Writing | undefined { return this.searchFor<$Section>($TypeOfSection)[0]?.heading(); }

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
