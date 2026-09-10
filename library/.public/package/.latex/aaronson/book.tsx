import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $Table from './.table';
import $Introduction from './1-introduction';
import $Formalizing from './2-formalizing';
import $Beliefs from './3-beliefs';
import $WhyDifficult from './4-why-difficult';
import $Strengthenings from './5-strengthenings';
import $Progress from './6-progress';
import $Conclusions from './7-conclusions';
import $Acknowledgments from './8-acknowledgments';
import $Appendix from './9-appendix';
import $References from './references';

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
    </Book>
);
