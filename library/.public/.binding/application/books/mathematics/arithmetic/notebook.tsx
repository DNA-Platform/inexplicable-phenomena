import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.notebook/.book';
import Cover from '../../../../../../mathematics/arithmetic/.notebook/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.notebook/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.notebook/.table';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
