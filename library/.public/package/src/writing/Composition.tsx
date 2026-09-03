import { $Block, $ } from '@dna-platform/chemistry';
import { $Type, $Writing } from './Writing';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Catalogue, Catalogue } from '@/reference/Catalogue';

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
    index = 0;

    parts(): $Writing[] {
        const type = this.type;
        const below = type === undefined ? undefined : reflection.below(type);
        return parser.parse(this,
            token => {
                if (type !== undefined && token instanceof $Composition && token !== this && token.type instanceof (type.constructor as new () => $Type)) {
                    const mutual = type instanceof (token.type.constructor as new () => $Type);
                    if (mutual || reflection.indent(token) > 0) return token.parts();
                }
                if (below === undefined) return token;
                return reflection.stands(token, below) ? token : undefined;
            },
            held => this.reduce(held),
            type !== undefined);
    }

    catalogue(): $Catalogue {
        const Asked = $(Catalogue);
        return $<$Catalogue>(<Asked />, ...this.parts());
    }

    $Composition(block: $Block) {
        super.$Writing(block);
    }

    where(match: (part: $Writing) => boolean): $Writing[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Writing) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Writing) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Writing) => boolean): $Writing {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    concatenate(...more: $Composition$[]): $Composition {
        const Asked = $(Composition);
        return $<$Composition>(<Asked />, ...this.parts(), ...more.flatMap(one => one.parts()));
    }

    protected reduce(held: (string | $Writing)[]): $Writing[] {
        const below = this.type === undefined ? undefined : reflection.below(this.type);
        const make = below === undefined ? undefined : parser.makes.get(below);
        return make === undefined ? [] : make(held);
    }
}

export const Composition = $($Composition);
