import { $ } from '@dna-platform/chemistry';
import { type $Book } from '@/book/Book';
import { $IndexCard } from '@/library/IndexCard';

// THE DEMO'S CARD. A card in the framework is an $IndexCard<$Book> and nothing
// more — it enumerates whatever fields it is given and prints them. Which fields
// a library's cards carry is that library's business, so this one declares them.
// When the build lands, this class is what it generates.
export class $LibraryCard extends $IndexCard<$Book> {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];
    $author?: $LibraryCard = undefined;
    $subject?: $LibraryCard = undefined;

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get synopsis(): string { return this.$synopsis; }

    get chapters(): string[] { return this.$chapters; }

    get author(): $LibraryCard | undefined { return this.$author; }

    get subject(): $LibraryCard | undefined { return this.$subject; }

    // Every book in this demo agrees on one library: the subject that is its own
    // subject. Recursive, and answered off cards so nothing is opened.
    get library(): $LibraryCard | undefined {
        return this.$subject === this ? this : this.$subject?.library;
    }
}

export const LibraryCard = $($LibraryCard);
