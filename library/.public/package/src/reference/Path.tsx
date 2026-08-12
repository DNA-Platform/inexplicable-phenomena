import { ReactNode } from 'react';
import { $, $Chemical, Component } from '@dna-platform/chemistry';
import { $Referent$ } from './Referent';
import { $Reference$ } from './Reference';
import * as paths from './Path';

export class $Path<M extends $Referent$ = any, U extends $Referent$ = any> extends $Chemical implements $Reference$<U> {
    $first!: $Reference$<M>;
    $onward!: $Reference$<U>;

    parenthetical = false;

    get copy(): string { return `${this.$first.copy}.${this.$onward.copy}`; }

    read(): U {
        this.$first.read();
        return this.$onward.read();
    }

    then<V extends $Referent$>(onward: $Reference$<V>): $Reference$<V> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={onward} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$first.valid() && this.$onward.valid();
    }
}

export const Path = $($Path) as any as Component<$Path> & ((props: { first: $Reference$<any>; onward: $Reference$<any> }) => any);
