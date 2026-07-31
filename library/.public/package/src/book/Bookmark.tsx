import { $ } from '@dna-platform/chemistry';
import { $Reference } from '../reference/Reference';
import { $Referent } from '../reference/Referent';

export class $Bookmark<T extends $Referent = $Referent> extends $Reference<T> {
    lookup(): T | undefined {
        const path = this.for.replace(/^.*#/, '').split('.').filter(Boolean).map(Number);
        let scope: any = this.parent;
        while (scope) {
            let part: any = scope;
            for (const key of path) part = part?.single?.((p: { index: number }) => p.index === key);
            if (part instanceof $Referent && part !== scope) return part as T;
            if (scope.parent === scope) break;
            scope = scope.parent;
        }
        return undefined;
    }
}

export const Bookmark = $($Bookmark);
