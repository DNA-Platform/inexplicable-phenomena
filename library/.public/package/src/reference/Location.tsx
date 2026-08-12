import { ReactNode } from 'react';
import { $, $Chemical, Component } from '@dna-platform/chemistry';
import { $Composition$ } from '../writing/Composition';
import { $Referent$ } from './Referent';
import { $Reference$ } from './Reference';
import * as paths from './Path';

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
        const Path = $(paths.Path);
        return $(<Path first={this} onward={onward} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$of.parts().filter((part: { index: number }) => part.index === this.$i).length === 1;
    }
}

export const Location = $($Location) as any as Component<$Location> & ((props: { i: number; of: $Composition$<any> }) => any);
