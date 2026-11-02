import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../physics/.reference/.book';
import Cover from '../../../../../physics/.reference/.cover';
import Synopsis from '../../../../../physics/.reference/.synopsis';
import Table from '../../../../../physics/.reference/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
