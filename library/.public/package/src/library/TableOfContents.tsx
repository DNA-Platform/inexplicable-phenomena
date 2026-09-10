import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Type } from '@/writing/Type';
import { $Chapter, $TypeOfChapter } from './Chapter';
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
    protected override specification: Specification<$Writing> = new TableOfContentsSpecification();

    override below(): new() => $Type { return $TypeOfChapter; }
}

// A TABLE OF CONTENTS IS VALIDATED IN THE PAGE, not at the bond: a link names a document by its id,
// and the document is drawn after the table — so the gate that drives the page follows every link.
export class TableOfContentsSpecification extends DocumentSpecification {
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
