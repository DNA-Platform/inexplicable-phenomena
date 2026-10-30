import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.team/.book';
import Cover from '../../../../.team/.cover';
import Synopsis from '../../../../.team/.synopsis';
import Table from '../../../../.team/.table';
import WhoQualifies1 from '../../../../.team/1-who-qualifies';

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
