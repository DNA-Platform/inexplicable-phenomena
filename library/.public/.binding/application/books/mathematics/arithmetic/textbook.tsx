import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.textbook/.book';
import Cover from '../../../../../../mathematics/arithmetic/.textbook/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.textbook/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.textbook/.table';
import SystemA1 from '../../../../../../mathematics/arithmetic/.textbook/1-system-a';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {SystemA1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
