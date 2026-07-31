import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Tagline extends $Writing {
    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Tagline = $($Tagline);
