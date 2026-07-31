import { $ } from '@dna-platform/chemistry';
import { $Reference } from './Reference';
import { $Referent } from './Referent';

export class $Name<T extends $Referent = $Referent> extends $Reference<T> {
    lookup(): T | undefined {
        const name = this.copy;
        let scope: any = this.parent;
        while (scope) {
            const found = scope.single?.((part: any) => this.answers(part, name));
            if (found instanceof $Referent) return found as T;
            if (scope.parent === scope) break;
            scope = scope.parent;
        }
        return undefined;
    }

    protected answers(part: { index: number; title?: { copy: string }; heading?: string }, name: string): boolean {
        if (`${part.index}` === name) return true;
        const title = part.title?.copy ?? part.heading;
        return title === name;
    }
}

export const Name = $($Name);
