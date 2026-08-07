import { $ } from '@dna-platform/chemistry';
import { type $Book } from '../book/Book';
import { $CardCatalogue } from './CardCatalogue';
import { type $LibraryCard } from './LibraryCard';

export class $LibraryCatalogue extends $CardCatalogue<$Book> {
    get cards(): $LibraryCard[] { return this.$parts as $LibraryCard[]; }

    card(name: string): $LibraryCard {
        return super.card(name) as $LibraryCard;
    }
}

export const LibraryCatalogue = $($LibraryCatalogue);
