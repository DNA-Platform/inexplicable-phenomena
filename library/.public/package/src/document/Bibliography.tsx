import { $ } from '@dna-platform/chemistry';
import { $Footer } from './Footer';
import { $Citation } from './Citation';

export class $Bibliography extends $Footer {
    get citations(): $Citation[] {
        return this.entries as $Citation[];
    }

    valid(): boolean {
        return super.valid() && this.entries.every(e => e instanceof $Citation);
    }
}

export const Bibliography = $($Bibliography);
