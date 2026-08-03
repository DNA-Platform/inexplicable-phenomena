import { $ } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { path } from '../utilities/reference';
import { $Footnote } from './Footnote';
import { $Document } from './Document';

export class $Citation extends $Footnote {
    $for?: string;

    get for(): string {
        return this.$for ?? '';
    }

    get source(): string {
        return this.for.split('#')[0];
    }

    protected get above(): $Document | undefined {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof $Document)) {
            const parent = (scope as { parent?: unknown }).parent;
            scope = parent === scope ? undefined : parent;
        }
        return scope as $Document | undefined;
    }

    get document(): $Document {
        const found = this.above;
        if (!found) throw new Error(`Citation ${this.key}: it stands outside any document.`);
        return found;
    }

    get reference(): $Reference<any> | undefined {
        if (this.source || !this.for) return undefined;
        return path(this.document, this.for);
    }

    valid(): boolean {
        return super.valid() && (this.for === '' || this.source !== '' || this.reference !== undefined);
    }
}

export const Citation = $($Citation);
