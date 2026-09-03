import { $Block, $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition, Composition } from '@/writing/Composition';
import type { $Composition$ } from '@/writing/Composition';
import { $Reference, Reference, prints } from './Reference';
import { $Path, Path } from './Path';
import { reflection } from '@/utilities/Reflection';

export class $Catalogue extends $Writing implements $Composition$ {
    index = 0;

    parts(): $Reference[] {
        return (this.block?.$elements ?? [])
            .filter((one): one is $Writing => one instanceof $Writing && (one instanceof $Reference || !one.parenthetical))
            .map((one, at) => {
                if (one instanceof $Reference) return one;
                const code = this.code(one);
                const step = code ? `${code}:${at}` : `${at}`;
                const Asked = $((code ? prints.get(code) : undefined) ?? Reference);
                const AskedPath = $(Path);
                return $<$Reference>(<Asked />, one, $<$Path>(<AskedPath>{step}</AskedPath>));
            });
    }

    comprehend(): $Composition {
        const [first, ...rest] = this.select(one =>
            (one.block?.$elements ?? []).find((held): held is $Composition => held instanceof $Composition && !held.parenthetical) as $Composition);
        if (first === undefined) {
            const Asked = $(Composition);
            return $<$Composition>(<Asked />);
        }
        return first.concatenate(...rest.filter(one => one !== undefined));
    }

    catalogue(): $Catalogue {
        const Asked = $(Catalogue);
        return $<$Catalogue>(<Asked />, ...this.parts());
    }

    $Catalogue(block: $Block) {
        super.$Writing(block);
    }

    follow(fragment: string): $Writing {
        const [step, ...rest] = fragment.split('/');
        const [named, place] = step.includes(':') ? step.split(':') : [undefined, step];
        const references = this.parts();
        const held = (one: $Reference) =>
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
                if (named !== undefined && this.code(one) && named !== this.code(one))
                    throw new Error(`the address expected ${named} and landed on ${this.code(one)}`);
            const Asked = $(Composition);
            return $<$Composition>(<Asked />, ...taken);
        }
        const index = Number(place);
        if (!Number.isInteger(index) || index < 0 || index >= references.length)
            throw new Error(`the address names position ${place} where ${references.length} parts stand`);
        const landed = held(references[index]);
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
            const one = (references[at].block?.$elements ?? []).find((it): it is $Writing => it instanceof $Writing && !it.parenthetical);
            if (one === undefined) continue;
            const code = this.code(one);
            const step = code ? `${code}:${at}` : `${at}`;
            if (one === of) return step;
            if (!(one instanceof $Composition) || one.parts().includes(one)) continue;
            try { return `${step}/${one.catalogue().address(of)}`; } catch { }
        }
        throw new Error('this catalogue does not reach that writing at any depth');
    }

    where(match: (part: $Reference) => boolean): $Reference[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Reference) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Reference) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Reference) => boolean): $Reference {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    protected code(of: $Writing | undefined): string | undefined {
        if (of?.type === undefined) return undefined;
        return reflection.chain(of.type).map(name => reflection.code(name)).find(one => prints.has(one));
    }
}

export const Catalogue = $($Catalogue);
