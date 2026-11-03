import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../pharmacology/.subject/.book';
import Cover from '../../../../../pharmacology/.subject/.cover';
import Synopsis from '../../../../../pharmacology/.subject/.synopsis';
import Table from '../../../../../pharmacology/.subject/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
