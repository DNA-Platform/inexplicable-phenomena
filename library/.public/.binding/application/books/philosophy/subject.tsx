import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../philosophy/.subject/.book';
import Cover from '../../../../../philosophy/.subject/.cover';
import Synopsis from '../../../../../philosophy/.subject/.synopsis';
import Table from '../../../../../philosophy/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
