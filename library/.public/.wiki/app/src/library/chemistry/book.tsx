import { $ } from '@dna-platform/chemistry';
import { Book, TableOfContents } from '@dna-platform/public';
import { Chemistry } from './.cover';
import { ChemistrySynopsis } from './.synopsis';
import { Bonds } from './01-bonds';
import { Reactions } from './02-reactions';
import { Elements } from './03-elements';

export const book = $(
    <Book />,
    Chemistry,
    $(<TableOfContents />),
    ChemistrySynopsis,
    Bonds,
    Reactions,
    Elements,
);
