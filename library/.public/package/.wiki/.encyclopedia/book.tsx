import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import theLanguages from './1-the-languages';
import theFoundation from './2-the-foundation';
import theProjects from './3-the-projects';
import theLicence from './4-the-licence';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    theLanguages,
    theFoundation,
    theProjects,
    theLicence,
);
