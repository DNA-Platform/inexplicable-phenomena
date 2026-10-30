import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.mathematics/.book';
import Cover from '../../../../.mathematics/.cover';
import Synopsis from '../../../../.mathematics/.synopsis';
import Table from '../../../../.mathematics/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
