import { $ } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { $Path } from '../reference/Path';
import { $Section } from '../writing/Section';
import { type $Chapter } from './Chapter';

export class $Row extends $Section implements $Reference<$Chapter> {
    path!: $Reference<$Chapter>;

    get copy(): string { return this.path.read()?.canonical.heading ?? ''; }

    get heading(): string { return this.copy; }

    get chapter(): $Chapter | undefined { return this.read(); }

    read(): $Chapter | undefined {
        return this.path.read();
    }

    equals(ref: $Reference<$Chapter>): boolean {
        return same(this.read(), ref.read());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Chapter, U>(this, next);
    }

    valid(): boolean {
        return this.path !== undefined && this.path.valid();
    }
}

export const Row = $($Row);
