import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.reference/.book';
import Cover from '../../../../../mathematics/.reference/.cover';
import Synopsis from '../../../../../mathematics/.reference/.synopsis';
import Table from '../../../../../mathematics/.reference/.table';
import TheNotebook1 from '../../../../../mathematics/.reference/1-the-notebook';
import TheTextbook2 from '../../../../../mathematics/.reference/2-the-textbook';
import TheProject3 from '../../../../../mathematics/.reference/3-the-project';
import TheLibrary4 from '../../../../../mathematics/.reference/4-the-library';
import TheDesign5 from '../../../../../mathematics/.reference/5-the-design';
import TheSpecification6 from '../../../../../mathematics/.reference/6-the-specification';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {TheNotebook1()}
        {TheTextbook2()}
        {TheProject3()}
        {TheLibrary4()}
        {TheDesign5()}
        {TheSpecification6()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
