import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.identity/.book';
import Cover from '../../../../../mathematics/.identity/.cover';
import Synopsis from '../../../../../mathematics/.identity/.synopsis';
import Table from '../../../../../mathematics/.identity/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
