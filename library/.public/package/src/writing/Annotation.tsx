import { $ } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing$, $Writing, WritingSpecification } from './Writing';

export interface $Annotation$ extends $Writing$ {
    specifically(writing: $Writing$): void;
}

export class $Annotation extends $Writing implements $Annotation$ {
    protected specification: Specification<$Writing> = new WritingSpecification();

    specifically(writing: $Writing): void {
        this.specification.check(writing);
    }

    supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return this.specification.supplies(writing, parts);
    }
}

export const Annotation = $($Annotation);
