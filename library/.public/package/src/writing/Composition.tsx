import { $Block, $ } from '@dna-platform/chemistry';
import { $Type, $Writing } from './Writing';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Catalogue, Catalogue as catalogue } from '@/reference/Catalogue';

export interface $Composition$ {
    get index(): number;
    parts(): $Writing[];
    catalogue(): $Catalogue;
    where(match: (part: $Writing) => boolean): $Writing[];
    select<U>(pick: (part: $Writing) => U): U[];
    selectMany<U>(pick: (part: $Writing) => U[]): U[];
    single(match: (part: $Writing) => boolean): $Writing;
}

export class $Composition extends $Writing implements $Composition$ {
    catalogue(): $Catalogue {
        const Catalogue = $(catalogue);
        return $<$Catalogue>(<Catalogue />, ...this.parts());
    }


    $Composition(block: $Block) {
        super.$Writing(block);
    }

    where(match: (part: $Writing) => boolean): $Writing[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Writing) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Writing) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Writing) => boolean): $Writing {
        const matches = this.parts().filter(match);
        if (matches.length !== 1) throw new Error(`single expected exactly one part and found ${matches.length}.`);
        return matches[0];
    }

    concatenate(...more: $Composition$[]): $Composition {
        const Composition = $(composition);
        return $<$Composition>(<Composition />, ...this.parts(), ...more.flatMap(one => one.parts()));
    }

}

export const Composition = $($Composition);
const composition = Composition;
