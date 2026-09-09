import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfSection } from '@/writing/Section';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';

export interface $Document$ extends $Composition$ { }

export class $Document extends $Composition implements $Document$ {
    $Document(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfDocument, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <article className={this.className}>{content}</article>;
    }
}

export interface $$Document$ extends $Paragraph$ { }

export class $$Document extends $Catalogue implements $$Document$ {
    $$Document(block: $Block) {
        super.$Catalogue($check(block, $Block, '!').concat($check($TypeOfParagraph, '!')).concat($check($TypeOf$Document, '!')));
    }
}

export class $TypeOfDocument extends $Type {
    override name = 'Document';
    protected override specification: Specification<$Writing> = new DocumentSpecification();

    override below(): new() => $TypeOfSection { return $TypeOfSection; }
}

export class DocumentSpecification extends WritingSpecification {
}

export class $TypeOf$Document extends $Type {
    override name = '$Document';
    protected override specification: Specification<$Writing> = new $DocumentSpecification();
}

export class $DocumentSpecification extends WritingSpecification {
}

export const Document = $($Document);
export const documented = $($$Document);
export const TypeOf$Document = $($TypeOf$Document);
export const TypeOfDocument = $($TypeOfDocument);
