import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { parser } from '@/utilities/Parser';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition, Composition as composition } from '@/writing/Composition';
import { $Reference$, $Reference } from './Reference';
import { $Path, Path as path } from './Path';

export interface $Catalogue$ extends $Reference$ {
    readonly name: string;

    parts(): $Writing[];
    follow(fragment: string): $Writing;
    held(): $Writing | undefined;
}

export class $Catalogue extends $Reference implements $Catalogue$ {
    override parenthetical = false;

    // WHAT A MENTION NAMES, which is not always what it says. Written plainly the copy is both;
    // written [label](name) it SAYS the label and NAMES the name, the way a ref says its text and
    // addresses its target — one reading in the parser, read here for the name and below for what
    // is drawn. The name is a token, so it takes the copy reading and never the class one.
    protected get copy(): string { return html.text(this._block).trim(); }
    get name(): string { const copy = this.copy; return reflection.slug(parser.link(copy)?.url ?? copy); }

    override specifically(): void {
    }

    parts(): $Writing[] {
        const meant = this.held(this);

        return reflection.composition(meant)
            ? meant.parts().map(part => part.mention).filter((part): part is $Catalogue => part !== undefined)
            : [];
    }

    $Catalogue(block: $Block) {
        super.$Reference(this.addType(block, $TypeOfCatalogue));
        const copy = this.copy;
        if (copy === '') this.parenthetical = true;
        if (this.path() === undefined && this.held(this) === undefined && copy !== '') {
            const Path = $(path);
            this._block = this._block.concat($<$Path>(<Path>{`#${this.name}`}</Path>));
        }
    }

    override print(): ReactNode {
        const at = html.text(this.path()?._block);
        const said = parser.link(this.copy)?.text ?? super.print();

        return at === '' ? said : <a href={at} className="pd-meaning">{said}</a>;
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
        if (!reflection.composition(writing))
            throw new Error('nothing stands beneath this writing, and the address descends further');
        const held = writing.catalogue();
        if (held === undefined) throw new Error('the address descends into writing that catalogues nothing');

        return held.follow(rest.join('/'));
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

    held(of: $Writing = this): $Writing | undefined {
        return (of._block.$elements ?? [])
            .find((part): part is $Writing => reflection.writing(part) && !reflection.annotation(part));
    }
}

export class $TypeOfCatalogue extends $Type {
    protected override specification: Specification<$Writing> = new CatalogueSpecification();
}

export class CatalogueSpecification extends WritingSpecification {
    @specify('a catalogue says what it holds')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }
}

export const Catalogue = $($Catalogue);
export const TypeOfCatalogue = $($TypeOfCatalogue);
