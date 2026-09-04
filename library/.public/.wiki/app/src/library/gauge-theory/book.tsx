import { $ } from '@dna-platform/chemistry';
import { Book, TableOfContents } from '@dna-platform/public';
import { GaugeTheory } from './.cover';
import { GaugeTheorySynopsis } from './.synopsis';
import { History } from './01-history';
import { Symmetry } from './02-symmetry';
import { Forces } from './03-forces';

export const book = $(
    <Book />,
    GaugeTheory,
    $(<TableOfContents />),
    GaugeTheorySynopsis,
    History,
    Symmetry,
    Forces,
);
