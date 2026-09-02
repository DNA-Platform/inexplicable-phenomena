import { $Block, $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition, Composition } from '@/writing/Composition';
import type { $Composition$ } from '@/writing/Composition';
import { $Reference, Reference, prints } from './Reference';
import type { $Reference$ } from './Reference';
import { $Path, Path } from './Path';
import { parser } from '@/utilities/Parser';

export class $Catalogue<T extends $Writing = $Writing> extends $Writing implements $Composition$<$Reference$<$Composition<T>>> {
    index = 0;

    parts(): $Reference$<$Composition<T>>[] {
        const from = this.bound ? this.inside! : this;
        return (from.block?.$elements ?? [])
            .filter((one): one is $Writing => one instanceof $Writing && (one instanceof $Reference || !one.parenthetical))
            .map((one, at) => {
                if (one instanceof $Reference)
                    return one as unknown as $Reference$<$Composition<T>>;
                const code = one.type?.code;
                const step = code ? `${code}:${at}` : `${at}`;
                const Printed = $((code ? prints.get(code) : undefined) ?? $Reference);
                const printed = $<$Reference>(<Printed />, one, $<$Path>(<Path>{step}</Path>));
                return printed as unknown as $Reference$<$Composition<T>>;
            });
    }

    comprehend(): $Composition<T> {
        const [first, ...rest] = this.select(one =>
            (one.block?.$elements ?? []).find((held): held is $Composition<T> => held instanceof $Writing && !held.parenthetical) as $Composition<T>);
        return first === undefined ? $<$Composition<T>>(<Composition />) : first.concatenate(...rest);
    }

    catalogue(): $Catalogue<$Writing> { return $<$Catalogue<$Writing>>(<Catalogue />, ...this.parts()); }

    $Catalogue(block: $Block) {
        super.$Writing(block);
    }

    follow(fragment: string): $Writing {
        const [step, ...rest] = fragment.split('/');
        const [named, place] = step.includes(':') ? step.split(':') : [undefined, step];
        const references = this.parts();
        const kind = (one: $Writing | undefined) => one?.type?.code;
        const held = (one: $Reference$<$Composition<T>>) =>
            (one.block?.$elements ?? []).find((it): it is $Writing => it instanceof $Writing && !it.parenthetical);
        if (place.includes('-')) {
            if (rest.length > 0) throw new Error('a span stands only in the last step of an address');
            const [from, to] = place.split('-').map(Number);
            if (!Number.isInteger(from) || from < 0 || from >= references.length)
                throw new Error(`the span begins at position ${from} where ${references.length} parts stand`);
            const taken = references.slice(from, Number.isInteger(to) ? to + 1 : undefined)
                .map(held)
                .filter((one): one is $Writing => one !== undefined);
            for (const one of taken)
                if (named !== undefined && kind(one) && named !== kind(one))
                    throw new Error(`the address expected ${named} and landed on ${kind(one)}`);
            return $<$Composition>(<Composition />, ...taken);
        }
        const index = Number(place);
        if (!Number.isInteger(index) || index < 0 || index >= references.length)
            throw new Error(`the address names position ${place} where ${references.length} parts stand`);
        const landed = held(references[index]);
        if (landed === undefined) throw new Error(`the address names position ${place}, and the reference there holds nothing`);
        if (named !== undefined && kind(landed) && named !== kind(landed))
            throw new Error(`the address expected ${named} and landed on ${kind(landed)}`);
        if (rest.length === 0) return landed;
        if (!(landed instanceof $Composition)) throw new Error('nothing stands beneath this writing, and the address descends further');
        return landed.catalogue().follow(rest.join('/'));
    }

    address(of: $Writing): string {
        const references = this.parts();
        for (let at = 0; at < references.length; at++) {
            const one = (references[at].block?.$elements ?? []).find((it): it is $Writing => it instanceof $Writing && !it.parenthetical);
            if (one === undefined) continue;
            const step = one.type?.code ? `${one.type.code}:${at}` : `${at}`;
            if (one === of) return step;
            if (!(one instanceof $Composition) || one.parts().includes(one)) continue;
            try { return `${step}/${one.catalogue().address(of)}`; } catch { }
        }
        throw new Error('this catalogue does not reach that writing at any depth');
    }

    where(match: (part: $Reference$<$Composition<T>>) => boolean): $Reference$<$Composition<T>>[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Reference$<$Composition<T>>) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Reference$<$Composition<T>>) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Reference$<$Composition<T>>) => boolean): $Reference$<$Composition<T>> {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export const Catalogue = $($Catalogue);
