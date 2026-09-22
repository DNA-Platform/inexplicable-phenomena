import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level, Permissive, Closed } from './Composition';
import { $Sentence } from './Sentence';

export class $Section extends $Composition {
    specification = new SectionSpecification();
    override get canonical(): $Heading | undefined { 
        return this.contents.find($Heading)[0]; 
    }

    protected override $Define(): void {
        this.annotations.add(
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
    @specify('a section means through its heading')
    $hasAHeading(section: $Section): void {
        $check(section.canonical !== undefined, 'a section means through its heading, and this one has none');
    }
}

export class HeadingSpecification extends CompositionSpecification {
    @specify('a heading is in a section')
    $isInASection(heading: $Heading): void {
        $check(heading.section !== undefined, 'a heading means its section, and this one is not in one');
    }
}

export const Section = $($Section);
export const Heading = $($Heading);
