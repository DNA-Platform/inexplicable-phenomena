import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $OrderOfArticleElements from './1-order-of-article-elements';
import $BodySections from './2-body-sections';
import $StandardAppendicesAndFooters from './3-standard-appendices-and-footers';
import $SpecializedLayout from './4-specialized-layout';
import $Formatting from './5-formatting';
import $TheAppendices from './6-the-appendices';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const OrderOfArticleElements = $($OrderOfArticleElements);
const BodySections = $($BodySections);
const StandardAppendicesAndFooters = $($StandardAppendicesAndFooters);
const SpecializedLayout = $($SpecializedLayout);
const Formatting = $($Formatting);
const TheAppendices = $($TheAppendices);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <OrderOfArticleElements />
        <BodySections />
        <StandardAppendicesAndFooters />
        <SpecializedLayout />
        <Formatting />
        <TheAppendices />
    </Book>
);
