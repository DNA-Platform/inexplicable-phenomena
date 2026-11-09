import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.notebook/.book';
import Cover from '../../../../../../mathematics/arithmetic/.notebook/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.notebook/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.notebook/.table';
import TheSubjectOfArithmetic1 from '../../../../../../mathematics/arithmetic/.notebook/1-the-subject-of-arithmetic';
import TheTypeOfResult2 from '../../../../../../mathematics/arithmetic/.notebook/2-the-type-of-result';
import SemanticReflection3 from '../../../../../../mathematics/arithmetic/.notebook/3-semantic-reflection';
import FiniteProof4 from '../../../../../../mathematics/arithmetic/.notebook/4-finite-proof';
import TheCircle5 from '../../../../../../mathematics/arithmetic/.notebook/5-the-circle';
import Zero6 from '../../../../../../mathematics/arithmetic/.notebook/6-zero';
import TheSubject7 from '../../../../../../mathematics/arithmetic/.notebook/7-the-subject';
import TheTheorems8 from '../../../../../../mathematics/arithmetic/.notebook/8-the-theorems';
import TheAxiom9 from '../../../../../../mathematics/arithmetic/.notebook/9-the-axiom';
import TheConjecturesAndIntuitions10 from '../../../../../../mathematics/arithmetic/.notebook/10-the-conjectures-and-intuitions';
import TheArchive11 from '../../../../../../mathematics/arithmetic/.notebook/11-the-archive';
import TheQuestions12 from '../../../../../../mathematics/arithmetic/.notebook/12-the-questions';
import TheSources13 from '../../../../../../mathematics/arithmetic/.notebook/13-the-sources';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {TheSubjectOfArithmetic1()}
        {TheTypeOfResult2()}
        {SemanticReflection3()}
        {FiniteProof4()}
        {TheCircle5()}
        {Zero6()}
        {TheSubject7()}
        {TheTheorems8()}
        {TheAxiom9()}
        {TheConjecturesAndIntuitions10()}
        {TheArchive11()}
        {TheQuestions12()}
        {TheSources13()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
