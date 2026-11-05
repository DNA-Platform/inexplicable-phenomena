import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.subject/.book';
import Cover from '../../../../.subject/.cover';
import Synopsis from '../../../../.subject/.synopsis';
import Table from '../../../../.subject/.table';
import OurTeam1 from '../../../../.subject/1-our-team';
import Dictionary2 from '../../../../.subject/2-dictionary';
import Chemistry3 from '../../../../.subject/3-chemistry';
import OurMath4 from '../../../../.subject/4-our-math';
import Neuroscience5 from '../../../../.subject/5-neuroscience';
import Philosophy6 from '../../../../.subject/6-philosophy';
import Physics7 from '../../../../.subject/7-physics';
import OurReference8 from '../../../../.subject/8-our-reference';
import TheDesign9 from '../../../../.subject/9-the-design';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {OurTeam1()}
        {Dictionary2()}
        {Chemistry3()}
        {OurMath4()}
        {Neuroscience5()}
        {Philosophy6()}
        {Physics7()}
        {OurReference8()}
        {TheDesign9()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
