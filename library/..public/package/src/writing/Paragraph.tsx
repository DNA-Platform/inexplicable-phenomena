import { $ } from '@dna-platform/chemistry';
import { $Composition, Level, Permissive, Open } from './Composition';

export class $Paragraph extends $Composition {
    protected override $Redefine(): void {
        this.annotations.add(<Level>4</Level>, <Permissive />, <Open />);
    }
}

export const Paragraph = $($Paragraph);
