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
    // is drawn. A NAME IS THE COPY, NOT A TOKEN — Doug, 2026-09-15: "you NEVER write urls… names
    // aren't actually kebab cased" — so it is written the way a person writes it and slugged only
    // where a URL is made, which below is the one anchor this mention stands at.
    protected get copy(): string { return html.text(this._block).trim(); }
    get name(): string { const copy = this.copy; return (parser.link(copy)?.url ?? copy).trim(); }

    // A MENTION THAT SAYS SOMETHING IS CONTENT, AND CONTENT IS NOT AN ADDRESS. A catalogue is the one
    // kind of reference that can be either: written empty it is an address and hands it to whatever
    // holds it, written with copy it is a mention standing in the prose and draws its own anchor.
    // `parenthetical` alone could not tell them apart, because it also answers a silence the AUTHOR
    // asked for — and `print={false}` is how a table of contents names a chapter it does not list.
    // Measured 2026-09-15 on Doug's library AND on the reference wiki: the first such mention inside
    // a contents section was read as that section's address, so the entire table of contents drew as
    // one <a> with its own links nested inside it, invalid and blue from edge to edge. Doug: "that
    // Doug self link is awful and ruins the flow… see that blue text everywhere?"
    override get addresses(): boolean { return this.parenthetical && this.copy === ''; }

    override specifically(): void {
    }

    // WHERE THIS MENTION LEADS when nobody wrote an address into it. A mention of something inside
    // the book being read is reached by a FRAGMENT, and that is right for a chapter, a heading or a
    // section. A mention of a BOOK is not on this page at all — it is another page — and the kinds
    // that name books say so by overriding this rather than by the base asking what it is holding.
    protected address(): string { return `#${reflection.slug(this.name)}`; }

    // WHERE THE BOOKS OF THIS LIBRARY STAND, said once by whoever published it. A book cannot know
    // where it was published any more than a page can know which shelf it ended up on, so the
    // framework declares the question and the application answers it: a binder resolves every
    // address at build time and writes the table its pages are loaded from, and this is that table
    // said out loud. Names are COPY — a book is shelved under what a person would write, never under
    // a slug. Doug, 2026-09-15: "we need it to have a connected library."
    protected static shelved = new Map<string, string>();

    static shelve(books: { name: string; address: string }[]): void {
        books.forEach(book => $Catalogue.shelved.set(book.name, book.address));
    }

    protected standing(): string | undefined { return $Catalogue.shelved.get(this.name); }

    // DOES THIS MENTION NAME THE BOOK IT IS WRITTEN IN? Asked here because every kind that names a
    // book asks it, and answered for none of them by the base: a catalogue that names a chapter or a
    // heading is inside the book already and a fragment is right for it, so only the kinds that lead
    // to OTHER pages — a book, an author, a subject — ever act on the answer. `itself` is a PROXY
    // NAME, flagged for Doug.
    protected get itself(): boolean { return this.name === this.book?.name; }

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
            this._block = this._block.concat($<$Path>(<Path>{this.address()}</Path>));
        }
    }

    // WHERE THIS MENTION LEADS AS IT IS DRAWN, which is not always where it points. A mention keeps
    // its meaning whatever it looks like — that is what lets a reference elsewhere resolve to it —
    // and this is the one question the drawing asks. A kind that names something the reader is
    // already inside answers it for itself rather than having the base guess what it is holding,
    // the same way `linked` is answered on $Writing. `leads` is a PROXY NAME, flagged for Doug.
    protected leads(): string { return html.text(this.path()?._block); }

    override print(): ReactNode {
        const at = this.leads();
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
