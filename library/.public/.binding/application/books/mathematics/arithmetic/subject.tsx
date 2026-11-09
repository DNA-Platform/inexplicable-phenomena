import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.subject/.book';
import Cover from '../../../../../../mathematics/arithmetic/.subject/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.subject/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.subject/.table';
import ArithmeticProject1 from '../../../../../../mathematics/arithmetic/.subject/1-arithmetic-project';
import ArithmeticTextbook2 from '../../../../../../mathematics/arithmetic/.subject/2-arithmetic-textbook';
import ArithmeticNotebook3 from '../../../../../../mathematics/arithmetic/.subject/3-arithmetic-notebook';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {ArithmeticProject1()}
        {ArithmeticTextbook2()}
        {ArithmeticNotebook3()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
