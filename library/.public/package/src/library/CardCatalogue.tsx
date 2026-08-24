import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as locations from '../reference/Location';
import { $$Book } from '../book/Book';
import type { $Book } from '../book/Book';

// A COMPOSITION OF CARDS, AND A CARD IS A REFERENCE TO A BOOK — so it is a
// catalogue of books, and now it says so. Chapter zero specified exactly this and
// the class implemented nothing: the interface "turns out to describe the
// catalogue at book level WITHOUT MODIFICATION, which is the strongest evidence
// we have that the catalogue equation was carved correctly."
//
// It stands for nothing and is not a reference, which is now sayable: a catalogue
// does not have to be one. It IS a referent, because that is what lets a scope
// hold one and an annotation ask for it.
export class $CardCatalogue extends $Referent implements $Catalogue<$Book> {
    $cards: $$Book[] = [];

    get cards(): $$Book[] { return this.$cards; }

    // EVERY CARD IS FILED UNDER ITS TITLE when the catalogue is bound. A library
    // that files other ways calls file() — extending is an act, not a rework.
    $CardCatalogue() {
        for (const card of this.$cards) if (card.title) this.file('title', card.title, card);
    }

    parts(): $$Book[] { return this.$cards; }

    get canonical(): $$Book { return this.parts()[0]; }

    get copy(): string { return this.parts().map(c => c.copy).join(' '); }

    parenthetical = false;

    where(match: (part: $$Book) => boolean): $$Book[] { return this.parts().filter(match); }

    select<U>(pick: (part: $$Book) => U): U[] { return this.parts().map(pick); }

    selectMany<U>(pick: (part: $$Book) => U[]): U[] { return this.parts().flatMap(pick); }

    single(match: (part: $$Book) => boolean): $$Book {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Book> {
        const Location = $(locations.Location);
        return $(<Location i={position} of={this as never} />);
    }

    card(name: string): $$Book {
        const found = this.parts().find(c => c.name === name);
        if (!found) throw new Error(`The catalogue holds no card for ${JSON.stringify(name)}.`);
        return found;
    }

    holds(name: string): boolean {
        return this.parts().some(c => c.name === name);
    }

    file(key: string, keyword: string, card: $$Book): void {
        const filed = this.filings[key] ?? (this.filings[key] = {});
        filed[keyword] = card;
    }

    // THE TWO HALVES, TAKEN AS PARAMETERS. It used to split a colon-separated
    // string at call time and throw when it missed, while `file` directly above
    // took the same two halves — the class knew the shape and asked a caller to
    // spell it.
    find(key: string, keyword: string): $$Book | undefined {
        return this.filings[key]?.[keyword];
    }

    valid(): boolean { return true; }

    private readonly filings: Record<string, Record<string, $$Book>> = {};
}

export const CardCatalogue = $($CardCatalogue);
