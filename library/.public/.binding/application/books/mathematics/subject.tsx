import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.subject/.book';
import Cover from '../../../../../mathematics/.subject/.cover';
import Synopsis from '../../../../../mathematics/.subject/.synopsis';
import Table from '../../../../../mathematics/.subject/.table';
import MathematicalReference1 from '../../../../../mathematics/.subject/1-mathematical-reference';
import MathematicalDesign2 from '../../../../../mathematics/.subject/2-mathematical-design';
import MathematicalPrinciples3 from '../../../../../mathematics/.subject/3-mathematical-principles';
import MathematicalIdentity4 from '../../../../../mathematics/.subject/4-mathematical-identity';
import MathematicalLibrary5 from '../../../../../mathematics/.subject/5-mathematical-library';
import Arithmetic6 from '../../../../../mathematics/.subject/6-arithmetic';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {MathematicalReference1()}
        {MathematicalDesign2()}
        {MathematicalPrinciples3()}
        {MathematicalIdentity4()}
        {MathematicalLibrary5()}
        {Arithmetic6()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
