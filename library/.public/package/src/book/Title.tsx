import { $Block, $ } from '@dna-platform/chemistry';
import { $CatalogueCard } from './CatalogueCard';

export class $Title extends $CatalogueCard {
    override name = 'Title';
    override parenthetical = false;
    override formula: boolean | 'new' = 'new';
    override resolve = true;

    $Title(block: $Block) {
        this.title = this;
        super.$Writing(block);
    }
}

export const Title = $($Title);
