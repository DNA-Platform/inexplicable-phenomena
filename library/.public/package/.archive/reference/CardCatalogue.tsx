import React from 'react';
import { $, type Component } from '@dna-platform/chemistry';
import { $Referent } from './Referent';
import { $Catalogue } from './Catalogue';
import { $IndexCard } from './IndexCard';
import type { $Book } from '../book/Book';
import { $Location } from './Location';
import * as locations from './Location';

export class $CardCatalogue<T extends $Book = $Book> extends $Referent implements $Catalogue<T> {
    $cards: $IndexCard<T>[] = [];

    get cards(): $IndexCard<T>[] { return this.$cards; }

    $CardCatalogue() {
        for (const card of this.$cards) for (const [key, keyword] of card.filed()) this.file(key, keyword, card);
    }

    parts(): $IndexCard<T>[] { return this.$cards; }

    get canonical(): $IndexCard<T> { return this.parts()[0]; }

    get copy(): string { return this.parts().map(c => c.copy).join(' '); }

    parenthetical = false;

    where(match: (part: $IndexCard<T>) => boolean): $IndexCard<T>[] { return this.parts().filter(match); }

    select<U>(pick: (part: $IndexCard<T>) => U): U[] { return this.parts().map(pick); }

    selectMany<U>(pick: (part: $IndexCard<T>) => U[]): U[] { return this.parts().flatMap(pick); }

    single(match: (part: $IndexCard<T>) => boolean): $IndexCard<T> {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$IndexCard<T>> {
        const Location = $(locations.Location);
        return $(<Location i={position} of={this as never} />);
    }

    card(name: string): $IndexCard<T> {
        const found = this.parts().find(c => c.name === name);
        if (!found) throw new Error(`The catalogue holds no card for ${JSON.stringify(name)}.`);
        return found;
    }

    holds(name: string): boolean {
        return this.parts().some(c => c.name === name);
    }

    file(key: string, keyword: string, card: $IndexCard<T>): void {
        const filed = this.filings[key] ?? (this.filings[key] = {});
        filed[keyword] = card;
    }

    find(key: string, keyword: string): $IndexCard<T> | undefined {
        return this.filings[key]?.[keyword];
    }

    valid(): boolean { return true; }

    private readonly filings: Record<string, Record<string, $IndexCard<T>>> = {};
}

export const CardCatalogue = $($CardCatalogue) as any as Component<$CardCatalogue> & ((props: { cards: $IndexCard[] }) => any);
