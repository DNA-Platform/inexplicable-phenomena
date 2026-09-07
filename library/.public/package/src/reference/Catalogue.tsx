import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition, Composition as composition } from '@/writing/Composition';
import { $Reference, Reference as reference } from './Reference';
import { $Path, Path as path } from './Path';

export interface $Catalogue$ extends $Composition$ {
    comprehend(): $Composition;
    follow(fragment: string): $Writing;
    address(of: $Writing): string;
}

export class $Catalogue extends $Composition implements $Catalogue$ {
    parts(): $Writing[] {
        const meant = this.held(this);

        return meant instanceof $Composition
            ? meant.parts().map(part => part.mention).filter((part): part is $Catalogue => part !== undefined)
            : [];
    }

    comprehend(): $Composition {
        const [first, ...rest] = this.select(part =>
            (part._block.$elements ?? [])
                .find((part): part is $Composition => part instanceof $Composition));
        if (first === undefined) {
            const Composition = $(composition);

            return $<$Composition>(<Composition />);
        }
        return first.concatenate(...rest.filter(held => held !== undefined));
    }

    $Catalogue(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfCatalogue, '!')));
    }

    follow(fragment: string): $Writing {
        const [place, ...rest] = fragment.split('/');
        const references = this.parts();
        if (place.includes('-')) return this.span(place, rest);
        const at = Number(place);
        if (!Number.isInteger(at) || at < 0 || at >= references.length)
            throw new Error(`the address names position ${place} where ${references.length} parts stand`);
        const writing = this.held(references[at]);
        if (writing === undefined)
            throw new Error(`the address names position ${place}, and the reference there holds nothing`);
        if (rest.length === 0) return writing;
        if (!(writing instanceof $Composition))
            throw new Error('nothing stands beneath this writing, and the address descends further');
        const held = writing.catalogue();
        if (held === undefined) throw new Error('the address descends into writing that catalogues nothing');

        return held.follow(rest.join('/'));
    }

    address(of: $Writing): string {
        const references = this.parts();
        for (let at = 0; at < references.length; at++) {
            const writing = this.held(references[at]);
            if (writing === undefined) continue;
            if (writing === of) return `${at}`;
            if (!(writing instanceof $Composition) || writing.parts().includes(writing)) continue;
            try { return `${at}/${writing.catalogue()?.address(of)}`; } catch { }
        }
        throw new Error('this catalogue does not reach that writing at any depth');
    }

    protected span(place: string, rest: string[]): $Writing {
        if (rest.length > 0) throw new Error('a span stands only in the last step of an address');
        const references = this.parts();
        const [from, to] = place.split('-').map(Number);
        if (!Number.isInteger(from) || from < 0 || from >= references.length)
            throw new Error(`the span begins at position ${from} where ${references.length} parts stand`);
        const span = references.slice(from, Number.isInteger(to) ? to + 1 : undefined)
            .map(reference => this.held(reference))
            .filter((writing): writing is $Writing => writing !== undefined);
        const Composition = $(composition);

        return $<$Composition>(<Composition />, ...span);
    }

    protected held(of: $Writing): $Writing | undefined {
        return (of._block.$elements ?? [])
            .find((part): part is $Writing => part instanceof $Writing && !(part instanceof $Annotation));
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
