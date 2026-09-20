import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { parser } from '@/utilities/Parser';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition, Composition as composition } from '@/writing/Composition';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from './Reference';
import { $Path, Path as path } from './Path';

export interface $Catalogue$ extends $Reference$ {
    parts(): $Writing[];
    follow(fragment: string): $Writing;
    held(): $Writing | undefined;
}

export class $Catalogue extends $Reference implements $Catalogue$ {
    override parenthetical = false;

    protected get copy(): string { return html.text(this._block).trim(); }

    // A MENTION THAT SAYS SOMETHING IS CONTENT, AND CONTENT IS NOT AN ADDRESS. A catalogue is the one
    // kind of reference that can be either: written empty it is an address and hands it to whatever
    // holds it, written with copy it is a mention standing in the prose and draws its own link.
    // `parenthetical` alone could not tell them apart, because it also answers a silence the AUTHOR
    // asked for — and `print={false}` is how a table of contents names a chapter it does not list.
    override get addresses(): boolean { return this.parenthetical && this.copy === ''; }

    // A MENTION WITH NO ADDRESS IS THE THING YOU ARE READING. The compiler writes every address, and
    // a mention it resolved to the page it stands on is written `[words]()` — no address, and the
    // one a sheet may mark as here. A mention nobody compiled carries no link at all.
    override get className(): string {
        return this.path() === undefined && parser.link(this.copy) !== undefined ? `${super.className} pd-this` : super.className;
    }

    // WHERE THIS MENTION LEADS IS WRITTEN INTO IT by the compiler that resolved its name — Doug,
    // 2026-09-19: "There should not be anymore dynamic link generation." Nothing here makes an
    // address, and a mention nobody resolved leads nowhere.
    $Catalogue(block: $Block) {
        super.$Reference(this.addType(block, $TypeOfCatalogue));
        const copy = this.copy;
        if (copy === '') this.parenthetical = true;
        const link = parser.link(copy);
        if (this.path() === undefined && this.held(this) === undefined && link !== undefined && link.url !== '') {
            const Path = $(path);
            this._block = this._block.concat($<$Path>(<Path>{link.url}</Path>));
        }
    }

    override specifically(): void {
    }

    parts(): $Writing[] {
        const meant = this.held(this);

        return reflection.composition(meant)
            ? meant.parts().map(part => part.mention).filter((part): part is $Catalogue => part !== undefined)
            : [];
    }

    // A MENTION DRAWS ITS LINK, and a mention holding its referent draws the referent and is not one.
    override print(): ReactNode {
        const at = html.text(this.path()?._block);
        const said = parser.link(this.copy)?.text ?? super.print();

        return at === '' || this.held(this) !== undefined ? said : <a href={at} className="pd-meaning">{said}</a>;
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

// A CATALOGUE IS A REFERENCE, in its type as in its class, so the reference's rules are specialised
// here rather than run beside these.
export class $TypeOfCatalogue extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new CatalogueSpecification();
}

export class CatalogueSpecification extends ReferenceSpecification {
    @specify('a catalogue says what it holds')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }

    // A MENTION THAT SAYS SOMETHING STANDS ON ITS WORDS. Its address is the compiler's to write and
    // the compiler writes none for the page it stands on, so only a mention that says nothing has
    // to carry a path or hold what it stands for.
    @specify('a mention that says something stands; one that says nothing carries a path or holds what it stands for')
    override $carriesPath(writing: $Writing): boolean | void {
        if (html.text(writing._block).trim() !== '') return;

        return super.$carriesPath(writing);
    }
}

export const Catalogue = $($Catalogue);
export const TypeOfCatalogue = $($TypeOfCatalogue);
