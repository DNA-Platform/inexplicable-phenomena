import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Block as block } from '@/writing/Composition';
import { $Figure } from './Figure';

export class $Code extends $Figure {
    override write(): ReactNode {
        return (
            <pre><code>{super.write()}</code></pre>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-code');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
    }
}

export const Code = $($Code);
