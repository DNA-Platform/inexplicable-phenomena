import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../.reference/.design/.book';
import Cover from '../../../../../.reference/.design/.cover';
import Synopsis from '../../../../../.reference/.design/.synopsis';
import Table from '../../../../../.reference/.design/.table';
import TheTopPage1 from '../../../../../.reference/.design/1-the-top-page';

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
