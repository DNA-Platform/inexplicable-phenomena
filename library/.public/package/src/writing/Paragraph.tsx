import { $ } from '@dna-platform/chemistry';
import { $Composition, Level as level, Permissive as permissive, Open as open, Block as block } from './Composition';

export class $Paragraph extends $Composition {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-paragraph');
        const Level = $(level);
        const Permissive = $(permissive);
        const Open = $(open);
        const Block = $(block);
        this.annotations.add(this,
            <Level>4</Level>,
            <Permissive />,
            <Open />,
            <Block />
        );
    }
}

export const Paragraph = $($Paragraph);
