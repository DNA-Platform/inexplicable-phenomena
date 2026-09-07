import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $Footer$ extends $Chapter$ { }

export class $Footer extends $Composition implements $Footer$ {
    $Footer(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfFooter, '!')));
    }
}

export class $TypeOfFooter extends $TypeOfChapter {
    override name = 'Footer';
    protected override specification: Specification<$Writing> = new FooterSpecification();
}

export class FooterSpecification extends ChapterSpecification {
    @specify('a footer may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Footer = $($Footer);
export const TypeOfFooter = $($TypeOfFooter);
