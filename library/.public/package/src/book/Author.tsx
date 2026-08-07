import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Sentence } from '../writing/Sentence';
import { type $Book } from './Book';

export class $Author extends $Sentence implements $Reference$<$Book> {
    $for!: $Reference$<$Book>;

    get name(): string { return this.copy; }

    read(): $Book {
        if (!this.$for) throw new Error('The author stands for nothing — it never pointed.');
        return this.$for.read();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    valid(): boolean {
        return super.valid() || this.$for !== undefined;
    }
}

export const Author = $($Author);
