import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import $Cover from './.cover';
import $Synopsis from './.synopsis';
import $Contents from './.table';
import $ManualOfStyle from './0-manual-of-style';
import $Lead from './1-lead';
import $OrderOfArticleElements from './2-order-of-article-elements';
import $BodySections from './3-body-sections';
import $StandardAppendicesAndFooters from './4-standard-appendices-and-footers';
import $SpecializedLayout from './5-specialized-layout';
import $Formatting from './6-formatting';
import $SeeAlso from './7-see-also';
import $Notes from './8-notes';
import $References from './9-references';
import $TheFoot from './10-the-foot';

const Book = $($Book);
const Cover = $($Cover);
const Synopsis = $($Synopsis);
const Contents = $($Contents);
const ManualOfStyle = $($ManualOfStyle);
const Lead = $($Lead);
const OrderOfArticleElements = $($OrderOfArticleElements);
const BodySections = $($BodySections);
const StandardAppendicesAndFooters = $($StandardAppendicesAndFooters);
const SpecializedLayout = $($SpecializedLayout);
const Formatting = $($Formatting);
const SeeAlso = $($SeeAlso);
const Notes = $($Notes);
const References = $($References);
const TheFoot = $($TheFoot);

export const book = $<$Book>(
    <Book>
        <Cover />
        <Synopsis />
        <Contents />
        <ManualOfStyle />
        <Lead />
        <OrderOfArticleElements />
        <BodySections />
        <StandardAppendicesAndFooters />
        <SpecializedLayout />
        <Formatting />
        <SeeAlso />
        <Notes />
        <References />
        <TheFoot />
    </Book>
);
