import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../.reference/.book';
import Cover from '../../../../.reference/.cover';
import Synopsis from '../../../../.reference/.synopsis';
import Table from '../../../../.reference/.table';
import WhatThisLibraryIs1 from '../../../../.reference/1-what-this-library-is';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {WhatThisLibraryIs1()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
