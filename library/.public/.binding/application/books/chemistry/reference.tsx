import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../chemistry/.reference/.book';
import Cover from '../../../../../chemistry/.reference/.cover';
import Synopsis from '../../../../../chemistry/.reference/.synopsis';
import Table from '../../../../../chemistry/.reference/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
