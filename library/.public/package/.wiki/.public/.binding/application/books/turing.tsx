import { $ } from '@dna-platform/chemistry';
import $Book from '../../../../turing/.book';
import $Cover from '../../../../turing/.cover';
import $Synopsis from '../../../../turing/.synopsis';
import $Table from '../../../../turing/.table';
import $Lead from '../../../../turing/1-lead';
import $EarlyLifeAndEducation from '../../../../turing/2-early-life-and-education';
import $CareerAndResearch from '../../../../turing/3-career-and-research';
import $PersonalLife from '../../../../turing/4-personal-life';
import $Death from '../../../../turing/5-death';
import $GovernmentApologyAndPardon from '../../../../turing/6-government-apology-and-pardon';
import $FurtherReading from '../../../../turing/7-further-reading';
import $SeeAlso from '../../../../turing/8-see-also';
import $Notes from '../../../../turing/9-notes';
import $References from '../../../../turing/10-references';
import $ExternalLinks from '../../../../turing/11-external-links';
import $TheFoot from '../../../../turing/12-the-foot';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Table = $($Table);
const Lead = $($Lead);
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
const TheFoot = $($TheFoot);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <Table />
        <Lead />
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
        <TheFoot />
    </Book>
);
