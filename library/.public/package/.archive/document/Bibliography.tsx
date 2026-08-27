import { $ } from '@dna-platform/chemistry';
import { $Footer } from './Footer';
import { $Citation } from './Citation';

export class $Bibliography extends $Footer {
    get citations(): $Citation[] {
        return this.footnotes as $Citation[];
    }

    valid(): boolean {
        return super.valid() && this.footnotes.every(e => e instanceof $Citation);
    }
}

export const Bibliography = $($Bibliography);
