import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../.identity/.reference/.book';
import Cover from '../../../../../.identity/.reference/.cover';
import Synopsis from '../../../../../.identity/.reference/.synopsis';
import Table from '../../../../../.identity/.reference/.table';
import WhoQualifies1 from '../../../../../.identity/.reference/1-who-qualifies';

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
