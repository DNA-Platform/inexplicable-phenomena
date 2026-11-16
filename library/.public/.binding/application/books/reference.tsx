import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.reference/.book';
import Cover from '../../../../.reference/.cover';
import Synopsis from '../../../../.reference/.synopsis';
import Table from '../../../../.reference/.table';
import TheBook1 from '../../../../.reference/1-the-book';
import TheTheme2 from '../../../../.reference/2-the-theme';
import TheRunningHeadAndTheByline3 from '../../../../.reference/3-the-running-head-and-the-byline';
import TheFaces4 from '../../../../.reference/4-the-faces';
import DevelopingTheLibrary5 from '../../../../.reference/5-developing-the-library';
import ThePaper6 from '../../../../.reference/6-the-paper';
import TheReferenceManual7 from '../../../../.reference/7-the-reference-manual';
import TheSpecification8 from '../../../../.reference/8-the-specification';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {TheBook1()}
        {TheTheme2()}
        {TheRunningHeadAndTheByline3()}
        {TheFaces4()}
        {DevelopingTheLibrary5()}
        {ThePaper6()}
        {TheReferenceManual7()}
        {TheSpecification8()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
