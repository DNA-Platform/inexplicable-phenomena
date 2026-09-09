import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Part$ extends $Document$ {
    partitions: $Part[];
    documents: $Document[];
    sections: $Section[];
}

export class $Part extends $Document implements $Part$ {
    partitions: $Part[] = [];
    documents: $Document[] = [];
    sections: $Section[] = [];

    $Part(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check($TypeOfPart, '!')));
    }
}

export class $TypeOfPart extends $TypeOfDocument {
    override name = 'Part';
    protected override specification: Specification<$Writing> = new PartSpecification();

    override specifically(part: $Part): void {
        part.partitions = part.searchFor<$Part>($TypeOfPart);
        part.documents = part.searchFor<$Document>($TypeOfDocument)
            .filter(document => !reflection.is(document, $TypeOfPart));
        part.sections = part.searchFor<$Section>($TypeOfSection);
        super.specifically(part);
    }
}

export class PartSpecification extends DocumentSpecification {
}

export const Part = $($Part);
export const TypeOfPart = $($TypeOfPart);
