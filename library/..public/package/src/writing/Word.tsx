import { $ } from '@dna-platform/chemistry';
import { $Composition, Level as level, Permissive as permissive, Open as open } from './Composition';

export class $Word extends $Composition {
    protected override $Define(): void {
        const Level = $(level);
        const Permissive = $(permissive);
        const Open = $(open);
        this.annotations.add(
            <Level>2</Level>,
            <Permissive />,
            <Open />
        );
    }
}

export const Word = $($Word);
