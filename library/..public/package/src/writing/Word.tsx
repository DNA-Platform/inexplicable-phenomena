import { $ } from '@dna-platform/chemistry';
import { $Composition, Level, Permissive, Open } from './Composition';

export class $Word extends $Composition {
    protected override $Redefine(): void {
        this.annotations.add(<Level>2</Level>, <Permissive />, <Open />);
    }
}

export const Word = $($Word);
