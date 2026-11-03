import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.reference/.book';
import Cover from '../../../../.reference/.cover';
import Synopsis from '../../../../.reference/.synopsis';
import Table from '../../../../.reference/.table';
import TheBook1 from '../../../../.reference/1-the-book';
import TheTheme2 from '../../../../.reference/2-the-theme';
import TheMastheadAndTheByline3 from '../../../../.reference/3-the-masthead-and-the-byline';
import TheFaces4 from '../../../../.reference/4-the-faces';
import DevelopingTheLibrary5 from '../../../../.reference/5-developing-the-library';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {TheBook1()}
        {TheTheme2()}
        {TheMastheadAndTheByline3()}
        {TheFaces4()}
        {DevelopingTheLibrary5()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
