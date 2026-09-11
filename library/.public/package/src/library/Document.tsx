import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
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
        const meant = reflection.chapter(this)?.document;
        if (meant !== undefined) meant._block = meant._block.filter(part => !reflection.writing(part) || reflection.annotation(part)).concat(this);
    }
}

export class $$Document extends $Catalogue { }

export class $TypeOfDocument extends $Type {
    protected override specification: Specification<$Writing> = new DocumentSpecification();
}

export class DocumentSpecification extends WritingSpecification {
}

export const Document = $($Document);
export const doc = $($$Document);
export const TypeOfDocument = $($TypeOfDocument);
