import { $ } from '@dna-platform/chemistry';
import { $Composition, Level as level, Permissive as permissive, Open as open, Inline as inline } from './Composition';

export class $Sentence extends $Composition {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-sentence');
        const Level = $(level);
        const Permissive = $(permissive);
        const Open = $(open);
        const Inline = $(inline);
        this.annotations.add(this,
            <Level>3</Level>,
            <Permissive />,
            <Open />,
            <Inline />
        );
    }
}

export const Sentence = $($Sentence);
