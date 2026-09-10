import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $TheLanguages from './1-the-languages';
import $TheFoundation from './2-the-foundation';
import $TheProjects from './3-the-projects';
import $TheLicence from './4-the-licence';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const TheLanguages = $($TheLanguages);
const TheFoundation = $($TheFoundation);
const TheProjects = $($TheProjects);
const TheLicence = $($TheLicence);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <TheLanguages />
        <TheFoundation />
        <TheProjects />
        <TheLicence />
    </Book>
);
