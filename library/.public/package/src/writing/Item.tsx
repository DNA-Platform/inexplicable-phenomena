import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from './Paragraph';

export class $Item extends $Paragraph {
    $mark? = '-';
    $ordered? = false;

    get ordered(): boolean { return !!this.$ordered; }
}

export const Item = $($Item);
