import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import table from './.table';
import earlyLifeAndEducation from './1-early-life-and-education';
import careerAndResearch from './2-career-and-research';
import personalLife from './3-personal-life';
import death from './4-death';
import governmentApologyAndPardon from './5-government-apology-and-pardon';
import furtherReading from './6-further-reading';
import seeAlso from './7-see-also';
import notes from './8-notes';
import references from './9-references';
import externalLinks from './10-external-links';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    table,
    earlyLifeAndEducation,
    careerAndResearch,
    personalLife,
    death,
    governmentApologyAndPardon,
    furtherReading,
    seeAlso,
    notes,
    references,
    externalLinks,
);
