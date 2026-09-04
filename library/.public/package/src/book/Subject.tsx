import { $Block, $ } from '@dna-platform/chemistry';
import { $CatalogueCard } from './CatalogueCard';

export class $Subject extends $CatalogueCard {
    override name = 'Subject';
    override formula: boolean | 'new' = 'new';
    override resolve = true;

    $Subject(block: $Block) {
        super.$Writing(block);
        if (this.copy.trim().startsWith('of:')) this.resolve = false;
    }
}

export const Subject = $($Subject);
