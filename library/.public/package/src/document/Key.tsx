import { type ReactNode } from 'react';
import { $, $Chemical, type Component } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { type $Footnote } from './Footnote';

export class $Key extends $Chemical implements $Reference$<$Footnote> {
    $name = '';
    $footnote!: $Footnote;

    index = 0;
    parenthetical = false;

    get copy(): string { return this.$name; }

    read(): $Footnote {
        return this.$footnote;
    }

    then<U extends $Referent$>(onward: $Reference$<U>): $Reference$<U> {
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
