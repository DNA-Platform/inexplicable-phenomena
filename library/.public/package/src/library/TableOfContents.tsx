import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Type } from '@/writing/Type';
import { $TypeOfChapter } from './Chapter';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $TableOfContents$ extends $Document$ { }

export class $TableOfContents extends $Document implements $TableOfContents$ {
    $TableOfContents(block: $Block) {
        super.$Document(this.addType(block, $TypeOfTableOfContents));
    }

    override print(content: ReactNode): ReactNode {
        return <nav className={this.className}>{content}</nav>;
    }
}

export class $TypeOfTableOfContents extends $TypeOfDocument {
    override name = 'TableOfContents';
    protected override specification: Specification<$Writing> = new TableOfContentsSpecification();

    override below(): new() => $Type { return $TypeOfChapter; }
}

export class TableOfContentsSpecification extends DocumentSpecification {
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
