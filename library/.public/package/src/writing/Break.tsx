import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Blank as blank } from './Writing';
import { Block as block } from './Composition';
import { $Letter } from './Letter';

export class $Break extends $Letter {
    override write(): ReactNode { return null; }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-break');
        const Blank = $(blank);
        const Block = $(block);
        this.annotations.add(this,
            <Blank />,
            <Block />
        );
    }
}

export const Break = $($Break);
