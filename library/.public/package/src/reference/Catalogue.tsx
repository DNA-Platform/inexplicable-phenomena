import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing$, $Annotation, $Type, $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition, Composition as composition } from '@/writing/Composition';
import { $Reference, Reference as reference } from './Reference';
import { $Path, Path as path } from './Path';

export interface $Catalogue$ extends $Writing$ {
    parts(): $Reference[];
    comprehend(): $Composition;
    follow(fragment: string): $Writing;
    address(of: $Writing): string;
}

export class $Catalogue extends $Writing implements $Catalogue$ {
    parts(): $Reference[] {
        return (this._block.$elements ?? [])
            .filter((part): part is $Writing =>
                part instanceof $Writing && (part instanceof $Reference || !(part instanceof $Annotation)))
            .map((part, at) => {
                if (part instanceof $Reference) return part;
                const code = this.code(part);
                const step = code ? `${code}:${at}` : `${at}`;
                const Reference = $(reference);
                const Path = $(path);

                return $<$Reference>(<Reference />, part, $<$Path>(<Path>{step}</Path>));
            });
    }

    comprehend(): $Composition {
        const [first, ...rest] = this.select(reference =>
            (reference._block.$elements ?? [])
                .find((part): part is $Composition => part instanceof $Composition));
        if (first === undefined) {
            const Composition = $(composition);

            return $<$Composition>(<Composition />);
        }
        return first.concatenate(...rest.filter(held => held !== undefined));
    }

    $Catalogue(block: $Block) {
        super.$Writing(block);
        if (reflection.is(this, $TypeOfCatalogue)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfCatalogue, '!')];
    }

    follow(fragment: string): $Writing {
        const [step, ...rest] = fragment.split('/');
        const [named, place] = step.includes(':') ? step.split(':') : [undefined, step];
        const references = this.parts();
        if (place.includes('-')) return this.span(named, place, rest);
        const at = Number(place);
        if (!Number.isInteger(at) || at < 0 || at >= references.length)
            throw new Error(`the address names position ${place} where ${references.length} parts stand`);
        const writing = this.held(references[at]);
        if (writing === undefined)
            throw new Error(`the address names position ${place}, and the reference there holds nothing`);
        if (named !== undefined && this.code(writing) && named !== this.code(writing))
            throw new Error(`the address expected ${named} and landed on ${this.code(writing)}`);
        if (rest.length === 0) return writing;
        if (!(writing instanceof $Composition))
            throw new Error('nothing stands beneath this writing, and the address descends further');
        return writing.catalogue().follow(rest.join('/'));
    }

    address(of: $Writing): string {
        const references = this.parts();
        for (let at = 0; at < references.length; at++) {
            const writing = this.held(references[at]);
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
        $check(matches.length === 1, `single expected exactly one part and found ${matches.length}`);
        return matches[0];
    }

    protected span(named: string | undefined, place: string, rest: string[]): $Writing {
        if (rest.length > 0) throw new Error('a span stands only in the last step of an address');
        const references = this.parts();
        const [from, to] = place.split('-').map(Number);
        if (!Number.isInteger(from) || from < 0 || from >= references.length)
            throw new Error(`the span begins at position ${from} where ${references.length} parts stand`);
        const span = references.slice(from, Number.isInteger(to) ? to + 1 : undefined)
            .map(reference => this.held(reference))
            .filter((writing): writing is $Writing => writing !== undefined);
        for (const writing of span)
            if (named !== undefined && this.code(writing) && named !== this.code(writing))
                throw new Error(`the address expected ${named} and landed on ${this.code(writing)}`);
        const Composition = $(composition);

        return $<$Composition>(<Composition />, ...span);
    }

    protected held(of: $Reference): $Writing | undefined {
        return (of._block.$elements ?? [])
            .find((part): part is $Writing => part instanceof $Writing && !(part instanceof $Annotation));
    }

    protected code(of: $Writing | undefined): string | undefined {
        const kind = of?.type();
        return kind === undefined ? undefined : reflection.code(kind);
    }
}

export class $TypeOfCatalogue extends $Type {
    override name = 'Catalogue';
    protected override specification: Specification<$Writing> = new CatalogueSpecification();
}

export class CatalogueSpecification extends WritingSpecification {
    @specify('a catalogue says what it holds')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }

    @specify('a catalogue holds references, not parts')
    override $composesWhatItHolds(writing: $Writing): boolean | void {
        return false;
    }
}

export const Catalogue = $($Catalogue);
export const TypeOfCatalogue = $($TypeOfCatalogue);
const typeOfCatalogue = TypeOfCatalogue;
