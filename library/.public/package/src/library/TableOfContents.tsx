import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $TableOfContents$ extends $Document$ { }

export class $TableOfContents extends $Document implements $TableOfContents$ {
    $TableOfContents(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check($TypeOfTableOfContents, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <nav className={this.className}>{content}</nav>;
    }
}

export class $TypeOfTableOfContents extends $TypeOfDocument {
    override name = 'TableOfContents';
    protected override specification: Specification<$Writing> = new TableOfContentsSpecification();
}

export class TableOfContentsSpecification extends DocumentSpecification {
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
