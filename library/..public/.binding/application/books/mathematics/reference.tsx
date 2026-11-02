import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.reference/.book';
import Cover from '../../../../../mathematics/.reference/.cover';
import Synopsis from '../../../../../mathematics/.reference/.synopsis';
import Table from '../../../../../mathematics/.reference/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
