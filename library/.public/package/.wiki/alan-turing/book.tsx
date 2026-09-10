import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $Table from './.table';
import $EarlyLifeAndEducation from './1-early-life-and-education';
import $CareerAndResearch from './2-career-and-research';
import $PersonalLife from './3-personal-life';
import $Death from './4-death';
import $GovernmentApologyAndPardon from './5-government-apology-and-pardon';
import $FurtherReading from './6-further-reading';
import $SeeAlso from './7-see-also';
import $Notes from './8-notes';
import $References from './9-references';
import $ExternalLinks from './10-external-links';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Table = $($Table);
const EarlyLifeAndEducation = $($EarlyLifeAndEducation);
const CareerAndResearch = $($CareerAndResearch);
const PersonalLife = $($PersonalLife);
const Death = $($Death);
const GovernmentApologyAndPardon = $($GovernmentApologyAndPardon);
const FurtherReading = $($FurtherReading);
const SeeAlso = $($SeeAlso);
const Notes = $($Notes);
const References = $($References);
const ExternalLinks = $($ExternalLinks);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <Table />
        <EarlyLifeAndEducation />
        <CareerAndResearch />
        <PersonalLife />
        <Death />
        <GovernmentApologyAndPardon />
        <FurtherReading />
        <SeeAlso />
        <Notes />
        <References />
        <ExternalLinks />
    </Book>
);
