import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.library/.book';
import Cover from '../../../../../mathematics/.library/.cover';
import Synopsis from '../../../../../mathematics/.library/.synopsis';
import Table from '../../../../../mathematics/.library/.table';
import OnFormallyUndecidablePropositions1 from '../../../../../mathematics/.library/1-on-formally-undecidable-propositions';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {OnFormallyUndecidablePropositions1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
