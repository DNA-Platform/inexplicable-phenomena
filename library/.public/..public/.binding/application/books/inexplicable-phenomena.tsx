import { $ } from '@dna-platform/chemistry';
import { opened } from '../opened';
import $Book from '../../../../..inexplicable-phenomena/.book';
import Cover from '../../../../..inexplicable-phenomena/.cover';
import Synopsis from '../../../../..inexplicable-phenomena/.synopsis';
import Table from '../../../../..inexplicable-phenomena/.table';
import WhatThisLibraryIs1 from '../../../../..inexplicable-phenomena/1-what-this-library-is';

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
