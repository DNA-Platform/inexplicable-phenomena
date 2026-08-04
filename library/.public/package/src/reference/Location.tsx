import { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Composition$ } from '../writing/Composition';
import { type $Referent$ } from './Referent';
import { type $Reference$ } from './Reference';
import { $Path, Path } from './Path';

export class $Location<T extends $Referent$ = any> extends $Chemical implements $Reference$<T> {
    $i = 0;
    $of!: $Composition$<any>;

    index = 0;
    parenthetical = false;

    get copy(): string { return `${this.$i}`; }

    read(): T {
        return this.$of.single((part: { index: number }) => part.index === this.$i) as T;
    }

    then<U extends $Referent$>(onward: $Reference$<U>): $Reference$<U> {
        const path: $Path<T, U> = $(<Path first={this} onward={onward} />);
        return path;
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$of.parts().filter((part: { index: number }) => part.index === this.$i).length === 1;
    }
}

export const Location = $($Location) as any as (props: { i: number; of: $Composition$<any> }) => any;
