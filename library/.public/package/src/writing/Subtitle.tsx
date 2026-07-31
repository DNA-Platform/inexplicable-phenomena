import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Subtitle extends $Writing {
    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Subtitle = $($Subtitle);
