import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../team/.reference/.book';
import Cover from '../../../../../team/.reference/.cover';
import Synopsis from '../../../../../team/.reference/.synopsis';
import Table from '../../../../../team/.reference/.table';
import WhoQualifies1 from '../../../../../team/.reference/1-who-qualifies';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {WhoQualifies1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
