import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Writing$, $Writing, $Type } from '@/writing/Writing';
import { $Catalogue, Catalogue as catalogue } from '@/reference/Catalogue';

export interface $Composition$ extends $Writing$ {
    parts(): $Writing[];
    catalogue(): $Catalogue;
    where(match: (part: $Writing) => boolean): $Writing[];
    select<U>(pick: (part: $Writing) => U): U[];
    selectMany<U>(pick: (part: $Writing) => U[]): U[];
    single(match: (part: $Writing) => boolean): $Writing;
}

export class $Composition extends $Writing implements $Composition$ {
    parts(): $Writing[] {
        const kind = this.type();
        const beneath = kind?.below();
        const own = kind?.constructor as (new() => $Type) | undefined;
        return parser.parse(this,
            token => {
                if (own !== undefined && token !== this && reflection.instanceOf(token, own))
                    return token instanceof $Composition ? token.parts() : token;
                if (beneath === undefined) return token;
                return reflection.instanceOf(token, beneath) ? token : undefined;
            },
            tokens => this.reduce(tokens));
    }

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
        $check(matches.length === 1, `single expected exactly one part and found ${matches.length}`);
        return matches[0];
    }

    concatenate(...more: $Composition[]): $Composition {
        const Composition = $(composition);

        return $<$Composition>(<Composition />, ...this.parts(), ...more.flatMap(part => part.parts()));
    }

    protected reduce(tokens: (string | $Writing)[]): $Writing[] {
        const beneath = this.type()?.below();
        return beneath === undefined ? [] : reflection.template(beneath).makes(tokens);
    }
}

export const Composition = $($Composition);
const composition = Composition;
