import type { $Chemical, Component } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import type { $Annotation, $Writing } from './Writing';

export type Kind<U extends $Annotation> = (new () => U) | Component;

export class Annotations extends Collection<$Annotation> {
    is: Given<$Annotation> | Given<$Annotation>[] = [];
    edits: $Annotation[] = [];
    private applied?: Given<$Annotation> | Given<$Annotation>[];

    override add(...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(...givens);
    }

    override toString(): string {
        let text = '';
        for (const annotation of this) text += `${annotation}[${annotation.enforced}],`;
        return text;
    }

    define(): void {
        if (this.is !== this.applied) {
            for (const annotation of this.edits) {
                this.drop(annotation);
                annotation.erase(this.parent as $Writing);
            }
            this.edits = this.prepend(...(Array.isArray(this.is) ? this.is : [this.is]));
            this.applied = this.is;
        }
        for (const annotation of [...this])
            if (annotation.enforced)
                annotation.defines(this.parent as $Writing);
            else
                annotation.erase(this.parent as $Writing);
    }

    enforced<U extends $Annotation>(kind: Kind<U>): U | undefined {
        return this.find(kind).find(annotation => annotation.enforced);
    }

    override find<U extends $Annotation>(kind: Kind<U>): ReadonlyArray<U> {
        return super.find(classOf(kind));
    }

    override contains<U extends $Annotation>(kind: Kind<U>): boolean {
        return this.enforced(kind) !== undefined;
    }

    override containsOne<U extends $Annotation>(kind: Kind<U>): boolean {
        return this.find(kind).filter(annotation => annotation.enforced).length === 1;
    }
}

function classOf<U extends $Annotation>(kind: Kind<U>): new () => U {
    const chemical = (kind as { $chemical?: $Chemical }).$chemical;
    return chemical === undefined ? kind as new () => U : chemical.constructor as new () => U;
}
