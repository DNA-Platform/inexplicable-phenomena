import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Writing } from './Writing';

export class $Letter extends $Writing implements $Reference$<$Letter> {
    get ref(): $Letter { return this; }

    read(): $Letter {
        return this;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Letter, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
