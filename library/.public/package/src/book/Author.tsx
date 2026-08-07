import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Sentence } from '../writing/Sentence';
import { type $Book } from './Book';
import { type $LibraryCard } from '../library/LibraryCard';
import { $held$ } from '../library/LibraryCatalogue';

export class $Author extends $Sentence implements $Reference$<$Book> {
    $for?: $LibraryCard = undefined;

    get name(): string { return this.copy; }

    get card(): $LibraryCard | undefined {
        if (this.$for) return this.$for;
        const catalogue = $held$.catalogue;
        return catalogue?.holds(this.name) ? catalogue.card(this.name) : undefined;
    }

    read(): $Book {
        const card = this.card;
        if (!card) throw new Error(`The catalogue holds no card for ${JSON.stringify(this.name)}, so the author stands for nothing.`);
        return card.read();
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
