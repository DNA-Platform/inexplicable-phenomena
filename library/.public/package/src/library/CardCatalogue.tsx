import { $Referent$ } from '../reference/Referent';
import { $IndexCard } from './IndexCard';

export class $CardCatalogue<T extends $Referent$ = $Referent$> {
    readonly cards: $IndexCard<T>[];

    constructor(...cards: $IndexCard<T>[]) {
        this.cards = cards;
    }

    card(name: string): $IndexCard<T> {
        const found = this.cards.find(c => c.name === name);
        if (!found) throw new Error(`The catalogue holds no card for ${JSON.stringify(name)}.`);
        return found;
    }

    holds(name: string): boolean {
        return this.cards.some(c => c.name === name);
    }

    file(key: string, keyword: string, card: $IndexCard<T>): void {
        const filed = this.filings[key] ?? (this.filings[key] = {});
        filed[keyword] = card;
    }

    find(query: string): $IndexCard<T> {
        const at = query.indexOf(':');
        const key = at < 0 ? query.trim() : query.slice(0, at).trim();
        const keyword = at < 0 ? '' : query.slice(at + 1).trim();
        const filed = this.filings[key]?.[keyword];
        if (!filed) throw new Error(`The catalogue files nothing under ${JSON.stringify(query)}.`);
        return filed;
    }

    private readonly filings: Record<string, Record<string, $IndexCard<T>>> = {};
}
