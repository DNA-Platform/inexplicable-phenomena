import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Tagline extends $Writing {
    constructor() {
        super();
        this.inline = true;
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Tagline = $($Tagline);
