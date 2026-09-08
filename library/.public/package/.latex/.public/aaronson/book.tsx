import { $ } from '@dna-platform/chemistry';
import $Book from './.book';
import cover from './.cover';
import introduction from './1-introduction';

const Book = $($Book);

export const book = $<$Book>(
    <Book />,
    cover,
    introduction,
);
