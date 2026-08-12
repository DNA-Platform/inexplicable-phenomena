import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Sentence } from '../writing/Sentence';
import { type $Book } from './Book';
import { type $LibraryCard } from '../library/LibraryCard';

export class $Author extends $Sentence implements $Reference$<$Book> {
    $for?: $LibraryCard = undefined;

    constructor() {
        super();
        this.parenthetical = true;
    }

    get name(): string { return this.copy; }

    get card(): $LibraryCard | undefined { return this.$for; }

    read(): $Book {
        if (!this.$for) throw new Error(`The author ${JSON.stringify(this.name)} holds no card, so it stands for nothing.`);
        return this.$for.read();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return super.valid() || this.$for !== undefined;
    }
}

export const Author = $($Author);
