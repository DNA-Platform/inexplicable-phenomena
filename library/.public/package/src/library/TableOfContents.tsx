import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { TypeOfSection } from '@/writing/Section';
import { TypeOfRow } from './Row';
import { $$Chapter, $TypeOfChapterMention } from './Chapter';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $TableOfContents$ extends $Document$ {
    readonly chapters: $$Chapter[];
}

export class $TableOfContents extends $Document implements $TableOfContents$ {
    definition = 'nav';

    get chapters(): $$Chapter[] { return reflection.within<$$Chapter>(this, $TypeOfChapterMention); }

    $TableOfContents(block: $Block) {
        super.$Document(this.addType(block, $TypeOfTableOfContents));
    }
}

export class $TypeOfTableOfContents extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new TableOfContentsSpecification();
}

export class TableOfContentsSpecification extends DocumentSpecification {
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);

$(TableOfContents, TypeOfSection)(TypeOfRow);
