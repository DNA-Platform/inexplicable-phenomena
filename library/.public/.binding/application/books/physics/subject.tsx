import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../physics/.subject/.book';
import Cover from '../../../../../physics/.subject/.cover';
import Synopsis from '../../../../../physics/.subject/.synopsis';
import Table from '../../../../../physics/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
