import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Type, $Writing, Writing, Dress } from './Writing';
import { $Composition } from './Composition';
import { $Sentence } from './Sentence';
import { $TypeOfParagraph } from './Paragraph';
import { Heading } from '@/encyclopedia/Heading';

export class $Title extends $Composition<$Sentence> {
    override get canonical(): boolean { return false; }

    $Title(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfTitle />);
    }

    override get dress(): Dress { return Heading; }
}

export class $TypeOfTitle extends $TypeOfParagraph {
    override get canonicalForm(): typeof $Writing { return $Title; }

    constructor() {
        super();
        this[cache]('Title');
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
