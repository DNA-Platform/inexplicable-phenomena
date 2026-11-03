import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../.identity/.subject/.book';
import Cover from '../../../../../.identity/.subject/.cover';
import Synopsis from '../../../../../.identity/.subject/.synopsis';
import Table from '../../../../../.identity/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
