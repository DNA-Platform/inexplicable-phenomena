import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Letter extends $Writing {
    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
