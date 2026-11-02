import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../pharmacology/.reference/.book';
import Cover from '../../../../../pharmacology/.reference/.cover';
import Synopsis from '../../../../../pharmacology/.reference/.synopsis';
import Table from '../../../../../pharmacology/.reference/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
