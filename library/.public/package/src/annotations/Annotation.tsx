import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, WritingSpecification } from '@/writing/Writing';

export class $Annotation extends $Writing {
    specification = new AnnotationSpecification();

    $Annotation(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
    }

    override view(): ReactNode {
        const writing = this.parent;
        return writing instanceof $Writing && writing.annotations.expressed(this) !== undefined ? this.note() : null;
    }

    note(): ReactNode { return null; }
    defines(writing: $Writing): void { }
    erase(writing: $Writing): void { }
    specifies(writing: $Writing, code?: string): string[] { return this.specification.check(writing, code); }
}

export class AnnotationSpecification extends WritingSpecification { }

export const Annotation = $($Annotation);
