import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../philosophy/.reference/.book';
import Cover from '../../../../../philosophy/.reference/.cover';
import Synopsis from '../../../../../philosophy/.reference/.synopsis';
import Table from '../../../../../philosophy/.reference/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
