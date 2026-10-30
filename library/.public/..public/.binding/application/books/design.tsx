import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.design/.book';
import Cover from '../../../../.design/.cover';
import Synopsis from '../../../../.design/.synopsis';
import Table from '../../../../.design/.table';
import TheTopPage1 from '../../../../.design/1-the-top-page';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {TheTopPage1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
