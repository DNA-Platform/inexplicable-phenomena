import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.design/.book';
import Cover from '../../../../../mathematics/.design/.cover';
import Synopsis from '../../../../../mathematics/.design/.synopsis';
import Table from '../../../../../mathematics/.design/.table';
import ThePapersPage1 from '../../../../../mathematics/.design/1-the-papers-page';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {ThePapersPage1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
