import { $ } from '@dna-platform/chemistry';
import { opened } from '../../../opened';
import $Book from '../../../../../../mathematics/arithmetic/.notebook/.book';
import Cover from '../../../../../../mathematics/arithmetic/.notebook/.cover';
import Synopsis from '../../../../../../mathematics/arithmetic/.notebook/.synopsis';
import Table from '../../../../../../mathematics/arithmetic/.notebook/.table';
import ThePreface1 from '../../../../../../mathematics/arithmetic/.notebook/1-the-preface';
import TheObject2 from '../../../../../../mathematics/arithmetic/.notebook/2-the-object';
import TheMechanism3 from '../../../../../../mathematics/arithmetic/.notebook/3-the-mechanism';
import ZeroForProof4 from '../../../../../../mathematics/arithmetic/.notebook/4-zero-for-proof';
import ZeroAsTheHorizon5 from '../../../../../../mathematics/arithmetic/.notebook/5-zero-as-the-horizon';
import ZeroAsTheCounterexample6 from '../../../../../../mathematics/arithmetic/.notebook/6-zero-as-the-counterexample';
import TwoSidedArithmetic7 from '../../../../../../mathematics/arithmetic/.notebook/7-two-sided-arithmetic';
import TheSurvivingSentence8 from '../../../../../../mathematics/arithmetic/.notebook/8-the-surviving-sentence';
import Goldbach9 from '../../../../../../mathematics/arithmetic/.notebook/9-goldbach';
import TheRulings10 from '../../../../../../mathematics/arithmetic/.notebook/10-the-rulings';
import TheDocuments11 from '../../../../../../mathematics/arithmetic/.notebook/11-the-documents';
import TheSketches12 from '../../../../../../mathematics/arithmetic/.notebook/12-the-sketches';
import TheSources13 from '../../../../../../mathematics/arithmetic/.notebook/13-the-sources';
import TheOptions14 from '../../../../../../mathematics/arithmetic/.notebook/14-the-options';
import TheSubjectOfLogic15 from '../../../../../../mathematics/arithmetic/.notebook/15-the-subject-of-logic';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {ThePreface1()}
        {TheObject2()}
        {TheMechanism3()}
        {ZeroForProof4()}
        {ZeroAsTheHorizon5()}
        {ZeroAsTheCounterexample6()}
        {TwoSidedArithmetic7()}
        {TheSurvivingSentence8()}
        {Goldbach9()}
        {TheRulings10()}
        {TheDocuments11()}
        {TheSketches12()}
        {TheSources13()}
        {TheOptions14()}
        {TheSubjectOfLogic15()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
