import { $ } from '@dna-platform/chemistry';
import { $IndexCard } from '@/reference/IndexCard';

export class $CatalogueCard extends $IndexCard {
    override name = 'CatalogueCard';
    title!: $CatalogueCard;
    subject!: $CatalogueCard;
    author!: $CatalogueCard;
}

export const CatalogueCard = $($CatalogueCard);
