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
        let up: unknown = this.parent;
        let hops = 0;
        while (up && !(up instanceof $Book) && hops < 12) {
            const next = (up as { parent?: unknown }).parent;
            if (next === up) break;
            up = next;
            hops++;
        }
        const home = up instanceof $Book ? up.subject?.card : undefined;
        if (home && this.$for.subject !== home) throw new Error(`The canonical ${JSON.stringify(this.name)} does not have this subject in its subject.`);
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

export const Canonical = $($Canonical);
