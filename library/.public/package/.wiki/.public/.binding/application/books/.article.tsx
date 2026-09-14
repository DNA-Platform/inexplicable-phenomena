import { $ } from '@dna-platform/chemistry';
import $Book from '../../../../.article/.book';
import $Cover from '../../../../.article/.cover';
import $Synopsis from '../../../../.article/.synopsis';
import $Contents from '../../../../.article/.table';
import $ManualOfStyle from '../../../../.article/0-manual-of-style';
import $Lead from '../../../../.article/1-lead';
import $OrderOfArticleElements from '../../../../.article/2-order-of-article-elements';
import $BodySections from '../../../../.article/3-body-sections';
import $StandardAppendicesAndFooters from '../../../../.article/4-standard-appendices-and-footers';
import $SpecializedLayout from '../../../../.article/5-specialized-layout';
import $Formatting from '../../../../.article/6-formatting';
import $SeeAlso from '../../../../.article/7-see-also';
import $Notes from '../../../../.article/8-notes';
import $References from '../../../../.article/9-references';
import $TheFoot from '../../../../.article/10-the-foot';

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
