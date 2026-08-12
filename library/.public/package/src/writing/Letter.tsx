import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing, Level } from './Writing';

export class $Letter extends $Writing {
    get level(): Level { return 'letter'; }
    get ref(): $Letter { return this; }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
