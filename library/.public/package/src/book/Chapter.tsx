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

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    $Chapter(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfChapter, '!')));
    }

    override view(): ReactNode {
        const drawn = super.view();

        return drawn === null ? null : <article>{drawn}</article>;
    }
}

export interface $$Chapter$ extends $Paragraph$ { }

export class $$Chapter extends $Catalogue implements $$Chapter$ {
    $$Chapter(block: $Block) {
        super.$Catalogue($check(block, $Block).concat($check($TypeOfParagraph, '!')).concat($check($TypeOf$Chapter, '!')));
    }
}

export class $TypeOfChapter extends $Type {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();

    override below(): new() => $TypeOfSection { return $TypeOfSection; }
}

export class ChapterSpecification extends WritingSpecification {
}

export class $TypeOf$Chapter extends $Type {
    override name = '$Chapter';
    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class $ChapterSpecification extends WritingSpecification {
}

export const Chapter = $($Chapter);
export const chapter = $($$Chapter);
export const TypeOf$Chapter = $($TypeOf$Chapter);
export const TypeOfChapter = $($TypeOfChapter);
