import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Sentence } from '../writing/Sentence';

export class $Bookmark<T extends $Referent$ = $Referent$> extends $Sentence implements $Reference$<T> {
    $for!: $Reference$<T>;

    read(): T {
        if (!this.$for) throw new Error('The bookmark stands for nothing — it never pointed.');
        return this.$for.read();
    }

    valid(): boolean {
        return this.$for !== undefined && this.$for.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }
}

export const Bookmark = $($Bookmark);
