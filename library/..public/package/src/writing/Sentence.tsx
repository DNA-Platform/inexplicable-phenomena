import { $ } from '@dna-platform/chemistry';
import { $Composition, Level, Permissive, Open } from './Composition';

export class $Sentence extends $Composition {
    protected override $Define(): void {
        this.annotations.add(<Level>3</Level>, <Permissive />, <Open />);
    }
}

export const Sentence = $($Sentence);
