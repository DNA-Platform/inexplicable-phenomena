import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../neuroscience/.subject/.book';
import Cover from '../../../../../neuroscience/.subject/.cover';
import Synopsis from '../../../../../neuroscience/.subject/.synopsis';
import Table from '../../../../../neuroscience/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
