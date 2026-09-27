import { $ } from '@dna-platform/chemistry';
import { Block as block } from './Composition';
import { $Sentence } from './Sentence';

export class $Line extends $Sentence {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-line');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
    }
}

export const Line = $($Line);
