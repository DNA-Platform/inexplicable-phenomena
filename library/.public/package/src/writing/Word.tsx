import { $ } from '@dna-platform/chemistry';
import { $Composition, Level as level, Permissive as permissive, Open as open, Inline as inline } from './Composition';

export class $Word extends $Composition {
    protected override $Define(): void {
        this.classes.add(this, 'pd-word');
        const Level = $(level);
        const Permissive = $(permissive);
        const Open = $(open);
        const Inline = $(inline);
        this.annotations.add(this,
            <Level>2</Level>,
            <Permissive />,
            <Open />,
            <Inline />
        );
    }
}

export const Word = $($Word);
