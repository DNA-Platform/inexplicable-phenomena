import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Sentence } from '../writing/Sentence';
import { $Book } from './Book';
import { type $LibraryCard } from '../library/LibraryCard';

export class $Canonical extends $Sentence implements $Reference$<$Book> {
    $for?: $LibraryCard = undefined;

    constructor() {
        super();
        this.parenthetical = true;
    }

    get name(): string { return this.copy; }

    get card(): $LibraryCard | undefined { return this.$for; }

    read(): $Book {
        if (!this.$for) throw new Error(`The canonical ${JSON.stringify(this.name)} holds no card, so it stands for nothing.`);
        return this.$for.read();
    }

    // The subject that declares a canonical can check it: the canonical book's
    // subject must be this same subject. valid() answers that check without
    // throwing, whenever the cards are in place to answer it — where the check
    // runs (books loading their subjects, or build-time in .public) is open.
    valid(): boolean {
        if (!(super.valid() || this.$for !== undefined)) return false;
        if (!this.$for) return true;
        let up: unknown = this.parent;
        let hops = 0;
        while (up && !(up instanceof $Book) && hops < 12) {
            const next = (up as { parent?: unknown }).parent;
            if (next === up) break;
            up = next;
            hops++;
        }
        const home = up instanceof $Book ? up.subject?.card : undefined;
        return home === undefined || this.$for.subject === home;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Canonical = $($Canonical);
