import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $Chapter, $TypeOfChapter } from './Chapter';

export interface $Document$ extends $Composition$ {
    title(): $Writing | undefined;
}

export class $Document extends $Composition implements $Document$ {
    title(): $Writing | undefined { return this.searchFor<$Section>($TypeOfSection)[0]?.heading(); }

    // A DOCUMENT DRAWN IN A CHAPTER TELLS THE CHAPTER IT IS THERE, so the chapter can be followed to it.
    $Document(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfDocument));
        const holding = this.parent;
        if (reflection.is<$Chapter>(holding, $TypeOfChapter)) holding.written ??= this;
    }

    override print(content: ReactNode): ReactNode {
        return <article className={this.className}>{content}</article>;
    }
}

export interface $$Document$ extends $Paragraph$ { }

export class $$Document extends $Catalogue implements $$Document$ {
    $$Document(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfParagraph, $TypeOf$Document));
    }
}

export class $TypeOfDocument extends $Type {
    protected override specification: Specification<$Writing> = new DocumentSpecification();

    override below(): new() => $Type { return $TypeOfSection; }
}

export class DocumentSpecification extends WritingSpecification {
}

export class $TypeOf$Document extends $Type {
    protected override specification: Specification<$Writing> = new $DocumentSpecification();
}

export class $DocumentSpecification extends WritingSpecification {
}

export const Document = $($Document);
export const documented = $($$Document);
export const TypeOf$Document = $($TypeOf$Document);
export const TypeOfDocument = $($TypeOfDocument);
