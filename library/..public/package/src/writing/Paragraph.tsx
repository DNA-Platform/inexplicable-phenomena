import { $ } from '@dna-platform/chemistry';
import { $Composition, Level as level, Permissive as permissive, Open as open } from './Composition';

export class $Paragraph extends $Composition {
    protected override $Define(): void {
        const Level = $(level);
        const Permissive = $(permissive);
        const Open = $(open);
        this.annotations.add(this, <Level>4</Level>);
        this.annotations.add(this, <Permissive />);
        this.annotations.add(this, <Open />);
    }
}

export const Paragraph = $($Paragraph);
