import { ReactNode } from 'react';
import { $, $Chemical, Component } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Footnote } from './Footnote';

export class $Key extends $Referent implements $Reference$<$Footnote> {
    $name = '';
    $footnote!: $Footnote;

    parenthetical = false;

    get copy(): string { return this.$name; }

    read(): $Footnote {
        return this.$footnote;
    }

    then<U extends $Referent>(onward: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={onward} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$footnote.valid();
    }
}

export const Key = $($Key) as any as Component<$Key> & ((props: { name: string; footnote: $Footnote }) => any);
