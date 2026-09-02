import { $ } from '@dna-platform/chemistry';
import { Book, TableOfContents } from '@dna-platform/lib';
import { Wikimedia } from './.cover';
import { WikimediaSynopsis } from './.synopsis';

export const book = $(
    <Book />,
    Wikimedia,
    $(<TableOfContents />),
    WikimediaSynopsis,
);
