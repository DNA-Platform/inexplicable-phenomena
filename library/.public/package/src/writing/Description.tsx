import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Sentence$, $Sentence, $TypeOfSentence, SentenceSpecification } from './Sentence';

export interface $Description$ extends $Sentence$ { }

// A DESCRIPTION SAYS WHAT A THING IS WITHOUT BEING PART OF IT. It is a sentence — the rung an
// image's or a control's copy becomes — that starts parenthetical, so it is not drawn as prose, and
// where it is drawn it stands in brackets so a reader knows it is there.
export class $Description extends $Sentence implements $Description$ {
    override parenthetical = true;

    $Description(block: $Block) {
        super.$Sentence(this.addType(block, $TypeOfDescription));
    }

    override print(): ReactNode {
        return <>[{super.print()}]</>;
    }
}

export class $TypeOfDescription extends $TypeOfSentence {
    protected override specification: Specification<$Writing> = new DescriptionSpecification();
}

export class DescriptionSpecification extends SentenceSpecification {
}

export interface $Caption$ extends $Sentence$ { }

// A CAPTION IS A DESCRIPTION THAT IS SHOWN AS IT IS, beneath what it describes. Its TYPE says it
// is a description; its class is a plain sentence, so it draws plainly and stands in the flow.
export class $Caption extends $Sentence implements $Caption$ {
    $Caption(block: $Block) {
        super.$Sentence(this.addType(block, $TypeOfCaption));
    }
}

export class $TypeOfCaption extends $TypeOfDescription {
    protected override specification: Specification<$Writing> = new CaptionSpecification();
}

export class CaptionSpecification extends DescriptionSpecification {
}

export const Description = $($Description);
export const TypeOfDescription = $($TypeOfDescription);
export const Caption = $($Caption);
export const TypeOfCaption = $($TypeOfCaption);
