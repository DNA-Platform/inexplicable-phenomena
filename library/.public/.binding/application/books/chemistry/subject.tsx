import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../chemistry/.subject/.book';
import Cover from '../../../../../chemistry/.subject/.cover';
import Synopsis from '../../../../../chemistry/.subject/.synopsis';
import Table from '../../../../../chemistry/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
