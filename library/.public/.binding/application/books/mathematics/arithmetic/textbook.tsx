import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.textbook/.book';
import Cover from '../../../../../../mathematics/arithmetic/.textbook/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.textbook/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.textbook/.table';
import FormalLogic1 from '../../../../../../mathematics/arithmetic/.textbook/1-formal-logic';
import TheLogicalForm2 from '../../../../../../mathematics/arithmetic/.textbook/2-the-logical-form';
import FormalArithmetic3 from '../../../../../../mathematics/arithmetic/.textbook/3-formal-arithmetic';
import TheArithmeticForm4 from '../../../../../../mathematics/arithmetic/.textbook/4-the-arithmetic-form';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {FormalLogic1()}
        {TheLogicalForm2()}
        {FormalArithmetic3()}
        {TheArithmeticForm4()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
