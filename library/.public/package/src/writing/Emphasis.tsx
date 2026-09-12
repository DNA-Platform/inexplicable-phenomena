// BOLD, ITALICS AND UNDERLINE ARE PHRASES SET OFF FROM THEIR SENTENCE — Doug: "Give people the
// elements and types to override if they ever want to do anything fun, they can DI new versions.
// Don't do Emphasis, make them separate." Each names its element and is a kind of its own; what
// each looks like is the theme's to say against its class, as everything is.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Phrase$, $Phrase, $TypeOfPhrase, PhraseSpecification } from './Phrase';

export interface $Bold$ extends $Phrase$ { }

export class $Bold extends $Phrase implements $Bold$ {
    definition = 'b';
    $Bold(block: $Block) {
        super.$Phrase(this.addType(block, $TypeOfBold));
    }
}

export class $TypeOfBold extends $TypeOfPhrase {
    protected override specification: Specification<$Writing> = new BoldSpecification();
}

export class BoldSpecification extends PhraseSpecification {
}

export interface $Italics$ extends $Phrase$ { }

export class $Italics extends $Phrase implements $Italics$ {
    definition = 'i';
    $Italics(block: $Block) {
        super.$Phrase(this.addType(block, $TypeOfItalics));
    }
}

export class $TypeOfItalics extends $TypeOfPhrase {
    protected override specification: Specification<$Writing> = new ItalicsSpecification();
}

export class ItalicsSpecification extends PhraseSpecification {
}

export interface $Underline$ extends $Phrase$ { }

export class $Underline extends $Phrase implements $Underline$ {
    definition = 'u';
    $Underline(block: $Block) {
        super.$Phrase(this.addType(block, $TypeOfUnderline));
    }
}

export class $TypeOfUnderline extends $TypeOfPhrase {
    protected override specification: Specification<$Writing> = new UnderlineSpecification();
}

export class UnderlineSpecification extends PhraseSpecification {
}

export const Bold = $($Bold);
export const TypeOfBold = $($TypeOfBold);
export const Italics = $($Italics);
export const TypeOfItalics = $($TypeOfItalics);
export const Underline = $($Underline);
export const TypeOfUnderline = $($TypeOfUnderline);
