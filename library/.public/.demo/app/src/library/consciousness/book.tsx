import { $ } from '@dna-platform/chemistry';
import { Book, TableOfContents } from '@dna-platform/lib';
import { Consciousness } from './.cover';
import { ConsciousnessSynopsis } from './.synopsis';
import { TheHardProblem } from './01-the-hard-problem';
import { Correlates } from './02-correlates';
import { Theories } from './03-theories';

export const book = $(
    <Book />,
    Consciousness,
    $(<TableOfContents />),
    ConsciousnessSynopsis,
    TheHardProblem,
    Correlates,
    Theories,
);
