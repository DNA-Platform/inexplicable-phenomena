import { $ } from '@dna-platform/chemistry';
import $Book from '../../../../.encyclopedia/.book';
import $Cover from '../../../../.encyclopedia/.cover';
import $Synopsis from '../../../../.encyclopedia/.synopsis';
import $Table from '../../../../.encyclopedia/.table';
import $TheLanguages from '../../../../.encyclopedia/1-the-languages';
import $TheFoundation from '../../../../.encyclopedia/2-the-foundation';
import $TheProjects from '../../../../.encyclopedia/3-the-projects';
import $TheLicence from '../../../../.encyclopedia/4-the-licence';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Table = $($Table);
const TheLanguages = $($TheLanguages);
const TheFoundation = $($TheFoundation);
const TheProjects = $($TheProjects);
const TheLicence = $($TheLicence);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <Table />
        <TheLanguages />
        <TheFoundation />
        <TheProjects />
        <TheLicence />
    </Book>
);
