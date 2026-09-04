import { $Block, $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition, Composition as composition } from '@/writing/Composition';
import type { $Composition$ } from '@/writing/Composition';
import { $Reference, Reference as reference, prints } from './Reference';
import { $Path, Path as path } from './Path';
import { reflection } from '@/utilities/Reflection';

export class $Catalogue extends $Writing implements $Composition$ {
    index = 0;

    parts(): $Reference[] {
        return (this.block?.$elements ?? [])
            .filter((writing): writing is $Writing => writing instanceof $Writing && (writing instanceof $Reference || !writing.parenthetical))
            .map((one, at) => {
                if (reference instanceof $Reference) return reference;
                const code = this.code(one);
                const step = code ? `${code}:${at}` : `${at}`;
                const Reference = $(reference);
                const Printed = (code ? prints.get(code) : undefined) ?? Reference;
                const Path = $(path);
                return $<$Reference>(<Printed />, one, $<$Path>(<Path>{step}</Path>));
            });
    }

    comprehend(): $Composition {
        const [first, ...rest] = this.select(reference =>
            (reference.block?.$elements ?? []).find((part): part is $Composition => part instanceof $Composition && !part.parenthetical) as $Composition);
        if (first === undefined) {
            const Composition = $(composition);
            return $<$Composition>(<Composition />);
        }
        return first.concatenate(...rest.filter(one => one !== undefined));
    }

    catalogue(): $Catalogue {
        const Catalogue = $(catalogue);
        return $<$Catalogue>(<Catalogue />, ...this.parts());
    }

    $Catalogue(block: $Block) {
        super.$Writing(block);
    }

    follow(fragment: string): $Writing {
        const [step, ...rest] = fragment.split('/');
        const [named, place] = step.includes(':') ? step.split(':') : [undefined, step];
        const references = this.parts();
        const contentOf = (reference: $Reference) =>
            (reference.block?.$elements ?? []).find((part): part is $Writing => part instanceof $Writing && !part.parenthetical);
        if (place.includes('-')) {
            if (rest.length > 0) throw new Error('a span stands only in the last step of an address');
            const [from, to] = place.split('-').map(Number);
            if (!Number.isInteger(from) || from < 0 || from >= references.length)
                throw new Error(`the span begins at position ${from} where ${references.length} parts stand`);
            const span = references.slice(from, Number.isInteger(to) ? to + 1 : undefined)
                .map(contentOf)
                .filter((writing): writing is $Writing => writing !== undefined);
            for (const writing of span)
                if (named !== undefined && this.code(writing) && named !== this.code(writing))
                    throw new Error(`the address expected ${named} and landed on ${this.code(writing)}`);
            const Composition = $(composition);
            return $<$Composition>(<Composition />, ...span);
        }
        const index = Number(place);
        if (!Number.isInteger(index) || index < 0 || index >= references.length)
            throw new Error(`the address names position ${place} where ${references.length} parts stand`);
        const landed = contentOf(references[index]);
        if (landed === undefined) throw new Error(`the address names position ${place}, and the reference there holds nothing`);
        if (named !== undefined && this.code(landed) && named !== this.code(landed))
            throw new Error(`the address expected ${named} and landed on ${this.code(landed)}`);
        if (rest.length === 0) return landed;
        if (!(landed instanceof $Composition)) throw new Error('nothing stands beneath this writing, and the address descends further');
        return landed.catalogue().follow(rest.join('/'));
    }

    address(of: $Writing): string {
        const references = this.parts();
        for (let at = 0; at < references.length; at++) {
            const writing = (references[at].block?.$elements ?? []).find((it): it is $Writing => it instanceof $Writing && !it.parenthetical);
            if (writing === undefined) continue;
            const code = this.code(writing);
            const step = code ? `${code}:${at}` : `${at}`;
            if (writing === of) return step;
            if (!(writing instanceof $Composition) || writing.parts().includes(writing)) continue;
            try { return `${step}/${writing.catalogue().address(of)}`; } catch { }
        }
        throw new Error('this catalogue does not reach that writing at any depth');
    }

    where(match: (part: $Reference) => boolean): $Reference[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Reference) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Reference) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Reference) => boolean): $Reference {
        const matches = this.parts().filter(match);
        if (matches.length !== 1) throw new Error(`single expected exactly one part and found ${matches.length}.`);
        return matches[0];
    }

    protected code(of: $Writing | undefined): string | undefined {
        if (of?.type === undefined) return undefined;
        return reflection.names(of.type).map(name => reflection.code(name)).find(one => prints.has(one));
    }
}

export const Catalogue = $($Catalogue);
const catalogue = Catalogue;
