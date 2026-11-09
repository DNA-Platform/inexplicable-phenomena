import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.project/.book';
import Cover from '../../../../../../mathematics/arithmetic/.project/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.project/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.project/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
