import { $ } from '@dna-platform/chemistry';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing, Level } from './Writing';

export class $Letter extends $Writing implements $Reference$<$Letter> {
    get level(): Level { return 'letter'; }
    get ref(): $Letter { return this; }

    read(): $Letter {
        return this;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
