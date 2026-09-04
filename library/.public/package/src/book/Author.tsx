import { $Block, $ } from '@dna-platform/chemistry';
import { $CatalogueCard } from './CatalogueCard';

export class $Author extends $CatalogueCard {
    override name = 'Author';
    override parenthetical = false;
    override formula: boolean | 'new' = 'new';
    override resolve = true;

    $Author(block: $Block) {
        this.author = this;
        super.$Writing(block);
    }
}

export const Author = $($Author);
