import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Bookmark } from './Bookmark';

export class $Citation<T extends $Referent = $Referent> extends $Bookmark<T> {
    $label?: string;

    get label(): string {
        return this.$label ?? '';
    }

    get document(): string {
        return this.for.split('#')[0];
    }

    read(): T | undefined {
        if (this.document) return undefined;
        return super.read();
    }

    valid(): boolean {
        return super.valid() && this.label !== '';
    }
}

export const Citation = $($Citation);
