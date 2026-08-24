import { $ } from '@dna-platform/chemistry';
import { $$Book } from '@/book/Book';

// THE DEMO'S CARD, and there is almost nothing left of it. Title, subtitle,
// chapters, author and subject are the BOOK'S OWN INTERFACE reflected onto a
// card, so $$Book carries them and this class carries only what this library
// adds. That is what "the card is a reflection of the book" buys: a library
// declares its extras, not the shape.
export class $LibraryCard extends $$Book {
    $synopsis = '';

    get synopsis(): string { return this.$synopsis; }
}

export const LibraryCard = $($LibraryCard);
