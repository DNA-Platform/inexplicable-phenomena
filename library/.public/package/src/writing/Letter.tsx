import { $ } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';

export class $Letter extends $Writing implements $Reference<$Letter> {
    get ref(): $Letter { return this; }

    set ref(reference: $Reference | undefined) { this.location = reference; }

    read(): $Letter {
        return this;
    }

    equals(ref: $Reference<$Letter>): boolean {
        const found = ref.read();
        return this === found || same(this, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Letter, U>(this, next);
    }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
