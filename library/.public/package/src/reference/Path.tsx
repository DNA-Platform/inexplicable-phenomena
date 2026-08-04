import { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Referent$ } from './Referent';
import { type $Reference$ } from './Reference';

export class $Path<M extends $Referent$ = any, U extends $Referent$ = any> extends $Chemical implements $Reference$<U> {
    $first!: $Reference$<M>;
    $onward!: $Reference$<U>;

    index = 0;
    parenthetical = false;

    get copy(): string { return `${this.$first.copy}.${this.$onward.copy}`; }

    read(): U {
        this.$first.read();
        return this.$onward.read();
    }

    then<V extends $Referent$>(onward: $Reference$<V>): $Reference$<V> {
        const path: $Path<U, V> = $(<Path first={this} onward={onward} />);
        return path;
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$first.valid() && this.$onward.valid();
    }
}

export const Path = $($Path) as any as (props: { first: $Reference$<any>; onward: $Reference$<any> }) => any;
