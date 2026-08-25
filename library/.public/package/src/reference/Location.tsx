import { ReactNode } from 'react';
import { $, Component } from '@dna-platform/chemistry';
import { $Composition } from '../writing/Composition';
import { $Referent } from './Referent';
import { $Reference } from './Reference';
import * as paths from './Path';

export class $Location<T extends $Referent = any> extends $Referent implements $Reference<T> {
    $i = 0;
    $of!: $Composition<any>;

    parenthetical = false;

    get copy(): string { return `${this.$i}`; }

    read(): T {
        const parts = this.$of.parts();
        if (this.$i < 0 || this.$i >= parts.length) {
            throw new Error(`Nothing stands at position ${this.$i} — the composition holds ${parts.length}.`);
        }
        return parts[this.$i] as T;
    }

    follow<U extends $Referent>(onward: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={onward} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.$i >= 0 && this.$i < this.$of.parts().length;
    }
}

export const Location = $($Location) as any as Component<$Location> & ((props: { i: number; of: $Composition<any> }) => any);
