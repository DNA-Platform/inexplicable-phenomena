import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.identity/.book';
import Cover from '../../../../../mathematics/.identity/.cover';
import Synopsis from '../../../../../mathematics/.identity/.synopsis';
import Table from '../../../../../mathematics/.identity/.table';
import HackingLean1 from '../../../../../mathematics/.identity/1-hacking-lean';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {HackingLean1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
