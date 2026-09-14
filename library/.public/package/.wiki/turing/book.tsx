import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $Contents from './.table';
import $Lead from './1-lead';
import $EarlyLifeAndEducation from './2-early-life-and-education';
import $CareerAndResearch from './3-career-and-research';
import $PersonalLife from './4-personal-life';
import $Death from './5-death';
import $GovernmentApologyAndPardon from './6-government-apology-and-pardon';
import $FurtherReading from './7-further-reading';
import $SeeAlso from './8-see-also';
import $Notes from './9-notes';
import $References from './10-references';
import $ExternalLinks from './11-external-links';
import $TheFoot from './12-the-foot';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Contents = $($Contents);
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
        <Contents />
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
