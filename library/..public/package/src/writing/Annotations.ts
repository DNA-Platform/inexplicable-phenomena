import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import type { $Annotation } from './Writing';

export class Annotations extends Collection<$Annotation> {
    override add(...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(...givens);
    }

    override contains<U extends $Annotation>(Class: new () => U): boolean {
        return this.find(Class).some(annotation => annotation.enforced);
    }

    override containsOne<U extends $Annotation>(Class: new () => U): boolean {
        return this.find(Class).filter(annotation => annotation.enforced).length === 1;
    }
}
