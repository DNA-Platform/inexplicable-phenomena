import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing } from '../writing/Writing';

export class $Bookmark<T extends $Referent = $Referent> extends $Writing implements $Reference<T> {
    // NOT A PROP. Nothing authors a bookmark — it is set in code, `left.place =
    // where`, and never in JSX. A plain property is reactive by default, so
    // dropping the `$` costs nothing and buys the rule: don't make anything a
    // prop unless it needs to be.
    place!: $Reference<T>;

    read(): T {
        if (!this.place) throw new Error('The bookmark stands for nothing — it never pointed.');
        return this.place.read();
    }

    valid(): boolean {
        return this.place !== undefined && this.place.valid();
    }

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }
}

export const Bookmark = $($Bookmark);
