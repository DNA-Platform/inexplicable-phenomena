import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from './Composition';
import { $Sentence } from './Sentence';
import { $Section } from './Section';

export class $Heading extends $Sentence {
    specification = new HeadingSpecification();
    get section(): $Section | undefined {
        return this.parent instanceof $Section ? this.parent : undefined;
    }
}

export class HeadingSpecification extends CompositionSpecification {
    @specify('a heading is in a section')
    $isInASection(heading: $Heading): void {
        $check(heading.section !== undefined, 'a heading stands in a section, and this one does not');
    }
}

export const Heading = $($Heading);
