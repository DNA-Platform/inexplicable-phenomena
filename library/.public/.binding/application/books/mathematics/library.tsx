import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.library/.book';
import Cover from '../../../../../mathematics/.library/.cover';
import Synopsis from '../../../../../mathematics/.library/.synopsis';
import Table from '../../../../../mathematics/.library/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
