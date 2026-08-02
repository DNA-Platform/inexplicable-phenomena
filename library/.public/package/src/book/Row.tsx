import { $ } from '@dna-platform/chemistry';
import { type $Reference, same } from '../reference/Reference';
import { $Path } from '../reference/Path';
import { $Section } from '../writing/Section';
import { type $Chapter } from './Chapter';

export class $Row extends $Section implements $Reference<$Chapter> {
    to!: $Reference<$Chapter>;

    get copy(): string { return this.to.find()?.canonical.heading ?? ''; }

    get heading(): string { return this.copy; }

    get chapter(): $Chapter | undefined { return this.find(); }

    find(): $Chapter | undefined {
        return this.to.find();
    }

    equals(ref: $Reference<$Chapter>): boolean {
        return same(this.find(), ref.find());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Chapter, U>(this, next);
    }

    valid(): boolean {
        return this.to !== undefined && this.to.valid();
    }
}

export const Row = $($Row);
