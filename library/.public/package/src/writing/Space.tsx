import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Blank as blank } from './Writing';
import { $Letter } from './Letter';

export class $Space extends $Letter {
    $length = 1;

    override write(): ReactNode { return ' '.repeat(this.$length); }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-space');
        const Blank = $(blank);
        this.annotations.add(this,
            <Blank />
        );
    }
}

export const Space = $($Space);
