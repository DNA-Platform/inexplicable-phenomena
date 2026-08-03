import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '../writing/Paragraph';
import { $Key } from './Key';

export class $Legend extends $Paragraph {
    $keys: $Key[] = [];

    get keys(): $Key[] { return this.$keys; }
    get copy(): string { return this.keys.map(k => k.copy).join(' '); }

    constructor() {
        super();
        this.$parenthetical = true;
    }

    valid(): boolean {
        return true;
    }
}

export const Legend = $($Legend);
