import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Chapter$, $Chapter, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $Part$ extends $Chapter$ {
    partitions: $Part[];
    chapters: $Chapter[];
    sections: $Section[];
}

export class $Part extends $Composition implements $Part$ {
    partitions: $Part[] = [];
    chapters: $Chapter[] = [];
    sections: $Section[] = [];

    $Part(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfPart, '!')));
    }
}

export class $TypeOfPart extends $TypeOfChapter {
    override name = 'Part';
    protected override specification: Specification<$Writing> = new PartSpecification();

    override specifically(part: $Part): void {
        part.partitions = part.searchFor<$Part>($TypeOfPart);
        part.chapters = part.searchFor<$Chapter>($TypeOfChapter)
            .filter(chapter => !reflection.is(chapter, $TypeOfPart));
        part.sections = part.searchFor<$Section>($TypeOfSection);
        super.specifically(part);
    }
}

export class PartSpecification extends ChapterSpecification {
}

export const Part = $($Part);
export const TypeOfPart = $($TypeOfPart);
