import { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
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
        const path: $Path<$Footnote, U> = $(<Path first={this} onward={onward} />);
        return path;
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$footnote.valid();
    }
}

export const Key = $($Key) as any as (props: { name: string; footnote: $Footnote }) => any;
