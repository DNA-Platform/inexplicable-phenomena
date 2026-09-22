import { $, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from './Writing';
import { $Composition, CompositionSpecification, Level, Open } from './Composition';

export class $Letter extends $Composition {
    override specification: Specification<$Writing> = new LetterSpecification();

    protected override $Redefine(): void {
        this.annotations.add(<Level>1</Level>, <Open />);
    }
}

export class LetterSpecification extends CompositionSpecification {
    @specify('a letter holds no composition')
    $holdsNoComposition(letter: $Letter): void {
        $check(letter.contents.find($Composition).length === 0,
            'a letter is allowed to have anything but a composition, and this one holds one');
    }
}

export const Letter = $($Letter);
