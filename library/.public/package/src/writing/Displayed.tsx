import { $, $valid } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Displayed extends $Figure {
    $mathematics? = '';

    $parenthetical? = true;

    get mathematics(): string { return this.$mathematics ?? ''; }

    valid(): boolean {
        return $valid(this.mathematics !== '', 'displayed mathematics is what it sets, and this one sets nothing');
    }
}

export const Displayed = $($Displayed);
