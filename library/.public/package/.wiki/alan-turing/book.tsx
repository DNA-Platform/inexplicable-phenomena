import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import chapter1 from './1-early-life-and-education';
import chapter2 from './2-career-and-research';
import chapter3 from './3-personal-life';
import chapter4 from './4-death';
import chapter5 from './5-government-apology-and-pardon';
import chapter6 from './6-further-reading';
import chapter7 from './7-see-also';
import chapter8 from './8-notes';
import chapter9 from './9-references';
import chapter10 from './10-external-links';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8,
    chapter9,
    chapter10,
);
