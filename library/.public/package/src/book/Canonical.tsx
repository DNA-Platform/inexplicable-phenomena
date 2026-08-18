import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Phrase } from '../writing/Phrase';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Canonical extends $Phrase implements $Reference$<$Book> {
    $for?: $IndexCard<$Book> = undefined;

    $parenthetical? = true;

    get name(): string { return this.copy; }

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    read(): $Book {
        if (!this.$for) throw new Error(`The canonical ${JSON.stringify(this.name)} holds no card, so it stands for nothing.`);
        return this.$for.read();
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return super.valid() || this.$for !== undefined;
    }
}

export const Canonical = $($Canonical);
