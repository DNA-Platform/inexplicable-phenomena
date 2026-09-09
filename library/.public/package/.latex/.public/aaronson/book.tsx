import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import introduction from './1-introduction';
import formalIndependence from './2-formal-independence';
import conclusion from './3-conclusion';
import references from './4-references';
import appendix from './5-appendix';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    synopsis,
    introduction,
    formalIndependence,
    conclusion,
    references,
    appendix,
);
