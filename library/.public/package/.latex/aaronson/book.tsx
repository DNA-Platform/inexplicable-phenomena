import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import synopsis from './.synopsis';
import chapter1 from './1-introduction';
import chapter2 from './2-formal-independence';
import chapter3 from './3-conclusion';
import references from './4-references';
import appendix from './5-appendix';

const Book = $($Book);

export const book = $<$Book>(<Book />, cover, synopsis, chapter1, chapter2, chapter3, references, appendix);
