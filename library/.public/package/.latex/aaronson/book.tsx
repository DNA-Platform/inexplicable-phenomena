import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import table from './.table';
import introduction from './1-introduction';
import formalizing from './2-formalizing';
import beliefs from './3-beliefs';
import whyDifficult from './4-why-difficult';
import strengthenings from './5-strengthenings';
import progress from './6-progress';
import conclusions from './7-conclusions';
import acknowledgments from './8-acknowledgments';
import appendix from './9-appendix';
import references from './references';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    table,
    introduction,
    formalizing,
    beliefs,
    whyDifficult,
    strengthenings,
    progress,
    conclusions,
    acknowledgments,
    appendix,
    references,
);
