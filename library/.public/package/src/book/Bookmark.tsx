import { $ } from '@dna-platform/chemistry';
import { $Reference } from '../reference/Reference';
import { $Referent } from '../reference/Referent';

export class $Bookmark<T extends $Referent = $Referent> extends $Reference<T> {
    lookup(): T | undefined {
        const path = (this.$for ?? '').replace(/^.*#/, '').split('.').filter(Boolean).map(Number);
        let part: any = this.parent;
        for (const key of path) part = part?.single?.((p: { index: number }) => p.index === key);
        return part instanceof $Referent ? part as T : undefined;
    }
}

export const Bookmark = $($Bookmark);
