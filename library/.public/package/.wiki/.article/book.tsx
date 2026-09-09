import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import orderOfArticleElements from './1-order-of-article-elements';
import bodySections from './2-body-sections';
import standardAppendicesAndFooters from './3-standard-appendices-and-footers';
import specializedLayout from './4-specialized-layout';
import formatting from './5-formatting';
import theAppendices from './6-the-appendices';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    orderOfArticleElements,
    bodySections,
    standardAppendicesAndFooters,
    specializedLayout,
    formatting,
    theAppendices,
);
