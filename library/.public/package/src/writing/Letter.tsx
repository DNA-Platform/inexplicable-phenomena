import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Open as open, Inline as inline } from './Composition';

export class $Letter extends $Composition {
    specification = new LetterSpecification();

    protected override $Define(): void {
        this.classes.add(this, 'pd-letter');
        const Level = $(level);
        const Open = $(open);
        const Inline = $(inline);
        this.annotations.add(this,
            <Level>1</Level>,
            <Open />,
            <Inline />
        );
    }
}

export class LetterSpecification extends CompositionSpecification {
    @specify('a letter holds no composition')
    $holdsNoComposition(letter: $Letter): void {
        $check(letter.text.find($Composition).length === 0,
            'a letter is allowed to have anything but a composition, and this one holds one');
    }
}

export const Letter = $($Letter);
