import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../.reference/dictionary/.book';
import Cover from '../../../../../.reference/dictionary/.cover';
import Synopsis from '../../../../../.reference/dictionary/.synopsis';
import Table from '../../../../../.reference/dictionary/.table';
import Definition1 from '../../../../../.reference/dictionary/1-definition';
import Dichotomy2 from '../../../../../.reference/dictionary/2-dichotomy';
import Identification3 from '../../../../../.reference/dictionary/3-identification';
import Identity4 from '../../../../../.reference/dictionary/4-identity';
import Individuality5 from '../../../../../.reference/dictionary/5-individuality';
import Object6 from '../../../../../.reference/dictionary/6-object';
import Reference7 from '../../../../../.reference/dictionary/7-reference';
import Referent8 from '../../../../../.reference/dictionary/8-referent';
import Relationship9 from '../../../../../.reference/dictionary/9-relationship';
import Representation10 from '../../../../../.reference/dictionary/10-representation';
import Representative11 from '../../../../../.reference/dictionary/11-representative';
import Subject12 from '../../../../../.reference/dictionary/12-subject';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {Definition1()}
        {Dichotomy2()}
        {Identification3()}
        {Identity4()}
        {Individuality5()}
        {Object6()}
        {Reference7()}
        {Referent8()}
        {Relationship9()}
        {Representation10()}
        {Representative11()}
        {Subject12()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
