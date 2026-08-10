import { $ } from '@dna-platform/chemistry';
import { type $Book } from '../book/Book';
import { $CardCatalogue } from './CardCatalogue';
import { $IndexCard } from './IndexCard';
import { type $LibraryCard } from './LibraryCard';

export class $LibraryCatalogue extends $CardCatalogue<$Book> {
    $indexings: Record<string, Record<string, $LibraryCard>> = {};

    get cards(): $LibraryCard[] { return this.$parts as $LibraryCard[]; }

    card(name: string): $LibraryCard {
        return super.card(name) as $LibraryCard;
    }

    // PROXY NAME, flagged for Doug: his signature is index(key, keyword, card), but the
    // catalogue is writing and `index` is already its number by the $Catalogue$ interface.
    file(key: string, keyword: string, card: $LibraryCard): void {
        const filed = this.$indexings[key] ?? (this.$indexings[key] = {});
        filed[keyword] = card;
    }

    find(query: string): $LibraryCard {
        const at = query.indexOf(':');
        const key = at < 0 ? query.trim() : query.slice(0, at).trim();
        const keyword = at < 0 ? '' : query.slice(at + 1).trim();
        const filed = this.$indexings[key]?.[keyword];
        if (!filed) throw new Error(`The catalogue files nothing under ${JSON.stringify(query)}.`);
        return filed;
    }

    $LibraryCatalogue(...cards: $IndexCard<$Book>[]) {
        super.$CardCatalogue(...cards);
        for (const card of this.cards) {
            if (card.title) this.file('title', card.title, card);
        }
    }
}

export const LibraryCatalogue = $($LibraryCatalogue);
