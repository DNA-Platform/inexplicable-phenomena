import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification } from './Composition';
import { Level as level, Permissive as permissive, Closed as closed } from './Composition';
import { $Reference } from './Reference';
import { $Heading } from './Heading';

export class $Section extends $Composition {
    specification = new SectionSpecification();
    get mention(): $Reference | undefined { return this.canonical?.means; }
    override get canonical(): $Heading | undefined {
        return this.text.find($Heading)[0];
    }

    protected override $Define(): void {
        const Level = $(level);
        const Permissive = $(permissive);
        const Closed = $(closed);
        this.annotations.add(this,
            <Level>5</Level>,
            <Permissive />,
            <Closed />
        );
    }
}

export class SectionSpecification extends CompositionSpecification {
    @specify('a section has a heading')
    $hasAHeading(section: $Section): void {
        $check(section.canonical !== undefined, 'a section has a heading as its canonical, and this one has none');
    }
}

export const Section = $($Section);
