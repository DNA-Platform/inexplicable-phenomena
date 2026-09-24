import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification } from './Composition';
import { Level as level, Permissive as permissive, Closed as closed } from './Composition';
import { $Sentence } from './Sentence';

export class $Section extends $Composition {
    specification = new SectionSpecification();
    override get canonical(): $Heading | undefined {
        return this.contents.find($Heading)[0];
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

export class $Heading extends $Sentence {
    specification = new HeadingSpecification();
    get section(): $Section | undefined {
        return this.parent instanceof $Section ? this.parent : undefined;
    }
}

export class SectionSpecification extends CompositionSpecification {
    @specify('a section has a heading')
    $hasAHeading(section: $Section): void {
        $check(section.canonical !== undefined, 'a section has a heading as its canonical, and this one has none');
    }
}

export class HeadingSpecification extends CompositionSpecification {
    @specify('a heading is in a section')
    $isInASection(heading: $Heading): void {
        $check(heading.section !== undefined, 'a heading stands in a section, and this one does not');
    }
}

export const Section = $($Section);
export const Heading = $($Heading);
