import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.subject/.book';
import Cover from '../../../../.subject/.cover';
import Synopsis from '../../../../.subject/.synopsis';
import Table from '../../../../.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
