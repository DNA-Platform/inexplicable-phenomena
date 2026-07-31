import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Character extends $Writing {
    constructor() {
        super();
        this.inline = true;
    }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Character = $($Character);
