import { $ } from '@dna-platform/chemistry';
import $Book from '../../../../aaronson/.book';
import $Cover from '../../../../aaronson/.cover';
import $Synopsis from '../../../../aaronson/.synopsis';
import $Table from '../../../../aaronson/.table';
import $Introduction from '../../../../aaronson/1-introduction';
import $Formalizing from '../../../../aaronson/2-formalizing';
import $Beliefs from '../../../../aaronson/3-beliefs';
import $WhyDifficult from '../../../../aaronson/4-why-difficult';
import $Strengthenings from '../../../../aaronson/5-strengthenings';
import $Progress from '../../../../aaronson/6-progress';
import $Conclusions from '../../../../aaronson/7-conclusions';
import $Acknowledgments from '../../../../aaronson/8-acknowledgments';
import $Appendix from '../../../../aaronson/9-appendix';
import $References from '../../../../aaronson/10-references';
import $Notes from '../../../../aaronson/11-notes';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Table = $($Table);
const Introduction = $($Introduction);
const Formalizing = $($Formalizing);
const Beliefs = $($Beliefs);
const WhyDifficult = $($WhyDifficult);
const Strengthenings = $($Strengthenings);
const Progress = $($Progress);
const Conclusions = $($Conclusions);
const Acknowledgments = $($Acknowledgments);
const Appendix = $($Appendix);
const References = $($References);
const Notes = $($Notes);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <Table />
        <Introduction />
        <Formalizing />
        <Beliefs />
        <WhyDifficult />
        <Strengthenings />
        <Progress />
        <Conclusions />
        <Acknowledgments />
        <Appendix />
        <References />
        <Notes />
    </Book>
);
